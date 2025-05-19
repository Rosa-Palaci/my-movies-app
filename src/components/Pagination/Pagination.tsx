"use client";

import React from "react";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const baseBtn =
    "px-6 py-2 text-[22px] text-white rounded-[35px] transition-colors";
  const enabled = "bg-[#6801ED] hover:bg-[#5412d5]";
  const disabled = "bg-[#6801ED]/50 cursor-not-allowed";

  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`${baseBtn} ${page === 1 ? disabled : enabled}`}
      >
        Anterior
      </button>
      <span className="text-white self-center text-[22px]">Página {page}</span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`${baseBtn} ${page === totalPages ? disabled : enabled}`}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
