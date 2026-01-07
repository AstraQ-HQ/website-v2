import {
  AwardIcon,
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

export const calLink = "https://cal.com/astraqcd" as Route;

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
      href: calLink,
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
            href: calLink,
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
          "Building next-generation security systems for tomorrow's threats",
        stats: [
          {
            icon: CloudIcon,
            value: "4 Core Platforms",
            label: "Under Active Development",
          },
          {
            icon: TrendingUpIcon,
            value: "10+ Specialists",
            label: "Security & AI Team",
          },
          {
            icon: AwardIcon,
            value: "2 Challenge Wins",
            label: "C-DoT, NCIIPC Grand AI",
          },
        ],
        features: [
          {
            title: "Innovation First",
            description:
              "We design security solutions from the ground up using AI, satellite intelligence, and modern system architectures focused on solving real, emerging security problems rather than legacy checklists.",
          },
          {
            title: "Built for Enterprise Scale",
            description:
              "Our platforms are engineered with scalability, auditability, and compliance in mind, ensuring readiness for enterprise and government deployment as we move from pilots to production.",
          },
          {
            title: "Expert-Led Development",
            description:
              "Developed by a team with hands-on experience in cybersecurity, AI research, OSINT, and critical infrastructure protection combining academic rigor with real-world threat understanding.",
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
        href: calLink,
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
