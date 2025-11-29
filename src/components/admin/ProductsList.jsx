import { useCallback, useEffect, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuPlus } from "react-icons/lu";
import { MdCategory, MdDelete, MdEdit } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import ImageUploader from "./ImageUploader";
import TagsInput from "./TagsInput";
import FormatSelector from "./FormatSelector";
import ProductSpecification from "./ProductSpecification";
import axiosPrivate from "../../utils/axiosPrivate";
import { toastError, toastSuccess } from "../../utils/toast";
import { RxCross2 } from "react-icons/rx";
import ImageViewer from "../ImageViewer";
import ToggleButton from "../ToggleButton";
import { IoIosArrowBack } from "react-icons/io";
import { BiRefresh } from "react-icons/bi";

const ProductsList = () => {
  const [loadings, setLoadings] = useState({
    catLoading: false,
    createCatLoading: false,
    deleteCatLoading: false,
    createProdLoading: false,
    bulkUploadLoading: false,
    uploadBulkProdLoading: false,
    prodLoading: false,
    deleteProdLoading: false,
  });
  const [showAll, setShowAll] = useState(true);
  const [selectedCats, setSelectedCats] = useState([]);
  const [create, setCreate] = useState({
    openCreateCat: false,
    openCreateProd: false,
  });
  const [active, setActive] = useState({
    activeCat: null,
    activeProd: null,
  });
  const [catFormData, setCatFormData] = useState({
    img: "",
    id: null,
    name: "",
    products: 0,
    status: "draft",
  });

  const [openViewProd, setOpenViewProd] = useState(false);
  const [prodFormData, setProdFormData] = useState({
    sku: "",
    name: "",
    categoryId: "",
    categoryName: "",
    price: "",
    discount: "",
    stock: "",
    tags: [],
    description: [],
    specified_by: "",
    size: [],
    color: "",
    material: "",
    target_audience: "",
    fit_type: "",
    pattern: "",
    occasion: "",
    care_instruction: "",
    dimensions: { length: "", breadth: "", height: "" },
    closure_type: "",
    capacity: "",
    compartment_details: "",
    strap_type: "",
    status: "draft",
    images: [],
    size_chart: null,
  });
  const descOp = [
    { format: "paragraph", name: "Paragraph Format" },
    { format: "bullet", name: "Bullet Points" },
  ];
  const [list, setList] = useState({
    catList: [],
    prodList: [],
  });
  const [draft, setDraft] = useState({
    showDraftCat: true,
    showDraftProd: true,
  });
  const [selectedFormat, setSelectedFormat] = useState("paragraph");
  const [bulletPoint, setBulletPoint] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [error, setError] = useState(null);
  const [publishedCat, setPublishedCat] = useState([]);
  // Search & Pagination for Category & Product
  const [search, setSearch] = useState({
    searchCat: "",
    searchProd: "",
  });
  const [pageInfo, setPageInfo] = useState({
    catPageInfo: {
      total: 0,
      currentPage: 1,
      totalPages: 0,
    },
    prodPageInfo: {
      total: 0,
      currentPage: 1,
      totalPages: 0,
    },
  });

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
      handleGetList(
        pageInfo.catPageInfo.currentPage,
        search?.searchCat,
        "/drafted-categories"
      );
      setCreate((prev) => ({ ...prev, openCreateCat: false }));
      setDraft((prev) => ({ ...prev, showDraftCat: true }));
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
      if (draft.showDraftCat) {
        await handleGetList(
          list?.catList?.length <= 1
            ? pageInfo.catPageInfo.currentPage - 1
            : pageInfo.catPageInfo.currentPage,
          search?.searchCat,
          "/drafted-categories"
        );
      }
      if (!draft.showDraftCat) {
        await handleGetList(
          list?.catList?.length <= 1
            ? pageInfo.catPageInfo.currentPage - 1
            : pageInfo.catPageInfo.currentPage,
          search?.searchCat,
          "/published-categories"
        );
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

  // reset form
  const resetCatForm = () => {
    setProdFormData({
      sku: "",
      name: "",
      categoryId: "",
      categoryName: "",
      price: "",
      discount: "",
      stock: "",
      tags: [],
      description: [""],
      specified_by: "none",
      size: [],
      color: [],
      material: "",
      target_audience: "",
      fit_type: "",
      pattern: "",
      occasion: "",
      care_instruction: "",
      dimensions: { length: "", breadth: "", height: "" },
      closure_type: "",
      capacity: "",
      compartment_details: "",
      strap_type: "",
      images: [null, null, null, null],
      size_chart: null,
    });
  };

  // Create Product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setLoadings((prev) => ({ ...prev, createProdLoading: true }));

    try {
      const data = new FormData();

      for (const key in prodFormData) {
        if (key === "images" || key === "size_chart") continue;

        const value = prodFormData[key];

        if (Array.isArray(value)) {
          value.forEach((v) => {
            if (v) data.append(key, v);
          });
        } else if (typeof value === "object" && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            data.append(`${key}[${subKey}]`, subValue);
          });
        } else {
          data.append(key, value);
        }
      }

      // Append image files

      if (prodFormData?.images?.[0])
        data.append("img1", prodFormData.images[0]);
      if (prodFormData?.images?.[1])
        data.append("img2", prodFormData.images[1]);
      if (prodFormData?.images?.[2])
        data.append("img3", prodFormData.images[2]);
      if (prodFormData?.images?.[3])
        data.append("img4", prodFormData.images[3]);

      // Append size chart file
      if (prodFormData.size_chart) {
        data.append("size_chart", prodFormData.size_chart);
      }

      // Send request
      const res = await axiosPrivate.post("/create-product", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset form
      // resetCatForm();

      toastSuccess(
        `Product "${res?.data?.product?.name}" created successfully`
      );
    } catch (error) {
      toastError(
        `${
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Something went wrong"
        }`
      );
      console.log(error);
    } finally {
      setLoadings((prev) => ({ ...prev, createProdLoading: false }));
    }
  };

  // Update Product
  const handleUpdateProduct = async (e, productId) => {
    e.preventDefault();
    setLoadings((prev) => ({ ...prev, createProdLoading: true }));

    try {
      const data = new FormData();

      // ------------------------------------------
      // 1️⃣ APPEND ALL NORMAL TEXT FIELDS
      // ------------------------------------------
      for (const key in prodFormData) {
        if (key === "images" || key === "size_chart") continue;

        const value = prodFormData[key];

        if (Array.isArray(value)) {
          value.forEach((v) => v && data.append(key, v));
        } else if (typeof value === "object" && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (subValue !== "" && subValue !== undefined)
              data.append(`${key}[${subKey}]`, subValue);
          });
        } else if (value !== "" && value !== undefined && value !== null) {
          data.append(key, value);
        }
      }

      // -----------------------------------------------
      //     APPEND IMAGES IN ORDER (replace or push)
      // -----------------------------------------------
      if (
        prodFormData?.images?.[0] &&
        prodFormData?.images?.[0] instanceof File
      )
        data.append("img1", prodFormData.images[0]);
      if (
        prodFormData?.images?.[1] &&
        prodFormData?.images?.[1] instanceof File
      )
        data.append("img2", prodFormData.images[1]);
      if (
        prodFormData?.images?.[2] &&
        prodFormData?.images?.[2] instanceof File
      )
        data.append("img3", prodFormData.images[2]);
      if (
        prodFormData?.images?.[3] &&
        prodFormData?.images?.[3] instanceof File
      )
        data.append("img4", prodFormData.images[3]);

      // ------------------------------------------
      // 3️⃣ APPEND SIZE CHART IF UPDATED
      // ------------------------------------------
      if (prodFormData.size_chart instanceof File) {
        data.append("size_chart", prodFormData.size_chart);
      }

      // ------------------------------------------
      // 4️⃣ SEND REQUEST
      // ------------------------------------------
      const res = await axiosPrivate.patch(
        `/update-product/${productId}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toastSuccess("Product updated successfully!");

      handleGetList(
        pageInfo.catPageInfo.currentPage,
        search?.searchProd,
        "/drafted-products"
      );
      setCreate((prev) => ({ ...prev, openCreateProd: false }));
      setDraft((prev) => ({ ...prev, showDraftProd: true }));
    } catch (err) {
      console.error(err);
      toastError(err.response?.data?.message || "Update failed");
    } finally {
      setLoadings((prev) => ({ ...prev, createProdLoading: false }));
    }
  };

  // GETTING LIST OF CATEGORY/PRODUCTS FOR BOTH DRAFT & PUBLISHED
  const handleGetList = useCallback(async (page = 1, search = "", url) => {
    // Differentiator
    let loading, listName, pageInfoName, listOf;
    if (url === "/drafted-products" || url === "/published-products") {
      loading = "prodLoading";
      listName = "prodList";
      pageInfoName = "prodPageInfo";
      listOf = "products";
    } else {
      loading = "catLoading";
      listName = "catList";
      pageInfoName = "catPageInfo";
      listOf = "categories";
    }

    setLoadings((prev) => ({ ...prev, [loading]: true }));
    try {
      let query = `?page=${page}&limit=${10}`;
      if (search) query += `&search=${encodeURIComponent(search)}`;

      const res = await axiosPrivate.get(`${url}${query}`, {
        withCredentials: true,
      });

      setList((prev) => ({ ...prev, [listName]: res?.data?.data }));
      if (url === "/published-categories") setPublishedCat(res?.data?.data);
      const { total, currentPage, totalPages } = res?.data;
      setPageInfo((prev) => ({
        ...prev,
        [pageInfoName]: { total, currentPage, totalPages },
      }));

      return res.data;
    } catch (error) {
      console.error(`Error fetching published ${listOf}:`, error);
      return null;
    } finally {
      setLoadings((prev) => ({ ...prev, [loading]: false }));
    }
  }, []);

  // UPLOAD BULK FOR BOTH CATEGORY/PRODUCTS
  const handleBulkUpload = async (e, loading, url, listOf) => {
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

    setLoadings((prev) => ({ ...prev, [loading]: true }));

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosPrivate.post(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toastSuccess(res.data?.message || `${listOf} uploaded successfully!`);
      if (listOf === "Products") {
        await handleGetList(
          pageInfo.prodPageInfo.currentPage,
          search?.searchProd,
          "/drafted-products"
        );
      } else if (listOf === "Categories") {
        await handleGetList(
          pageInfo.catPageInfo.currentPage,
          search?.searchCat,
          "/drafted-categories"
        );
      }
      e.target.value = null;
    } catch (error) {
      console.error(error);
      toastError(
        error.response?.data?.message ||
          "Failed to upload categories. Please try again."
      );
    } finally {
      setLoadings((prev) => ({ ...prev, [loading]: false }));
    }
  };

  // DELETE FOR BOTH PRODUCTS
  const deleteProduct = async (productId) => {
    if (!productId) return toastError("Invalid product ID");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    setLoadings((prev) => ({ ...prev, deleteProdLoading: true }));
    try {
      const res = await axiosPrivate.delete(`/delete-product/${productId}`, {
        withCredentials: true,
      });

      toastSuccess(res.data?.message || "Product deleted successfully");
      if (draft.showDraftCat) {
        await handleGetList(
          list?.prodList?.length <= 1
            ? pageInfo.prodPageInfo.currentPage - 1
            : pageInfo.prodPageInfo.currentPage,
          search?.searchProd,
          "/drafted-products"
        );
      }
      if (!draft.showDraftCat) {
        await handleGetList(
          list?.prodList?.length <= 1
            ? pageInfo.prodPageInfo.currentPage - 1
            : pageInfo.prodPageInfo.currentPage,
          search?.searchProd,
          "/published-products"
        );
      }
      return true;
    } catch (error) {
      console.error(error);
      toastError(error.response?.data?.message || "Failed to delete product");
      return false;
    } finally {
      setLoadings((prev) => ({ ...prev, deleteProdLoading: false }));
    }
  };

  // GET PRODUCT DETAILS
  const getProductDetails = async (id) => {
    try {
      const res = await axiosPrivate.get(`get-product-details/${id}`);
      setActive((prev) => ({ ...prev, activeProd: res?.data?.details }));
    } catch (error) {
      console.error(error);
    }
  };

  // Calculating discounted price
  useEffect(() => {
    const dp =
      +prodFormData?.price -
      +prodFormData?.price * (+prodFormData?.discount / 100);
    setDiscountedPrice(dp);
  }, [prodFormData.price, prodFormData.discount]);

  // Search for product
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (draft.showDraftProd) {
        handleGetList(1, search?.searchProd, "/drafted-products");
      } else {
        handleGetList(1, search?.searchProd, "/published-products");
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search?.searchProd]);

  // Search for category
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (draft.showDraftCat) {
        handleGetList(1, search?.searchCat, "/drafted-categories");
      } else {
        handleGetList(1, search?.searchCat, "/published-categories");
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search?.searchCat]);

  // useEffect(() => {
  //   if (draft.showDraftProd) {
  //     handleGetList(
  //       pageInfo.prodPageInfo?.currentPage,
  //       search?.searchProd,
  //       "/drafted-products"
  //     );
  //   }
  //   if (draft.showDraftCat) {
  //     handleGetList(
  //       pageInfo.catPageInfo.currentPage,
  //       search?.searchCat,
  //       "/drafted-categories"
  //     );
  //   }
  // }, []);

  useEffect(() => {
    const callFunction = () => {
      if (active?.activeCat) {
        const { thumbnail, id, name, products } = active?.activeCat;
        setCatFormData((prev) => ({
          ...prev,
          img: thumbnail,
          id,
          name,
          products,
        }));
        return;
      } else {
        setCatFormData((prev) => ({
          ...prev,
          img: "",
          id: null,
          name: "",
          products: 0,
        }));
        return;
      }
    };
    callFunction();
  }, [active?.activeCat]);

  useEffect(() => {
    const callFunction = () => {
      if (active?.activeProd) {
        const {
          sku,
          name,
          categoryDetail,
          price,
          discount,
          stock,
          tags,
          description,
          specified_by,
          size,
          color,
          material,
          target_audience,
          fit_type,
          pattern,
          occasion,
          care_instruction,
          dimensions,
          closure_type,
          capacity,
          compartment_details,
          strap_type,
          status,
          images,
          size_chart,
        } = active?.activeProd;

        const dim = {
          length: dimensions?.length || "",
          breadth: dimensions?.breadth || "",
          height: dimensions?.height || "",
        };
        setProdFormData((prev) => ({
          ...prev,
          sku,
          name,
          categoryId: categoryDetail?.categoryId,
          categoryName: categoryDetail?.categoryName,
          price,
          discount_percent: discount,
          stock,
          tags,
          description,
          specified_by,
          size,
          color,
          material,
          target_audience,
          fit_type,
          pattern,
          occasion,
          care_instruction,
          dimensions: dim,
          closure_type,
          capacity,
          compartment_details,
          strap_type,
          status,
          images: [images?.img1, images?.img2, images?.img3, images?.img4],
          size_chart,
        }));
        return;
      } else {
        setProdFormData((prev) => ({
          ...prev,
          sku: "",
          name: "",
          categoryId: "",
          categoryName: "",
          price: "",
          discount: "",
          stock: "",
          tags: [],
          description: [],
          specified_by: "",
          size: [],
          color: [],
          material: "",
          target_audience: "",
          fit_type: "",
          pattern: "",
          occasion: "",
          care_instruction: "",
          dimensions: { length: "", breadth: "", height: "" },
          closure_type: "",
          capacity: "",
          compartment_details: "",
          strap_type: "",
          status: "draft",
          images: [],
          size_chart: null,
        }));
        return;
      }
    };
    callFunction();
  }, [active?.activeProd]);

  // Funtionality for deleting group of products
  const [selectedProdIDs, setSelectedProdIDs] = useState([]);

  const deleteMultipleProducts = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete these products?"
    );
    if (!confirmDelete) return;

    setLoadings((prev) => ({ ...prev, deleteProdLoading: true }));
    try {
      const res = await axiosPrivate.post(`/delete-products`, {
        ids: selectedProdIDs,
      });

      toastSuccess(res.data?.message || "Products deleted successfully");
      if (draft.showDraftCat) {
        await handleGetList(
          list?.prodList?.length <= 1
            ? pageInfo.prodPageInfo.currentPage - 1
            : pageInfo.prodPageInfo.currentPage,
          search?.searchProd,
          "/drafted-products"
        );
      }
      if (!draft.showDraftCat) {
        await handleGetList(
          list?.prodList?.length <= 1
            ? pageInfo.prodPageInfo.currentPage - 1
            : pageInfo.prodPageInfo.currentPage,
          search?.searchProd,
          "/published-products"
        );
      }
      setSelectedProdIDs([]);
      return true;
    } catch (error) {
      console.error(error);
      toastError(error.response?.data?.message || "Failed to delete product");
      return false;
    } finally {
      setLoadings((prev) => ({ ...prev, deleteProdLoading: false }));
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center gap-3">

      {/* left categories list */}
      <div className="bg-white border border-gray-200 w-full rounded">
        {/* upper bar */}
        <div className="p-3 border-b border-gray-200 flex items-center justify-between">
          <p className="text-lg font-[500]">
            {create.openCreateCat ? "Create Category" : "Categories"}
          </p>
          {!create.openCreateCat && (
            <div className="flex items-center gap-3">
              <div
                className="border border-gray-400 rounded cursor-pointer p-1 group hover:border-purple-700"
                onClick={() => {
                  setCreate((prev) => ({ ...prev, openCreateCat: true }));
                  setActive((prev) => ({ ...prev, activeCat: null }));
                  setError(null);
                }}
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
                  onChange={(e) =>
                    handleBulkUpload(
                      e,
                      "bulkUploadLoading",
                      "/upload-categories",
                      "Categories"
                    )
                  }
                  className="hidden"
                />

                {loadings?.bulkUploadLoading && (
                  <p className="text-sm text-purple-600 mt-2 text-center">
                    Uploading categories...
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        {create.openCreateCat ? (
          loadings.createCatLoading ? (
            <div className="h-[450px] flex items-center justify-center">
              <span className="loader"></span>
            </div>
          ) : (
            <div className="overflow-y-auto overflow-x-hidden text-[12px]">
              <form
                onSubmit={(e) =>
                  active?.activeCat
                    ? handleUpdateCategory(e, active?.activeCat?._id)
                    : handleCreateCategory(e)
                }
                className="p-6"
              >
                <ImageUploader
                  img={catFormData?.img}
                  onImageSelect={(file) =>
                    setCatFormData((prev) => ({ ...prev, img: file }))
                  }
                  activeCat={active?.activeCat}
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
                  {active?.activeCat &&
                  active?.activeCat?.status !== "published" ? (
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
                      setCreate((prev) => ({ ...prev, openCreateCat: false }));
                      setActive((prev) => ({ ...prev, activeCat: null }));
                      setError(null);
                      setCatFormData((prev) => ({
                        ...prev,
                        img: "",
                        id: null,
                        name: "",
                        products: 0,
                      }));
                      handleGetList(
                        pageInfo.catPageInfo.currentPage,
                        search?.searchCat,
                        "/drafted-categories"
                      );
                    }}
                  >
                    Cancel
                  </button>
                  <input
                    type="submit"
                    value={active?.activeCat ? "Update" : "Create"}
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
                  draft.showDraftCat ? "bg-purple-700/50" : "bg-purple-700/10"
                } cursor-pointer py-3`}
                onClick={() => {
                  setDraft((prev) => ({ ...prev, showDraftCat: true }));
                  handleGetList(
                    pageInfo.catPageInfo.currentPage,
                    search?.searchCat,
                    "/drafted-categories"
                  );
                  setSearch((prev) => ({ ...prev, searchCat: "" }));
                  setPageInfo((prev) => ({
                    ...prev,
                    catPageInfo: { ...prev.catPageInfo, currentPage: 1 },
                  }));
                }}
              >
                Drafts
              </p>
              <p
                className={`text-center w-full ${
                  !draft.showDraftCat ? "bg-purple-700/50" : "bg-purple-700/10"
                } cursor-pointer py-3`}
                onClick={() => {
                  setDraft((prev) => ({ ...prev, showDraftCat: false }));
                  handleGetList(
                    pageInfo.catPageInfo.currentPage,
                    search?.searchCat,
                    "/published-categories"
                  );
                  setSearch((prev) => ({ ...prev, searchCat: "" }));
                  setPageInfo((prev) => ({
                    ...prev,
                    catPageInfo: { ...prev.catPageInfo, currentPage: 1 },
                  }));
                }}
              >
                Published
              </p>
            </div>
            <>
              <div className="p-3 text-[11px]">
                {/* search & show all button */}
                <div className="flex items-center justify-between">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      className="outline-none bg-gray-100 rounded p-2 px-4"
                      placeholder="Search Category"
                      value={search?.searchCat}
                      onChange={(e) =>
                        setSearch((prev) => ({
                          ...prev,
                          searchCat: e.target.value,
                        }))
                      }
                    />
                    {search?.searchCat && (
                      <RxCross2
                        className="absolute right-2 text-gray-500 cursor-pointer"
                        onClick={() =>
                          setSearch((prev) => ({ ...prev, searchCat: "" }))
                        }
                      />
                    )}
                  </div>
                  {!draft?.showDraftCat && (
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
                  )}
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
                    {loadings.catLoading || loadings.deleteCatLoading ? (
                      <div className="h-[450px] flex items-center justify-center">
                        <span className="loader"></span>
                      </div>
                    ) : list?.catList?.length > 0 ? (
                      <>
                        {list?.catList?.map((d, index) => (
                          <div
                            className={`flex items-center gap-3 py-2 ps-2 ${
                              !showAll &&
                              selectedCats?.includes(d?._id) &&
                              "border border-purple-700"
                            } ${
                              !draft?.showDraftCat && "cursor-pointer"
                            } rounded`}
                            onClick={() => {
                              if (!draft?.showDraftCat) {
                                setShowAll(false);
                                setSelectedCats((prev) => {
                                  if (prev.includes(d?._id)) {
                                    if (prev?.length <= 1) setShowAll(true);
                                    return prev.filter((id) => id !== d?._id);
                                  } else {
                                    return [...prev, d?._id];
                                  }
                                });
                              }
                            }}
                            key={index}
                          >
                            <p className="w-[7%]">
                              {(pageInfo.catPageInfo.currentPage - 1) * 10 +
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
                                  setActive((prev) => ({
                                    ...prev,
                                    activeCat: d,
                                  }));
                                  setCreate((prev) => ({
                                    ...prev,
                                    openCreateCat: true,
                                  }));
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
                        {pageInfo.catPageInfo?.total > 10 && (
                          <div className="w-full flex items-center justify-end px-3">
                            <div className="flex items-center gap-2">
                              <LuArrowLeft
                                className={`cursor-pointer ${
                                  pageInfo.catPageInfo.currentPage > 1
                                    ? "text-black"
                                    : "text-gray-500"
                                }`}
                                onClick={() => {
                                  if (pageInfo.catPageInfo.currentPage > 1) {
                                    const prevPage =
                                      pageInfo.catPageInfo.currentPage - 1;
                                    setPageInfo((prev) => ({
                                      ...prev,
                                      catPageInfo: {
                                        ...prev.catPageInfo,
                                        currentPage: prevPage,
                                      },
                                    }));
                                    handleGetList(
                                      prevPage,
                                      search?.searchCat,
                                      draft.showDraftCat
                                        ? "/drafted-categories"
                                        : "/published-categories"
                                    );
                                  }
                                }}
                                size={20}
                              />

                              <LuArrowRight
                                className={`cursor-pointer ${
                                  pageInfo.catPageInfo.currentPage <
                                  pageInfo.catPageInfo.totalPages
                                    ? "text-black"
                                    : "text-gray-500"
                                }`}
                                onClick={() => {
                                  if (
                                    pageInfo.catPageInfo.currentPage <
                                    pageInfo.catPageInfo.totalPages
                                  ) {
                                    const nextPage =
                                      pageInfo.catPageInfo.currentPage + 1;
                                    setPageInfo((prev) => ({
                                      ...prev,
                                      catPageInfo: {
                                        ...prev.catPageInfo,
                                        currentPage: nextPage,
                                      },
                                    }));
                                    handleGetList(
                                      nextPage,
                                      search?.searchCat,
                                      draft.showDraftCat
                                        ? "/drafted-categories"
                                        : "/published-categories"
                                    );
                                  }
                                }}
                                size={20}
                              />
                            </div>
                          </div>
                        )}
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
          </>
        )}
      </div>

      {/* right products list */}
      <div className="bg-white border border-gray-200 w-full rounded">
        {/* upper bar */}
        <div className="p-3 border-b border-gray-200 flex items-center justify-between">
          <p className="text-lg font-[500] flex items-center gap-2">
            {/* when view prod */}
            {(openViewProd || create.openCreateProd) && (
              <IoIosArrowBack
                className="cursor-pointer"
                onClick={() => {
                  setOpenViewProd(false);
                  setCreate((prev) => ({ ...prev, openCreateProd: false }));
                  setActive((prev) => ({ ...prev, activeProd: null }));
                }}
              />
            )}
            {create.openCreateProd
              ? "Create Product"
              : openViewProd
              ? "Product Details"
              : "Products"}
          </p>
          {!create.openCreateProd && !openViewProd && (
            <div className="flex items-center gap-3">
              <div
                className="border border-gray-400 rounded cursor-pointer p-1 group hover:border-purple-700"
                onClick={() => {
                  setCreate((prev) => ({ ...prev, openCreateProd: true }));
                  setActive((prev) => ({ ...prev, activeProd: null }));
                  handleGetList(
                    pageInfo.catPageInfo?.currentPage,
                    search?.searchCat,
                    "/published-categories"
                  );
                  setError(null);
                }}
              >
                <LuPlus
                  className="text-gray-400 group-hover:text-purple-700"
                  size={16}
                />
              </div>
              <div className="">
                <label
                  htmlFor="excelUploadProd"
                  className="flex flex-col items-center justify-center w-full h-6 px-2 py-3 border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-purple-700 transition"
                >
                  <p className="text-gray-600 text-[10px] text-center">
                    Drag & drop or click to upload Excel file (.xlsx)
                  </p>
                </label>

                <input
                  id="excelUploadProd"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={(e) =>
                    handleBulkUpload(
                      e,
                      "uploadBulkProdLoading",
                      "/upload-products",
                      "Products"
                    )
                  }
                  className="hidden"
                />

                {loadings?.uploadBulkProdLoading && (
                  <p className="text-sm text-purple-600 mt-2 text-center">
                    Uploading products...
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        {create.openCreateProd &&
          (loadings.createProdLoading ? (
            <div className="h-[450px] flex items-center justify-center">
              <span className="loader"></span>
            </div>
          ) : (
            <div className="text-[12px]">
              <form
                onSubmit={(e) =>
                  active?.activeProd
                    ? handleUpdateProduct(e, active?.activeProd?._id)
                    : handleCreateProduct(e)
                }
                className="p-6"
              >
                {/* images */}
                <div className="flex gap-2">
                  <ImageUploader
                    img={
                      active?.activeProd?.images?.img1 ||
                      prodFormData?.images?.[0]
                    }
                    type="main"
                    onImageSelect={(file) =>
                      setProdFormData((prev) => {
                        const updatedImages = [...prev.images];
                        updatedImages[0] = file;
                        return { ...prev, images: updatedImages };
                      })
                    }
                    id="imageInput1"
                  />
                  <div className="flex flex-col gap-2">
                    <ImageUploader
                      img={
                        active?.activeProd?.images?.img2 ||
                        prodFormData?.images?.[1]
                      }
                      type="sub"
                      onImageSelect={(file) =>
                        setProdFormData((prev) => {
                          const updatedImages = [...prev.images];
                          updatedImages[1] = file;
                          return { ...prev, images: updatedImages };
                        })
                      }
                      id="imageInput2"
                    />
                    <ImageUploader
                      img={
                        active?.activeProd?.images?.img3 ||
                        prodFormData?.images?.[2]
                      }
                      type="sub"
                      onImageSelect={(file) =>
                        setProdFormData((prev) => {
                          const updatedImages = [...prev.images];
                          updatedImages[2] = file;
                          return { ...prev, images: updatedImages };
                        })
                      }
                      id="imageInput3"
                    />
                    <ImageUploader
                      img={
                        active?.activeProd?.images?.img4 ||
                        prodFormData?.images?.[3]
                      }
                      type="sub"
                      onImageSelect={(file) =>
                        setProdFormData((prev) => {
                          const updatedImages = [...prev.images];
                          updatedImages[3] = file;
                          return { ...prev, images: updatedImages };
                        })
                      }
                      id="imageInput4"
                    />
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
                    <select
                      className="outline-none border border-gray-400 rounded p-[9px]"
                      value={prodFormData.categoryId}
                      onChange={(e) => {
                        const selected = publishedCat.find(
                          (c) => c._id === e.target.value
                        );
                        setProdFormData((prev) => ({
                          ...prev,
                          categoryId: selected?._id,
                          categoryName: selected?.name,
                        }));
                      }}
                    >
                      <option value="">Select</option>
                      {publishedCat?.map((c) => (
                        <option value={c?._id} key={c?._id}>
                          {c?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* price, discount %, discounted price */}
                <div className="flex items-center gap-2">
                  {/* price */}
                  <div className="flex flex-col mt-4 gap-2">
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
                  <div className="flex flex-col mt-4 gap-2">
                    <label>Discount %</label>
                    <input
                      type="text"
                      placeholder="Discount %"
                      className="outline-none border border-gray-400 rounded p-2"
                      value={prodFormData?.discount_percent}
                      onChange={(e) =>
                        setProdFormData((prev) => ({
                          ...prev,
                          discount: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                {/* final discount */}
                <div className="flex flex-col mt-4 gap-2">
                  <label>Final Discounted Price</label>
                  <input
                    type="text"
                    placeholder={discountedPrice}
                    className="outline-none border border-gray-400 rounded p-2"
                    disabled
                  />
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
                    {selectedFormat === "paragraph" &&
                    active?.activeProd?.length <= 1 ? (
                      <textarea
                        className="outline-none border border-gray-400 rounded p-2 w-full resize-none"
                        placeholder="Write your product description in paragraph format..."
                        rows={4}
                        value={prodFormData?.description?.[0] || ""}
                        onChange={(e) =>
                          setProdFormData((prev) => ({
                            ...prev,
                            description: [e.target.value],
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
                  <select
                    className="outline-none border border-gray-400 rounded p-[9px]"
                    value={prodFormData.specified_by}
                    onChange={(e) =>
                      setProdFormData((prev) => ({
                        ...prev,
                        specified_by: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select Type</option>
                    <option value="none">None</option>
                    <option value="clothing">Clothing</option>
                    <option value="bags">Bags</option>
                  </select>

                  <div className="mt-2">
                    <ProductSpecification
                      formData={prodFormData}
                      setFormData={setProdFormData}
                      selectedFormat={prodFormData.specified_by}
                    />
                  </div>
                </div>

                {/* cancel or create */}
                <div className="flex gap-3 mt-6">
                  <button
                    className="text-center w-full p-2 border border-red-500 text-red-500 rounded cursor-pointer hover:bg-red-500 hover:text-white"
                    onClick={() => {
                      setCreate((prev) => ({ ...prev, openCreateProd: false }));
                      setActive((prev) => ({ ...prev, activeProd: null }));
                      resetCatForm();
                      setError(null);
                      handleGetList(
                        pageInfo.prodPageInfo.currentPage,
                        search?.searchProd,
                        "/drafted-products"
                      );
                    }}
                  >
                    Cancel
                  </button>
                  <input
                    type="submit"
                    value={`${active?.activeProd ? "Update" : "Create"}`}
                    className="text-center w-full p-2 border border-purple-700 text-purple-700 rounded cursor-pointer hover:bg-purple-700 hover:text-white"
                  />
                </div>
              </form>
            </div>
          ))}

        {/* In case of view the product */}
        {openViewProd && (
          <div className="p-3">
            {/* product images */}
            <div className="grid grid-cols-2 gap-3">
              <ImageViewer
                img={active?.activeProd?.images?.img1}
                customClass="w-full max-h-[180px]"
              />
              {active?.activeProd?.images?.img2 && (
                <ImageViewer
                  img={active?.activeProd?.images?.img2}
                  customClass="w-full max-h-[180px]"
                />
              )}
              {active?.activeProd?.images?.img3 && (
                <ImageViewer
                  img={active?.activeProd?.images?.img3}
                  customClass="w-full max-h-[180px]"
                />
              )}
              {active?.activeProd?.images?.img4 && (
                <ImageViewer
                  img={active?.activeProd?.images?.img4}
                  customClass="w-full max-h-[180px]"
                />
              )}
            </div>
            <div className="relative">
              <div className="mt-4 flex items-center justify-end absolute right-2">
                <ToggleButton
                  status={active?.activeProd?.status}
                  productId={active?.activeProd?._id}
                  show={
                    active?.activeProd?.images?.img1 &&
                    active?.activeProd?.name &&
                    active?.activeProd?.price &&
                    active?.activeProd?.categoryDetail?.categoryName
                  }
                />
              </div>
            </div>
            <div className="mt-5 px-5 flex flex-col gap-2">
              {/* sku */}
              <div className="flex items-start gap-4 text-[13px]">
                <p className="w-[30%]">SKU</p>
                <p className="w-[70%] text-gray-500">
                  {active?.activeProd?.sku}
                </p>
              </div>
              {/* name */}
              <div className="flex items-start gap-4 text-[13px]">
                <p className="w-[30%]">Name</p>
                <p className="w-[70%] text-gray-500">
                  {active?.activeProd?.name}
                </p>
              </div>
              {/* category */}
              <div className="flex items-start gap-4 text-[13px]">
                <p className="w-[30%]">Category</p>
                <p className="w-[70%] text-gray-500">
                  {active?.activeProd?.categoryDetail?.categoryName}
                </p>
              </div>
              {/* price */}
              <div className="flex items-start gap-4 text-[13px]">
                <p className="w-[30%]">Price</p>
                <p className="w-[70%] text-gray-500">
                  Rs. {active?.activeProd?.price}
                </p>
              </div>
              {/* discount */}
              <div className="flex items-start gap-4 text-[13px]">
                <p className="w-[30%]">Discount</p>
                <p className="w-[70%] text-gray-500">
                  {active?.activeProd?.discount || 0}%
                </p>
              </div>
              {/* stock */}
              <div className="flex items-start gap-4 text-[13px]">
                <p className="w-[30%]">Stock</p>
                <p className="w-[70%] text-gray-500">
                  {active?.activeProd?.stock} Pcs.
                </p>
              </div>
              {/* description */}
              <div className="flex items-start gap-4 text-[13px] w-full">
                <p className="w-[30%]">Description</p>
                <div className="w-[70%] flex flex-col gap-1">
                  {active?.activeProd?.description?.map((d, index) => (
                    <p className="text-gray-500 " key={index}>
                      - {d}
                    </p>
                  ))}
                </div>
              </div>
              {/* specified by */}
              <div className="flex items-start gap-4 text-[13px]">
                <p className="w-[30%]">Specified By</p>
                <p className="w-[70%] text-gray-500">
                  {active?.activeProd?.specified_by}
                </p>
              </div>
              {/* size chart */}
              {active?.activeProd?.size_chart && (
                <div className="flex items-start gap-4 text-[13px]">
                  <p className="w-[30%]">Size Chart</p>
                  <ImageViewer
                    img={active?.activeProd?.size_chart}
                    customClass="w-[70%] max-h-[200px]"
                  />
                </div>
              )}
              {/* dimensions */}
              {(active?.activeProd?.dimensions?.length ||
                active?.activeProd?.dimensions?.breadth ||
                active?.activeProd?.dimensions?.height) && (
                <div className="flex items-start gap-4 text-[13px]">
                  <p className="w-[30%]">Dimensions</p>
                  <p className="w-[70%] text-gray-500">
                    {active?.activeProd?.dimensions?.length} x{" "}
                    {active?.activeProd?.dimensions?.breadth} x{" "}
                    {active?.activeProd?.dimensions?.height}
                  </p>
                </div>
              )}
              {/* tags */}
              {active?.activeProd?.tags?.length > 0 && (
                <div className="flex items-start gap-4 text-[13px]">
                  <p className="w-[30%]">Tags</p>
                  <p className="w-[70%] text-gray-500">
                    {active?.activeProd?.tags?.map((d, index) => (
                      <span key={index}>{d}, &nbsp;</span>
                    ))}
                  </p>
                </div>
              )}
              {/* size */}
              {active?.activeProd?.size?.length > 0 && (
                <div className="flex items-start gap-4 text-[13px]">
                  <p className="w-[30%]">Size</p>
                  <p className="w-[70%] text-gray-500">
                    {active?.activeProd?.size?.map((d, index) => (
                      <span key={index}>{d}, &nbsp;</span>
                    ))}
                  </p>
                </div>
              )}
              {/* color */}
              {active?.activeProd?.color?.length > 0 && (
                <div className="flex items-start gap-4 text-[13px]">
                  <p className="w-[30%]">Color</p>
                  <p className="w-[70%] text-gray-500">
                    {active?.activeProd?.color?.map((d, index) => (
                      <span key={index}>{d}, &nbsp;</span>
                    ))}
                  </p>
                </div>
              )}
              {/* material */}
              {active?.activeProd?.material && (
                <div className="flex items-start gap-4 text-[13px]">
                  <p className="w-[30%]">Material</p>
                  <p className="w-[70%] text-gray-500">
                    {active?.activeProd?.material}
                  </p>
                </div>
              )}
              {/* target audience */}
              {active?.activeProd?.target_audience && (
                <div className="flex items-start gap-4 text-[13px]">
                  <p className="w-[30%]">Target Audience</p>
                  <p className="w-[70%] text-gray-500">
                    {active?.activeProd?.target_audience}
                  </p>
                </div>
              )}
              {/* fit type */}
              {active?.activeProd?.fit_type && (
                <div className="flex items-start gap-4 text-[13px]">
                  <p className="w-[30%]">Fit Type</p>
                  <p className="w-[70%] text-gray-500">
                    {active?.activeProd?.fit_type}
                  </p>
                </div>
              )}
              {/* pattern */}
              {active?.activeProd?.pattern && (
                <div className="flex items-start gap-4 text-[13px]">
                  <p className="w-[30%]">Pattern</p>
                  <p className="w-[70%] text-gray-500">
                    {active?.activeProd?.pattern}
                  </p>
                </div>
              )}
              {/* occasion */}
              {active?.activeProd?.occasion && (
                <div className="flex items-start gap-4 text-[13px]">
                  <p className="w-[30%]">Occasion</p>
                  <p className="w-[70%] text-gray-500">
                    {active?.activeProd?.occasion}
                  </p>
                </div>
              )}
              {/* care instruction */}
              {active?.activeProd?.care_instruction && (
                <div className="flex items-start gap-4 text-[13px]">
                  <p className="w-[30%]">Care Instruction</p>
                  <p className="w-[70%] text-gray-500">
                    {active?.activeProd?.care_instruction}
                  </p>
                </div>
              )}
              {/* closure type */}
              {active?.activeProd?.closure_type && (
                <div className="flex items-start gap-4 text-[13px]">
                  <p className="w-[30%]">Closure Type</p>
                  <p className="w-[70%] text-gray-500">
                    {active?.activeProd?.closure_type}
                  </p>
                </div>
              )}
              {/* capacity */}
              {active?.activeProd?.capacity && (
                <div className="flex items-start gap-4 text-[13px]">
                  <p className="w-[30%]">Capacity</p>
                  <p className="w-[70%] text-gray-500">
                    {active?.activeProd?.capacity}
                  </p>
                </div>
              )}
              {/* compartment details */}
              {active?.activeProd?.compartment_details && (
                <div className="flex items-start gap-4 text-[13px]">
                  <p className="w-[30%]">Compartment Details</p>
                  <p className="w-[70%] text-gray-500">
                    {active?.activeProd?.compartment_details}
                  </p>
                </div>
              )}
              {/* strap type */}
              {active?.activeProd?.strap_type && (
                <div className="flex items-start gap-4 text-[13px]">
                  <p className="w-[30%]">Strap Type</p>
                  <p className="w-[70%] text-gray-500">
                    {active?.activeProd?.strap_type}
                  </p>
                </div>
              )}
              {/* created at */}
              <div className="flex items-start gap-4 text-[13px]">
                <p className="w-[30%]">Created At</p>
                <p className="w-[70%] text-gray-500">
                  {active?.activeProd?.createdAt}
                </p>
              </div>
              {/* updated at */}
              <div className="flex items-start gap-4 text-[13px]">
                <p className="w-[30%]">Updated At</p>
                <p className="w-[70%] text-gray-500">
                  {active?.activeProd?.updatedAt}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* list of products */}
        {!create.openCreateProd && !openViewProd && (
          <>
            {/* draft or published navs */}
            <div className="flex items-center justify-center text-[12px]">
              <p
                className={`text-center w-full ${
                  draft.showDraftProd ? "bg-purple-700/50" : "bg-purple-700/10"
                } cursor-pointer py-3`}
                onClick={() => {
                  setDraft((prev) => ({ ...prev, showDraftProd: true }));
                  handleGetList(
                    pageInfo.prodPageInfo?.currentPage,
                    search?.searchProd,
                    "/drafted-products"
                  );
                  setSearch((prev) => ({ ...prev, searchProd: "" }));
                  setPageInfo((prev) => ({
                    ...prev,
                    prodPageInfo: { ...prev.prodPageInfo, currentPage: 1 },
                  }));
                }}
              >
                Drafts
              </p>
              <p
                className={`text-center w-full ${
                  !draft.showDraftProd ? "bg-purple-700/50" : "bg-purple-700/10"
                } cursor-pointer py-3`}
                onClick={() => {
                  setDraft((prev) => ({ ...prev, showDraftProd: false }));
                  handleGetList(
                    pageInfo.prodPageInfo?.currentPage,
                    search?.searchProd,
                    "/published-products"
                  );
                  setSearch((prev) => ({ ...prev, searchProd: "" }));
                  setPageInfo((prev) => ({
                    ...prev,
                    prodPageInfo: { ...prev.prodPageInfo, currentPage: 1 },
                  }));
                }}
              >
                Published
              </p>
            </div>
            <div className="p-3">
              {/* search */}
              <div className="flex items-center justify-between text-[11px]">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    className="outline-none bg-gray-100 rounded p-2 px-4"
                    placeholder="Search Product"
                    value={search?.searchProd}
                    onChange={(e) =>
                      setSearch((prev) => ({
                        ...prev,
                        searchProd: e.target.value,
                      }))
                    }
                  />
                  {search?.searchProd && (
                    <RxCross2
                      className="absolute right-2 text-gray-500 cursor-pointer"
                      onClick={() =>
                        setSearch((prev) => ({ ...prev, searchProd: "" }))
                      }
                    />
                  )}
                </div>
                {/* delete button */}
                {selectedProdIDs?.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      className={`rounded bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 cursor-pointer`}
                      onClick={deleteMultipleProducts}
                    >
                      Delete {selectedProdIDs?.length} items
                    </button>
                    <BiRefresh
                      size={20}
                      className="cursor-pointer"
                      onClick={() => setSelectedProdIDs([])}
                    />
                  </div>
                )}
              </div>
              {/* results */}
              <div className="py-4 px-2">
                {/* header of table */}
                <div className="flex items-center gap-3 w-full mb-3 text-[11px]">
                  <p className="w-[10%] font-[500]">Sr.No</p>
                  <p className="w-[35%] font-[500]">Product</p>
                  <p className="w-[15%] font-[500]">Stock</p>
                  <p className="w-[10%] font-[500]">View</p>
                  <p className="w-[10%] font-[500]">Edit</p>
                  <p className="w-[10%] font-[500]">Delete</p>
                </div>
                {/* table content */}
                <div className="flex flex-col gap-3 w-full py-3 text-[11px]">
                  {loadings?.prodLoading || loadings?.deleteProdLoading ? (
                    <div className="min-h-[450px] flex items-center justify-center">
                      <span className="loader"></span>
                    </div>
                  ) : list?.prodList?.length > 0 ? (
                    <>
                      {list?.prodList?.map((d, index) => (
                        <div
                          className={`flex items-center gap-3 p-2 cursor-pointer rounded ${
                            selectedProdIDs?.includes(d?._id) &&
                            "border border-red-500"
                          }`}
                          key={index}
                          onClick={() => {
                            setSelectedProdIDs((prev) => {
                              if (prev.includes(d?._id)) {
                                return prev.filter((id) => id !== d?._id);
                              } else {
                                return [...prev, d?._id];
                              }
                            });
                          }}
                        >
                          <p className="w-[10%]">
                            {(pageInfo.prodPageInfo.currentPage - 1) * 10 +
                              (index + 1)}
                          </p>
                          <div className="w-[35%] flex items-center gap-3">
                            <img
                              src={d?.images?.img1}
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
                                setActive((prev) => ({
                                  ...prev,
                                  activeProd: d,
                                }));
                                setOpenViewProd(true);
                                getProductDetails(d?._id);
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
                                setActive((prev) => ({
                                  ...prev,
                                  activeProd: d,
                                }));
                                setCreate((prev) => ({
                                  ...prev,
                                  openCreateProd: true,
                                }));
                                getProductDetails(d?._id);
                                handleGetList(
                                  pageInfo.catPageInfo?.currentPage,
                                  search?.searchCat,
                                  "/published-categories"
                                );
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
                                setActive((prev) => ({
                                  ...prev,
                                  activeCat: d,
                                }));
                                deleteProduct(d?._id);
                              }}
                            >
                              <MdDelete className="text-gray-400 group-hover:text-red-500" />
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* arrows for pagination */}
                      {pageInfo.prodPageInfo?.total > 10 && (
                        <div className="w-full flex items-center justify-end px-3">
                          <div className="flex items-center gap-2">
                            <LuArrowLeft
                              className={`cursor-pointer ${
                                pageInfo.prodPageInfo.currentPage > 1
                                  ? "text-black"
                                  : "text-gray-500"
                              }`}
                              onClick={() => {
                                if (pageInfo.prodPageInfo.currentPage > 1) {
                                  const prevPage =
                                    pageInfo.prodPageInfo.currentPage - 1;
                                  setPageInfo((prev) => ({
                                    ...prev,
                                    prodPageInfo: {
                                      ...prev.prodPageInfo,
                                      currentPage: prevPage,
                                    },
                                  }));
                                  handleGetList(
                                    prevPage,
                                    search?.searchProd,
                                    draft.showDraftProd
                                      ? "/drafted-products"
                                      : "/published-products"
                                  );
                                }
                              }}
                              size={20}
                            />

                            <LuArrowRight
                              className={`cursor-pointer ${
                                pageInfo.prodPageInfo.currentPage <
                                pageInfo.prodPageInfo.totalPages
                                  ? "text-black"
                                  : "text-gray-500"
                              }`}
                              onClick={() => {
                                if (
                                  pageInfo.prodPageInfo.currentPage <
                                  pageInfo.prodPageInfo.totalPages
                                ) {
                                  const nextPage =
                                    pageInfo.prodPageInfo.currentPage + 1;
                                  setPageInfo((prev) => ({
                                    ...prev,
                                    prodPageInfo: {
                                      ...prev.prodPageInfo,
                                      currentPage: nextPage,
                                    },
                                  }));
                                  handleGetList(
                                    nextPage,
                                    search?.searchProd,
                                    draft.showDraftProd
                                      ? "/drafted-products"
                                      : "/published-products"
                                  );
                                }
                              }}
                              size={20}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-[180px]">
                      <p>Products Not Found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
