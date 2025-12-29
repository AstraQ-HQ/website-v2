import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-bold">A</span>
              </div>
              <span className="font-mono text-lg">AstraQ</span>
            </div>
            <p className="text-sm opacity-80 mb-4">
              AI-powered cybersecurity for modern enterprises
            </p>
            <div className="flex gap-4">
              {["LinkedIn", "Twitter", "GitHub"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="hover:text-accent-foreground transition-colors text-sm"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link
                  href="/products"
                  className="hover:text-accent-foreground transition-colors"
                >
                  AI Threat Detection
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Security Operations Center
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Penetration Testing
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Compliance Management
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link
                  href="/services"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Security Consulting
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Incident Response
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Security Training
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Managed Security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Webinars
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-center gap-2">
                <MailIcon size={16} strokeWidth={1} />
                <Link
                  href="mailto:hello@astraq.io"
                  className="hover:text-accent-foreground transition-colors"
                >
                  hello@astraq.io
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon size={16} strokeWidth={1} />
                <a
                  href="tel:+14155551234"
                  className="hover:text-accent-foreground transition-colors"
                >
                  +1 (415) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPinIcon size={16} strokeWidth={1} />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-80">
            © 2025 AstraQ. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm opacity-80">
            <Link
              href="/privacy"
              className="hover:text-accent-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-accent-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-accent-foreground transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
