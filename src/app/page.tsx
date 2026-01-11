"use client";

import { ContactUsSection } from "./_components/contact-us";
import { FeaturedProducts } from "./_components/featured-products";
import { FeaturedServices } from "./_components/featured-services";
import { HeroSection } from "./_components/hero-section";
import { TechStack } from "./_components/tech-stack";
import { Testimonials } from "./_components/testimonials";
import { WhyAstraQ } from "./_components/why-astraq";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <FeaturedServices />
      <WhyAstraQ />
      <TechStack />
      <Testimonials />
      <ContactUsSection />
    </>
  );
}
