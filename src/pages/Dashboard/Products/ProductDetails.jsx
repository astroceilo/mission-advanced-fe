import {
  Book,
  ChevronDown,
  Clock,
  FileBadge,
  FileCheck,
  FilePen,
  Globe,
  PlayCircle,
  Video,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { normalizeProductForLists } from "../../../utils/normalizeProduct/normalizeProductForLists";
import { truncateText } from "../../../utils/truncateText";
import RatingStars from "../../../components/RatingStars";
import { dummyApi, mockApi } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { getFinalPrice } from "../../../utils/price";

export default function ProductDetails() {
  const { user } = useAuth();

  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const roleBasePath = `/${user.role}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, productsRes, usersRes] = await Promise.all([
          mockApi.get(`/products?slug=${slug}`),
          mockApi.get("/products"),
          dummyApi.get("/users"),
        ]);

        const productRaw = productRes.data?.[0];
        if (!productRaw) return;

        const normalized = normalizeProductForLists(
          productRaw,
          usersRes.data.users,
        );
        setProduct(normalized);

        // cari related products
        const related = productsRes.data
          .filter((p) => p.id !== productRaw.id)
          .sort((a, b) => {
            if (a.category === productRaw.category) return -1;
            if (b.category === productRaw.category) return 1;
            if (a.instructorId === productRaw.instructorId) return -0.5;
            if (b.instructorId === productRaw.instructorId) return 0.5;
            return 0;
          })
          .slice(0, 3)
          .map((p) => normalizeProductForLists(p, usersRes.data.users));

        setRelatedProducts(related);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    // Scroll to top when the product has been loaded/updated
    if (product) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [product]);

  if (!product) return <p className="text-center py-10">Loading...</p>;

  const { hasDiscount, formatted } = getFinalPrice(product.price);

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
                {product.category}
              </Link>
              {/* <span className="ms-1 text-sm font-medium text-text-dark-disabled md:ms-2">
                {product.category}
              </span> */}
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="text-text-dark-disabled">/</span>
              <span className="ms-1 text-sm font-medium text-text-dark-primary md:ms-2">
                {product.title}
              </span>
            </div>
          </li>
        </ol>
      </nav>
      {/* End Breadcrumb */}

      {/* Hero Section */}
      <section className="relative w-full h-[400px] rounded-[10px] overflow-hidden mt-8">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80"></div>

        {/* Content */}
        <div className="absolute inset-0 w-full flex flex-col justify-center items-start gap-2.5 md:gap-6 text-white text-left px-5 md:px-20! xl:px-[140px]!">
          <h1 className="text-2xl! md:text-3xl! lg:text-[48px]! font-bold leading-tight">
            {product.title}
          </h1>
          <p className="w-full text-sm md:text-base! font-medium leading-relaxed">
            {truncateText(product.description, 100)}
          </p>
          <RatingStars
            rating={product.rating?.stars || 0}
            reviews={product.rating?.reviews || 0}
            emptyStarColor="text-text-light-disabled"
            textColor="text-text-light-secondary"
          />
        </div>
        {/* End Content */}
      </section>
      {/* End Hero Section */}

      {/* Content Section */}
      <section className="mx-auto max-w-7xl mt-8 flex flex-col md:flex-row gap-6 md:gap-9">
        {/* Desc + Price */}
        <div className="w-full md:w-[366px]! h-fit flex flex-col order-1 md:order-2 items-start gap-5 md:gap-6 rounded-[10px] bg-other-primarybg border border-other-border p-5 md:p-6">
          <div className="flex flex-col items-start gap-3 md:gap-4">
            <h6 className="tracking-normal text-text-dark-primary">
              Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product
              Manager.
            </h6>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                {hasDiscount ? (
                  <>
                    <span className="text-base md:text-lg! font-semibold text-text-dark-primary">
                      {formatted.final}
                    </span>
                    <span className="text-sm md:text-base font-medium text-text-dark-disabled line-through">
                      {formatted.original}
                    </span>
                  </>
                ) : (
                  <span className="text-base md:text-lg! font-semibold text-text-dark-primary">
                    {formatted.final}
                  </span>
                )}
              </div>
              <span className="inline-block bg-main-secondary text-white font-normal rounded-[10px] text-xs px-1 py-2.5">
                Diskon 50%
              </span>
            </div>
            {/* <span className="text-info-default font-medium text-sm">
              Penawaran spesial tersisa 2 hari lagi!
            </span> */}
          </div>
          {/* <div className="w-full flex flex-col items-start gap-3 md:gap-4">
            <Link
              to="#"
              className="w-full inline-block bg-main-primary hover:bg-transparent text-white text-center hover:text-main-primary border border-main-primary md:font-bold rounded-[10px] text-sm md:text-base! px-[22px] py-[7px] md:px-[26px]! md:py-2.5! transition-colors duration-300"
            >
              Beli Sekarang
            </Link>
          </div> */}
          <div className="flex flex-col items-start gap-3 md:gap-4">
            <h4>Kelas Ini Sudah Termasuk</h4>
            <div className="flex gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <FileCheck className="text-text-dark-secondary" />
                  <span className="text-text-dark-secondary font-normal text-sm">
                    Ujian Akhir
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Book className="text-text-dark-secondary" />
                  <span className="text-text-dark-secondary font-normal text-sm">
                    7 Dokumen
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FilePen className="text-text-dark-secondary" />
                  <span className="text-text-dark-secondary font-normal text-sm">
                    Pretest
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Video className="text-text-dark-secondary" />
                  <span className="text-text-dark-secondary font-normal text-sm">
                    49 Video
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileBadge className="text-text-dark-secondary" />
                  <span className="text-text-dark-secondary font-normal text-sm">
                    Sertifikat
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 md:gap-4">
            <h4>Bahasa Pengantar</h4>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Globe className="text-text-dark-secondary" />
                <span className="text-text-dark-secondary font-normal text-sm">
                  Bahasa Indonesia
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col order-2 md:order-1 gap-6 md:gap-9">
          {/* Deskripsi */}
          <div className="w-full h-fit flex flex-col items-start gap-5 md:gap-6 rounded-[10px] bg-other-primarybg border border-other-border p-5 md:p-6">
            <div className="flex flex-col items-start gap-3 md:gap-4">
              <h5 className="text-lg md:text-xl! font-semibold tracking-normal text-text-dark-primary">
                Deskripsi
              </h5>
              <p className="text-sm md:text-base! font-medium text-text-dark-secondary leading-tight tracking-[0.2px]">
                {product.description}
              </p>
            </div>
          </div>

          {/* Intructuor */}
          <div className="w-full h-fit flex flex-col items-start gap-5 md:gap-6 rounded-[10px] bg-other-primarybg border border-other-border p-5 md:p-6">
            <h5 className="text-lg md:text-xl! font-semibold tracking-normal text-text-dark-primary">
              Belajar bersama Tutor Profesional
            </h5>
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5">
              {/* Card Instructor */}
              <div className="w-full flex flex-col items-start gap-3 p-4 rounded-[10px] bg-other-primarybg border border-other-border">
                {/* Instructor */}
                <div className="flex items-start gap-2.5">
                  <Link to="#" className="block shrink-0">
                    <img
                      alt={product.instructor.fullName}
                      src={
                        product.instructor.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          product.instructor?.fullName || "User",
                        )}`
                      }
                      className="w-10 h-10 rounded-[10px] object-cover"
                    />
                  </Link>

                  <div className="flex flex-col">
                    <p className="text-sm md:text-base font-medium">
                      <Link to="#">{product.instructor.fullName}</Link>
                    </p>

                    <p className="text-xs md:text-sm font-normal text-text-dark-secondary">
                      {product.instructor.position}{" "}
                      {product.instructor.company && (
                        <>
                          di{" "}
                          <span className="font-bold!">
                            {product.instructor.company}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <p className="hidden md:block text-text-dark-secondary text-sm md:text-base! lg:text-lg truncate-8">
                  Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini
                  bekerja sebagai Senior Talent Acquisition Specialist di Wings
                  Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.
                </p>
              </div>
              {/* Card Instructor */}
              <div className="w-full flex flex-col items-start gap-3 p-4 rounded-[10px] bg-other-primarybg border border-other-border">
                {/* Instructor */}
                <div className="flex items-start gap-2.5">
                  <Link to="#" className="block shrink-0">
                    <img
                      alt={product.instructor.fullName}
                      src={
                        product.instructor.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          product.instructor?.fullName || "User",
                        )}`
                      }
                      className="w-10 h-10 rounded-[10px] object-cover"
                    />
                  </Link>

                  <div className="flex flex-col">
                    <p className="text-sm md:text-base font-medium">
                      <Link to="#">{product.instructor.fullName}</Link>
                    </p>

                    <p className="text-xs md:text-sm font-normal text-text-dark-secondary">
                      {product.instructor.position}{" "}
                      {product.instructor.company && (
                        <>
                          di{" "}
                          <span className="font-bold!">
                            {product.instructor.company}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <p className="hidden md:block text-text-dark-secondary text-sm md:text-base! lg:text-lg truncate-8">
                  Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini
                  bekerja sebagai Senior Talent Acquisition Specialist di Wings
                  Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.
                </p>
              </div>
            </div>
          </div>

          {/* Accordian */}
          <div className="w-full h-fit flex flex-col items-start gap-5 md:gap-6! rounded-[10px] bg-other-primarybg border border-other-border p-5 md:p-6">
            <h5 className="text-lg md:text-xl! font-semibold tracking-normal text-text-dark-primary">
              Kamu akan Mempelajari
            </h5>
            <div
              id="accordion-collapse"
              className="w-full flex flex-col gap-5 md:gap-6!"
              data-accordion="collapse"
            >
              <div className="flex flex-col gap-2 md:gap-3!">
                <div className="flex justify-between">
                  <h6 className="text-base md:text-lg! text-primary">
                    Introduction to Course 1: Foundations of User Experience
                    Design
                  </h6>
                  <ChevronDown className="text-text-dark-secondary" />
                </div>
                <div
                  id="accordion-collapse-body-1"
                  className="flex justify-between rounded-[10px] p-5 bg-other-primarybg border border-other-border"
                  aria-labelledby="accordion-collapse-heading-1"
                >
                  {/* <div className="flex justify-between rounded-[10px] p-5 bg-other-primarybg border border-other-border"> */}
                  <p className="text-sm md:text-base! font-medium text-text-dark-primary">
                    The basics of user experience design
                  </p>
                  <div className="flex items-center gap-3 md:gap-4!">
                    <div className="flex items-center gap-2">
                      <PlayCircle className="text-text-dark-secondary" />
                      <span className="text-text-dark-secondary font-normal text-sm">
                        Video
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-text-dark-secondary" />
                      <span className="text-text-dark-secondary font-normal text-sm">
                        12 Menit
                      </span>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Rating and Review */}
          <div className="w-full h-fit flex flex-col items-start gap-5 md:gap-6 rounded-[10px] bg-other-primarybg border border-other-border p-5 md:p-6">
            <h5 className="text-lg md:text-xl! font-semibold tracking-normal text-text-dark-primary">
              Rating and Review
            </h5>
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5">
              {/* Card Instructor */}
              <div className="w-full flex flex-col items-start gap-3 p-4 rounded-[10px] bg-other-primarybg border border-other-border">
                {/* Instructor */}
                <div className="flex items-start gap-2.5">
                  <Link to="#" className="block shrink-0">
                    <img
                      alt={product.instructor?.fullName}
                      src={
                        product.instructor.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          product.instructor?.fullName || "User",
                        )}`
                      }
                      className="w-10 h-10 rounded-[10px] object-cover"
                    />
                  </Link>

                  <div className="flex flex-col">
                    <p className="text-sm md:text-base font-medium">
                      <Link to="#">{product.instructor?.fullName}</Link>
                    </p>

                    <p className="text-xs md:text-sm font-normal text-text-dark-secondary">
                      {product.instructor.position}{" "}
                      {product.instructor.company && (
                        <>
                          di{" "}
                          <span className="font-bold!">
                            {product.instructor.company}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <p className="hidden md:block text-text-dark-secondary text-sm md:text-base! lg:text-lg truncate-8">
                  Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini
                  bekerja sebagai Senior Talent Acquisition Specialist di Wings
                  Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.
                </p>
                {/* <RatingStars rating={stars} reviews={reviews} /> */}
              </div>
              {/* Card Instructor */}
              <div className="w-full flex flex-col items-start gap-3 p-4 rounded-[10px] bg-other-primarybg border border-other-border">
                {/* Instructor */}
                <div className="flex items-start gap-2.5">
                  <Link to="#" className="block shrink-0">
                    <img
                      alt={product.instructor?.fullName}
                      src={
                        product.instructor.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          product.instructor?.fullName || "User",
                        )}`
                      }
                      className="w-10 h-10 rounded-[10px] object-cover"
                    />
                  </Link>

                  <div className="flex flex-col">
                    <p className="text-sm md:text-base font-medium">
                      <Link to="#">{product.instructor?.fullName}</Link>
                    </p>

                    <p className="text-xs md:text-sm font-normal text-text-dark-secondary">
                      {product.instructor.position}{" "}
                      {product.instructor.company && (
                        <>
                          di{" "}
                          <span className="font-bold!">
                            {product.instructor.company}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <p className="hidden md:block text-text-dark-secondary text-sm md:text-base! lg:text-lg truncate-8">
                  Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini
                  bekerja sebagai Senior Talent Acquisition Specialist di Wings
                  Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.
                </p>
                {/* <RatingStars rating={stars} reviews={reviews} /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Content Section */}
    </>
  );
}
