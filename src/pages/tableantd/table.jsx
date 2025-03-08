import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button, Input } from "antd";
import "./table.css";
const SampleTable = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState(""); // 🔍 State for search input
  const [filteredData, setFilteredData] = useState([]); // Stores filtered data

  // Sample Data (Replace with API call if needed)
  useEffect(() => {
    const sampleData = [
      {
        key: "1",
        name: "John Doe",
        age: "12     13",
        address: "10 Downing St, London",
        status: "Active",
      },
      {
        key: "2",
        name: "Jane Smith",
        age: 45,
        address: "221B Baker St, London",
        status: "Inactive",
      },
      {
        key: "3",
        name: "Alice Johnson",
        age: 29,
        address: "742 Evergreen Terrace",
        status: "Active",
      },
      {
        key: "4",
        name: "Michael Brown",
        age: 40,
        address: "1600 Pennsylvania Ave",
        status: "Inactive",
      },
      {
        key: "5",
        name: "Emily White",
        age: 36,
        address: "12 Grimmauld Place",
        status: "Active",
      },
      {
        key: "6",
        name: "Jack Taylor",
        age: 41,
        address: "Baker Street, NY",
        status: "Inactive",
      },
      {
        key: "7",
        name: "Emma Watson",
        age: 30,
        address: "London, UK",
        status: "Active",
      },
      {
        key: "8",
        name: "Daniel Lee",
        age: 33,
        address: "Silicon Valley, CA",
        status: "Inactive",
      },
      {
        key: "9",
        name: "Sophia Martinez",
        age: 31,
        address: "Tokyo, Japan",
        status: "Active",
      },
      {
        key: "10",
        name: "Ethan Wilson",
        age: [10, 12],
        address: "Paris, France",
        status: "Inactive",
      },
      {
        key: "11",
        name: "Liam Brown",
        age: 42,
        address: "Sydney, Australia",
        status: "Active",
      },
      {
        key: "12",
        name: "Olivia Green",
        age: 28,
        address: "Central Park, NYC",
        status: "Active",
      },
      {
        key: "13",
        name: "Noah Walker",
        age: 35,
        address: "Berlin, Germany",
        status: "Inactive",
      },
      {
        key: "14",
        name: "Ava Harris",
        age: 29,
        address: "Madrid, Spain",
        status: "Active",
      },
      {
        key: "15",
        name: "James Clark",
        age: 38,
        address: "Los Angeles, USA",
        status: "Inactive",
      },
      {
        key: "16",
        name: "James Clark",
        age: 38,
        address: "Los Angeles, USA",
        status: "Inactive",
      },
      {
        key: "17",
        name: "James Clark",
        age: 38,
        address: "Los Angeles, USA",
        status: "Inactive",
      },
    ];

    setData(sampleData);
    setFilteredData(sampleData); // Initialize filtered data with full data
  }, []);

  // 🔍 Handle Global Search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = data.filter((record) =>
      Object.values(record).some((field) =>
        String(field).toLowerCase().includes(value)
      )
    );

    setFilteredData(filtered);
  };

  // Define Table Columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 150,
      render: (name) => (
        <div className="flex  ">
          {name.split(" ").map((part, index) => (
            <div className="  font-extrabold first:text-green-600  last: text-green-300">
              <span key={index}>{part}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      // sorter: (a, b) => a.age - b.age,  //   stops colour other properties
      defaultSortOrder: "descend",
      width: 60,
    },
    { title: "Address", dataIndex: "address", key: "address", width: 200 },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 80,
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <div className="w-full flex justify-center">
          <Tag
            className="w-16 "
            color={status === "Active" ? "green " : "volcano"}
          >
            {status}
          </Tag>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (_, record) => (
        <div>
          <Space className="w-full flex  justify-evenly">
            <Button
              className="border-blue-500 text-blue-500"
              type="primary"
              onClick={() => alert(`Editing ${record.name}`)}
            >
              Edit
            </Button>
            <Button danger onClick={() => alert(`Deleting ${record.name}`)}>
              Delete
            </Button>
          </Space>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      {/* 🔍 Global Search Input */}
      <Input
        placeholder="Search..."
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: 16, width: "300px" }}
      />

      {/* 📊 Table Component */}
      <Table
        columns={columns}
        dataSource={filteredData}
        bordered
        rowClassName={(record, index) =>
          index % 2 === 0 ? "bg-blue-100" : "bg-white "
        }
        pagination={{
          pageSize: 5,
          hideOnSinglePage: true,
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total} records`,
          position: ["bottomRight"],
          showLessItems: true,
        }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default SampleTable;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { Table, Tag, Space, Button, Input } from "antd";
// import { SearchOutlined } from "@ant-design/icons";
// import { FloatButton } from "antd";

// const SampleTable = () => {
//   const [data, setData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [filteredData, setFilteredData] = useState([]);

//   // Sample Data
//   useEffect(() => {
//     const sampleData = Array.from({ length: 50 }, (_, i) => ({
//       key: i + 1,
//       name: `User ${i + 1}`,
//       age: 20 + (i % 10),
//       address: `Street ${i + 1}, City`,
//       status: i % 2 === 0 ? "Active" : "Inactive",
//     }));

//     setData(sampleData);
//     setFilteredData(sampleData);
//   }, []);

//   // Search Functionality
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchText(value);
//     const filtered = data.filter(
//       (item) =>
//         item.name.toLowerCase().includes(value) ||
//         item.address.toLowerCase().includes(value)
//     );
//     setFilteredData(filtered);
//   };

//   // Define Columns
//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       sorter: (a, b) => a.name.localeCompare(b.name),
//       width: 100,
//       ellipsis: true,
//       // ✅ Tailwind for min-width
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//       sorter: (a, b) => a.age - b.age,
//       width: 100,
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//       width: 170,
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       width: 100,

//       filters: [
//         { text: "Active", value: "Active" },
//         { text: "Inactive", value: "Inactive" },
//       ],
//       onFilter: (value, record) => record.status === value,
//       render: (status) => (
//         <Tag color={status === "Active" ? "green" : "volcano"}>{status}</Tag>
//       ),
//     },
//     {
//       title: "Action",
//       key: "action",
//       width: 250,

//       render: (_, record) => (
//         <Space>
//           <Button type="primary">Edit</Button>
//           <Button danger>Delete</Button>{" "}
//           <Button color="cyan" variant="solid">
//             add
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 0 }} className=" w-full">
//       {/* Global Search */}
//       <Input
//         placeholder="Search Name or Address..."
//         value={searchText}
//         onChange={handleSearch}
//         style={{ marginBottom: 16, width: 300 }}
//         allowClear
//         prefix={<SearchOutlined />}
//       />

//       {/* Table Component */}
//       <Table
//         bordered
//         columns={columns}
//         dataSource={filteredData}
//         pagination={{
//           pageSize: 10,
//           showSizeChanger: false,
//           showTotal: (total) => `Showing ${total} entries`,
//         }}
//         scroll={{ x: "100%" }}
//         className="w-full"
//       />
//     </div>
//   );
// };

// export default SampleTable;
