import React from "react";

const PaginationForAll = ({
  currentPage,
  totalItems,
  perPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  // Generate page numbers with ellipsis like: 1, 2, 3, ..., 10
  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  return (
    <div className="flex items-center justify-between px-2 py-4 text-[13px]">

      {/* LEFT SIDE: RESULTS SUMMARY */}
      <div className="text-gray-700 font-medium ">
        Results: {startItem} - {endItem} of {totalItems}
      </div>

      {/* RIGHT SIDE: PAGINATION BUTTONS */}
      <div className="flex items-center gap-2">
        
        {/* Prev Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`w-9 h-9 flex items-center justify-center border rounded 
            ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}
          `}
        >
          ‹
        </button>

        {/* Page Numbers */}
        {getPages().map((pg, index) => (
          <button
            key={index}
            disabled={pg === "..."}
            onClick={() => pg !== "..." && onPageChange(pg)}
            className={`min-w-[36px] h-9 flex items-center justify-center rounded border
               transition
              ${
                pg === currentPage
                  ? "bg-[#ae9896] text-white border-[#ae9896]"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }
              ${pg === "..." ? "cursor-default border-none" : ""}
            `}
          >
            {pg}
          </button>
        ))}

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`w-9 h-9 flex items-center justify-center border shadow rounded 
            ${currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}
          `}
        >
          ›
        </button>

      </div>
    </div>
  );
};

export default PaginationForAll;
