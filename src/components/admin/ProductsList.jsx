import { useEffect, useState } from "react";
import {
  LuArrowLeft,
  LuArrowRight,
  LuChevronLeft,
  LuPlus,
} from "react-icons/lu";
import { MdCategory, MdDelete, MdEdit, MdUpload } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import ImageUploader from "./ImageUploader";
import TagsInput from "./TagsInput";
import FormatSelector from "./FormatSelector";
import ProductSpecification from "./ProductSpecification";
import axiosPrivate from "../../utils/axiosPrivate";
import { toastError, toastSuccess } from "../../utils/toast";
import { RxCross2 } from "react-icons/rx";

const ProductsList = () => {
  const [categoryList, setCategoryList] = useState([
    {
      id: "A1",
      img: "https://assets.ajio.com/medias/sys_master/root/20240920/wv4r/66ed61ec260f9c41e8173c64/-473Wx593H-700412130-white-MODEL.jpg",
      name: "T-Shirts",
      products: 5,
    },
    {
      id: "A2",
      img: "https://assets.ajio.com/medias/sys_master/root/20241109/veEh/672e6853f9b8ef490b0ff364/-473Wx593H-700595679-brown-MODEL.jpg",
      name: "Pants",
      products: 2,
    },
    {
      id: "A3",
      img: "https://i.etsystatic.com/20985777/r/il/6a70f3/3583829415/il_fullxfull.3583829415_c9qj.jpg",
      name: "Bags",
      products: 8,
    },
  ]);
  const [loadings, setLoadings] = useState({
    draftCatLoading: false,
    publishedCatLoading: false,
    createCatLoading: false,
    deleteCatLoading: false,
  });
  const [showAll, setShowAll] = useState(true);
  const [selectedCats, setSelectedCats] = useState([]);
  const [openCreateCat, setOpenCreateCat] = useState(false);
  const [activeCat, setActiveCat] = useState(null);
  const [catFormData, setCatFormData] = useState({
    img: "",
    id: null,
    name: "",
    products: 0,
    status: "draft",
  });

  const [productList, setProductList] = useState([
    {
      categoryId: "A3",
      id: 1,
      mainImg: "https://palay.in/cdn/shop/files/81uAsFJLmxL.jpg?v=1732791862",
      name: "Duffle Bag",
      stock: 4,
    },
    {
      categoryId: "A2",
      id: 2,
      mainImg:
        "https://saadaa.in/cdn/shop/files/cement_grey_wide_leg_pants.webp?v=1757913966&width=1350",
      name: "Cement Gray",
      stock: 4,
    },
    {
      categoryId: "A3",
      id: 3,
      mainImg:
        "https://www.drakensberg.in/cdn/shop/files/Damentasche_01_2024-10-16-Drakensberg-Produktaufnahmen20480.jpg?v=1733125300",
      name: "Shoulder Bag",
      stock: 4,
    },
    {
      categoryId: "A3",
      id: 4,
      mainImg:
        "https://safaribags.com/cdn/shop/files/Wing-16_BP_N_Black_02_1024x.jpg?v=1707721405",
      name: "Bag Pack",
      stock: 4,
    },
    {
      categoryId: "A1",
      id: 5,
      mainImg:
        "https://fastfashion.co.in/wp-content/uploads/2024/11/Mens-printed-Tshirts-With-Collar-1-scaled.jpg",
      name: "Men Printed T-Shirt",
      stock: 4,
    },
    {
      categoryId: "A2",
      id: 6,
      mainImg:
        "https://assets.ajio.com/medias/sys_master/root/20241105/dqS0/6729b0ebf9b8ef490b02679c/-473Wx593H-465444423-pink-MODEL.jpg",
      name: "Baby Pink Trousers",
      stock: 4,
    },
    {
      categoryId: "A1",
      id: 7,
      mainImg:
        "https://quapri.in/wp-content/uploads/2024/05/Sustainable-3D-Crew-Neck-3.webp",
      name: "Sustanaible T-Shirt",
      stock: 4,
    },
    {
      categoryId: "A2",
      id: 8,
      mainImg: "https://qvc.scene7.com/is/image/QVC/a/89/a632089.003",
      name: "Wide Leg, Pull On Ankle",
      stock: 4,
    },
    {
      categoryId: "A1",
      id: 9,
      mainImg:
        "https://images.meesho.com/images/products/396266964/veaz9_512.webp?width=512",
      name: "3 Arrow Genz",
      stock: 4,
    },
  ]);
  const [openCreateProd, setOpenCreateProd] = useState(false);
  const [openViewProd, setOpenViewProd] = useState(false);
  const [activeProd, setActiveProd] = useState(null);
  const [selectedProds, setSelectedProds] = useState([]);
  const [prodFormData, setProdFormData] = useState({
    mainImg: "",
    subImgs: [],
    name: "",
    sku: "",
    category: "",
    categoryID: "",
    price: "",
    discount_percent: "",
    discounted_price: "",
    stock: "",
    tags: [],
    description: [],
    size: [],
    color: [],
    material_type: [],
    target_audience: "",
    fit_type: "",
    pattern: "",
    occasion: "",
    care_instructions: "",
    dimensions: [], //l x w x h
    closure_type: [],
    capacity: "",
    compartment_details: "",
    strap_type: "",
  });
  const [descOp, setDescOp] = useState([
    { format: "paragraph", name: "Paragraph Format" },
    { format: "bullet", name: "Bullet Points" },
  ]);
  const [catOp, setCatOp] = useState([
    { format: "none", name: "None" },
    { format: "cloth", name: "Clothing" },
    { format: "bag", name: "Bags" },
  ]);

  const [selectedFormat, setSelectedFormat] = useState("paragraph");
  const [bulletPoint, setBulletPoint] = useState("");
  const [selectedCatFormat, setSelectedCatFormat] = useState("none");
  const [error, setError] = useState(null);
  const [showDraftCat, setShowDraftCat] = useState(true);
  const [draftCat, setDraftCat] = useState([]);
  const [publishedCat, setPublishedCat] = useState([]);
  const [catPageInfo, setCatPageInfo] = useState({
    total: 0,
    currentPage: 1,
    totalPages: 0,
  });

  const nextPage = (currPage) => {};

  // validate
  const validateCat = () => {
    if (!catFormData.id) {
      setError((prev) => ({
        ...prev,
        catId: "Category ID is required.",
      }));
    }
    if (!catFormData.name) {
      setError((prev) => ({
        ...prev,
        catName: "Category name is required.",
      }));
    }
    if (!catFormData.id || !catFormData.name) return;
  };

  //  Create Category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    validateCat();
    setLoadings((prev) => ({ ...prev, createCatLoading: true }));
    try {
      const formData = new FormData();
      formData.append("id", catFormData.id);
      formData.append("name", catFormData.name);
      formData.append("products", catFormData.products);
      formData.append("status", catFormData.status);
      if (catFormData.img) {
        formData.append("thumbnail", catFormData.img);
      }

      const res = await axiosPrivate.post("/create-category", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toastSuccess(`Category "${res.data.category.name}" created successfully`);
      setCatFormData({
        img: "",
        id: "",
        name: "",
        products: 0,
        status: "draft",
      });
    } catch (error) {
      console.error(error);
      toastError(`${error.response?.data?.message || "Something went wrong"}`);
    } finally {
      setLoadings((prev) => ({ ...prev, createCatLoading: false }));
    }
  };
  //   Upload Categories in bulk
  const handleUploadBulkCategories = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return toastError("Please select an Excel file first!");

    // ✅ Validate file type
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!validTypes.includes(file.type)) {
      return toastError(
        "Invalid file type! Please upload a .xlsx or .xls file."
      );
    }

    setLoadings((prev) => ({ ...prev, bulkUploadLoading: true }));

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosPrivate.post("/upload-categories", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toastSuccess(res.data?.message || "Categories uploaded successfully!");
      await getDraftedCategories();
      e.target.value = null;
    } catch (error) {
      console.error(error);
      toastError(
        error.response?.data?.message ||
          "Failed to upload categories. Please try again."
      );
    } finally {
      setLoadings((prev) => ({ ...prev, bulkUploadLoading: false }));
    }
  };

  //   Get all drafted Categories
  const getDraftedCategories = async (page = 1, limit = 10, search = "") => {
    setLoadings((prev) => ({ ...prev, draftCatLoading: true }));
    try {
      let query = `?page=${page}&limit=${limit}`;
      if (search) query += `&search=${encodeURIComponent(search)}`;

      const res = await axiosPrivate.get(`/drafted-categories${query}`, {
        withCredentials: true,
      });

      setDraftCat(res?.data?.data);
      const { total, currentPage, totalPages } = res?.data;
      setCatPageInfo((prev) => ({ ...prev, total, currentPage, totalPages }));

      return res.data; // { success, categories, total, totalPages, currentPage }
    } catch (error) {
      console.error("Error fetching drafted categories:", error);
      toastError(
        error.response?.data?.message || "Failed to fetch drafted categories"
      );
      return null;
    } finally {
      setLoadings((prev) => ({ ...prev, draftCatLoading: false }));
    }
  };
  //   Get all drafted Categories
  const getPublishedCategories = async (page = 1, limit = 10, search = "") => {
    setLoadings((prev) => ({ ...prev, publishedCatLoading: true }));
    try {
      let query = `?page=${page}&limit=${limit}`;
      if (search) query += `&search=${encodeURIComponent(search)}`;

      const res = await axiosPrivate.get(`/published-categories${query}`, {
        withCredentials: true,
      });

      setPublishedCat(res?.data?.data);
      const { total, currentPage, totalPages } = res?.data;
      setCatPageInfo((prev) => ({ ...prev, total, currentPage, totalPages }));

      return res.data;
    } catch (error) {
      console.error("Error fetching published categories:", error);
      toastError(
        error.response?.data?.message || "Failed to fetch published categories"
      );
      return null;
    } finally {
      setLoadings((prev) => ({ ...prev, publishedCatLoading: false }));
    }
  };

  // Update Category
  const handleUpdateCategory = async (e, catId) => {
    e.preventDefault();
    validateCat();
    setLoadings((prev) => ({ ...prev, createCatLoading: true }));
    try {
      const formData = new FormData();
      formData.append("name", catFormData.name);
      formData.append("newId", catFormData.id);
      formData.append("status", catFormData.status);
      if (catFormData.img) {
        formData.append("thumbnail", catFormData.img);
      }

      const res = await axiosPrivate.patch(
        `/update-category/${catId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toastSuccess(res.data.message);
      await getDraftedCategories();
      setOpenCreateCat(false);
    } catch (error) {
      toastError(error.response?.data?.message || "Update failed");
    } finally {
      setLoadings((prev) => ({ ...prev, createCatLoading: false }));
    }
  };

  // Delete Category
  const deleteCategory = async (categoryId) => {
    if (!categoryId) return toastError("Invalid category ID");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    setLoadings((prev) => ({ ...prev, deleteCatLoading: true }));
    try {
      const res = await axiosPrivate.delete(`/delete-category/${categoryId}`, {
        withCredentials: true,
      });

      toastSuccess(res.data?.message || "Category deleted successfully");
      if (showDraftCat) {
        await getDraftedCategories();
      }
      if (!showDraftCat) {
        await getPublishedCategories();
      }
      return true;
    } catch (error) {
      console.error(error);
      toastError(error.response?.data?.message || "Failed to delete category");
      return false;
    } finally {
      setLoadings((prev) => ({ ...prev, deleteCatLoading: false }));
    }
  };

  useEffect(() => {
    if (selectedCats?.length <= 0) setShowAll(true);
  }, [selectedCats]);

  useEffect(() => {
    if (activeCat) {
      const { img, id, name, products } = activeCat;
      setCatFormData((prev) => ({
        ...prev,
        img,
        id,
        name,
        products,
      }));
    } else {
      setCatFormData((prev) => ({
        ...prev,
        img: "",
        id: null,
        name: "",
        products: 0,
      }));
    }
  }, [activeCat]);

  useEffect(() => {
    const dp =
      +prodFormData?.price -
      +prodFormData?.price * (+prodFormData?.discount_percent / 100);
    setProdFormData((prev) => ({ ...prev, discounted_price: dp }));
  }, [prodFormData.price, prodFormData.discount_percent]);

  useEffect(() => {
    setError(null);
    if (showDraftCat) {
      getDraftedCategories(catPageInfo.currentPage);
    } else {
      getPublishedCategories(catPageInfo.currentPage);
    }
  }, [openCreateCat, showDraftCat]);

  useEffect(() => {
    setSelectedCats([]);
    setCatPageInfo({ total: 0, currentPage: 0, totalPages: 0 });
    setSearchCat("");
  }, [showDraftCat]);

  // Searching for categories
  const [searchCat, setSearchCat] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (showDraftCat) {
        getDraftedCategories(1, 10, searchCat);
      } else {
        getPublishedCategories(1, 10, searchCat);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchCat]);

  return (
    <div className="p-4 flex justify-center gap-3">
      {/* left categories list */}
      <div className="bg-white border border-gray-200 w-full rounded">
        {/* upper bar */}
        <div className="p-3 border-b border-gray-200 flex items-center justify-between">
          <p className="text-lg font-[500]">
            {openCreateCat ? "Create Category" : "Categories"}
          </p>
          {!openCreateCat && (
            <div className="flex items-center gap-3">
              <div
                className="border border-gray-400 rounded cursor-pointer p-1 group hover:border-purple-700"
                onClick={() => setOpenCreateCat(true)}
              >
                <LuPlus
                  className="text-gray-400 group-hover:text-purple-700"
                  size={16}
                />
              </div>
              <div className="">
                <label
                  htmlFor="excelUpload"
                  className="flex flex-col items-center justify-center w-full h-6 px-2 py-3 border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-purple-700 transition"
                >
                  <p className="text-gray-600 text-[10px] text-center">
                    Drag & drop or click to upload Excel file (.xlsx)
                  </p>
                </label>

                <input
                  id="excelUpload"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleUploadBulkCategories}
                  className="hidden"
                />

                {loadings?.bulkUploadLoading && (
                  <p className="text-sm text-purple-600 mt-2 text-center">
                    Uploading categories...
                  </p>
                )}
              </div>

              {/* <button
                className="flex items-center gap-1 p-2 px-3 bg-green-500 hover:bg-green-600 rounded text-white cursor-pointer"
                onClick={handleUploadBulkCategories}
              >
                <MdUpload />
                Upload Categories in Bulk
              </button> */}
            </div>
          )}
        </div>
        {openCreateCat ? (
          loadings.createCatLoading ? (
            <div className="h-[450px] flex items-center justify-center">
              <span className="loader"></span>
            </div>
          ) : (
            <div className="overflow-y-auto overflow-x-hidden text-[12px]">
              <form
                onSubmit={(e) =>
                  activeCat
                    ? handleUpdateCategory(e, activeCat?._id)
                    : handleCreateCategory(e)
                }
                className="p-6"
              >
                <ImageUploader
                  img={catFormData?.img}
                  onImageSelect={(file) =>
                    setCatFormData((prev) => ({ ...prev, img: file }))
                  }
                  activeCat={activeCat}
                />
                {/* cat id */}
                <div className="flex flex-col mt-4 gap-2">
                  <label>Category ID</label>
                  <input
                    type="text"
                    placeholder="Category ID"
                    className="outline-none border border-gray-400 rounded p-2"
                    value={catFormData?.id}
                    onChange={(e) => {
                      setCatFormData((prev) => ({
                        ...prev,
                        id: e.target.value,
                      }));
                      setError((prev) => ({
                        ...prev,
                        catId: "",
                      }));
                    }}
                  />
                  {error?.hasOwnProperty("catId") && (
                    <p className="text-red-500 italic text-[10px]">
                      {error?.catId}
                    </p>
                  )}
                </div>
                {/* cat name */}
                <div className="flex flex-col mt-4 gap-2">
                  <label>Category Name</label>
                  <input
                    type="text"
                    placeholder="Category Name"
                    className="outline-none border border-gray-400 rounded p-2"
                    value={catFormData?.name}
                    onChange={(e) => {
                      setCatFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                      setError((prev) => ({
                        ...prev,
                        catName: "",
                      }));
                    }}
                  />
                  {error?.hasOwnProperty("catName") && (
                    <p className="text-red-500 italic text-[10px]">
                      {error?.catName}
                    </p>
                  )}
                </div>
                {/* status */}
                <div className="flex flex-col mt-4 gap-2">
                  <label>Status</label>
                  {activeCat && activeCat?.status !== "published" ? (
                    <select
                      className="outline-none border border-gray-400 rounded p-2"
                      value={catFormData?.status}
                      onChange={(e) =>
                        setCatFormData((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                    >
                      <option value="draft">draft</option>
                      <option value="published">published</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder={catFormData?.status}
                      className="outline-none border border-gray-400 rounded p-2"
                      disabled
                    />
                  )}
                </div>
                {/* products */}
                <div className="flex flex-col mt-4 gap-2">
                  <label>Products</label>
                  <input
                    type="text"
                    placeholder={catFormData?.products}
                    className="outline-none border border-gray-400 rounded p-2"
                    disabled
                  />
                </div>
                {/* cancel or create */}
                <div className="flex gap-3 mt-6">
                  <button
                    className="text-center w-full p-2 border border-red-500 text-red-500 rounded cursor-pointer hover:bg-red-500 hover:text-white"
                    onClick={() => {
                      setOpenCreateCat(false);
                      setActiveCat(null);
                      setCatFormData((prev) => ({
                        ...prev,
                        img: "",
                        id: null,
                        name: "",
                        products: 0,
                      }));
                    }}
                  >
                    Cancel
                  </button>
                  <input
                    type="submit"
                    value="Create"
                    className="text-center w-full p-2 border border-purple-700 text-purple-700 rounded cursor-pointer hover:bg-purple-700 hover:text-white"
                  />
                </div>
              </form>
            </div>
          )
        ) : (
          <>
            {/* draft or published navs */}
            <div className="flex items-center justify-center text-[12px]">
              <p
                className={`text-center w-full ${
                  showDraftCat ? "bg-purple-700/50" : "bg-purple-700/10"
                } cursor-pointer py-3`}
                onClick={() => setShowDraftCat(true)}
              >
                Drafts
              </p>
              <p
                className={`text-center w-full ${
                  !showDraftCat ? "bg-purple-700/50" : "bg-purple-700/10"
                } cursor-pointer py-3`}
                onClick={() => setShowDraftCat(false)}
              >
                Published
              </p>
            </div>
            {showDraftCat ? (
              <>
                <div className="p-3 text-[11px]">
                  {/* search */}
                  <div className="flex items-center justify-between">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        className="outline-none bg-gray-100 rounded p-2 px-4"
                        placeholder="Search Category"
                        value={searchCat}
                        onChange={(e) => setSearchCat(e.target.value)}
                      />
                      {searchCat && (
                        <RxCross2
                          className="absolute right-2 text-gray-500 cursor-pointer"
                          onClick={() => setSearchCat("")}
                        />
                      )}
                    </div>
                    <button
                      className={`rounded ${
                        showAll
                          ? "bg-purple-700 text-white"
                          : "border border-gray-200 text-gray-500 hover:bg-purple-700 hover:text-white"
                      } px-3 py-1.5 cursor-pointer`}
                      onClick={() => {
                        setShowAll(true);
                        setSelectedCats([]);
                      }}
                    >
                      Show All Products
                    </button>
                  </div>
                  {/* results */}
                  <div className="py-4">
                    {/* header of table */}
                    <div className="flex items-center gap-3 w-full mb-3">
                      <p className="w-[10%] font-[500]">Sr.No</p>
                      <p className="w-[10%] font-[500]">ID</p>
                      <p className="w-[35%] font-[500]">Category</p>
                      <p className="w-[15%] font-[500]">Products</p>
                      <p className="w-[10%] font-[500]">Edit</p>
                      <p className="w-[10%] font-[500]">Delete</p>
                    </div>
                    {/* table content */}
                    <div className="flex flex-col gap-3 w-full py-3 overflow-y-auto overflow-x-hidden hide-scrollbar">
                      {loadings.draftCatLoading || loadings.deleteCatLoading ? (
                        <div className="h-[450px] flex items-center justify-center">
                          <span className="loader"></span>
                        </div>
                      ) : draftCat?.length > 0 ? (
                        <>
                          {draftCat?.map((d, index) => (
                            <div
                              className={`flex items-center gap-3 py-2 ps-2 ${
                                !showAll &&
                                selectedCats?.includes(d?.id) &&
                                "border border-purple-700"
                              } cursor-pointer rounded`}
                              onClick={() => {
                                setShowAll(false);
                                setSelectedCats((prev) => {
                                  if (prev.includes(d?.id)) {
                                    return prev.filter((id) => id !== d?.id);
                                  } else {
                                    return [...prev, d?.id];
                                  }
                                });
                              }}
                              key={index}
                            >
                              <p className="w-[7%]">
                                {(catPageInfo.currentPage - 1) * 10 +
                                  (index + 1)}
                              </p>
                              <p className="w-[10%]">{d?.id}</p>
                              <div className="w-[35%] flex items-center gap-3">
                                {d?.thumbnail ? (
                                  <img
                                    src={d?.thumbnail}
                                    alt={`category-${d?.id}`}
                                    className="w-10 h-10 object-cover"
                                  />
                                ) : (
                                  <MdCategory size={35} />
                                )}
                                <p>{d?.name}</p>
                              </div>
                              <p className="w-[15%]">{d?.products}</p>
                              <div className="w-[10%]">
                                <div
                                  className="border border-gray-200 rounded cursor-pointer p-2 group hover:border-purple-700 w-fit"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveCat(d);
                                    setOpenCreateCat(true);
                                  }}
                                >
                                  <MdEdit className="text-gray-400 group-hover:text-purple-700" />
                                </div>
                              </div>
                              <div className="w-[10%] cursor-pointer">
                                <div
                                  className="border border-gray-200 rounded cursor-pointer p-2 group hover:border-red-500 w-fit"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteCategory(d?._id);
                                  }}
                                >
                                  <MdDelete className="text-gray-400 group-hover:text-red-500" />
                                </div>
                              </div>
                            </div>
                          ))}
                          {/* arrows for pagination */}
                          <div className="w-full flex items-center justify-end px-3">
                            <div className="flex items-center gap-2">
                              <LuArrowLeft
                                className={`cursor-pointer ${
                                  catPageInfo.currentPage > 1
                                    ? "text-black"
                                    : "text-gray-500"
                                }`}
                                onClick={() => {
                                  if (catPageInfo.currentPage > 1) {
                                    const prevPage =
                                      catPageInfo.currentPage - 1;
                                    setCatPageInfo((prev) => ({
                                      ...prev,
                                      currentPage: prevPage,
                                    }));
                                    getDraftedCategories(prevPage);
                                  }
                                }}
                              />

                              <LuArrowRight
                                className={`cursor-pointer ${
                                  catPageInfo.currentPage <
                                  catPageInfo.totalPages
                                    ? "text-black"
                                    : "text-gray-500"
                                }`}
                                onClick={() => {
                                  if (
                                    catPageInfo.currentPage <
                                    catPageInfo.totalPages
                                  ) {
                                    const nextPage =
                                      catPageInfo.currentPage + 1;
                                    setCatPageInfo((prev) => ({
                                      ...prev,
                                      currentPage: nextPage,
                                    }));
                                    getDraftedCategories(nextPage);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-[150px]">
                          <p>Categories Not Found</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 text-[11px]">
                  {/* search */}
                  <div className="flex items-center justify-between">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        className="outline-none bg-gray-100 rounded p-2 px-4"
                        placeholder="Search Category"
                        value={searchCat}
                        onChange={(e) => setSearchCat(e.target.value)}
                      />
                      {searchCat && (
                        <RxCross2
                          className="absolute right-2 text-gray-500 cursor-pointer"
                          onClick={() => setSearchCat("")}
                        />
                      )}
                    </div>
                    <button
                      className={`rounded ${
                        showAll
                          ? "bg-purple-700 text-white"
                          : "border border-gray-200 text-gray-500 hover:bg-purple-700 hover:text-white"
                      } px-3 py-1.5 cursor-pointer`}
                      onClick={() => {
                        setShowAll(true);
                        setSelectedCats([]);
                      }}
                    >
                      Show All Products
                    </button>
                  </div>
                  {/* results */}
                  <div className="py-4 px-2">
                    {/* header of table */}
                    <div className="flex items-center gap-3 w-full mb-3">
                      <p className="w-[10%] font-[500]">Sr.No</p>
                      <p className="w-[10%] font-[500]">ID</p>
                      <p className="w-[45%] font-[500]">Category</p>
                      <p className="w-[15%] font-[500]">Products</p>
                      <p className="w-[10%] font-[500]">Delete</p>
                    </div>
                    {/* table content */}
                    <div className="flex flex-col gap-3 w-full py-3">
                      {publishedCat?.length > 0 ? (
                        <>
                          {publishedCat?.map((d, index) => (
                            <div
                              className={`flex items-center gap-3 p-2 ${
                                !showAll &&
                                selectedCats?.includes(d?.id) &&
                                "border border-purple-700"
                              } cursor-pointer rounded`}
                              onClick={() => {
                                setShowAll(false);
                                setSelectedCats((prev) => {
                                  if (prev.includes(d?.id)) {
                                    return prev.filter((id) => id !== d?.id);
                                  } else {
                                    return [...prev, d?.id];
                                  }
                                });
                              }}
                              key={index}
                            >
                              <p className="w-[10%]">{index + 1}</p>
                              <p className="w-[10%]">{d?.id}</p>
                              <div className="w-[45%] flex items-center gap-3">
                                <img
                                  src={d?.thumbnail}
                                  alt={`category-${d?.id}`}
                                  className="w-10 h-10 object-cover"
                                />
                                <p>{d?.name}</p>
                              </div>
                              <p className="w-[15%]">{d?.products}</p>
                              <p className="w-[10%] cursor-pointer">
                                <div
                                  className="border border-gray-200 rounded cursor-pointer p-2 group hover:border-red-500 w-fit"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteCategory(d?._id);
                                  }}
                                >
                                  <MdDelete className="text-gray-400 group-hover:text-red-500" />
                                </div>
                              </p>
                            </div>
                          ))}
                          {/* arrows for pagination */}
                          <div className="w-full flex items-center justify-end px-3">
                            <div className="flex items-center gap-2">
                              <LuArrowLeft
                                className={`cursor-pointer ${
                                  catPageInfo.currentPage > 1
                                    ? "text-black"
                                    : "text-gray-500"
                                }`}
                                onClick={() => {
                                  if (catPageInfo.currentPage > 1) {
                                    const prevPage =
                                      catPageInfo.currentPage - 1;
                                    setCatPageInfo((prev) => ({
                                      ...prev,
                                      currentPage: prevPage,
                                    }));
                                    getPublishedCategories(prevPage);
                                  }
                                }}
                              />

                              <LuArrowRight
                                className={`cursor-pointer ${
                                  catPageInfo.currentPage <
                                  catPageInfo.totalPages
                                    ? "text-black"
                                    : "text-gray-500"
                                }`}
                                onClick={() => {
                                  if (
                                    catPageInfo.currentPage <
                                    catPageInfo.totalPages
                                  ) {
                                    const nextPage =
                                      catPageInfo.currentPage + 1;
                                    setCatPageInfo((prev) => ({
                                      ...prev,
                                      currentPage: nextPage,
                                    }));
                                    getPublishedCategories(nextPage);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-[150px]">
                          <p>Categories Not Found</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* right products list */}
      <div className="bg-white border border-gray-200 w-full rounded">
        {/* upper bar */}
        <div className="p-3 border-b border-gray-200 flex items-center justify-between">
          <p className="text-lg font-[500]">
            {openCreateProd ? "Create Product" : "Products"}
          </p>
          {!openCreateProd && (
            <div className="flex items-center gap-3">
              <div
                className="border border-gray-200 rounded cursor-pointer p-2 group hover:border-purple-700"
                onClick={() => setOpenCreateProd(true)}
              >
                <LuPlus
                  className="text-gray-400 group-hover:text-purple-700"
                  size={18}
                />
              </div>
              <button className="flex items-center gap-1 p-2 px-3 bg-green-500 hover:bg-green-600 rounded text-white cursor-pointer">
                <MdUpload />
                Upload Products in Bulk
              </button>
            </div>
          )}
        </div>

        {openCreateProd && (
          <div className="">
            <form onSubmit={handleCreateCategory} className="p-6">
              {/* images */}
              <div className="flex gap-2">
                <ImageUploader img={prodFormData?.mainImg} type="main" />
                <div className="flex flex-col gap-2">
                  <ImageUploader img={prodFormData?.subImgs?.[0]} type="sub" />
                  <ImageUploader img={prodFormData?.subImgs?.[1]} type="sub" />
                  <ImageUploader img={prodFormData?.subImgs?.[2]} type="sub" />
                </div>
              </div>
              {/* product name */}
              <div className="flex flex-col mt-4 gap-2">
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder="Product Name"
                  className="outline-none border border-gray-400 rounded p-2"
                  value={prodFormData?.name}
                  onChange={(e) =>
                    setProdFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              {/* sku and categories */}
              <div className="flex items-center gap-2">
                {/* sku */}
                <div className="flex flex-col mt-4 gap-2">
                  <label>SKU / Product Code</label>
                  <input
                    type="text"
                    placeholder="SKU / Product Code"
                    className="outline-none border border-gray-400 rounded p-2"
                    value={prodFormData?.sku}
                    onChange={(e) =>
                      setProdFormData((prev) => ({
                        ...prev,
                        sku: e.target.value,
                      }))
                    }
                  />
                </div>
                {/* category */}
                <div className="flex flex-col mt-4 gap-2 w-full">
                  <label>Select Category</label>
                  <select className="outline-none border border-gray-400 rounded p-2.5 w-full">
                    <option value="">Select</option>
                    {categoryList?.map((c) => (
                      <option value={c?.name} key={c?.id}>
                        {c?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* price, discount %, discounted price */}
              <div className="flex items-center gap-2">
                {/* price */}
                <div className="flex flex-col mt-4 gap-2 w-[32.3%]">
                  <label>Price</label>
                  <input
                    type="text"
                    placeholder="Price"
                    className="outline-none border border-gray-400 rounded p-2"
                    value={prodFormData?.price}
                    onChange={(e) =>
                      setProdFormData((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                  />
                </div>
                {/* discount% */}
                <div className="flex flex-col mt-4 gap-2 w-[32.3%]">
                  <label>Discount %</label>
                  <input
                    type="text"
                    placeholder="Discount %"
                    className="outline-none border border-gray-400 rounded p-2"
                    value={prodFormData?.discount_percent}
                    onChange={(e) =>
                      setProdFormData((prev) => ({
                        ...prev,
                        discount_percent: e.target.value,
                      }))
                    }
                  />
                </div>
                {/* final discount */}
                <div className="flex flex-col mt-4 gap-2 w-[32.3%]">
                  <label>Final Discounted Price</label>
                  <input
                    type="text"
                    placeholder={prodFormData?.discounted_price}
                    className="outline-none border border-gray-400 rounded p-2"
                    disabled
                  />
                </div>
              </div>
              {/* stock */}
              <div className="flex flex-col mt-4 gap-2">
                <label>Stock</label>
                <input
                  type="text"
                  placeholder="Stock"
                  className="outline-none border border-gray-400 rounded p-2"
                  value={prodFormData?.stock}
                  onChange={(e) =>
                    setProdFormData((prev) => ({
                      ...prev,
                      stock: e.target.value,
                    }))
                  }
                />
              </div>
              {/* tags */}
              <div className="flex flex-col mt-4 gap-2">
                <label>Tags</label>
                <TagsInput
                  formData={prodFormData}
                  setFormData={setProdFormData}
                />
              </div>
              {/* description */}
              <div className="flex flex-col mt-4 gap-2">
                <label>Description</label>
                <FormatSelector
                  radioOptions={descOp}
                  selectedFormat={selectedFormat}
                  setSelectedFormat={setSelectedFormat}
                />
                <div className="mt-2">
                  {selectedFormat === "paragraph" ? (
                    <textarea
                      className="outline-none border border-gray-400 rounded p-2 w-full resize-none"
                      placeholder="Write your product description in paragraph format..."
                      rows={4}
                      value={prodFormData?.description?.[0]}
                      onChange={(e) =>
                        setProdFormData((prev) => ({
                          ...prev,
                          description: [...prev.description, e.target.value],
                        }))
                      }
                    />
                  ) : (
                    <>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          className="outline-none border border-gray-400 rounded p-2 w-[90%]"
                          placeholder="Write your point..."
                          value={bulletPoint}
                          onChange={(e) => setBulletPoint(e.target.value)}
                        />
                        <div
                          className="rounded cursor-pointer p-2 group bg-purple-700 hover:bg-purple-800"
                          onClick={() => {
                            setProdFormData((prev) => ({
                              ...prev,
                              description: [...prev.description, bulletPoint],
                            }));
                            setBulletPoint("");
                          }}
                        >
                          <LuPlus className="text-white" size={18} />
                        </div>
                      </div>
                      {/* all points */}
                      <div className="mt-3 flex flex-col gap-2">
                        {prodFormData?.description?.map((d, index) => (
                          <div
                            className="flex border border-gray-400 rounded p-2"
                            key={index}
                          >
                            {/* left */}
                            <div className="w-[95%] flex items-start gap-2">
                              <TbArrowBadgeRightFilled
                                size={18}
                                className="w-[5%] mt-1"
                              />
                              <p className="w-[95%]">{d}</p>
                            </div>
                            {/* delete */}
                            <div
                              className="w-[5%] mt-1 cursor-pointer"
                              onClick={() =>
                                setProdFormData((prev) => ({
                                  ...prev,
                                  description: prev.description.filter(
                                    (f) => f !== d
                                  ),
                                }))
                              }
                            >
                              <MdDelete className="text-red-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              {/* parent category */}
              <div className="flex flex-col mt-4 gap-2">
                <label>Specifications</label>
                <FormatSelector
                  radioOptions={catOp}
                  selectedFormat={selectedCatFormat}
                  setSelectedFormat={setSelectedCatFormat}
                />
                <div className="mt-2">
                  <ProductSpecification
                    formData={prodFormData}
                    setFormData={setProdFormData}
                    selectedFormat={selectedCatFormat}
                  />
                </div>
              </div>

              {/* cancel or create */}
              <div className="flex gap-3 mt-6">
                <button
                  className="text-center w-full p-2 border border-red-500 text-red-500 rounded cursor-pointer hover:bg-red-500 hover:text-white"
                  onClick={() => {
                    setOpenCreateProd(false);
                    setActiveProd(null);
                  }}
                >
                  Cancel
                </button>
                <input
                  type="submit"
                  value="Create"
                  className="text-center w-full p-2 border border-purple-700 text-purple-700 rounded cursor-pointer hover:bg-purple-700 hover:text-white"
                />
              </div>
            </form>
          </div>
        )}

        {openViewProd && (
          <div className="p-3">
            {/* product images */}
            <div className="flex items-center gap-3">
              <img
                src="https://i.pinimg.com/236x/b8/fc/c4/b8fcc44876291b40b8e2759ea010bb7b.jpg"
                alt="main"
                className="w-[80%] object-cover max-h-[1000px]"
              />
              {/* sub imgs */}
              <div className="flex flex-col gap-3 w-[20%]">
                <img
                  src="https://i.pinimg.com/236x/b8/fc/c4/b8fcc44876291b40b8e2759ea010bb7b.jpg"
                  alt="sub1"
                  className="h-[25%] object-cover"
                />
                <img
                  src="https://i.pinimg.com/236x/b8/fc/c4/b8fcc44876291b40b8e2759ea010bb7b.jpg"
                  alt="sub1"
                  className="h-[25%] object-cover"
                />
                <img
                  src="https://i.pinimg.com/236x/b8/fc/c4/b8fcc44876291b40b8e2759ea010bb7b.jpg"
                  alt="sub1"
                  className="h-[25%] object-cover"
                />
                <img
                  src="https://i.pinimg.com/236x/b8/fc/c4/b8fcc44876291b40b8e2759ea010bb7b.jpg"
                  alt="sub1"
                  className="h-[25%] object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {!openCreateProd && !openViewProd && (
          <div className="p-3">
            {/* search */}
            <div className="flex items-center justify-between">
              <input
                type="text"
                className="outline-none bg-gray-100 rounded p-2 px-4"
                placeholder="Search Product"
              />
            </div>
            {/* results */}
            <div className="py-4 px-2">
              {/* header of table */}
              <div className="flex items-center gap-3 w-full mb-3">
                <p className="w-[10%] font-[500]">Sr.No</p>
                <p className="w-[35%] font-[500]">Product</p>
                <p className="w-[15%] font-[500]">Stock</p>
                <p className="w-[10%] font-[500]">View</p>
                <p className="w-[10%] font-[500]">Edit</p>
                <p className="w-[10%] font-[500]">Delete</p>
              </div>
              {/* table content */}
              <div className="flex flex-col gap-3 w-full py-3 max-h-[calc(100vh-280px)] overflow-y-auto overflow-x-hidden">
                {productList?.map((d, index) => (
                  <div
                    className="flex items-center gap-3 p-2 cursor-pointer rounded"
                    key={index}
                  >
                    <p className="w-[10%]">{index + 1}</p>
                    <div className="w-[35%] flex items-center gap-3">
                      <img
                        src={d?.mainImg}
                        alt={`product-${index}`}
                        className="w-10 h-10 object-cover"
                      />
                      <p>{d?.name}</p>
                    </div>
                    <p className="w-[15%]">{d?.stock}</p>
                    {/* view */}
                    <div className="w-[10%] cursor-pointer">
                      <div
                        className="border border-gray-200 rounded cursor-pointer p-2 group hover:border-purple-700 w-fit"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProd(d);
                          setOpenViewProd(true);
                        }}
                      >
                        <IoEye className="text-gray-400 group-hover:text-purple-700" />
                      </div>
                    </div>
                    {/* edit */}
                    <div className="w-[10%] cursor-pointer">
                      <div
                        className="border border-gray-200 rounded cursor-pointer p-2 group hover:border-purple-700 w-fit"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProd(d);
                          setOpenCreateProd(true);
                        }}
                      >
                        <MdEdit className="text-gray-400 group-hover:text-purple-700" />
                      </div>
                    </div>
                    {/* delete */}
                    <div className="w-[10%] cursor-pointer">
                      <div
                        className="border border-gray-200 rounded cursor-pointer p-2 group hover:border-red-500 w-fit"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCat(d);
                        }}
                      >
                        <MdDelete className="text-gray-400 group-hover:text-red-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
