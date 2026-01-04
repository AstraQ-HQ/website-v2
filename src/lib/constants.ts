import {
  AwardIcon,
  ClockIcon,
  CloudIcon,
  DatabaseIcon,
  LockIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react";
import type { Route } from "next";
import { z } from "zod";

export const CONTACT_EMAIL = "contact@astraqcyberdefence.com";
export const ADMIN_EMAILS = [""];

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  turnstileToken: z.string().min(1, "You must verify you're human"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

type NavItem = {
  label: string;
  href: Route;
};

export const siteConfig = {
  name: "AstraQ",
  description: "AI-powered cybersecurity for modern enterprises",
  header: {
    navItems: [
      { label: "Products", href: "/products" },
      { label: "Services", href: "/services" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/#why-astraq" },
      { label: "Contact", href: "/#contact" },
    ] satisfies NavItem[],
    cta: {
      text: "Book Demo",
      href: "https://cal.com/astraq-cyber-defence" as Route,
    },
  },
  pages: {
    home: {
      hero: {
        title: "AI-Powered Cybersecurity for Modern Enterprises",
        description:
          "Protect your organization with cutting-edge artificial intelligence. Detect threats before they strike, respond in seconds, and ensure compliance effortlessly.",
        cta: {
          primary: { text: "Explore Solutions", href: "/products" as Route },
          secondary: {
            text: "Book Demo",
            href: "https://cal.com/astraq-cyber-defence" as Route,
          },
        },
        tags: ["Enterprise Grade", "Lightning Fast", "Always Secure"],
      },
      backedBy: {
        title: "Backed by",
        description: "Trusted within India’s defence innovation ecosystem.",
        backers: [
          {
            id: 1,
            name: "C-DOT",
            logo: { url: "/images/cdot.png" },
          },
          {
            id: 2,
            name: "STPI",
            logo: { url: "/images/stpi.png" },
          },
        ],
      },
      whyAstraQ: {
        title: "Why AstraQ?",
        description:
          "Trusted by enterprises worldwide for unmatched security and innovation",
        stats: [
          {
            icon: TrendingUpIcon,
            value: "99.9%",
            label: "Threat Detection Rate",
          },
          { icon: ClockIcon, value: "<5min", label: "Response Time" },
          { icon: AwardIcon, value: "500+", label: "Enterprise Clients" },
        ],
        features: [
          {
            title: "Innovation First",
            description:
              "Cutting-edge AI and machine learning technologies at the forefront of cybersecurity.",
          },
          {
            title: "Enterprise Proven",
            description:
              "Trusted by Fortune 500 companies and government agencies for mission-critical protection.",
          },
          {
            title: "Expert Support",
            description:
              "24/7 expert support team dedicated to your security and success.",
          },
        ],
      },
      featuredProducts: {
        title: "Our Solutions",
        description:
          "Comprehensive cybersecurity solutions powered by artificial intelligence",
      },
      featuredServices: {
        title: "Our Services",
        description: "Expert services to complement your security solutions",
      },
      techStack: {
        title: "Powered by Advanced AI",
        description: "Our platform leverages state-of-the-art technologies",
        techs: [
          { icon: ZapIcon, name: "Advanced ML", desc: "Neural networks" },
          {
            icon: DatabaseIcon,
            name: "Big Data",
            desc: "Real-time processing",
          },
          {
            icon: CloudIcon,
            name: "Cloud Native",
            desc: "Scalable architecture",
          },
          { icon: LockIcon, name: "Zero Trust", desc: "Security framework" },
        ],
      },
      testimonials: {
        title: "Trusted by Industry Leaders",
      },
      contactUs: {
        title: "Get in touch",
        subtitle:
          "Have questions? We'd love to hear from you.\nSend us a message and we'll respond as soon as possible.",
      },
    },
    services: {
      cta: {
        text: "Schedule Consultation",
        href: "https://cal.com/astraq-cyber-defence" as Route,
      },
    },
  },
  footer: {
    products: [
      { label: "AI Threat Detection", href: "/products" },
      { label: "Security Operations Center", href: "/products" },
      { label: "Penetration Testing", href: "/products" },
      { label: "Compliance Management", href: "/products" },
    ] as NavItem[],
    services: [
      { label: "Security Consulting", href: "/services" },
      { label: "Incident Response", href: "/services" },
      { label: "Security Training", href: "/services" },
      { label: "Managed Security", href: "/services" },
    ] as NavItem[],
    resources: [
      { label: "Blog", href: "/blog" },
      { label: "Open Source", href: "https://github.com/Astraq-HQ" },
    ] as NavItem[],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ] as NavItem[],
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/astrqcd/" },
      { label: "Twitter", href: "https://x.com/astraqcd" },
      { label: "GitHub", href: "https://github.com/Astraq-HQ" },
    ] as NavItem[],
    contact: {
      email: CONTACT_EMAIL,
      phone: "+91 7249561082",
      address: "Akola, Maharashtra, India",
    },
  },
};
