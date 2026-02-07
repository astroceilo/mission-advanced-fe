import { normalizeInstructor } from "../normalizeUser/normalizeInstructor";
import { normalizeUser } from "../normalizeUser/normalizeUser";


export function normalizeProductForView(product, users = []) {
  const rawInstructor = users.find(
    (u) => String(u.id) === String(product.instructorId),
  );

  const normalizedUser = normalizeUser(rawInstructor);

  const instructor =
    normalizedUser?.role === "instructor"
      ? normalizeInstructor(rawInstructor)
      : null;

  const price = Number(product.price) || 0;
  const discount = Number(product.discount) || 0;

  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    category: product.category,
    thumbnail: product.thumbnail,
    description: product.description,
    createdAt: product.createdAt,

    instructor,

    price: {
      original: price,
      discount,
      final: discount > 0 ? price - discount : price,
    },

    rating: {
      stars: Number(product.ratingValue) || 0,
      reviews: Number(product.ratingCount) || 0,
    },
  };
}
