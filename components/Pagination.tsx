"use client";
import { useCharacterStore } from "@/store/useCharacterStore";
import { useCharacters } from "@/lib/api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export const PaginationComponent = () => {
  const { pagination, setPagination } = useCharacterStore();
  const { data } = useCharacters();
  const totalPages = data?.info?.pages || 1;
  const currentPage = pagination.page || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPagination({ ...pagination, page: newPage });
  };

  const getVisiblePages = () => {
    const pages = [];
    // first page
    pages.push(1);

    // current page with neighboors
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");

    // last page
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <Pagination className="py-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
          />
        </PaginationItem>
        {getVisiblePages().map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(Number(page));
                }}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
