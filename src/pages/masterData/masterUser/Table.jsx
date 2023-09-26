import React, { useEffect, useRef, useState } from "react";
import { Table as AntdTable, Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const Table = ({ sourceData, isLoading }) => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [sortedInfo, setSortedInfo] = useState({
    columnKey: null,
    order: null,
  });

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const handleSorter = (a, b, key) => {
    if (typeof a[key] === "string" && typeof b[key] === "string") {
      return a[key].localeCompare(b[key]);
    } else {
      return a[key] - b[key];
    }
  };

  const handleData = (inputData) => {
    if (inputData === undefined) return [];
    if (inputData.length === 0) return [];
    return inputData.map((item) => ({
      key: item.id,
      nrp: item.nrp,
      fullName: item.fullName,
      email: item.email,
      workLocation: item.WorkLocation.name,
      role: item.Role.name,
      isActive: item.isActive ? "Active" : "Inactive",
    }));
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText("");
    confirm();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "NRP",
      width: 130,
      dataIndex: "nrp",
      key: "nrp",
      sorter: (a, b) => handleSorter(a, b, "nrp"),
      sortOrder: sortedInfo.columnKey === "nrp" && sortedInfo.order,
      ...getColumnSearchProps("nrp"),
    },
    {
      title: "Nama",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => handleSorter(a, b, "fullName"),
      sortOrder: sortedInfo.columnKey === "fullName" && sortedInfo.order,
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => handleSorter(a, b, "email"),
      sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Lokasi Kerja",
      dataIndex: "workLocation",
      key: "workLocation",
      sorter: (a, b) => handleSorter(a, b, "workLocation"),
      sortOrder: sortedInfo.columnKey === "workLocation" && sortedInfo.order,
      ...getColumnSearchProps("workLocation"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => handleSorter(a, b, "role"),
      sortOrder: sortedInfo.columnKey === "role" && sortedInfo.order,
      ...getColumnSearchProps("role"),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: 130,
      sorter: (a, b) => handleSorter(a, b, "isActive"),
      sortOrder: sortedInfo.columnKey === "isActive" && sortedInfo.order,
      ...getColumnSearchProps("isActive"),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <a>action</a>,
    },
  ];

  useEffect(() => {
    setData(handleData(sourceData));
  }, [sourceData]);

  return (
    <>
      <AntdTable
        loading={isLoading}
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        scroll={{
          x: 1300,
        }}
      />
    </>
  );
};

export default Table;
