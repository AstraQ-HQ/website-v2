import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeShiki, { type RehypeShikiOptions } from "@shikijs/rehype";
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import slugify from "@sindresorhus/slugify";
import type { Heading, Paragraph } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import type { ShikiTransformer } from "shiki";
import { unified } from "unified";
import { z } from "zod";

type Headings = {
  depth: number;
  value: string;
  slug: string;
}[];

const headingProcessor = unified().use(remarkRehype).use(rehypeStringify);
const titleProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify);
const titlePlainProcessor = unified().use(remarkParse);

async function processTitle(
  title: string,
): Promise<{ plain: string; html: string }> {
  const htmlFile = await titleProcessor.process(title);
  const htmlString = htmlFile.toString();
  const match = htmlString.match(/<p>([\s\S]*)<\/p>/);

  const plainTree = titlePlainProcessor.parse(title);
  const plainString = mdastToString(plainTree);

  return {
    plain: plainString,
    html: match ? match[1] : htmlString,
  };
}

async function headingToHtml(node: Heading): Promise<string> {
  const tempNode: Paragraph = {
    type: "paragraph" as const,
    children: node.children,
  };
  const result = await headingProcessor.run({
    type: "root",
    children: [tempNode],
  } as Parameters<typeof headingProcessor.run>[0]);
  const html = headingProcessor.stringify(result);
  const match = html.match(/<p>([\s\S]*)<\/p>/);
  return match ? match[1] : html;
}

const blogs = defineCollection({
  name: "blogs",
  directory: "content/blogs",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    category: z.string(),
    draft: z.boolean().default(false),
    content: z.string(),
    author: z
      .object({
        name: z.string(),
        bio: z.string().optional(),
        avatar: z.string().optional(),
      })
      .optional()
      .default({
        name: "AstraQ Team",
        bio: "The AstraQ Team writes about technology, security, and innovation.",
      }),
    series: z
      .object({
        name: z.string(),
        part: z.number(),
      })
      .optional(),
  }),
  transform: async (document, context) => {
    if (document.draft) {
      return context.skip("blog is draft");
    }

    const headingNodes: Heading[] = [];
    const time = readingTime(document.content).text;

    const html = await compileMDX(context, document, {
      remarkPlugins: [
        remarkMath,
        remarkGemoji,
        [remarkGfm, { singleTilde: false }],
        [
          ({ headingNodesRef }: { headingNodesRef: Heading[] }) =>
            (tree) => {
              for (const node of tree.children) {
                if (node.type === "heading" && node.depth <= 3) {
                  headingNodesRef.push(node);
                }
              }
            },
          { headingNodesRef: headingNodes },
        ],
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeKatex,
        [
          rehypeShiki,
          {
            themes: { light: "vitesse-light", dark: "vitesse-black" },
            transformers: [
              transformerNotationDiff(),
              transformerNotationHighlight(),
              transformerNotationFocus(),
              transformerNotationErrorLevel(),
              {
                pre(hast) {
                  hast.properties["data-meta"] = this.options.meta?.__raw;
                  hast.properties["data-code"] = this.source;
                  hast.properties["data-language"] = this.options.lang;
                },
                code(hast) {
                  hast.properties["data-line-numbers-max-digits"] =
                    this.lines.length.toString().length;
                },
              } satisfies ShikiTransformer,
            ],
            inline: "tailing-curly-colon",
          } satisfies RehypeShikiOptions,
        ],
      ],
    });

    const processedHeadings: Headings = await Promise.all(
      headingNodes.map(async (node) => ({
        depth: node.depth,
        value: await headingToHtml(node),
        slug: slugify(mdastToString(node)),
      })),
    );

    const cachedHeadings = await context.cache(
      { content: document.content, _meta: document._meta },
      () => processedHeadings,
      {
        key: "__headings",
      },
    );

    const slug = document._meta.fileName.replace(".mdx", "");
    const { html: htmlTitle, plain: plainTitle } = await processTitle(
      document.title,
    );

    let seriesData: {
      name: string;
      part: number;
      previous: { slug: string; title: string } | null;
      next: { slug: string; title: string } | null;
    } | null = null;

    if (document.series) {
      const seriesName = document.series.name;
      const allDocs = await context.collection.documents();
      const seriesDocs = allDocs
        .filter(
          (doc) =>
            doc.series?.name === seriesName &&
            !doc.draft &&
            doc._meta.filePath !== document._meta.filePath,
        )
        .toSorted((a, b) => (a.series?.part ?? 0) - (b.series?.part ?? 0));

      const allSeriesDocs = [...seriesDocs, document].toSorted(
        (a, b) => (a.series?.part ?? 0) - (b.series?.part ?? 0),
      );

      const currentIndex = allSeriesDocs.findIndex(
        (doc) => doc._meta.filePath === document._meta.filePath,
      );

      const previousDoc =
        currentIndex > 0 ? allSeriesDocs[currentIndex - 1] : null;
      const nextDoc =
        currentIndex < allSeriesDocs.length - 1
          ? allSeriesDocs[currentIndex + 1]
          : null;

      const { plain: prevTitle } = previousDoc
        ? await processTitle(previousDoc.title)
        : { plain: "" };
      const { plain: nextTitle } = nextDoc
        ? await processTitle(nextDoc.title)
        : { plain: "" };

      const prevSlug = previousDoc
        ? previousDoc._meta.fileName.replace(".mdx", "")
        : "";
      const nextSlug = nextDoc
        ? nextDoc._meta.fileName.replace(".mdx", "")
        : "";

      seriesData = {
        name: document.series.name,
        part: document.series.part,
        previous: previousDoc
          ? {
              slug: prevSlug,
              title: prevTitle,
            }
          : null,
        next: nextDoc
          ? {
              slug: nextSlug,
              title: nextTitle,
            }
          : null,
      };
    }

    return {
      ...document,
      title: plainTitle,
      html,
      htmlTitle,
      headings: cachedHeadings,
      slug,
      readingTime: time,
      series: seriesData,
    };
  },
});

const products = defineCollection({
  name: "products",
  directory: "content/products",
  include: "**/*.yml",
  parser: "yaml",
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    features: z.array(z.string()),
    icon: z.string(),
    category: z.string(),
    featured: z.boolean().optional().default(false),
  }),
  transform: async (document) => {
    return {
      ...document,
      slug: slugify(document.name),
    };
  },
});

const services = defineCollection({
  name: "services",
  directory: "content/services",
  include: "**/*.yml",
  parser: "yaml",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    icon: z.string(),
    featured: z.boolean().optional().default(false),
  }),
  transform: async (document) => {
    return {
      ...document,
      slug: slugify(document.name),
    };
  },
});

const testimonials = defineCollection({
  name: "testimonials",
  directory: "content/testimonials",
  include: "**/*.yml",
  parser: "yaml",
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    company: z.string(),
    initials: z.string(),
  }),
});

export default defineConfig({
  collections: [blogs, products, services, testimonials],
});
