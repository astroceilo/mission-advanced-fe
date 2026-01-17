export const validateImageFile = (file, options = {}) => {
  const {
    maxSize = 2 * 1024 * 1024,
    allowedTypes = ["image/png", "image/jpeg", "image/webp"],
  } = options;

  if (!file) return "Thumbnail wajib diupload";
  if (!(file instanceof File)) return "File tidak valid";
  if (!allowedTypes.includes(file.type))
    return "Thumbnail harus PNG, JPG, atau WEBP";
  if (file.size > maxSize)
    return "Ukuran thumbnail maksimal 2MB";

  return "";
};
