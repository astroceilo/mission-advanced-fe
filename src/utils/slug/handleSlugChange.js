import { slugify } from "../slugify";


export const handleSlugChange = ({
  name,
  value,
  isSlugManual,
}) => {
  // kalau user edit slug langsung
  if (name === "slug") {
    return {
      slug: slugify(value),
      setManual: true,
    };
  }

  // kalau edit title & slug belum manual
  if (name === "title" && !isSlugManual) {
    return {
      slug: slugify(value),
    };
  }

  return {};
};
