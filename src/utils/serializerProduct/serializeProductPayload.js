export const serializeProductPayload = (form) => {
  return {
    title: form.title?.trim(),
    description: form.description?.trim() || null,
    price: Number(form.price) || 0,
    status: form.status, // draft / published
    category_id: form.categoryId,
    level: form.level,
    duration: Number(form.duration) || 0,

    // thumbnail JANGAN di sini kalau pakai upload
    // thumbnail: form.thumbnail,
  };
};
