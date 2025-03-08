import React, { useState, useRef, useEffect } from "react";
import {
  Table,
  Button,
  Tag,
  Input,
  message,
  Spin,
  Modal,
  Tabs,
  Tooltip,
} from "antd";

import {
  DownOutlined,
  SearchOutlined,
  SyncOutlined,
  FilterOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Select } from "antd";

const { Option } = Select;

const { TabPane } = Tabs;
const { Search } = Input;

const AntTableComponent = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const searchInputRef = useRef(null);
  const [value, setValue] = useState("");
  const [valueSelect, setValueSelect] = useState(null);
  const [valueSearch, setValueSearch] = useState(null);
  const handleChange = (selectedValue) => {
    console.log("Selected:", selectedValue);
    setValueSelect(selectedValue);
  };

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setData([
      {
        key: "1",
        name: "John Doe",
        age: 32,
        status: "Active",
        role: "Engineer",
      },
      {
        key: "2",
        name: "Jane Smith",
        age: 28,
        status: "Inactive",
        role: "Designer",
      },
      {
        key: "3",
        name: "Sam Green",
        age: 40,
        status: "Pending",
        role: "Manager",
      },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (value) => {
    setValueSearch(value);
    message.info(`Searching for: ${value}`);
  };

  const showModal = () => setVisible(true);
  const handleOk = () => setVisible(false);
  const handleCancel = () => setVisible(false);

  const handleTabChange = (activeKey) => {
    console.log("Tab changed to:", activeKey);
  };

  const handleTabClick = (key, event) => {
    setLoading(false);
    fetchData();
    console.log("Tab clicked:", key);
  };

  const handleTabScroll = (position) => {
    console.log("Tabs scrolled:", position);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
        { text: "Pending", value: "Pending" },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (status) => (
        <Tag
          color={
            status === "Active"
              ? "green"
              : status === "Inactive"
              ? "red"
              : "orange"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Tooltip title="View Details">
          <Button type="primary" onClick={showModal}>
            View
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="  transition-all   duration-1000 ease-out">
      <Select
        value={valueSelect}
        onChange={handleChange}
        placeholder="Select an option"
        style={{ width: 250 }}
        // allowClear
        defaultActiveFirstOption={false}
        // loading={true}
        mode="multiple"
        maxTagCount={4}
        //defaultOpen={true}
        showSearch
        tagRender={({ label, closable, onClose }) => (
          <Tag
            className="  text-blue-500 border-blue-500"
            closable={closable}
            onClose={onClose}
            style={
              {
                // Make text white for better contrast
              }
            }
          >
            {label}
          </Tag>
        )}
        suffixIcon={
          valueSelect && (
            <CloseCircleOutlined
              className="!text-blue-500  !text-base !font-[1rem]"
              onClick={() => setValueSelect(null)} // Clear input on click
              style={{
                fontSize: 16,

                cursor: "pointer",
              }}
            />
          )
        }
      >
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
        <Option value="cherry">Cherry</Option>
        <Option value="banan1a">Banana</Option>
        <Option value="cherr1y">Cherry</Option>
        <Option value="banan1a">Banana</Option>
        <Option value="cherry2">Cherry</Option>
      </Select>
      <Input
        placeholder="Enter text..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        // allowClear
        style={{ width: 250 }}
        suffix={
          value && ( // Show icon only when there's text
            <CloseCircleOutlined
              className="!text-blue-500  !text-base !font-[1rem]"
              onClick={() => setValue(null)} // Clear input on click
              style={{
                fontSize: 18,
                color: "red",
                cursor: "pointer",
              }}
            />
          )
        }
      />
      <Search
        className="focus:border-none focus:outline-none"
        ref={searchInputRef}
        placeholder="Search name"
        value={valueSearch} // Ensure controlled input
        onSearch={handleSearch}
        onChange={(e) => setValueSearch(e.target.value)}
        enterButton
        style={{ marginBottom: 16, width: "300px" }}
        suffix={
          valueSearch && ( // Show icon only when there's text
            <CloseCircleOutlined
              className="!text-blue-500 !text-base cursor-pointer"
              onClick={() => setValueSearch("")} // Clear input on click
              style={{
                fontSize: 18,
                color: "red",
              }}
            />
          )
        }
      />

      <Tabs
        defaultActiveKey="1"
        onChange={handleTabChange}
        onTabClick={handleTabClick}
        onTabScroll={handleTabScroll}
      >
        <TabPane tab="Table" key="1">
          {loading ? (
            <Spin tip="Loading Data..." size="large">
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
                bordered
                rowKey="key"
              />
            </Spin>
          ) : (
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5 }}
              bordered
              rowKey="key"
            />
          )}
        </TabPane>

        {/* 
        // dont duplicate keys ,  tabs are place in keys order only */}
        <TabPane tab="Spin" key="5">
          <Spin
            tip="Loading Data..."
            size="large"
            spinning={loading}
            delay={1000}
            //  indicator={customIcon}
            wrapperClassName="custom-spin-wrapper "
          >
            {" "}
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5 }}
              bordered
              rowKey="key"
            />
          </Spin>
        </TabPane>

        <TabPane tab="Spin" key="6">
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
            bordered
            rowKey="key"
          />
        </TabPane>
      </Tabs>

      <Modal
        title="User Details"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <Tooltip title="Click to perform an action">
          hi {/* <Button type="primary">Hover me</Button> */}
        </Tooltip>
        <p>Details about the selected user will go here.</p>
      </Modal>
    </div>
  );
};

export default AntTableComponent;
