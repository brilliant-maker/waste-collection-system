import { useMemo, useState, useEffect } from "react";

export default function usePaginate(data, itemsPerPage = 10, siblingCount = 1) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = Array.isArray(data) ? data.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Keep current page if possible, otherwise clamp
  useEffect(() => {
    setCurrentPage((prev) => {
      if (totalPages === 0) return 1;
      return Math.min(prev, totalPages);
    });
  }, [data, totalPages]);

  const paginatedData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  // Windowed pagination (with ellipsis)
  const pages = useMemo(() => {
    if (totalPages <= 1) return [1];

    const range = (start, end) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftRange = range(1, 3 + 2 * siblingCount);
      return [...leftRange, "...", totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = range(totalPages - (3 + 2 * siblingCount) + 1, totalPages);
      return [1, "...", ...rightRange];
    }

    const middleRange = range(leftSibling, rightSibling);
    return [1, "...", ...middleRange, "...", totalPages];
  }, [totalPages, currentPage, siblingCount]);

  const goToPage = (page) => {
    const p = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(p);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  // Navigation helpers
  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  return {
    currentPage,
    totalPages,
    paginatedData,
    pages,
    hasNext,
    hasPrev,
    setPage: goToPage,
    nextPage,
    prevPage,
  };
}
