import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

export default function Paginate({
  currentPage,
  totalPage = 5,
  setCurrentPage,
}) {
  const getvisiblePages = () => {
    if (currentPage === 1) {
      return [1, 2, 3];
    }
    if (currentPage == totalPage) {
      return [totalPage - 2, totalPage - 1, totalPage]; // [3,4,5]
    }
    return [currentPage - 1, currentPage, currentPage + 1]; // [2,3,4]
  };

  const visiblePages = getvisiblePages();
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          onClick={() => {
            if (currentPage == 1) return;
            setCurrentPage(currentPage - 1);
          }}
        >
          <PaginationPrevious href="#" />
        </PaginationItem>
        {currentPage < 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {visiblePages.map((page, i) => (
          <PaginationItem onClick={() => setCurrentPage(page)} key={i}>
            <PaginationLink isActive={page == currentPage} href="#">
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage == totalPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem
          onClick={() => {
            if (currentPage == totalPage) return;
            setCurrentPage(currentPage + 1);
          }}
        >
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
