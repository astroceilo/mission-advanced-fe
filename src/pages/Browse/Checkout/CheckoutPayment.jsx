import {
  FileCheck,
  Book,
  FilePen,
  Video,
  FileBadge,
  Globe,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { setPaymentDetail, resetCheckout } from "../../../store/checkoutSlice";
import CheckoutSummary from "../../../components/Checkout/CheckoutSummary";
import CheckoutStepper from "../../../components/Checkout/CheckoutStepper";
import { formatPriceFull, getFinalPrice } from "../../../utils/price";
import { createOrder } from "../../../store/orderSlice";
import { useAuth } from "../../../context/AuthContext";
import { paymentConfig } from "./config/paymentConfig";

export default function CheckoutPayment() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const [openGuide, setOpenGuide] = useState(null);

  const toggleGuide = (guideName) => {
    setOpenGuide((prev) => (prev === guideName ? null : guideName));
  };

  // checkout state
  const { product, payment } = useSelector((state) => state.checkout);

  const paymentMethod = payment.method;
  const storedPaymentNumber = payment.number;
  const expiredAt = payment.expiredAt;

  // Generate payment details when payment method is set
  useEffect(() => {
    if (!paymentMethod || storedPaymentNumber) return;

    const method = paymentConfig[paymentMethod];

    if (method?.type === "va") {
      const unique = Math.floor(1000000000 + Math.random() * 9000000000);

      dispatch(
        setPaymentDetail({
          paymentNumber: method.code + unique,
          expiredAt: Date.now() + 24 * 60 * 60 * 1000,
        }),
      );
    }
  }, [paymentMethod, storedPaymentNumber, dispatch]);

  const currentMethod = paymentConfig[paymentMethod] || null;

  // format payment number
  const formatPaymentNumber = (number) => {
    if (!number) return null;
    return number.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  // timer
  const [timeLeft, setTimeLeft] = useState(() => {
    if (!expiredAt) return 0;
    return Math.max(0, Math.floor((expiredAt - Date.now()) / 1000));
  });

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const isExpired = expiredAt && timeLeft <= 0;

  useEffect(() => {
    if (!expiredAt) return;

    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((expiredAt - Date.now()) / 1000),
      );

      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        navigate("/checkout/method", { replace: true });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiredAt, navigate]);

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!storedPaymentNumber) return;

    // await navigator.clipboard.writeText(paymentNumber);
    await navigator.clipboard.writeText(storedPaymentNumber);

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  useEffect(() => {
    if (!product) {
      navigate("/products", { replace: true });
      return;
    }

    if (!paymentMethod) {
      navigate("/checkout/method", { replace: true });
    }
  }, [product, paymentMethod, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!product) return null;

  const priceCompact = getFinalPrice(product.price);
  const priceFull = getFinalPrice(product.price, formatPriceFull);

  const { hasDiscount } = priceCompact;

  const adminFee = 7000;
  const totalPayment = priceFull.final + adminFee;

  const paymentGuides = currentMethod?.guides || [];

  const handleBack = () => {
    navigate("/checkout/method");
  };

  const handlePay = async () => {
    try {
      setSubmitting(true);

      const newOrder = {
        invoice: `INV-${Date.now()}`,

        userId: user.id,
        fullName: user.fullName,

        productId: product.id,
        productTitle: product.title,
        thumbnail: product.thumbnail,
        price: Number(product.price.final),
        discount: Number(product.price.discount),

        adminFee,
        totalPayment,

        paymentMethod,
        paymentNumber: storedPaymentNumber,

        status: "pending",

        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const resultAction = await dispatch(createOrder(newOrder));

      if (createOrder.fulfilled.match(resultAction)) {
        const createdOrder = resultAction.payload;

        console.log("CREATE ORDER:", createdOrder);
        navigate(`/orders/detail/${createdOrder.invoice}`, { replace: true });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Countdown */}
      <div className="fixed top-20 left-0 w-full flex flex-row items-center justify-center bg-main-tertiary-100 py-2.5 md:py-3 gap-3.5 md:gap-4!">
        <p className="font-dm font-medium text-base md:text-lg! leading-[1.4] tracking-[0.2px] text-text-dark-secondary">
          Selesaikan pemesanan dalam
        </p>
        <div className="flex items-center justify-center gap-2 md:gap-2.5!">
          <div className="flex justify-center w-8 h-8 rounded-sm p-1 gap-2.5 bg-main-tertiary">
            <span className="font-dm font-bold text-[14px] md:text-base! leading-[1.4] tracking-[0.2px] text-white">
              {hours}
            </span>
          </div>
          :
          <div className="flex justify-center w-8 h-8 rounded-sm p-1 gap-2.5 bg-main-tertiary">
            <span className="font-dm font-bold text-[14px] md:text-base! leading-[1.4] tracking-[0.2px] text-white">
              {minutes}
            </span>
          </div>
          :
          <div className="flex justify-center w-8 h-8 rounded-sm p-1 gap-2.5 bg-main-tertiary">
            <span className="font-dm font-bold text-[14px] md:text-base! leading-[1.4] tracking-[0.2px] text-white">
              {seconds}
            </span>
          </div>
        </div>
      </div>

      {/* CheckoutStepper */}
      <CheckoutStepper classStyle="mt-16 md:mt-24!" />

      <section className="mx-auto max-w-7xl mt-0 md:mt-8! flex flex-col md:flex-row gap-6 md:gap-9">
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
            <h6 className="tracking-normal text-text-dark-primary">
              Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product
              Manager.
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

        <div className="w-full md:w-[798px]! flex flex-col order-2 md:order-1! gap-6 md:gap-9!">
          {/* Payment Method + Order Summary */}
          <div className="w-full h-fit flex flex-col gap-5 md:gap-6! rounded-[10px] bg-other-primarybg border border-other-border p-5 md:p-6!">
            {/* Metode Pembayaran */}
            <div className="w-full flex flex-col justify-between gap-5 md:gap-6!">
              <h5 className="font-pop font-semibold text-lg md:text-xl! tracking-normal text-text-dark-primary">
                Metode Pembayaran
              </h5>
              <div className="w-full flex flex-col items-center rounded-xl py-3.5 md:py-[18px]! px-7 md:px-9! gap-2.5 md:gap-3! bg-text-light-primary border border-other-border">
                {/* Thumbnail */}
                {currentMethod?.type === "card" ? (
                  // Thumbnail Card
                  <>
                    <div className="flex">
                      {currentMethod?.icon.map((icon, i) => (
                        <img
                          key={i}
                          src={icon}
                          alt={`card-${i}`}
                          className="w-fit h-9 object-cover"
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  // Thumbnail Bank / E-Wallet
                  <>
                    <img
                      src={currentMethod?.icon}
                      alt={currentMethod?.name}
                      className="w-fit h-9 object-cover"
                    />
                    <span className="font-dm font-medium text-base md:text-lg! line-height-[1.4] tracking-[0.2px] text-text-dark-primary">
                      {currentMethod?.name}
                    </span>
                    <div className="w-fit flex flex-row items-center gap-2.5 md:gap-3!">
                      <span className="font-dm font-bold text-base md:text-lg! text-text-dark-secondary">
                        {/* {paymentNumber} */}
                        {/* {formatPaymentNumber(paymentNumber)} */}
                        {formatPaymentNumber(storedPaymentNumber)}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="font-dm font-bold text-sm md:text-base! text-main-tertiary cursor-pointer"
                      >
                        {/* Salin */}
                        {copied ? "Tersalin!" : "Salin"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Checkout Summary */}
            <CheckoutSummary
              product={product}
              priceFull={priceFull}
              adminFee={adminFee}
              totalPayment={totalPayment}
            >
              <div className="group w-full flex flex-col md:flex-row items-center gap-5 md:gap-6!">
                {/* Ganti Metode Pembayaran */}
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full inline-block bg-white hover:bg-main-primary text-main-primary text-center hover:text-white border border-main-primary group-hover:bg-main-primary group-hover:text-white font-bold rounded-[10px] text-sm md:text-base! px-[22px] py-[7px] md:px-[26px]! md:py-2.5! transition-colors duration-300 cursor-pointer"
                >
                  Ganti Metode Pembayaran
                </button>

                <button
                  type="button"
                  disabled={isExpired || submitting}
                  onClick={handlePay}
                  // className="w-full inline-block bg-main-primary hover:bg-transparent text-white text-center hover:text-main-primary border border-main-primary md:font-bold rounded-[10px] text-sm md:text-base! px-[22px] py-[7px] md:px-[26px]! md:py-2.5! transition-colors duration-300 cursor-pointer"
                  className={`w-full inline-block text-center font-bold rounded-[10px] text-sm md:text-base! group-hover:bg-white group-hover:text-main-primary px-[22px] py-[7px] md:px-[26px]! md:py-2.5! transition-colors duration-300 cursor-pointer ${
                    isExpired || submitting
                      ? "bg-gray-300 text-gray-500 border border-gray-300 cursor-not-allowed"
                      : "bg-main-primary hover:bg-transparent text-white hover:text-main-primary border border-main-primary"
                  }`}
                >
                  {isExpired
                    ? "Waktu Pembayaran Habis"
                    : submitting
                      ? "Loading..."
                      : "Bayar Sekarang"}
                </button>
              </div>
            </CheckoutSummary>
          </div>

          {/* Accordian */}
          <div className="w-full h-fit flex flex-col items-start rounded-[10px]! p-5 md:p-6! gap-5 md:gap-6 bg-other-primarybg border border-other-border">
            <h5 className="font-pop font-semibold text-lg md:text-xl! tracking-normal text-text-dark-primary">
              Tata Cara Pembayaran
            </h5>
            <div
              id="accordion-collapse"
              className="w-full flex flex-col gap-4 md:gap-5!"
              data-accordion="collapse"
            >
              {paymentGuides.map((guide) => (
                <button
                  key={guide.title}
                  type="button"
                  onClick={() => toggleGuide(guide.title)}
                  className="w-full flex flex-col gap-2 md:gap-2.5! rounded-[10px] px-3.5 md:px-4! py-4 md:py-5! bg-other-primarybg border border-other-border transition hover:border-main-primary/40 hover:bg-main-primary/5 cursor-pointer"
                >
                  {/* Button Header */}
                  <div className="flex justify-between items-center">
                    <span className="font-dm font-bold text-sm md:text-base! text-text-dark-primary">
                      {guide.title}
                    </span>
                    <ChevronDown
                      className={`transition-transform duration-300 ${
                        openGuide === guide.title ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <AnimatePresence initial={false}>
                    {openGuide === guide.title && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <ol
                          id="accordion-collapse-body-1"
                          className="list-decimal pl-8 pr-5 py-4 font-dm font-normal text-xs md:text-sm! text-start text-text-dark-primary space-y-2"
                          aria-labelledby="accordion-collapse-heading-1"
                        >
                          {guide.steps.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ol>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
