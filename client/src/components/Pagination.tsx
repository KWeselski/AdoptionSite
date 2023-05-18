import { useState, useMemo } from "react";

const DOTS = "...";

const generatePageNumbers = (currentPage, perPage, totalPages) => {
  if (totalPages <= perPage)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  const leftRange = Math.floor(perPage / 2);
  const rightRange = perPage - leftRange - 1;

  let startPage = Math.max(currentPage - leftRange, 2);
  let endPage = Math.min(currentPage + rightRange, totalPages - 1);

  return [
    ...(startPage > 3
      ? [1, DOTS]
      : Array.from({ length: startPage - 1 }, (_, i) => i + 1)),
    ...Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage),
    ...(endPage < totalPages - 2
      ? [DOTS, totalPages]
      : Array.from(
          { length: totalPages - endPage },
          (_, i) => i + endPage + 1
        )),
  ];
};

const Pagination = ({ values, perPage, children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(values.length / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentData = useMemo(() => {
    const indexOfLastData = currentPage * perPage;
    const indexOfFirstData = indexOfLastData - perPage;
    return values.slice(indexOfFirstData, indexOfLastData);
  }, [currentPage, values, perPage]);

  const pageNumbers = useMemo(
    () => generatePageNumbers(currentPage, perPage, totalPages),
    [currentPage, perPage, totalPages]
  );

  return (
    <div className="flex w-full flex-col">
      {typeof children === "function" ? children(currentData) : children}
      <div className="flex justify-center mt-4">
        {pageNumbers.map((page, index) =>
          page === DOTS ? (
            <span key={DOTS + index} className="mx-1 px-3 py-1">
              {page}
            </span>
          ) : (
            <button
              key={page}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === page ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Pagination;
