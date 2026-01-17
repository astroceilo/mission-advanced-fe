import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { normalizeProductForLists } from "../../../utils/normalizeProduct/normalizeProductForLists";
import SortFieldDropdown from "../../../components/Dropdown/SortFieldDropdown";
import Pagination from "../../../components/Pagination/Pagination";
import { truncateText } from "../../../utils/truncateText";
import SearchInput from "../../../components/SearchInput";
import RatingStars from "../../../components/RatingStars";
import { formatPriceFull } from "../../../utils/price";
import { api } from "../../../services/api";

export default function ListProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const res = await api.get("/products");

        const [productsRes, usersRes] = await Promise.all([
          api.get("/products"),
          api.get("/users"),
        ]);

        const products = productsRes.data;
        const users = usersRes.data;

        // normalisasi data
        const mergedData = products.map((product) =>
          normalizeProductForLists(product, users)
        );

        setProducts(mergedData);
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
        product.instructor?.name,
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
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [products, search, sortBy]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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
          <div className="flex items-center justify-center md:justify-end! gap-4 w-full">
            <SortFieldDropdown sortOption={sortBy} setSortOption={setSortBy} />

            <SearchInput value={search} onChange={setSearch} />
          </div>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
              <tr>
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
                  <td colSpan={7} className="px-6 py-4 text-center">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading && paginatedProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-muted">
                    Data tidak ditemukan
                  </td>
                </tr>
              )}

              {!loading &&
                paginatedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
                  >
                    <th className="px-6 py-4 font-medium whitespace-nowrap">
                      <Link
                        to={
                          product.slug
                            ? `/detail-products/${product.slug.toLowerCase().replace(/\s+/g, "-")}`
                            : "#"
                        }
                      >
                        {truncateText(product.title, 50)}
                      </Link>
                    </th>
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
                        product.price.original - (product.price.discounted ?? 0)
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {formatPriceFull(product.price.discounted ?? 0)}
                    </td>
                    {/* <td className="px-6 py-4">
                      <RatingStars
                        rating={product.rating.stars}
                        reviews={product.rating.reviews}
                        textOnly
                      />
                    </td> */}
                    <td className="px-6 py-4">
                      {product.instructor?.name || "-"}
                    </td>
                    <td className="px-6 py-4 flex gap-4">
                      <button className="text-fg-brand hover:underline">
                        Edit
                      </button>
                      <button className="text-red-500 hover:underline">
                        Delete
                      </button>
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
