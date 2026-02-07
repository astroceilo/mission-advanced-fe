export function serializeProductForUpdate(form) {
  const price = Number(form.price) || 0;
  const discount = Number(form.discount) || 0;

  return {
    title: form.title,
    slug: form.slug,
    category: form.category,
    thumbnail: form.thumbnail,
    description: form.description,

    price,
    discount,

    instructorId: form.instructorId,
    updatedAt: new Date().toISOString(),
  };
}
