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

export const allBlogsByDate = allBlogs;

export const allFeaturedProducts = allProducts;
export const allFeaturedServices = allServices;

export { allProducts, allServices, allTestimonials };

export type { Blog, Product, Service, Testimonial };
