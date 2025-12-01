import React from "react";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import ProductTable from "./components/ProductTable";
import PaginationForAll from "../PaginationForAll";
import CreateProductForm from "./components/CreateProductForm";
import UploadBulkProduct from "./components/UploadBulkProduct";
import axiosPrivate from "../../utils/axiosPrivate";
import { useEffect } from "react";
import { toastError, toastSuccess } from "../../utils/toast";

const ProductsList = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const perPage = 10;
  const [openCreate, setOpenCreate] = useState(false);
  const [active, setActive] = useState(null);
  const [error, setError] = useState(null);
  const [openBulk, setOpenBulk] = useState(false);
  const [filter, setFilter] = useState([{ active: false, featured: false }]);
  const [products, setProducts] = useState([]);

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
      // Build query string
      const query = new URLSearchParams(params).toString();

      const res = await axiosPrivate.get(`/products?${query}`);

      setPage(res.data.currentPage);
      setTotal(res.data.totalProducts);
      setProducts(res.data.products);
    } catch (err) {
      console.error("Fetch Products Error:", err);
      return {
        success: false,
        error: err.response?.data || "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts({
      page,
      limit: 10,
      search: query,
    });
    //   category: "675ce0b618293",
    // brand: "Nike",
    // minPrice: 1000,
    // maxPrice: 8000,
    // sort: "newest",
    // featured: true
  }, [page, query]);

  return (
    <div className="p-3 text-[13px]">
      {!openCreate && !openBulk && (
        <div className="flex items-center justify-between">
          {/* search */}
          <div className="relative flex items-center mb-3">
            <input
              type="text"
              className="outline-none bg-gray-100 rounded p-2 px-4"
              placeholder="Search Product"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <RxCross2
                className="absolute right-2 text-gray-500 cursor-pointer"
                onClick={() => setQuery("")}
              />
            )}
          </div>
          {/* add button */}
          <div className="flex items-center gap-3">
            <div
              className="border border-gray-400 rounded cursor-pointer p-1 group hover:border-black"
              onClick={() => {
                setOpenCreate(true);
                setActive(null);
                setError(null);
              }}
            >
              <LuPlus
                className="text-gray-400 group-hover:text-black"
                size={16}
              />
            </div>
            <button
              className="rounded bg-blue-500 text-[12px] text-white py-1.5 px-3 cursor-pointer"
              onClick={() => setOpenBulk(true)}
            >
              Upload in Bulk
            </button>
          </div>
        </div>
      )}
      {!openCreate && !openBulk && (
        <>
          {/* table */}
          {loading ? (
            <div className="py-20 text-center text-gray-500">Loading...</div>
          ) : (
            <ProductTable
              products={products}
              setActive={setActive}
              setOpenCreate={setOpenCreate}
              fetchProducts={fetchProducts}
            />
          )}
          {products?.length > 0 && (
            <PaginationForAll
              currentPage={page}
              totalItems={total}
              perPage={perPage}
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
        </>
      )}
      {openCreate && (
        <CreateProductForm
          setOpenCreate={setOpenCreate}
          setActive={setActive}
          active={active}
        />
      )}
      {openBulk && <UploadBulkProduct setOpenBulk={setOpenBulk} />}
    </div>
  );
};

export default ProductsList;
