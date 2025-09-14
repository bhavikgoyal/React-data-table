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
        const data = await fetchProducts(500);
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
    <div className="bg-[#F3F4F6] p-[10] h-[100] font-sans">
      <h1 className="text-2xl text-black mt-[2] mb-[10]">Products</h1>

      {/* Filter + Page size */}
      <div className="flex items-center justify-between mb-[10] gap-4">
        <input
          type="text"
          placeholder="🔍 Search by title, brand, or category..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-[16px] border border-gray-300 shadow-sm px-4 py-2 rounded-lg w-1/4 text-gray-700 placeholder-gray-400 bg-white focus:ring-0.5 focus:ring-1 focus:outline-none"
        />

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value) as PageSize)}
          className="text-[16px] border border-gray-300 shadow-sm px-4 py-2 rounded-lg text-gray-700 bg-white focus:ring-0.5 focus:ring-1 focus:outline-none"
        >
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-hidden rounded-lg shadow-lg border border-gray-200 bg-white">
          <table className="min-w-full table-fixed border-collapse">
            <thead className="bg-[#d5bdaf] text-white text-lg">
              <tr>
                <th className="text-[16px] w-1/12 px-4 py-3 text-left">ID</th>
                <th className="text-[16px] w-3/12 px-4 py-3 text-left">Title</th>
                <th className="text-[16px] w-2/12 px-4 py-3 text-left">Brand</th>
                <th className="text-[16px] w-3/12 px-4 py-3 text-left">Category</th>
                <th className="text-[16px] w-3/12 px-4 py-3 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((p, idx) => (
                  <tr
                    key={p.id}
                    className={`text-gray-700 text-sm ${
                      idx % 2 === 0 ? "bg-[#edede9]" : "bg-white"
                    } hover:bg-[#f5ebe0] transition-colors`}
                  >
                    <td className="text-[16px] px-4 py-3">{p.id}</td>
                    <td className="text-[16px] px-4 py-3 truncate">{p.title}</td>
                    <td className="text-[16px] px-4 py-3">{p.brand}</td>
                    <td className="text-[16px] px-4 py-3">{p.category}</td>
                    <td className="text-[16px] px-4 py-3">${p.price}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-6 mt-[10] text-gray-700">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="text-[15px] border-1 rounded-lg bg-[#d5bdaf] text-black disabled:cursor-not-allowed transition mr-[8]"
        >
          Prev
        </button>
        <span className="text-base">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="text-[15px] border-1 rounded-lg bg-[#d5bdaf] text-black disabled:cursor-not-allowed transition ml-[8]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
