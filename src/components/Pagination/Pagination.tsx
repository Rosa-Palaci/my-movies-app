"use client";

import React from "react";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="text-white self-center">Página {page}</span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
