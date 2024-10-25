import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const Pagination = ({
    currentPage,
    totalPages,
    totalCount,
    itemsPerPage,
    handlePageChange,
}) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalCount);

    return (
        <div className="mt-6 flex items-center justify-between w-3/4 mx-auto">
            <div className="text-sm text-black">
                {/* Showing 1 to 10 of 100 results */}
                Showing {startItem} to {endItem} of {totalCount} results
            </div>

            <div className="flex items-center gap-2">
                {/* First Button */}
                <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md border bg-white text-black hover:bg-gray-500 hover:text-white disabled:opacity-50 disabled:hover:bg-white"
                >
                    First
                </button>
                {/* Previous Button */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md border bg-white text-black hover:bg-gray-500 hover:text-white disabled:opacity-50 disabled:hover:bg-white"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                    {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, index) => {
                            let pageNumber;

                            // Determine which page number to display
                            if (totalPages <= 5) {
                                pageNumber = index + 1;
                            } else if (currentPage <= 3) {
                                pageNumber = index + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNumber = totalPages - 4 + index;
                            } else {
                                pageNumber = currentPage - 2 + index;
                            }

                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                    className={`min-w-[2rem] w-auto h-8 rounded-md border ${
                                        currentPage === pageNumber.toString()
                                            ? "bg-blue-600 text-white" // Highlight the current page
                                            : "bg-white text-black hover:bg-gray-500 hover:text-white"
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        }
                    )}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => handlePageChange(parseInt(currentPage) + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md border bg-white text-black hover:bg-gray-500 hover:text-white disabled:opacity-50 disabled:hover:bg-white"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
                {/* Last Button */}
                <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md border bg-white text-black hover:bg-gray-500 hover:text-white disabled:opacity-50 disabled:hover:bg-white"
                >
                    Last
                </button>
            </div>
        </div>
    );
};

export default Pagination;
