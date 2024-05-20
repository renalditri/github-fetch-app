import React from "react";
import { ParamsType } from "../types/types";

type PaginationProps = {
  params: ParamsType;
  setParams: (params: ParamsType) => void;
  totalItems: number;
};

const Pagination = ({ params, setParams, totalItems }: PaginationProps) => {
  console.log("rerender", params);
  const totalPages = Math.ceil(totalItems / params.per_page);

  const handleClickPage = (page: number) => {
    setParams({ ...params, page: page });
  };

  const pages = () => {
    if (totalPages < 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const start = Math.floor(params.page / 3) * 3;
    return params.page > 3
      ? params.page < totalPages - 3
        ? [1, 0, start, start + 1, start + 2, 0, totalPages]
        : [1, 0, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
      : [1, 2, 3, 0, totalPages - 1, totalPages];
  };

  return (
    <div className="pagination-container">
      <button
        disabled={params.page === 1}
        onClick={() => handleClickPage(params.page - 1)}
      >
        Previous
      </button>
      {pages().map((page, index) =>
        page === 0 ? (
          <span key={`${page}-${index}`}>...</span>
        ) : (
          <button
            key={page}
            disabled={page === params.page}
            onClick={() => handleClickPage(page)}
          >
            {page}
          </button>
        )
      )}
      <button
        disabled={params.page === totalPages}
        onClick={() => handleClickPage(params.page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
