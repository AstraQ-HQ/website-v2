import Image from "next/image";
import { siteConfig } from "@/lib/constants";
import { getImageUrl } from "@/lib/utils";

export function BackedBySection() {
  const { backers } = siteConfig.pages.home.backedBy;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {backers.map((backer) => (
            <div
              key={backer.id ?? backer.name}
              className="grayscale hover:grayscale-0 transition-all"
            >
              <Image
                src={getImageUrl(backer.logo) ?? ""}
                alt={backer.name}
                width={80}
                height={40}
                className="object-contain"
              />
              <span className="sr-only">{backer.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
