import React, { useState, useCallback } from "react";
import useDataManager from "./hook";

const DataDisplayComponent = () => {
  const [lastUpdatedData, setLastUpdatedData] = useState(null);

  // Use useCallback to memoize the function and prevent re-creating it on every render
  const handleDataChange = useCallback((newData) => {
    console.log("Data updated:", newData);
    setLastUpdatedData(newData);
  }, []);

  const {
    data,
    loading,
    error,
    filter,
    setFilter,
    sortOrder,
    setSortOrder,
    page,
    setPage,
    pageSize,
    setPageSize,
  } = useDataManager(
    "https://jsonplaceholder.typicode.com/posts",
    handleDataChange
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h1 className="text-xl font-bold mb-4">Data Manager</h1>

      {/* Filter Input */}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter data..."
        className="mb-4 p-2 border rounded-md w-full"
      />

      {/* Sort Order Toggle */}
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Toggle Sort Order ({sortOrder.toUpperCase()})
      </button>

      {/* Display Last Updated Data */}
      {lastUpdatedData && (
        <div className="mb-4 p-2 bg-green-100 rounded-md">
          <strong>Last Updated Data:</strong> {JSON.stringify(lastUpdatedData)}
        </div>
      )}

      {/* Data Display */}
      <ul className="list-disc pl-5">
        {data.map((item) => (
          <li key={item.id} className="mb-2">
            {item.title}
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataDisplayComponent;
