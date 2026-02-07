import { Loader, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { normalizeProductForLists } from "../../../utils/normalizeProduct/normalizeProductForLists";
import SortFieldDropdown from "../../../components/Dropdown/SortFieldDropdown";
import Pagination from "../../../components/Pagination/Pagination";
import { truncateText } from "../../../utils/truncateText";
import SearchInput from "../../../components/SearchInput";
import RatingStars from "../../../components/RatingStars";
import { dummyApi, mockApi } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { formatPriceFull } from "../../../utils/price";

export default function ListProducts() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [deletingId, setDeletingId] = useState(null);

  const roleBasePath = `/${user.role}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productsRes, usersRes] = await Promise.all([
          mockApi.get("/products"),
          dummyApi.get("/users"),
        ]);

        const products = productsRes.data;
        const users = usersRes.data.users;

        // normalisasi data
        const mergedData = products.map((product) =>
          normalizeProductForLists(product, users),
        );

        // filter by role
        const visibleProducts = mergedData.filter((product) => {
          if (user.role === "admin") return true;

          // instructor / moderator
          return String(product.instructor?.id) === String(user.id);
        });

        // sorting by newest
        const sortedCourses = visibleProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        setProducts(sortedCourses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // filtering function
  const filterProducts = (products, { search }) => {
    if (!search) return products;

    const query = search.toLowerCase();

    return products.filter((product) => {
      const fields = [
        product.title,
        product.description,
        product.category,
        product.instructor?.fullName,
      ];

      return fields.some((f) => f?.toLowerCase().includes(query));
    });
  };

  const sortMap = {
    az: (a, b) => a.title.localeCompare(b.title),
    za: (a, b) => b.title.localeCompare(a.title),
    createdAt: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    updatedAt: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  };

  const filtered = filterProducts(products, { search });

  const sortedProducts = sortBy
    ? [...filtered].sort(sortMap[sortBy])
    : filtered;

  const filteredProducts = sortedProducts;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [products, search, sortBy]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // delete product handler
  const handleDeleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Yakin mau hapus produk ini?",
      text: "Data yang dihapus nggak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);
      await mockApi.delete(`/products/${id}`);

      // langsung update state (tanpa reload)
      setProducts((prev) => {
        const updated = prev.filter((product) => product.id !== id);

        const maxPage = Math.ceil(updated.length / itemsPerPage);
        if (currentPage > maxPage) {
          setCurrentPage(maxPage || 1);
        }

        return updated;
      });

      Swal.fire("Deleted!", "Produk berhasil dihapus", "success");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus produk");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      {/* Section Products Lists */}
      <section className="relative w-full flex flex-col gap-6 md:gap-8!">
        {/* Title */}
        <div className="w-fit flex flex-col gap-2.5">
          <h3 className="font-pop font-semibold text-2xl md:text-[32px]! leading-[1.1] tracking-[0] text-text-dark-primary">
            Daftar Produk
          </h3>
        </div>
        {/* End Title */}

        {/* Header Filter + Search */}
        <div className="w-full">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center justify-center md:justify-start! gap-4 w-full">
              {/* Button New Products */}
              <Link
                to={`${roleBasePath}/products/create`}
                className="w-full md:w-auto rounded-[10px] text-center bg-main-primary hover:bg-transparent py-2.5 px-[26px] font-dm font-bold text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-light-primary hover:text-main-primary border border-main-primary transition cursor-pointer"
              >
                New Products
              </Link>
            </div>
            <div className="flex items-center justify-center md:justify-end! gap-4 w-full">
              <SortFieldDropdown
                sortOption={sortBy}
                setSortOption={setSortBy}
              />

              <SearchInput value={search} onChange={setSearch} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto bg-white shadow-xs rounded-[10px] border border-other-border">
          <table className="w-full text-sm text-left rtl:text-right text-text-dark-primary">
            <thead className="text-sm text-text-dark-primary bg-other-primarybg border-b border-b-other-border">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium"></th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Slug
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Discount
                </th>
                {/* <th scope="col" className="px-6 py-3 font-medium">
                  Rating
                </th> */}
                <th scope="col" className="px-6 py-3 font-medium">
                  Instructor name
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-4 text-center text-text-dark-disabled"
                  >
                    Loading...
                  </td>
                </tr>
              )}

              {!loading && paginatedProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-4 text-center text-text-dark-disabled"
                  >
                    Data tidak ditemukan
                  </td>
                </tr>
              )}

              {!loading &&
                paginatedProducts.map((product, index) => (
                  <tr
                    key={index}
                    className="bg-other-secondarybg border-b border-b-other-border hover:bg-other-basebg transition-colors duration-300 ease-in-out"
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      <Link
                        to={
                          product.slug
                            ? `${roleBasePath}/products/detail/${product.slug.toLowerCase().replace(/\s+/g, "-")}`
                            : "#"
                        }
                      >
                        {truncateText(product.title, 50)}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      {truncateText(product.slug, 35)}
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4 max-w-xs">
                      <span className="cursor-help" title={product.description}>
                        {truncateText(product.description, 60)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {formatPriceFull(
                        product.price.original - (product.price.discount ?? 0),
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {formatPriceFull(product.price.discount ?? 0)}
                    </td>
                    {/* <td className="px-6 py-4">
                      <RatingStars
                        rating={product.rating.stars}
                        reviews={product.rating.reviews}
                        textOnly
                      />
                    </td> */}
                    <td className="px-6 py-4">
                      {product.instructor?.fullName || "-"}
                    </td>
                    <td className="px-6 py-4">
                      {(user.role === "admin" ||
                        String(product.instructor?.id) === String(user.id)) && (
                        <div className="flex gap-4">
                          <button className="text-fg-brand hover:underline">
                            <Link
                              to={`${roleBasePath}/products/update/${product.id}/${product.slug}`}
                              className="text-main-secondary hover:text-main-secondary-400"
                            >
                              {/* Edit */}
                              <Pencil />
                            </Link>
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            disabled={deletingId === product.id}
                            className="text-red-500 hover:underline disabled:opacity-50 hover:text-red-400 cursor-pointer"
                          >
                            {deletingId === product.id ? (
                              <Loader />
                            ) : (
                              <Trash2 />
                            )}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>
      {/* End Section Card */}
    </>
  );
}
