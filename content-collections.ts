import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const blogs = defineCollection({
  name: "blogs",
  directory: "content/blogs",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    content: z.string(),
  }),
});

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

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
