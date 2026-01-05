import type { ImageProps } from "next/image";
import { ThemedImage } from "./themed-image";

export function BlogBannerImage({
  slug,
  title,
  ...props
}: Omit<ImageProps, "src" | "alt"> & {
  slug: string;
  title: string;
}) {
  return (
    <ThemedImage
      darkSrc={`/images/blog-banners/dark/${slug}.png`}
      lightSrc={`/images/blog-banners/light/${slug}.png`}
      alt={title}
      {...props}
    />
  );
}
