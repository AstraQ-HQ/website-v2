import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-bold">
                  {/* FIXME(logo): Use proper logo */}
                  {siteConfig.name.charAt(0)}
                </span>
              </div>
              <span className="font-mono text-lg">{siteConfig.name}</span>
            </div>
            <p className="text-sm opacity-80 mb-4">{siteConfig.description}</p>
            <div className="flex gap-4">
              {siteConfig.footer.socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="hover:text-accent-foreground transition-colors text-sm"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm opacity-80">
              {siteConfig.footer.products.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-accent-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm opacity-80">
              {siteConfig.footer.services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-accent-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {siteConfig.footer.resources.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-accent-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-center gap-2">
                <MailIcon size={16} strokeWidth={1} />
                <Link
                  href={`mailto:${siteConfig.footer.contact.email}`}
                  className="hover:text-accent-foreground transition-colors"
                >
                  {siteConfig.footer.contact.email}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon size={16} strokeWidth={1} />
                <Link
                  href={`tel:${siteConfig.footer.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-accent-foreground transition-colors"
                >
                  {siteConfig.footer.contact.phone}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <MapPinIcon size={16} strokeWidth={1} />
                <span>{siteConfig.footer.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm opacity-80">
            {siteConfig.footer.legal.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-accent-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
