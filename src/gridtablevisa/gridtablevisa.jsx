import React, { useState } from "react";

// TableRow Component
const TableRow = ({
  rowData,
  handleNoOfVisaClick,
  handleNameClick,
  columns,
  isExpanded,
  onToggleExpand,
}) => {
  return (
    <>
      <div className="grid grid-cols-11 text-[#2C4047] font-semibold rounded-2xl py-3 my-2 items-center justify-center  px-0 gap-0 w-full text-center">
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
                      console.log(`${actionText} clicked`, rowData);
                      if (actionText === "Edit") {
                        () => handleNoOfVisaClick(rowData);
                      }
                    }}
                  >
                    {actionText}
                  </button>
                ))}
              </div>
            );
          }

          const isName = key === "name";
          const isClickable = rowData.clickable && !isName;

          return (
            <div
              key={key}
              className={`px-2 ${
                !isLast ? "border-r-2 border-[#2C4047]" : ""
              } ${isName ? "text-[#45ABEB] cursor-pointer" : "text-black"}`}
              onClick={
                isName
                  ? () => handleNameClick(value)
                  : // : isClickable
                    // ? () => handleNoOfVisaClick(rowData)                         //check this line
                    undefined
              }
            >
              {value || "naaa"}
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
            <p>
              <strong>Notes:</strong> {rowData.notes || "No additional notes"}
            </p>
            <p>
              <strong>Notes:</strong> {rowData.notes || "No additional notes"}
            </p>
          </div>
        )}
      </div>

      {/* {isExpanded && (
        <div className="w-full bg-[#DFF0F5] border-2 border-t-0 border-[#2C4047] p-4 rounded-b-2xl text-left text-sm text-[#2C4047]">
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
      )} */}
    </>
  );
};

// Table Component
const Table = ({ data, columns, handleNoOfVisaClick, handleNameClick }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    setExpandedIndex(null); // Collapse all rows when page changes
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center w-[90%] mx-auto border-2 border-[#2C4047]">
      {/* Header */}
      <div className="grid grid-cols-11 px-0 py-3 border-2 border-[#2C4047] gap-0 bg-[#2C4047] text-[#FFD964] w-full text-center">
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
            columns={columns}
            handleNoOfVisaClick={handleNoOfVisaClick}
            handleNameClick={handleNameClick}
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
      <div className="flex gap-2 my-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded-md border ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border-blue-600"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Component
const Gridtablevisa = () => {
  const tableData = {
    columns: [
      { label: "Name", key: "name" },
      { label: "No of Visa", key: "noOfVisa" },
      { label: "Country", key: "country" },
      { label: "Visa Type", key: "visaType" },
      { label: "Actual Amount", key: "actualAmount" },
      { label: "Coupon Code", key: "couponCode" },
      { label: "Coupon % Price", key: "couponPrice" },
      { label: "Amount Paid", key: "amountPaid" },
      { label: "Amount Due", key: "amountDue" },
      { label: "Actions", key: "actions" }, // spans 2 columns
    ],
    data: [
      {
        name: "John Doe",
        noOfVisa: 3,
        country: "USA",
        visaType: "Tourist",
        actualAmount: "$300",
        couponCode: "SUMMER2023",
        couponPrice: "10%",
        amountPaid: "$270",
        amountDue: "$30",
        actions: ["View", "Edit"],
        clickable: false,
        email: "john@example.com",
        phone: "+1 555 123 4567",
        notes: "Urgent processing required",
      },
      {
        name: "Jane Smith",
        noOfVisa: 2,
        country: "Canada",
        visaType: "Business",
        actualAmount: "$500",
        couponCode: "WINTER2023",
        couponPrice: "15%",
        amountPaid: "$425",
        amountDue: "$75",
        actions: ["View"],
        clickable: true,
        email: "jane@example.com",
        phone: "+1 555 987 6543",
        notes: "Follow up after 3 days",
      },
      {
        name: "Jane Smith",
        noOfVisa: 2,
        country: "Canada",
        visaType: "Business",
        actualAmount: "$500",
        couponCode: "WINTER2023",
        couponPrice: "15%",
        amountPaid: "$425",
        amountDue: "$75",
        actions: ["View"],
        clickable: true,
        email: "jane@example.com",
        phone: "+1 555 987 6543",
        notes: "Follow up after 3 days",
      },
      {
        name: "Jane Smith",
        noOfVisa: 2,
        country: "Canada",
        visaType: "Business",
        actualAmount: "$500",
        couponCode: "WINTER2023",
        couponPrice: "15%",
        amountPaid: "$425",
        amountDue: "$75",
        actions: ["View"],
        clickable: true,
        email: "jane@example.com",
        phone: "+1 555 987 6543",
        notes: "Follow up after 3 days",
      },
      {
        name: "Jane Smith",
        noOfVisa: 2,
        country: "Canada",
        visaType: "Business",
        actualAmount: "$500",
        couponCode: "WINTER2023",
        couponPrice: "15%",
        amountPaid: "$425",
        amountDue: "$75",
        actions: ["View"],
        clickable: true,
        email: "jane@example.com",
        phone: "+1 555 987 6543",
        notes: "Follow up after 3 days",
      },
      {
        name: "Jane Smith",
        noOfVisa: 2,
        country: "Canada",
        visaType: "Business",
        actualAmount: "$500",
        couponCode: "WINTER2023",
        couponPrice: "15%",
        amountPaid: "$425",
        amountDue: "$75",
        actions: ["View"],
        clickable: true,
        email: "jane@example.com",
        phone: "+1 555 987 6543",
        notes: "Follow up after 3 days",
      },
      {
        name: "Jane Smith",
        noOfVisa: 2,
        country: "Canada",
        visaType: "Business",
        actualAmount: "$500",
        couponCode: "WINTER2023",
        couponPrice: "15%",
        amountPaid: "$425",
        amountDue: "$75",
        actions: ["View"],
        clickable: true,
        email: "jane@example.com",
        phone: "+1 555 987 6543",
        notes: "Follow up after 3 days",
      },
      {
        name: "Jane Smith",
        noOfVisa: 2,
        country: "Canada",
        visaType: "Business",
        actualAmount: "$500",
        couponCode: "WINTER2023",
        couponPrice: "15%",
        amountPaid: "$425",
        amountDue: "$75",
        actions: ["View"],
        clickable: true,
        email: "jane@example.com",
        phone: "+1 555 987 6543",
        notes: "Follow up after 3 days",
      },
    ],
  };

  const handleNoOfVisaClick = (rowData) => {
    console.log("Visa field clicked:", rowData);
  };

  const handleNameClick = (name) => {
    alert(`Name clicked: ${name}`);
  };

  return (
    <div className="Gridtablevisa">
      <Table
        data={tableData.data}
        columns={tableData.columns}
        handleNoOfVisaClick={handleNoOfVisaClick}
        handleNameClick={handleNameClick}
      />
    </div>
  );
};

export default Gridtablevisa;
