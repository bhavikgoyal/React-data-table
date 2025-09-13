import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import type { Product } from "../types/product";

type PageSize = 25 | 50 | 100;

const DataTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<PageSize>(25);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchProducts(500); // fetching large dataset
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const searchTerm = filter.trim().toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.title?.toLowerCase().includes(searchTerm) ||
        p.brand?.toLowerCase().includes(searchTerm) ||
        p.category?.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filtered);
    setPage(1);
  }, [filter, products]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="p-4 bg-[#FFFCFB] min-h-screen">
      <h1 className="text-xl font-bold mb-4 text-[#66615E]">Products</h1>

      {/* Filter + Page size */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Filter by title, brand, category..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1 rounded w-1/2 text-[#66615E] placeholder-[#949392] border-[#C9C8C7] bg-white"
        />

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value) as PageSize)}
          className="border px-2 py-1 rounded text-[#66615E] border-[#C9C8C7] bg-white"
        >
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-[#66615E]">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="border border-[#C9C8C7] rounded">
          <table className="min-w-full table-fixed border-collapse">
            <thead className="bg-[#F2F0EF] sticky top-0">
              <tr>
                <th className="w-1/12 border border-[#C9C8C7] px-2 py-1 text-[#66615E]">
                  ID
                </th>
                <th className="w-3/12 border border-[#C9C8C7] px-2 py-1 text-[#66615E]">
                  Title
                </th>
                <th className="w-2/12 border border-[#C9C8C7] px-2 py-1 text-[#66615E]">
                  Brand
                </th>
                <th className="w-3/12 border border-[#C9C8C7] px-2 py-1 text-[#66615E]">
                  Category
                </th>
                <th className="w-3/12 border border-[#C9C8C7] px-2 py-1 text-[#66615E]">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-2 text-[#949392] italic"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((p) => (
                  <tr key={p.id} className="text-center text-[#66615E]">
                    <td className="border border-[#C9C8C7] px-2 py-1">{p.id}</td>
                    <td className="border border-[#C9C8C7] px-2 py-1 truncate">
                      {p.title}
                    </td>
                    <td className="border border-[#C9C8C7] px-2 py-1">{p.brand}</td>
                    <td className="border border-[#C9C8C7] px-2 py-1">{p.category}</td>
                    <td className="border border-[#C9C8C7] px-2 py-1">${p.price}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-4 mt-4 text-[#66615E]">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded border-[#C9C8C7] disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded border-[#C9C8C7] disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
