import React, { useRef, useState } from "react";
import DynamicTable from "./anttaable";
import { useEffect } from "react";

const fetchDataFromAPI1 = async (page, pageSize) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${pageSize}`
    );
    const data = await response.json();
    const totalRecords = response.headers.get("X-Total-Count") || 30;

    return {
      data: data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
        company: user.company?.name || "N/A",
        address: `${user.address?.city}, ${user.address?.street}`,
      })),
      total: Number(totalRecords),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [], total: 0 };
  }
};

const fetchDataFromAPI2 = async (page, pageSize) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`
    );
    const data = await response.json();
    const totalRecords = response.headers.get("X-Total-Count") || 100;

    return {
      data: data.map((post) => ({
        id: post.id,
        title: post.title,
        body: post.body,
        status: "active", // ✅ Store as string (JSX will be added in columnRenderers)
      })),
      total: Number(totalRecords),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [], total: 0 };
  }
};

const AntTableParent2 = () => {
  const tableRef = useRef(null);
  const [useFirstAPI, setUseFirstAPI] = useState(true);

  const toggleAPI = () => {
    setUseFirstAPI((prev) => !prev);
  };

  useEffect(() => {
    tableRef.current?.reloadData();
  }, [useFirstAPI]);
  const nopass = () => {
    setUseFirstAPI((prev) => !prev);
    console.log("hi");
  };

  const columnRenderers = {
    status: (value) => (
      <span className="text-blue-500 font-bold">{`${value}+100`}</span>
    ), // ✅ JSX Renderer
    title: (value) => <strong>{value}</strong>,
    body: (value) => <span className="text-red-500 font-bold">{value} </span>,
    address: (value) => (
      <span
        onClick={() => {
          console.log("working");

          //  toggleAPI();
          nopass(); //  ---------------------------passing func other way with out directly sending as          PROPS
        }}
        className="text-red-500 font-bold"
      >
        {value}{" "}
      </span>
    ),
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reusable Dynamic Table</h2>
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => {
          toggleAPI(); // Call toggleAPI function // Call reloadData from child component
        }}
      >
        Reload Data (Switch API)
      </button>
      <DynamicTable
        ref={tableRef}
        fetchDataFunction={useFirstAPI ? fetchDataFromAPI1 : fetchDataFromAPI2}
        columnRenderers={columnRenderers} // ✅ Pass custom JSX renderers
        pageSize={9}
        rowKey="id"
        search={true}
      />
    </div>
  );
};

export default AntTableParent2;
