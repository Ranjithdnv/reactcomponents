import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

const useDataManager = (apiUrl, onValueChange) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch data from the API
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(apiUrl);
      const result = response.data;

      setData(result);
      if (onValueChange) onValueChange(result); // Notify parent with raw fetched data
    } catch (err) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  }, [apiUrl, onValueChange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter the data
  const filteredData = useMemo(() => {
    if (!filter) return data;
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [data, filter]);

  // Sort the data
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const key = Object.keys(a)[0]; // Sort by the first key for demonstration
      if (sortOrder === "asc") return a[key] > b[key] ? 1 : -1;
      return a[key] < b[key] ? 1 : -1;
    });
  }, [filteredData, sortOrder]);

  // Paginate the data
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const result = sortedData.slice(startIndex, startIndex + pageSize);
    if (onValueChange) onValueChange(result); // Notify parent with paginated data
    return result;
  }, [sortedData, page, pageSize, onValueChange]);

  return {
    data: paginatedData,
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
  };
};

export default useDataManager;

// import { useState, useEffect, useCallback, useMemo } from "react";
// import axios from "axios";

// const useDataManager = (apiUrl, onValueChange) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   // Fetch data from the API
//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(apiUrl);
//       const result = response.data;

//       setData(result);
//       if (onValueChange) onValueChange(result); // Notify parent with raw fetched data
//     } catch (err) {
//       setError(err.message || "Error fetching data");
//     } finally {
//       setLoading(false);
//     }
//   }, [apiUrl]); // <-- Removed `onValueChange` from dependencies to prevent re-fetching

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // Filter the data
//   const filteredData = useMemo(() => {
//     if (!filter) return data;
//     return data.filter((item) =>
//       Object.values(item).some((value) =>
//         value.toString().toLowerCase().includes(filter.toLowerCase())
//       )
//     );
//   }, [data, filter]);

//   // Sort the data
//   const sortedData = useMemo(() => {
//     return [...filteredData].sort((a, b) => {
//       const key = Object.keys(a)[0]; // Sort by the first key for demonstration
//       if (sortOrder === "asc") return a[key] > b[key] ? 1 : -1;
//       return a[key] < b[key] ? 1 : -1;
//     });
//   }, [filteredData, sortOrder]);

//   // Paginate the data
//   const paginatedData = useMemo(() => {
//     const startIndex = (page - 1) * pageSize;
//     return sortedData.slice(startIndex, startIndex + pageSize);
//   }, [sortedData, page, pageSize]); // <-- Removed `onValueChange` here

//   // Call onValueChange only when paginatedData changes (not inside useMemo)
//   useEffect(() => {
//     if (onValueChange) onValueChange(paginatedData);
//   }, [paginatedData]); // <-- Only update when paginatedData actually changes

//   return {
//     data: paginatedData,
//     loading,
//     error,
//     filter,
//     setFilter,
//     sortOrder,
//     setSortOrder,
//     page,
//     setPage,
//     pageSize,
//     setPageSize,
//   };
// };

// export default useDataManager;
