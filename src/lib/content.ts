import { compareDesc } from "date-fns";
import {
  allBlogs,
  allCaseStudies,
  allProducts,
  allServices,
  allTestimonials,
  type Blog,
  type CaseStudy,
  type Product,
  type Service,
  type Testimonial,
} from "../../.content-collections/generated";

function sortBlogsByDateAndPart(a: Blog, b: Blog): number {
  const dateComparison = compareDesc(a.publishedAt, b.publishedAt);
  if (dateComparison !== 0) {
    return dateComparison;
  }

  if (a.series?.name === b.series?.name) {
    return (b.series?.part ?? 0) - (a.series?.part ?? 0);
  }

  return 0;
}

export const allBlogsByDate = allBlogs.toSorted(sortBlogsByDateAndPart);

export const allCaseStudiesByDate = allCaseStudies.toSorted((a, b) =>
  compareDesc(a.publishedAt, b.publishedAt),
);

export function getSeriesParts(blog: Blog) {
  if (!blog.series) {
    return [];
  }

  return allBlogsByDate
    .filter((b) => b.series?.name === blog.series?.name)
    .map((b) => ({
      slug: b.slug,
      title: b.title,
      part: b.series?.part ?? 0,
    }))
    .toSorted((a, b) => a.part - b.part);
}

export const allFeaturedProducts = allProducts.filter((p) => p.featured);
export const allFeaturedServices = allServices.filter((s) => s.featured);

export { allProducts, allServices, allTestimonials };

export type { Blog, CaseStudy, Product, Service, Testimonial };
