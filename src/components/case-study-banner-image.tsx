import type { ImageProps } from "next/image";
import { ThemedImage } from "./themed-image";

export function CaseStudyBannerImage({
  slug,
  title,
  ...props
}: Omit<ImageProps, "src" | "alt"> & {
  slug: string;
  title: string;
}) {
  return (
    <ThemedImage
      darkSrc={`/images/case-study-banners/dark/${slug}.png`}
      lightSrc={`/images/case-study-banners/light/${slug}.png`}
      alt={title}
      {...props}
    />
  );
}
