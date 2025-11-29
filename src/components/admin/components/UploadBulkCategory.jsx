import React from "react";
import * as XLSX from "xlsx";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { toastSuccess } from "../../../utils/toast";
import axiosPublic from "../../../utils/axiosPublic";
import axiosPrivate from "../../../utils/axiosPrivate";

const UploadBulkCategory = ({ setOpenBulk }) => {
  const [bulkUploadLoading, setBulkUploadLoading] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

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

      // Expected columns:
      // name, description, slug, parent, icon, banner, isActive, isFeatured

      const formatted = data.map((item) => ({
        name: item.name?.trim(),
        description: item.description,
        slug: item.slug?.trim(),
        parent: item.parent?.trim() || null,
        icon: item.icon || "",
        banner: item.banner || "",
        isActive: item.isActive === "true" || item.isActive === true,
        isFeatured: item.isFeatured === "true" || item.isFeatured === true,
      }));

      setPreviewData(formatted);
      setLoading(false);
    };

    reader.readAsBinaryString(file);
  };

  const handleUpload = async () => {
    setSubmitLoading(true);
    try {
      const res = await axiosPrivate.post(
        "/categories/bulk-upload",
        { categories: previewData } // <-- data goes here
      );

      toastSuccess("Categories Uploaded Successfully!");
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
      <div className="flex items-start gap-3">
        {/* left upload option */}
        <div className="w-1/2 h-[300px]">
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
        {/* name, slug, parent, banner, isActive, isfeatured */}
        <div className="w-1/2 rounded-md border border-gray-200 shadow-md">
          <div className="flex items-center justify-between p-2 border-b border-gray-200">
            <p className="">Uploaded Data</p>
            {!loading &&
              previewData?.length > 0 &&
              (submitLoading ? (
                <button
                  className="rounded bg-green-500 text-white py-2 px-2 w-32"
                >
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
          {/*  name, description, slug, parent, icon, banner, isActive, isFeatured */}
          {loading && <p>Loading...</p>}

          {previewData?.length > 0 ? (
            <div className="p-3 flex flex-col gap-3">
              {previewData?.map((d, index) => (
                <div className="flex h-[200px] rounded-md shadow" key={index}>
                  <div className="w-[70%]">
                    <div className="border-b border-gray-200 flex gap-3 p-2">
                      <img
                        src={d.icon}
                        alt=""
                        className="h-10 w-10 rounded-md"
                      />
                      <p className="text-[12px]">{d.name}</p>
                    </div>
                    <p className="p-2 text-gray-500 text-[12px] border-b border-gray-200 h-24 overflow-y-auto">
                      {d.description}
                    </p>
                    <div className="flex items-center justify-between h-12 p-2">
                      <p className="">{d.slug}</p>
                      <div className=" text-[10px] flex gap-3">
                        <p>{d.isActive ? "Active" : "Not Active"}</p>
                        <p>{d.isFeatured ? "Featured" : "Not Featured"}</p>
                      </div>
                    </div>
                  </div>
                  <img
                    src={d.banner}
                    alt=""
                    className="w-[30%] h-full object-cover rounded-r-md"
                  />
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

export default UploadBulkCategory;
