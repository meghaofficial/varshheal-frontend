import { RxCross2 } from "react-icons/rx";
import CategoryTable from "./components/CategoryTable";
import { useState } from "react";
import { useEffect } from "react";
import PaginationForAll from "../PaginationForAll";
import { LuPlus } from "react-icons/lu";
import CreateCategoryForm from "./components/CreateCategoryForm";
import UploadBulkCategory from "./components/UploadBulkCategory";
import axiosPrivate from "../../utils/axiosPrivate";

const CategoryList = () => {
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
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const params = {};

      if (query) params.search = query;
      if (filter.active !== "") params.active = filter.active;
      if (filter.featured !== "") params.featured = filter.featured;
      if (page) params.page = page;
      if (perPage) params.limit = perPage;

      const res = await axiosPrivate.get("/categories", { params });
      const data = res?.data;
      setPage(data?.page);
      setTotal(data?.total);
      setCategories(data?.categories);
    } catch (err) {
      console.error("Fetch Categories Error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
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
              placeholder="Search Category"
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
              className="rounded bg-blue-500  text-white py-1.5 px-3 cursor-pointer"
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
            <CategoryTable
              categories={categories}
              setActive={setActive}
              setOpenCreate={setOpenCreate}
            />
          )}
          {categories?.length > 0 && (
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
        <CreateCategoryForm
          setOpenCreate={setOpenCreate}
          setActive={setActive}
          active={active}
        />
      )}
      {openBulk && <UploadBulkCategory setOpenBulk={setOpenBulk} />}
    </div>
  );
};

export default CategoryList;
