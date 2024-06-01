import React from "react";

export const usePagination = ({ count, siblingCount = 1, currentPage, totalPages }: any) => {
  const paginationRange = React.useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return [...Array(totalPages)].map((_, index) => index + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = [...Array(leftItemCount)].map((_, index) => index + 1);

      return [...leftRange, ...[null], lastPageIndex];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = [...Array(rightItemCount)].map((_, index) => totalPages - index);

      return [firstPageIndex, ...[null], ...rightRange.reverse()];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = [...Array(3)].map((_, index) => leftSiblingIndex + index);

      return [firstPageIndex, ...[null], ...middleRange, ...[null], lastPageIndex];
    }
  }, [totalPages, count, siblingCount, currentPage]);
  return paginationRange;
};
