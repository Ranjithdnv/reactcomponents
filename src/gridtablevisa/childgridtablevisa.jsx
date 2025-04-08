import React, { useState, useEffect } from "react";

// TableRow Component
const TableRow = ({
  rowData,
  handleNoOfVisaClick,
  handleNameClick,
  columns,
  isExpanded,
  fullClass,
  onToggleExpand,
}) => {
  const gridColsClass = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
    12: "grid-cols-12",
  };

  return (
    <>
      <div className={fullClass}>
        {columns.map(({ key }, index) => {
          const value = rowData[key];
          const isLast = index === columns.length - 1;

          if (key === "actions" && Array.isArray(value)) {
            return (
              <div
                key={key}
                className="flex gap-2 justify-center items-center col-span-2"
              >
                {value.map((actionText, i) => (
                  <button
                    key={i}
                    className="px-4 py-1 rounded-md bg-blue-500 text-white"
                    onClick={() => {
                      if (actionText === "View") onToggleExpand();
                      if (actionText === "Edit") handleNoOfVisaClick(rowData);
                    }}
                  >
                    {actionText}
                  </button>
                ))}
              </div>
            );
          }

          const isName = key === "name";

          return (
            <div
              key={key}
              className={`px-2 ${
                !isLast ? "border-r-[3px] border-[#2C4047]" : ""
              } ${isName ? "text-[#45ABEB] cursor-pointer" : "text-black"}`}
              onClick={isName ? () => handleNameClick(value) : undefined}
            >
              {value || "N/A"}
            </div>
          );
        })}
        {isExpanded && (
          <div className="w-full col-span-11 p-4 rounded-b-2xl text-left text-sm text-[#2C4047]">
            <p>
              <strong>Email:</strong> {rowData.email || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {rowData.phone || "N/A"}
            </p>
            <p>
              <strong>Notes:</strong> {rowData.notes || "No additional notes"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

// Table Component

const GridTableVisaParent = ({
  data,
  columns,
  fullClass,
  headerClass,
  onVisaClick,
  onNameClick,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationBlock, setPaginationBlock] = useState(0);

  const [goToPage, setGoToPage] = useState("");
  const rowsPerPage = 5;

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    setExpandedIndex(null); // Collapse all rows when page changes
    setCurrentPage(page);
  };

  // Auto-adjust paginationBlock when currentPage changes
  useEffect(() => {
    const block = Math.floor((currentPage - 1) / 10);
    setPaginationBlock(block);
  }, [currentPage]);

  return (
    <div className="flex flex-col items-center w-[90%] mx-auto border-2 border-[#2C4047]">
      {/* Header */}
      <div className={headerClass}>
        {columns.map(({ label, key }, index) => (
          <div
            key={`${key}-${index}`}
            className={`text-normal font-bold ${
              key === "actions" ? "col-span-2" : ""
            } ${
              index !== columns.length - 1
                ? "border-r-[3px] border-[#FFD964]"
                : ""
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Rows */}
      {paginatedData.map((rowData, index) => {
        const globalIndex = (currentPage - 1) * rowsPerPage + index;
        return (
          <TableRow
            key={globalIndex}
            rowData={rowData}
            fullClass={fullClass}
            columns={columns}
            handleNoOfVisaClick={onVisaClick}
            handleNameClick={onNameClick}
            isExpanded={expandedIndex === globalIndex}
            onToggleExpand={() =>
              setExpandedIndex(
                expandedIndex === globalIndex ? null : globalIndex
              )
            }
          />
        );
      })}

      {/* Pagination */}
      <div className=" flex justify-center !gap-16 items-center w-full">
        <div className="flex gap-2 my-4 !w-fit grow-0 items-center">
          <button
            disabled={paginationBlock === 0}
            onClick={() => setPaginationBlock((prev) => Math.max(prev - 1, 0))}
            className={`px-3 py-1 rounded-md border ${
              paginationBlock === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-blue-600 border-blue-600"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(paginationBlock * 10, paginationBlock * 10 + 10)
            .map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border-blue-600"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

          <button
            disabled={(paginationBlock + 1) * 10 >= totalPages}
            onClick={() =>
              setPaginationBlock((prev) =>
                (prev + 1) * 10 >= totalPages ? prev : prev + 1
              )
            }
            className={`px-3 py-1 rounded-md border ${
              (paginationBlock + 1) * 10 >= totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-blue-600 border-blue-600"
            }`}
          >
            Next
          </button>
        </div>
        {/* Page jump input */}
        <div className="flex gap-2 !w-fit flex-grow-0 items-center my-2">
          <input
            type="number"
            min="1"
            max={totalPages}
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
            className="w-20 px-2 py-1 border rounded-md text-center"
            placeholder="Page #"
          />
          <button
            onClick={() => {
              const pageNum = parseInt(goToPage, 10);
              if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
                setCurrentPage(pageNum);
                setExpandedIndex(null);
                setGoToPage(""); // Optional: Clear after jump
              }
            }}
            className="px-3 py-1 rounded-md bg-blue-600 text-white"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default GridTableVisaParent;
