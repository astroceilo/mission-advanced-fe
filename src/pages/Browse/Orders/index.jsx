import { Book, ShoppingBasket, UserRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import SortDropdown from "../../../components/Dropdown/SortDropdown";
import Pagination from "../../../components/Pagination/Pagination";
import SearchInput from "../../../components/SearchInput";
import { fetchOrders } from "../../../store/orderSlice";
import OrderList from "./components/OrderList";

export default function Orders() {
  const dispatch = useDispatch();

  const { list: orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // state
  const [activeStatus, setActiveStatus] = useState("all");
  const [sortOption, setSortOption] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // status
  const status = [
    { id: "all", name: "Semua Pesanan", slug: "all" },
    { id: 1, name: "Belum Bayar", slug: "pending" },
    { id: 2, name: "Berhasil", slug: "paid" },
    { id: 3, name: "Gagal", slug: "failed" },
  ];

  // process data
  let processedOrders = [...orders];

  // filter
  if (activeStatus !== "all") {
    processedOrders = processedOrders.filter((o) => o.status === activeStatus);
  }

  // search
  if (search.trim()) {
    processedOrders = processedOrders.filter((o) =>
      o.productTitle.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // sort
  if (sortOption === "newest") {
    processedOrders.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }

  // pagination
  const totalPages = Math.ceil(processedOrders.length / itemsPerPage);
  const paginatedOrders = processedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // useEffect
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeStatus, sortOption]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <div className="w-full! flex flex-row gap-5 md:gap-9!">
        {/* Sidebar Menu */}
        <div className="w-fit flex flex-col gap-3 md:gap-6!">
          {/* Title */}
          <div className="w-full flex flex-col gap-1.5 md:gap-2.5!">
            <h5 className="font-pop font-semibold text-lg md:text-xl! leading-[1.2] text-text-dark-primary">
              Daftar Pesanan
            </h5>
            <p className="font-dm font-normal text-sm md:text-base! leading-[1.4] text-text-dark-secondary">
              Informasi terperinci mengenai pembelian
            </p>
          </div>
          {/* End Title */}

          {/* Button Menu */}
          <div className="w-[292px] flex flex-col rounded-[10px] p-3 md:p-6! gap-1 md:gap-2! bg-other-primarybg border border-other-border">
            <div className="w-full flex flex-row items-center rounded-sm p-1.5 md:p-3! gap-1.5 md:gap-3!">
              <UserRound className="w-6 h-6 text-text-dark-disabled" />
              <button
                type="button"
                className="w-full text-left font-dm font-bold text-base md:text-lg! leading-[1.4] text-text-dark-disabled"
              >
                Profile Saya
              </button>
            </div>
            <div className="w-full flex flex-row items-center rounded-sm p-1.5 md:p-3! gap-1.5 md:gap-3!">
              <Book className="w-6 h-6 text-text-dark-disabled" />
              <button
                type="button"
                className="w-full text-left font-dm font-bold text-base md:text-lg! leading-[1.4] text-text-dark-disabled"
              >
                Kelas Saya
              </button>
            </div>
            <div className="w-full flex flex-row items-center rounded-sm p-1.5 md:p-3! gap-1.5 md:gap-3! bg-main-secondary-100 border border-main-secondary">
              <ShoppingBasket className="w-6 h-6 text-main-secondary" />
              <button
                type="button"
                className="w-full text-left font-dm font-bold text-base md:text-lg! leading-[1.4] text-main-secondary"
              >
                Pesanan Saya
              </button>
            </div>
          </div>
          {/* End Button Menu */}
        </div>
        {/* End Sidebar Menu */}

        {/* Main Content */}
        <div className="w-full h-fit flex flex-col rounded-[10px] p-2.5 md:p-5! gap-4 md:gap-8! bg-other-primarybg border border-other-border">
          {/* Header */}
          <div className="w-full flex flex-row items-center gap-4 md:gap-8!">
            {/* Tabs */}
            <div className="w-full overflow-x-auto overflow-y-hidden no-scrollbar">
              <AnimatePresence>
                <motion.div
                  layout
                  className="flex items-center gap-4 md:gap-6!"
                >
                  {status.map((cat, index) => {
                    const isActive = activeStatus === cat.slug;
                    const isFirst = index === 0;
                    const isLast = index === status.length - 1;

                    return (
                      <div
                        key={cat.slug}
                        className="h-8 md:h-9 flex items-center"
                      >
                        <motion.button
                          onClick={() => setActiveStatus(cat.slug)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            transformOrigin: isFirst
                              ? "left center"
                              : isLast
                                ? "right center"
                                : "center center",
                          }}
                          className={`relative pb-2 whitespace-nowrap font-dm font-medium text-sm md:text-base! cursor-pointer
                        ${
                          isActive
                            ? "text-main-tertiary"
                            : "text-text-dark-secondary hover:text-main-tertiary transition-colors"
                        }`}
                        >
                          {cat.name}

                          {isActive && (
                            <motion.div
                              layoutId="statusUnderline"
                              className="absolute left-0 bottom-0 h-1 w-1/2 rounded-full bg-main-tertiary"
                              transition={{
                                type: "spring",
                                stiffness: 350,
                                damping: 25,
                              }}
                            />
                          )}
                        </motion.button>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
            {/* End Tabs */}

            {/* Search + Filter */}
            <div className="w-full flex items-center justify-center md:justify-end! gap-4 w-full">
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Cari Kelas..."
              />

              <SortDropdown
                sortOption={sortOption}
                setSortOption={setSortOption}
              />
            </div>
            {/* End Filter + Search */}
          </div>
          {/* End Header */}

          {/* Content */}
          <div className="w-full flex flex-col gap-4 md:gap-8!">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <OrderList key={order.id} order={order} />
              ))
            ) : (
              <div className="w-full flex flex-col items-center justify-center gap-4 md:gap-8!">
                <div className="font-dm font-medium text-base md:text-lg! leading-[1.4] text-text-dark-secondary">
                  Belum ada pesanan
                </div>
              </div>
            )}
          </div>
          {/* End Content */}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
          {/* End Pagination */}
        </div>
      </div>
    </>
  );
}
