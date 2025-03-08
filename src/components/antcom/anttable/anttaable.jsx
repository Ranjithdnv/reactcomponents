import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Table, Tag, Input, Button } from "antd";

const DynamicTable = forwardRef(
  (
    {
      showQuickJumper,
      scroll,
      fetchDataFunction,
      columnRenderers = {},
      rowKey = "id",
      pageSize = 5,
      search = false,
    },
    ref
  ) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: pageSize,
      total: 50,
    });
    const [searchText, setSearchText] = useState("");

    const fetchData = useCallback(
      async (page = 1, pageSize = pagination.pageSize) => {
        setLoading(true);
        try {
          const { data: result, total } = await fetchDataFunction(
            page,
            pageSize
          );

          // ✅ Generate columns dynamically with custom renderers
          if (result.length > 0) {
            const generatedColumns = Object.keys(result[0]).map((key) => {
              return {
                title: (
                  <span className=" text-ellipsis">{key.toUpperCase()}</span>
                ),
                dataIndex: key,
                onCell: () => ({
                  style: { minWidth: 60 },
                }),
                key,
                render:
                  columnRenderers[key] || ((value) => formatCellValue(value)),
              };
            });

            setColumns(generatedColumns);
          }

          setData(result);
          setFilteredData(result);
          setPagination((prev) => ({
            ...prev,
            current: page,
            total,
          }));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        setLoading(false);
      },
      [fetchDataFunction, columnRenderers]
    );

    useEffect(() => {
      fetchData(1, pagination.pageSize);
    }, [fetchDataFunction]);

    useImperativeHandle(ref, () => ({
      reloadData: () => {
        fetchData(1, pagination.pageSize);
        console.log("reloaded");
      },
    }));

    const formatCellValue = (value) => {
      if (Array.isArray(value)) {
        return value.length ? value.join(", ") : "[]";
      } else if (typeof value === "object" && value !== null) {
        const firstKey = Object.keys(value)[0];
        return firstKey ? value[firstKey] : "{}";
      } else if (typeof value === "boolean") {
        return (
          <Tag color={value ? "green" : "red"}>{value ? "True" : "False"}</Tag>
        );
      } else if (
        value === "" ||
        (typeof value === "object" && Object.keys(value).length === 0)
      ) {
        return "N/E";
      }
      return value ?? "N/A";
    };

    const handleSearch = (e) => {
      const value = e.target.value.toLowerCase();
      setSearchText(value);
      if (value) {
        setFilteredData(
          data.filter((row) =>
            Object.values(row).some((field) =>
              field?.toString().toLowerCase().includes(value)
            )
          )
        );
      } else {
        setFilteredData(data);
      }
    };

    return (
      <div className="min-h-[500px]">
        {search && (
          <Input
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
            className="mb-4 w-1/3"
          />
        )}
        {/* <div className="flex justify-end mb-2">
          <Button
            onClick={() => fetchData(1, pagination.pageSize)}
            type="primary"
          >
            Reload Data
          </Button>
        </div> */}
        <Table
          tableLayout="auto"
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={{
            showSizeChanger: false, // ❌ Disable page size change
            showQuickJumper: showQuickJumper, // ✅ "Jump to Page" always stays on the right
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total, // ✅ Show total number of records
            showTotal: (total, range) =>
              `Showing ${range[0]}-${range[1]} of ${total} records`, // ✅ Correct range display
          }}
          onChange={(pagination) =>
            fetchData(pagination.current, pagination.pageSize)
          }
          rowKey={rowKey}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "bg-gray-100" : "bg-white"
          }
          scroll={{ y: scroll }}
        />
      </div>
    );
  }
);

export default DynamicTable;
