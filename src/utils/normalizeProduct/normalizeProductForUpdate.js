export function normalizeProductForUpdate(form) {
  return {
    title: form.title,
    slug: form.slug,
    category: form.category,
    thumbnail: form.thumbnail,
    description: form.description,

    price: Number(form.price),
    discount: Number(form.discount) || 0,

    instructorId: form.instructorId,
    updatedAt: new Date().toISOString(),
  };
}
