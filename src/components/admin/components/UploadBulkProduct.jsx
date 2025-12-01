import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { toastError, toastSuccess } from "../../../utils/toast";
import axiosPrivate from "../../../utils/axiosPrivate";
import { useState } from "react";
import * as XLSX from "xlsx";

const UploadBulkProduct = ({ setOpenBulk }) => {
  const [bulkUploadLoading, setBulkUploadLoading] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const safeJson = (value) => {
    if (!value) return {};

    try {
      return JSON.parse(
        typeof value === "string"
          ? value.replace(/(\r\n|\n|\r)/gm, "") // remove newlines
          : value
      );
    } catch (e) {
      console.error("Invalid JSON:", value);
      return value; // fallback
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryStr = evt.target.result;

      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });

      const formatted = data.map((item) => ({
        title: item.title?.trim(),
        brand: item.brand?.trim(),
        categoryName: item.categoryName?.trim(),

        price: Number(item.price) || 0,
        discountPercentage: Number(item.discountPercentage) || 0,

        descriptionParagraph: item.descriptionParagraph || "",
        descriptionPoints: JSON.parse(item.descriptionPoints) || "[]",
        specs: safeJson(item.specs) || "{}", // JSON string

        variants: safeJson(item.variants) || "[]", // JSON string
      }));

      setPreviewData(formatted);
      setLoading(false);
    };

    reader.readAsBinaryString(file);
  };

  const handleUpload = async () => {
    setSubmitLoading(true);

    try {
      const res = await axiosPrivate.post("/products/bulk-upload", {
        products: previewData,
      });

      toastSuccess("Products Uploaded Successfully!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toastError("Upload failed!");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div>
      <div
        className="flex items-center gap-2 mb-3 cursor-pointer"
        onClick={() => setOpenBulk(false)}
      >
        <IoIosArrowBack size={15} className="" />
        <span>Back</span>
      </div>
      {/* body */}
      <div className="flex flex-col items-start gap-3 w-full">
        {/* left upload option */}
        <div className="h-[100px] w-full">
          <label
            htmlFor="excelUpload"
            className="flex flex-col items-center justify-center w-full h-full px-2 py-3 border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-black transition"
          >
            <p className="text-gray-600 text-[10px] text-center">
              Drag & drop or click to upload Excel file (.xlsx)
            </p>
          </label>

          <input
            id="excelUpload"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        {/* right uploaded list */}
        {/*  name, description, slug, parent, icon, banner, isActive, isFeatured */}
        <div className="rounded-md border border-gray-200 shadow-md w-full">
          <div className="flex items-center justify-between p-2 border-b border-gray-200">
            <p className="">Uploaded Data</p>
            {!loading &&
              previewData?.length > 0 &&
              (submitLoading ? (
                <button className="rounded bg-green-500 text-white py-2 px-2 w-32">
                  Loading...
                </button>
              ) : (
                <button
                  onClick={handleUpload}
                  className="rounded bg-green-600 text-white hover:bg-green-700 cursor-pointer py-2 px-2 w-32"
                >
                  Upload to Server
                </button>
              ))}
          </div>
          {loading && <p>Loading...</p>}

          {previewData?.length > 0 ? (
            <div className="p-3 flex flex-col gap-3">
              {previewData?.map((d, index) => (
                <div
                  className="flex min-h-[200px] rounded-md shadow"
                  key={index}
                >
                  <div className="w-[70%] border-r border-gray-200">
                    <p className="font-semibold border-b border-gray-200 p-2 text-[14px]">
                      {d.title}
                    </p>
                    <div className="p-2 mb-2">
                      {/* brand */}
                      <div className="flex gap-3 mt-1 ms-1">
                        <p className="text-gray-400 w-[40%]">Brand</p>
                        <p className="w-[60%]">{d.brand}</p>
                      </div>
                      {/* category */}
                      <div className="flex gap-3 mt-4 ms-1">
                        <p className="text-gray-400 w-[40%]">Category</p>
                        <p className="w-[60%]">{d.categoryName}</p>
                      </div>
                      {/* price */}
                      <div className="flex gap-3 mt-4 ms-1">
                        <p className="text-gray-400 w-[40%]">Price</p>
                        <p className="w-[60%]">Rs. {d.price}</p>
                      </div>
                      {/* discount % */}
                      <div className="flex gap-3 mt-4 ms-1">
                        <p className="text-gray-400 w-[40%]">Discount %</p>
                        <p className="w-[60%]">Rs. {d.descriptionParagraph}</p>
                      </div>
                      {/* desc para */}
                      <div className="flex gap-3 mt-4 ms-1">
                        <p className="text-gray-400 w-[40%]">
                          Description Paragraph
                        </p>
                        <p className="w-[60%] max-h-[150px] overflow-y-auto">
                          {d.descriptionParagraph}
                        </p>
                      </div>
                      {/* desc points */}
                      <div className="flex gap-6 mt-4 ms-1">
                        <p className="text-gray-400 w-[40%]">
                          Description Points
                        </p>
                        <div className="flex flex-col">
                          {d.descriptionPoints.map((dp, index) => (
                            <li key={index} className="w-[60%]">
                              {dp}
                            </li>
                          ))}
                        </div>
                      </div>
                      {/* specs */}
                      <div className="flex gap-3 mt-4 ms-1">
                        <p className="text-gray-400 w-[40%]">Specification</p>
                        <div className="w-[60%] flex">
                          <div className="flex flex-col gap-2 w-1/2">
                            {Object.keys(d.specs).map((k, index) => (
                              <p className="" key={index}>
                                {k}:
                              </p>
                            ))}
                          </div>
                          <div className="flex flex-col gap-2 w-1/2">
                            {Object.values(d.specs).map((k, index) => (
                              <p className="" key={index}>
                                {k}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* variants */}
                  <div className="w-[30%]">
                    <p className="p-2 border-b border-gray-200">Variants</p>
                    <div className="overflow-y-auto p-3 flex flex-col gap-3">
                      {d.variants.map((v, index) => (
                        <div
                          className="shadow rounded border border-gray-200 p-2 text-[12px]"
                          key={index}
                        >
                          {/* images */}
                          <div className="flex items-center gap-2 overflow-x-auto">
                            {v.images.map((im, index) => (
                              <img
                                key={index}
                                src={im?.url}
                                alt={`variant-${index}`}
                                className="h-[100px] w-[100px] object-cover rounded"
                              />
                            ))}
                          </div>
                          {/* color name */}
                          <div className="flex gap-3 mt-2 ms-1">
                            <p className="text-gray-400 w-[40%]">Color Name</p>
                            <p className="w-[60%]">{v.colorName}</p>
                          </div>
                          {/* color code */}
                          <div className="flex gap-3 mt-1 ms-1">
                            <p className="text-gray-400 w-[40%]">Color Code</p>
                            <p className="w-[60%]">{v.colorCode} <span className={`w-4 h-4`} style={{ backgroundColor: v.colorCode }}></span> </p>
                          </div>
                          {/* stock */}
                          <div className="flex gap-3 mt-1 ms-1">
                            <p className="text-gray-400 w-[40%]">Stock</p>
                            <p className="w-[60%]">{v.stock}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <img
                      src={d.banner}
                      alt=""
                      className="h-full object-cover rounded-r-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[300px]">
              No Data Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadBulkProduct;
