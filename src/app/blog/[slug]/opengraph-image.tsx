import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { allBlogsByDate } from "@/lib/content";

export const alt = "AstraQ Blog";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

const readFont = (name: string) =>
  readFile(join(process.cwd(), "assets", name));

export function generateStaticParams() {
  return allBlogsByDate.map((blog) => ({ slug: blog.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const blog = allBlogsByDate.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const bannerPath = join(
    process.cwd(),
    "public",
    "images",
    "blog-banners",
    "light",
    `${slug}.png`,
  );
  const logoPath = join(process.cwd(), "src", "app", "icon.svg");

  const [boldFont, regularFont, nunitoFont, bannerBuffer, logoBuffer] =
    await Promise.all([
      readFont("space-mono.ttf"),
      readFont("space-mono-bold.ttf"),
      readFont("nunito-sans.ttf"),
      readFile(bannerPath),
      readFile(logoPath),
    ]);

  const bannerUrl = `data:image/png;base64,${bannerBuffer.toString("base64")}`;
  const logoUrl = `data:image/svg+xml;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        fontFamily: "Space Mono",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: This needs normal img. It is not powered by next image */}
      <img
        src={bannerUrl}
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          padding: "8px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderRadius: "6px",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        {/* biome-ignore lint/performance/noImgElement: OG image generation requires img */}
        <img src={logoUrl} alt="" width={40} height={40} />
        <span
          style={{
            color: "#000",
            fontSize: 20,
            fontWeight: 400,
          }}
        >
          AstraQ Blog
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "48px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.1,
            margin: 0,
            maxWidth: "90%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {blog.title}
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: 24,
            fontWeight: 400,
            lineHeight: 1.4,
            margin: 0,
            maxWidth: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            fontFamily: "Nunito Sans",
          }}
        >
          {blog.summary}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "8px",
          }}
        >
          <span
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: 18,
              fontWeight: 400,
              fontFamily: "Nunito Sans",
            }}
          >
            #{blog.category}
          </span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Space Mono",
          data: boldFont,
          weight: 700,
          style: "normal",
        },
        {
          name: "Space Mono",
          data: regularFont,
          weight: 400,
          style: "normal",
        },
        {
          name: "Nunito Sans",
          data: nunitoFont,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
