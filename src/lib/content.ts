import { compareDesc } from "date-fns";
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

const today = new Date();

export const allBlogsByDate = allBlogs
  .filter((blog) => blog.publishedAt <= today)
  .toSorted((a, b) => compareDesc(a.publishedAt, b.publishedAt));

export const allFeaturedProducts = allProducts.filter((p) => p.featured);
export const allFeaturedServices = allServices.filter((s) => s.featured);

export { allProducts, allServices, allTestimonials };

export type { Blog, Product, Service, Testimonial };
