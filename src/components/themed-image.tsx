import Image, { type ImageProps } from "next/image";

type ThemedImageProps = Omit<ImageProps, "src"> & {
  lightSrc: string;
  darkSrc: string;
};

export function ThemedImage({ lightSrc, darkSrc, ...props }: ThemedImageProps) {
  return (
    <picture>
      <source srcSet={darkSrc} media="(prefers-color-scheme: dark)" />
      <Image src={lightSrc} {...props} />
    </picture>
  );
}
