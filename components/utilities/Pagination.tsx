import React from "react";
// hooks
import { usePagination } from "@components/hooks/usePagination";
// ui icons
import { ChevronLeftIcon, ChevronRightIcon, HorizontalDotIcon } from "@ui/icons";

const Pagination = ({ count, totalPages, onPageChange, currentPage }: any) => {
  const paginationRange: any = usePagination({
    count,
    currentPage,
    totalPages,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage !== totalPages) onPageChange(`${count}:${currentPage + 1 - 1}:0`);
  };

  const onPrevious = () => {
    if (currentPage !== 1) onPageChange(`${count}:${currentPage - 1 - 1}:0`);
  };

  const handlePage = (pageNumber: any) => {
    onPageChange(`${count}:${pageNumber - 1}:0`);
  };

  const disabledClassName = `cursor-not-allowed border border-dark-0 text-dark-0 px-3 py-2 bg-dark-0/20 flex justify-center items-center m-1 h-10 w-10 flex-shrink-0 rounded-sm`;
  const activeClassName = `border border-violet-100 text-violet-100 px-3 py-2 bg-[#CC96AE59] flex justify-center items-center m-1 h-10 w-10 flex-shrink-0 rounded-sm hover:bg-violet-100/40 cursor-pointer`;
  const notActiveClassName = `border border-dark-0 text-dark-0 px-3 py-2 bg-light-0 flex justify-center items-center m-1 h-10 w-10 flex-shrink-0 rounded-sm hover:bg-gray-200 cursor-pointer`;

  return (
    <ul className="flex w-full">
      {/* previous */}
      <li
        className={` ${currentPage === 1 ? disabledClassName : activeClassName}`}
        onClick={onPrevious}
      >
        <ChevronLeftIcon height="12" width="12" />
      </li>

      {paginationRange?.map((pageNumber: any) => {
        if (pageNumber === null) {
          return (
            <li key={pageNumber} className={`${disabledClassName}`}>
              <HorizontalDotIcon height="12" width="12" />
            </li>
          );
        }

        return (
          <div
            key={pageNumber}
            className={` ${currentPage === pageNumber ? activeClassName : notActiveClassName}`}
            onClick={() => handlePage(pageNumber)}
          >
            {pageNumber}
          </div>
        );
      })}

      {/* next */}
      <li
        className={`${currentPage === totalPages ? disabledClassName : activeClassName}`}
        onClick={onNext}
      >
        <ChevronRightIcon height="12" width="12" />
      </li>
    </ul>
  );
};

export default Pagination;
