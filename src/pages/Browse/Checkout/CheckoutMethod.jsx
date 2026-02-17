import { Check, FileCheck, Book, FilePen, Video, FileBadge, Globe, ChevronDown, } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import CheckoutSummary from "../../../components/Checkout/CheckoutSummary";
import CheckoutStepper from "../../../components/Checkout/CheckoutStepper";
import { formatPriceFull, getFinalPrice } from "../../../utils/price";
import { setPaymentMethod } from "../../../store/checkoutSlice";
import { paymentMethods } from "./config/paymentMethods";
import { useAuth } from "../../../context/AuthContext";


export default function CheckoutMethod() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openGroup, setOpenGroup] = useState(null);

  const toggleGroup = (groupName) => {
    setOpenGroup((prev) => (prev === groupName ? null : groupName));
  };

  const { product, payment, isCheckoutCompleted } = useSelector(
    (state) => state.checkout,
  );
  const selected = payment.method;

  // 🚨 HARD GUARD
  if (!product || isCheckoutCompleted) {
    return <Navigate to="/products" replace />;
  }
  // 🚨 END HARD GUARD

  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!product || !user) return;

    if (product.instructorId === user.id && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.error("Tidak bisa membeli produk sendiri");
      navigate("/products", { replace: true });
    }
  }, [product, user, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const priceCompact = getFinalPrice(product.price);
  const priceFull = getFinalPrice(product.price, formatPriceFull);

  const { hasDiscount } = priceCompact;

  const adminFee = 7000;
  const totalPayment = priceFull.final + adminFee;

  const handleContinue = () => {
    if (!selected) return;
    navigate("/checkout/payment", { replace: true });
  };

  return (
    <>
      {/* CheckoutStepper */}
      <CheckoutStepper />

      <section className="w-full mt-0 md:mt-8 flex flex-col md:flex-row gap-6 md:gap-9">
        {/* Desc + Price */}
        <div className="w-full md:w-[366px]! h-fit flex flex-col order-1 md:order-2 items-start gap-5 md:gap-6 rounded-[10px] bg-other-primarybg border border-other-border p-5 md:p-6">
          <div className="flex flex-col items-start gap-3 md:gap-4">
            <div className="hidden md:block w-full flex flex-col">
              {/* Thumbnail */}
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-[82px] h-[82px] md:w-auto! md:h-[193px]! rounded-[10px] object-cover transition duration-500 group-hover:scale-105 sm:h-72!"
              />
            </div>
            <h6 className="font-pop font-semibold text-base md:text-lg! leading-[1.2] tracking-normal text-text-dark-primary">
              {product.title}
            </h6>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                {hasDiscount ? (
                  <>
                    <h4 className="font-pop font-semibold text-base sm:text-lg! md:text-xl! text-main-primary leading-[1.2] tracking-normal">
                      {priceCompact.formatted.final}
                    </h4>
                    <span className="font-dm font-medium text-base sm:text-lg! md:text-xl! text-text-dark-disabled leading-[1.4] tracking-[0.2px] line-through">
                      {priceCompact.formatted.original}
                    </span>
                  </>
                ) : (
                  <span className="font-pop font-semibold text-base sm:text-lg! md:text-xl! text-main-primary leading-[1.2] tracking-normal">
                    {priceCompact.formatted.final}
                  </span>
                )}
              </div>
              <span className="inline-block bg-main-secondary text-white font-normal rounded-full text-xs py-1 px-2.5">
                Diskon 50%
              </span>
            </div>
          </div>
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

        <div className="w-full md:w-[798px]! flex flex-col order-2 md:order-1 gap-6 md:gap-9">
          {/* Accordian */}
          <div className="w-full h-fit flex flex-col items-start rounded-[10px]! p-5 md:p-6! gap-5 md:gap-6 bg-other-primarybg border border-other-border">
            <h5 className="font-pop font-semibold text-lg md:text-xl! tracking-normal text-text-dark-primary">
              Metode Pembayaran
            </h5>
            <div
              id="accordion-collapse"
              className="w-full flex flex-col gap-4 md:gap-5!"
              data-accordion="collapse"
            >
              {paymentMethods.map((group) => (
                <div
                  key={group.group}
                  className="flex flex-col gap-2 md:gap-2.5!"
                >
                  {/* Button Header */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleGroup(group.group)}
                    className="flex justify-between rounded-[10px] pt-4 pl-5 pb-4 pr-5 bg-other-primarybg border border-other-border cursor-pointer"
                  >
                    <span className="font-dm font-bold text-sm md:text-base! text-text-dark-primary">
                      {group.group}
                    </span>
                    <ChevronDown
                      className={`transition-transform duration-300 pointer-events-none ${
                        openGroup === group.group ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <AnimatePresence initial={false}>
                    {openGroup === group.group && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div
                          id="accordion-collapse-body-1"
                          className="flex flex-col gap-4 md:gap-5!"
                          aria-labelledby="accordion-collapse-heading-1"
                        >
                          {group.type === "list" && (
                            <>
                              {group.items.map((item) => (
                                <div
                                  key={item.id}
                                  onClick={() =>
                                    dispatch(setPaymentMethod(item.id))
                                  }
                                  className={`flex items-center justify-between w-full rounded-[10px] px-5 py-4 border cursor-pointer 
                                  ${
                                    selected === item.id
                                      ? "border-main-tertiary bg-main-tertiary/10"
                                      : "border-other-border"
                                  }`}
                                  // className="flex items-center justify-between rounded-[10px] pt-4 pl-5 pb-4 pr-5 border border-other-border cursor-pointer"
                                >
                                  <div className="flex items-center gap-2.5 md:gap-3!">
                                    <img
                                      src={item.icon}
                                      alt={item.label}
                                      className="w-auto h-6"
                                    />
                                    <span
                                      className="font-dm font-normal text-xs md:text-sm! text-text-dark-primary"
                                      // className={`font-dm font-normal text-sm md:text-base! ${selected === item.id ? "text-main-tertiary" : "text-text-dark-primary"}`}
                                    >
                                      {item.label}
                                    </span>
                                  </div>

                                  {selected === item.id && (
                                    <span className="w-6 h-6 rounded-full bg-main-tertiary p-1">
                                      <Check className="w-full h-full text-white" />
                                    </span>
                                  )}
                                </div>
                              ))}
                            </>
                          )}

                          {group.type === "card" && (
                            <button
                              onClick={() =>
                                dispatch(setPaymentMethod(group.item.id))
                              }
                              className={`flex items-center justify-between w-full rounded-[10px] px-5 py-4 border cursor-pointer
                                  ${
                                    selected === group.item.id
                                      ? "border-main-tertiary bg-main-tertiary/10"
                                      : "border-other-border"
                                  }`}
                            >
                              <div className="flex items-center gap-4">
                                {group.item.icons.map((icon, i) => (
                                  <img
                                    key={i}
                                    src={icon}
                                    alt="card"
                                    className="h-6 object-contain"
                                  />
                                ))}
                              </div>

                              {selected === group.item.id && (
                                <span className="w-6 h-6 rounded-full bg-main-tertiary p-1">
                                  <Check className="w-full h-full text-white" />
                                </span>
                              )}
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Summary */}
          <CheckoutSummary
            product={product}
            priceFull={priceFull}
            adminFee={adminFee}
            totalPayment={totalPayment}
          >
            <button
              onClick={handleContinue}
              disabled={!selected}
              className="w-full inline-block bg-main-primary hover:bg-transparent text-white text-center hover:text-main-primary border border-main-primary md:font-bold rounded-[10px] text-sm md:text-base! px-[22px] py-[7px] md:px-[26px]! md:py-2.5! transition-colors duration-300 cursor-pointer disabled:hover:bg-main-primary disabled:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Beli Sekarang
            </button>
          </CheckoutSummary>
        </div>
      </section>
    </>
  );
}
