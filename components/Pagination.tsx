"use client"

import React, { memo, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = memo(({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = useMemo(() => {
    const p = []
    const startPage = Math.max(1, currentPage - 2)
    const endPage = Math.min(totalPages, startPage + 4)
    
    for (let i = startPage; i <= endPage; i++) {
      p.push(i)
    }
    return p
  }, [currentPage, totalPages])

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="text-gray-600 hover:text-blue-600 border-gray-200"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      
      {pages.map((p) => (
        <Button
          key={p}
          variant={currentPage === p ? 'default' : 'outline'}
          size="sm"
          className={`w-10 ${currentPage === p ? 'bg-blue-600' : 'text-gray-600 border-gray-200 hover:text-blue-600'}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="text-gray-600 hover:text-blue-600 border-gray-200"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
});

Pagination.displayName = "Pagination";

export default Pagination;
