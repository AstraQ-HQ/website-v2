import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { getImageUrl } from "@/lib/utils";

const backers = [
  { id: 1, name: "TechSecure", logo: { url: "/tech-security-logo.jpg" } },
  { id: 2, name: "CyberShield", logo: { url: "/cyber-defense-logo.jpg" } },
  { id: 3, name: "DefenseNet", logo: { url: "/defense-network-logo.jpg" } },
  { id: 4, name: "SecureVault", logo: { url: "/secure-vault-logo.jpg" } },
  { id: 5, name: "ThreatGuard", logo: { url: "/threat-protection-logo.jpg" } },
  {
    id: 6,
    name: "IntelSecure",
    logo: { url: "/intelligence-security-logo.jpg" },
  },
];

export function BackedBySection() {
  return (
    <div className="flex w-full flex-col items-center justify-center border-border border-b">
      <div className="flex items-center justify-center gap-6 self-stretch border-border border-b px-4 py-8 sm:px-6 sm:py-12 md:px-24 md:py-16">
        <div className="flex w-full max-w-[586px] flex-col items-center justify-start gap-3 overflow-hidden rounded-lg px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
          <div className="flex w-full max-w-[472.55px] flex-col justify-center text-center font-mono text-secondary-foreground text-xl leading-tight tracking-tight sm:text-2xl md:text-3xl md:leading-[60px] lg:text-5xl">
            Backed by
          </div>
          <div className="self-stretch text-center font-normal font-sans text-muted-foreground text-sm leading-6 sm:text-base sm:leading-7">
            Trusted within India’s defence innovation ecosystem.
          </div>
        </div>
      </div>

      <div className="flex items-start justify-center self-stretch border-border border-b-0">
        <div className="flex-1 max-w-screen border-border border-r border-l">
          <Marquee className="[--duration:20s] [--gap:0] p-0">
            {backers.map((backer) => (
              <div
                key={backer.id ?? backer.name}
                className="flex h-12 xs:h-14 items-center justify-center gap-1 xs:gap-2 sm:h-16 sm:gap-3 md:h-18 lg:h-20 px-4 xs:px-6 sm:px-8 md:px-12 bg-muted/30 border"
              >
                <div className="relative h-6 xs:h-7 w-6 xs:w-7 overflow-hidden rounded-full sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10">
                  <Image
                    src={getImageUrl(backer.logo) ?? ""}
                    alt={backer.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center text-center font-medium font-sans text-foreground text-sm xs:text-base leading-tight sm:text-lg md:text-xl md:leading-9 lg:text-2xl">
                  {backer.name}
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
