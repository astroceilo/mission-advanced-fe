export function prepareProductForm(product) {
  if (!product) return null;

  return {
    title: product.title ?? "",
    slug: product.slug ?? "",
    category: product.category ?? "",
    thumbnail: null,
    description: product.description ?? "",

    price: product.price?.toString() ?? "",
    discount: product.discount?.toString() ?? "",
    // price: product.price?.original?.toString() ?? "",
    // discount: product.price?.discount?.toString() ?? "",

    instructorId: product.instructor?.id
      ? product.instructor.id.toString()
      : "",

    // ratingValue: product.rating?.stars?.toString() ?? "0",
    // ratingCount: product.rating?.reviews?.toString() ?? "0",
  };
}
