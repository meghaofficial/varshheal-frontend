import { useState } from 'react';
import { ChevronRight, ChevronLeft } from "lucide-react";

const Pagination = ({ totalPages = 20, visibleCount = 5 }) => {
  const [currPage, setCurrPage] = useState(1);
  const [visibleStart, setVisibleStart] = useState(1);

  const handlePrev = () => {
    if (currPage > 1) {
      const newPage = currPage - 1;
      setCurrPage(newPage);
      if (newPage < visibleStart) setVisibleStart(visibleStart - 1);
    }
  };

  const handleNext = () => {
    if (currPage < totalPages) {
      const newPage = currPage + 1;
      setCurrPage(newPage);
      if (newPage >= visibleStart + visibleCount) setVisibleStart(visibleStart + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mb-10 mt-6 select-none">
      <ChevronLeft 
        className={`cursor-pointer ${currPage === 1 ? "opacity-50 pointer-events-none" : ""}`} 
        onClick={handlePrev} 
      />

      {Array.from({ length: visibleCount }).map((_, index) => {
        const pageNum = visibleStart + index;
        if (pageNum > totalPages) return null;

        return (
          <div
            key={pageNum}
            className={`h-7 w-7 rounded-full flex items-center justify-center cursor-pointer hover:font-semibold ${
              currPage === pageNum ? 'bg-black text-white' : ''
            }`}
            onClick={() => setCurrPage(pageNum)}
          >
            {pageNum}
          </div>
        );
      })}

      <ChevronRight 
        className={`cursor-pointer ${currPage === totalPages ? "opacity-50 pointer-events-none" : ""}`} 
        onClick={handleNext} 
      />
    </div>
  );
};

export default Pagination;
