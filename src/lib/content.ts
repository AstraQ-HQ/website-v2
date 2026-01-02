import {
  allBlogs,
  allProducts,
  allServices,
  allTestimonials,
  type Blog,
  type Product,
  type Service,
  type Testimonial,
} from "../../.content-collections/generated";
import { compareDesc } from "date-fns";

export const allBlogsByDate = allBlogs.toSorted((a, b) =>
  compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)),
);

export const allFeaturedProducts = allProducts.filter((p) => p.featured);
export const allFeaturedServices = allServices.filter((s) => s.featured);

export { allProducts, allServices, allTestimonials };

export type { Blog, Product, Service, Testimonial };
