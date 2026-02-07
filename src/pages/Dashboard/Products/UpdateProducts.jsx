import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { validateUpdateProductForm } from "../../../utils/validationsProduct/validateUpdateProductForm";
import { serializeProductForUpdate } from "../../../utils/serializerProduct/serializeProductForUpdate";
import { prepareProductForm } from "../../../utils/prepareProduct/prepareProductForm";
import { validateImageFile } from "../../../utils/validators/validateImageFile";
import CategoryDropdown from "../../../components/Dropdown/CategoryDropdown";
import { handleSlugChange } from "../../../utils/slug/handleSlugChange";
import { getFinalPrice, formatPriceFull } from "../../../utils/price";
import { useAuth } from "../../../context/AuthContext";
import { slugify } from "../../../utils/slugify";
import { mockApi } from "../../../services/api";

export default function UpdateProducts() {
  // useNavigate and useAuth state
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  // form state schema
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    thumbnail: null,
    description: "",
    price: "",
    discount: "",
    instructorId: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    slug: "",
    category: "",
    thumbnail: "",
    description: "",
    price: "",
    discount: "",
    instructorId: "",
  });

  // get id & slug from params
  const { id, slug } = useParams();

  const roleBasePath = user?.role === "admin" ? "/admin" : "/instructor";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await mockApi.get(`/products/${id}`);
        const data = res.data;

        // setForm({
        //   title: data.title,
        //   slug: data.slug,
        //   category: data.category,
        //   thumbnail: null,
        //   description: data.description,
        //   price: String(data.price),
        //   discount: String(data.discount ?? ""),
        //   instructorId: String(data.instructorId),
        // });

        setForm(prepareProductForm(data));
        setExistingThumbnail(data.thumbnail ?? null); // simpan existing thumbnail
      } catch (err) {
        console.error("Error fetching product:", err);
        toast.error("Product nggak ketemu 😵");
        navigate(`${roleBasePath}/product-lists`);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // check if user is admin or owner
  useEffect(() => {
    if (!user || !form.instructorId) return;

    const isOwner = String(form.instructorId) === String(user.id);

    if (user.role !== "admin" && !isOwner) {
      toast.error("Lu nggak punya akses ke produk ini ❌");
      navigate(`${roleBasePath}/product-lists`);
    }
  }, [form.instructorId, user]);

  useEffect(() => {
    if (!id || !form.slug) return;

    if (slug !== form.slug) {
      navigate(`/update-products/${id}/${form.slug}`, { replace: true });
    }
  }, [slug, form.slug, id]);

  // other state
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [preview, setPreview] = useState(null);
  const [existingThumbnail, setExistingThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [priceInfo, setPriceInfo] = useState({
    original: 0,
    discount: 0,
    final: 0,
    formatted: { original: "0", discount: "0", final: "0" },
  });

  // initialize instructorId when user is logged in
  useEffect(() => {
    if (isLoggedIn && user?.id) {
      setForm((prev) => ({
        ...prev,
        instructorId: String(user.id),
      }));
    }
  }, [isLoggedIn, user]);

  // update price info when price or discount changes
  useEffect(() => {
    const updatedPriceInfo = getFinalPrice(
      {
        original: Number(form.price) || 0,
        discount: Number(form.discount) || 0,
        final: (Number(form.price) || 0) - (Number(form.discount) || 0),
      },
      formatPriceFull,
    );
    setPriceInfo(updatedPriceInfo);
  }, [form.price, form.discount]);

  // cleanup preview
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // handle file change
  const updateForm = (name, value) => {
    const slugUpdate = handleSlugChange({
      name,
      value,
      isSlugManual,
    });

    if (slugUpdate.setManual) {
      setIsSlugManual(true);
    }

    const updatedForm = {
      ...form,
      [name]: value,
      ...slugUpdate,
    };

    setForm(updatedForm);

    setErrors((prev) => ({
      ...prev,
      [name]: validateUpdateProductForm(name, updatedForm[name], updatedForm),
    }));
  };

  // handle file change
  const handleFileChange = (file) => {
    if (!file) return;

    const error = validateImageFile(file);
    if (error) {
      setErrors((prev) => ({ ...prev, thumbnail: error }));
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setExistingThumbnail(null); // clear existing thumbnail since user chose new file

    setForm((prev) => ({ ...prev, thumbnail: file }));
    setErrors((prev) => ({ ...prev, thumbnail: "" }));
  };

  // handle change input
  const handleChange = (eOrName, value) => {
    // custom component (dropdown, etc)
    if (typeof eOrName === "string") {
      updateForm(eOrName, value);
      return;
    }

    const { name, type, files, value: inputValue } = eOrName.target;

    if (type === "file") {
      handleFileChange(files?.[0]);
      return;
    }

    updateForm(name, inputValue);
  };

  // validate all field
  const validateAll = () => {
    const newErrors = {};

    Object.entries(form).forEach(([key, val]) => {
      newErrors[key] = validateUpdateProductForm(key, val, form) || "";
    });

    setErrors(newErrors);

    return !Object.values(newErrors).some((msg) => msg && msg.length > 0);
  };

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateAll();
    if (!isValid) {
      toast.error("Masih ada data yang belum valid 😵");
      return;
    }

    setLoading(true);

    try {
      const payload = serializeProductForUpdate(form);

      if (!form.thumbnail) {
        delete payload.thumbnail;
      }

      console.group("UPDATE PRODUCT DEBUG");
      console.log("FORM RAW:", form);
      console.log("PAYLOAD NORMALIZED:", payload);
      console.groupEnd();

      await mockApi.put(`/products/${id}`, payload);

      toast.success(
        "Produk berhasil diperbarui 🚀, cek Console atau lihat Products (kecuali Thumbnail)",
        { autoClose: 2000 },
      );

      setTimeout(() => {
        navigate(`${roleBasePath}/product-lists`);
      }, 2000);
    } catch (err) {
      console.error("Update product failed:", err);
      toast.error("Gagal perbarui produk 😭");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to="#"
              className="inline-flex items-center text-sm font-medium text-text-dark-disabled hover:text-text-dark-primary"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="text-text-dark-disabled">/</span>
              <Link
                to={`${roleBasePath}/product-lists`}
                className="ms-1 text-sm font-medium text-text-dark-disabled hover:text-text-dark-primary md:ms-2"
              >
                Product Lists
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <span className="text-text-dark-disabled">/</span>
              <Link
                to="#"
                className="ms-1 text-sm font-medium text-text-dark-disabled hover:text-text-dark-primary md:ms-2"
              >
                {form.category}
              </Link>
              {/* <span className="ms-1 text-sm font-medium text-text-dark-disabled md:ms-2">
                {form.category}
              </span> */}
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="text-text-dark-disabled">/</span>
              <span className="ms-1 text-sm font-medium text-text-dark-primary md:ms-2">
                Update Product {form.title}
              </span>
            </div>
          </li>
        </ol>
      </nav>
      {/* End Breadcrumb */}

      {/* Section Update Products */}
      <section className="relative w-full flex flex-col gap-6 md:gap-8!">
        {/* Title */}
        <div className="w-fit flex flex-col gap-2.5">
          <h3 className="font-pop font-semibold text-2xl md:text-[32px]! leading-[1.1] tracking-[0] text-text-dark-primary">
            Update Product {form.title}
          </h3>
        </div>
        {/* End Title */}

        <div className="flex flex-col gap-4 md:gap-6!">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 text-left"
          >
            <div className="flex flex-col gap-3 md:gap-4!">
              {/* Title */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="title"
                  className="block font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-dark-secondary"
                >
                  Nama Produk <span className="text-error-default">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Masukkan Nama Produk"
                  className={`w-full font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] border rounded-md px-3 py-2 focus:ring-2 focus:outline-none transition ${
                    errors.title
                      ? "border-red-500 focus:ring-red-400"
                      : "border-other-border focus:ring-main-primary-400"
                  }
                  ${
                    form.title === ""
                      ? "placeholder:text-text-dark-disabled text-text-dark-disabled"
                      : "text-text-dark-primary"
                  }`}
                  required
                />
                {/* Error Message */}
                {errors.title && (
                  <span className="text-red-500 text-sm">{errors.title}</span>
                )}
              </div>

              {/* Slug */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="slug"
                  className="block font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-dark-secondary"
                >
                  Slug Produk <span className="text-error-default">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="Masukkan Slug Produk"
                    className={`w-full pr-28 font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] border rounded-md px-3 py-2 focus:ring-2 focus:outline-none transition ${
                      errors.slug
                        ? "border-red-500 focus:ring-red-400"
                        : "border-other-border focus:ring-main-primary-400"
                    }
                    ${
                      form.title === ""
                        ? "placeholder:text-text-dark-disabled text-text-dark-disabled"
                        : "text-text-dark-primary"
                    }`}
                    required={false}
                    disabled
                  />

                  {isSlugManual && (
                    <button
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({
                          ...prev,
                          slug: slugify(prev.title),
                        }));
                        setIsSlugManual(false);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-md bg-main-primary-100 text-main-primary hover:bg-main-primary hover:text-white transition cursor-pointer"
                    >
                      Reset slug
                    </button>
                  )}
                </div>
                {/* Error Message */}
                {errors.slug && (
                  <span className="text-red-500 text-sm">{errors.slug}</span>
                )}
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="category"
                  className="block font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-dark-secondary"
                >
                  Kategori <span className="text-red-500">*</span>
                </label>

                <CategoryDropdown
                  value={form.category}
                  onChange={(val) => handleChange("category", val)}
                  errors={
                    typeof errors.category === "string" ? errors.category : ""
                  }
                />
              </div>

              {/* Thumbnail */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="file_input"
                  className="block font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-dark-secondary"
                >
                  Upload thumbnail
                </label>

                {/* Preview */}
                {(preview || existingThumbnail) && (
                  <div className="mb-2">
                    <img
                      src={preview || existingThumbnail}
                      alt="Preview thumbnail"
                      className="w-40 h-40 object-cover rounded-md border border-other-border"
                    />
                  </div>
                )}

                <input
                  type="file"
                  name="thumbnail"
                  // value={form.thumbnail}
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleChange}
                  className={`w-full font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] border rounded-md px-3 py-2 focus:ring-2 focus:outline-none transition ${
                    errors.thumbnail
                      ? "border-red-500 focus:ring-red-400"
                      : "border-other-border focus:ring-main-primary-400"
                  }`}
                  // required
                />
                {/* Error Message */}
                {errors.thumbnail && (
                  <span className="text-red-500 text-sm">
                    {errors.thumbnail}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="description"
                  className="block font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-dark-secondary"
                >
                  Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Masukkan Deskripsi"
                  className={`w-full h-[100px] font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] border rounded-md px-3 py-2 focus:ring-2 focus:outline-none transition ${
                    errors.description
                      ? "border-red-500 focus:ring-red-400"
                      : "border-other-border focus:ring-main-primary-400"
                  }
                  ${
                    form.description === ""
                      ? "placeholder:text-text-dark-disabled text-text-dark-disabled"
                      : "text-text-dark-primary"
                  }
                        `}
                  required
                />
                {/* Error Message */}
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description}
                  </span>
                )}
              </div>

              <div className="flex gap-4">
                {/* Price */}
                <div className="w-full flex flex-col gap-1">
                  <label
                    htmlFor="price"
                    className="block font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-dark-secondary"
                  >
                    Harga Awal <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="Masukkan harga"
                      className={`w-full font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] border rounded-md px-3 py-2 focus:ring-2 focus:outline-none transition ${
                        errors.price
                          ? "border-red-500 focus:ring-red-400"
                          : "border-other-border focus:ring-main-primary-400"
                      }
                      ${
                        form.price === ""
                          ? "placeholder:text-text-dark-disabled text-text-dark-disabled"
                          : "text-text-dark-primary"
                      }`}
                      required
                    />
                  </div>
                  {/* Error Message */}
                  {errors.price && (
                    <span className="text-red-500 text-sm">{errors.price}</span>
                  )}
                </div>

                {/* Discount */}
                <div className="w-full flex flex-col gap-1">
                  <label
                    htmlFor="discount"
                    className="block font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-dark-secondary"
                  >
                    Harga Diskon
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="discount"
                      value={form.discount}
                      onChange={handleChange}
                      placeholder="Masukkan harga diskon"
                      className={`w-full font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] border rounded-md px-3 py-2 focus:ring-2 focus:outline-none transition ${
                        errors.discount
                          ? "border-red-500 focus:ring-red-400"
                          : "border-other-border focus:ring-main-primary-400"
                      }
                      ${
                        form.discount === ""
                          ? "placeholder:text-text-dark-disabled text-text-dark-disabled"
                          : "text-text-dark-primary"
                      }`}
                    />
                  </div>
                  {/* Error Message */}
                  {errors.discount && (
                    <span className="text-red-500 text-sm">
                      {errors.discount}
                    </span>
                  )}
                </div>
              </div>

              {/* Final Price */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="priceInfo"
                  className="block font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-dark-secondary"
                >
                  Harga Akhir <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="priceInfo"
                    value={priceInfo.formatted.final}
                    placeholder="Masukkan harga"
                    className="w-full font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] border border-other-border rounded-md px-3 py-2 placeholder:text-text-dark-disabled text-text-dark-disabled"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Button Create Products */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-[10px] text-center bg-main-primary hover:bg-transparent py-2.5 px-[26px] font-dm font-bold text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-light-primary hover:text-main-primary border border-main-primary transition cursor-pointer"
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </section>
      {/* End Section Update Products */}
    </>
  );
}
