import React, { useState, useMemo } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useTable, usePagination, useGlobalFilter } from "react-table";

const Table = ({
  columns = [],
  data = [],
  pageCount: controlledPageCount,
  pageIndex,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    state: { globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: pageIndex, pageSize: 5 }, // Page size of 4
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    useGlobalFilter,
    usePagination
  );

  const [searchInput, setSearchInput] = useState("");

  // Global search change handler
  const onGlobalSearchChange = (value) => {
    setGlobalFilter(value);
  };

  return (
    <div className="overflow-x-auto">
      {/* Global Search Input */}
      <input
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          onGlobalSearchChange(e.target.value);
        }}
        placeholder="Search all columns..."
        className="border p-2 mb-4 mr-4"
      />

      <table
        {...getTableProps()}
        className="w-full table-auto border border-gray-300"
      >
        <thead className="bg-gray-700 text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 text-left"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()} className="divide-y divide-gray-300">
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-4 py-2">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex items-center justify-between px-4 py-3 bg-gray-100 mt-4">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          <HiChevronLeft className="inline-block w-5 h-5" /> Previous
        </button>

        <div className="text-sm">
          Page <span className="font-bold">{pageIndex + 1}</span> of{" "}
          {pageOptions.length}
        </div>

        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          Next <HiChevronRight className="inline-block w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default function Apptable() {
  const [columnSearchInput, setColumnSearchInput] = useState("");
  const [pageIndex, setPageIndex] = useState(0); // Manage current page index

  const columns = useMemo(
    () => [
      { Header: "Player Name", accessor: "playerName" },
      { Header: "Team", accessor: "team" },
      { Header: "Position", accessor: "position" },
      { Header: "Score", accessor: "score" },
      { Header: "Status", accessor: "status" },
      { Header: "Age", accessor: "age" },
      { Header: "Height (cm)", accessor: "height" },
      { Header: "Games Played", accessor: "gamesPlayed" },
    ],
    []
  );

  const [data, setData] = useState([
    {
      playerName: "Player 1",
      team: "Team A",
      position: "Forward",
      score: 10,
      status: "Active",
      age: 25,
      height: 180,
      gamesPlayed: 50,
    },
    {
      playerName: "Player 2",
      team: "Team B",
      position: "Goalkeeper",
      score: 15,
      status: "Injured",
      age: 28,
      height: 190,
      gamesPlayed: 60,
    },
    {
      playerName: "Player 3",
      team: "Team C",
      position: "Defender",
      score: 8,
      status: "Active",
      age: 30,
      height: 185,
      gamesPlayed: 80,
    },
    {
      playerName: "Player 4",
      team: "Team D",
      position: "Midfielder",
      score: 20,
      status: "Active",
      age: 27,
      height: 175,
      gamesPlayed: 90,
    },
    {
      playerName: "Player 5",
      team: "Team E",
      position: "Striker",
      score: 18,
      status: "Suspended",
      age: 23,
      height: 182,
      gamesPlayed: 70,
    },
    {
      playerName: "Player 1",
      team: "Team A",
      position: "Forward",
      score: 10,
      status: "Active",
      age: 25,
      height: 180,
      gamesPlayed: 50,
    },
    // More data rows...
  ]);

  // Filter data
  const filteredData = useMemo(() => {
    if (!columnSearchInput) return data;
    return data.filter((player) =>
      player.playerName.toLowerCase().includes(columnSearchInput.toLowerCase())
    );
  }, [data, columnSearchInput]);

  const pageCount = Math.ceil(filteredData.length / 4); // Page count based on 4 rows per page

  return (
    <div>
      {/* Column-Specific Search Input */}
      <input
        value={columnSearchInput}
        onChange={(e) => setColumnSearchInput(e.target.value)}
        placeholder="Search Player Name..."
        className="border p-2 mb-4"
      />
      <Table
        columns={columns}
        data={filteredData.slice(pageIndex * 3, (pageIndex + 1) * 3)} // Slice data for pagination
        pageCount={pageCount}
        pageIndex={pageIndex}
        nextPage={() => setPageIndex(pageIndex + 1)}
        previousPage={() => setPageIndex(pageIndex - 1)}
        canNextPage={pageIndex < pageCount - 1}
        canPreviousPage={pageIndex > 0}
      />
    </div>
  );
}
