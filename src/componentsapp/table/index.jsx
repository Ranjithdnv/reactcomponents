import React, { useEffect } from 'react';
import { MdOutlineSettings } from 'react-icons/md';
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiPlusSmall,
  HiChevronRight,
  HiArrowSmallUp,
} from 'react-icons/hi2';
import { useTable, usePagination, useSortBy } from 'react-table';

const Table = ({
  columns,
  data,
  fetchData = () => {},
  loading,
  showAvatar = true,
  search = null,
  showPagination = true,
  pageCount: controlledPageCount,
  setPageIndex,
  userType,
}) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    // useSortBy,
    usePagination
  );

  useEffect(() => {
    fetchData({ pageIndex: pageIndex ?? 0, pageSize: pageSize ?? 1 });
    setPageIndex(pageIndex);
  }, [fetchData, pageIndex, pageSize, search]);

  // Function to check if all cells in a row are null
  const isRowEmpty = (row) => {
    return row.cells.every((cell) => cell.value === null);
  };

  // Render the UI for your table
  return (
    <>
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="w-full table-auto">
          {/* Table header */}
          <thead className="text-sm text-left rounded-sm text-white bg-[#04816A] font-extrabold">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="px-5 py-4 font-display">
                    <div className="flex items-center justify-start gap-4">
                      <p>{column.render('Header')}</p>
                      {/* {column.isSorted ? (
                        column.isSortedDesc ? (
                          <HiArrowSmallUp className="w-3 h-3 origin-center rotate-180 text-slate-400" />
                        ) : (
                          <HiArrowSmallUp className="w-3 h-3 text-slate-400 " />
                        )
                      ) : (
                        ""
                      )} */}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* Table body */}

          {!loading && (
            <tbody
              {...getTableBodyProps()}
              className="text-sm divide-y divide-[#d6d4d4] font-normal"
            >
              {rows.map((row, i) => {
                prepareRow(row);

                if (isRowEmpty(row)) {
                  return null; // Skip rendering this row if all cells are null
                }

                return (
                  <tr
                    {...row.getRowProps()}
                    className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#d0f0eb]'}`}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} className="px-5 py-3 !font-display">
                          {cell.value !== null ? cell.render('Cell') : ''}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>

      {showPagination && (
        <div className="flex items-center justify-between px-4 py-3 bg-[#f7f9fd] rounded-b-2xl sm:px-6">
          <div className="flex justify-between flex-1 sm:hidden">
            <span
              // href="#"
              onClick={() => previousPage()}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white  rounded-md cursor-pointer hover:bg-gray-50"
            >
              Previous
            </span>
            <span
              onClick={() => nextPage()}
              className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white  rounded-md cursor-pointer hover:bg-gray-50"
            >
              Next
            </span>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between ">
            <div>
              <p className="text-sm text-[#525f7f] font-bold flex item-center">
                Showing{' '}
                <span className="w-10 h-[25px] bg-[#b4d9d2] text-[#212529] mx-1 rounded-md flex items-center justify-center">
                  {pageIndex + 1}
                </span>
                of <span className="mx-1">{pageOptions.length}</span> entries
              </p>
            </div>
            <div>
              <nav
                className="inline-flex -space-x-px rounded-md shadow-sm isolate"
                aria-label="Pagination"
              >
                {/* <button
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                  className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <HiChevronDoubleLeft className="w-5 h-5" aria-hidden="true" />
                </button> */}
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                  className="mr-2 relative inline-flex items-center px-2 text-[#32325d] shadow-lg ring-1 ring-inset ring-white bg-white focus:z-20 focus:outline-offset-0 border-2 border-[#adb5bd]"
                >
                  <span className="sr-only">Previous</span>
                  <HiChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                <div className="mx-2 relative inline-flex items-center px-4 py-2 text-sm font-extrabold text-black">
                  {pageIndex + 1} /{' '}
                  <span className="text-[#adb5bd] ml-0.5"> {pageOptions.length}</span>
                </div>
                <button
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                  className="ml-2 relative inline-flex items-center px-2 text-[#32325d] shadow-lg ring-1 ring-inset ring-white bg-white focus:z-20 focus:outline-offset-0 border-2 border-[#adb5bd]"
                >
                  <span className="sr-only">Next</span>
                  <HiChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>

                {/* <button
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                  className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <HiChevronDoubleRight
                    className="w-5 h-5"
                    aria-hidden="true"
                  />
                </button> */}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
