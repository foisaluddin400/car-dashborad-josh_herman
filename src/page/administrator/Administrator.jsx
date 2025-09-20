import { Input, message, Pagination, Table } from "antd";
import { useState } from "react";
import { MdBlockFlipped, MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SearchOutlined } from "@ant-design/icons";

import { Navigate } from "../../Navigate";
import AddAdminstrator from "./AddAdminstrator";

const Administrator = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // 🧪 Dummy Data
  const [categories, setCategories] = useState([
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "01700000001",
      imageUrl: "https://via.placeholder.com/100x100/007BFF/ffffff?text=John",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "01700000002",
      imageUrl: "https://via.placeholder.com/100x100/E63946/ffffff?text=Jane",
    },
    {
      _id: "3",
      name: "Alice Brown",
      email: "alice@example.com",
      phone: "01700000003",
      imageUrl: "https://via.placeholder.com/100x100/28A745/ffffff?text=Alice",
    },
    {
      _id: "4",
      name: "Bob White",
      email: "bob@example.com",
      phone: "01700000004",
      imageUrl: "https://via.placeholder.com/100x100/FFC107/000000?text=Bob",
    },
  ]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const isLoading = false;

  // 🔍 Search filter
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination
  const total = filteredCategories.length;
  const paginatedData = filteredCategories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => setCurrentPage(page);

  // ❌ Delete
  const handleDeleteCategory = (id) => {
    setCategories((prev) => prev.filter((cat) => cat._id !== id));
    message.success("Administrator deleted successfully");
    if (paginatedData.length === 1 && currentPage > 1) {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  };
  const handleBlockUnblock = (id) => {
    message.success(`User with ID ${id} blocked/unblocked successfully`);
  };
  // ✏️ Edit
  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModal(true);
  };

  // 📋 Table Columns
  const columns = [
    {
      title: "SL No.",
      dataIndex: "sl",
      key: "sl",
      render: (_, __, index) => (currentPage - 1) * pageSize + (index + 1),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (_, record) => (
        <img
          src={record.imageUrl}
          alt={record.name}
          className="w-10 h-10 object-cover rounded mx-auto"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => handleBlockUnblock(record?.block)}
            className={`w-[30px] h-[30px] flex justify-center items-center text-xl rounded-md ${
              record.blockId ? "bg-green-600" : "bg-red-600"
            } text-white`}
          >
            <MdBlockFlipped />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-3 h-[87vh]">
      <div className="flex justify-between mb-4">
        <Navigate title={"Administrator"} />
        <div className="flex gap-5">
          <Input
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            style={{ maxWidth: "500px", height: "40px" }}
          />
          <div>
            <button
              onClick={() => setOpenAddModal(true)}
              className="bg-[#D7B473] w-[180px] text-white py-2 rounded"
            >
              Add Administrator
            </button>
          </div>
        </div>
      </div>

      <Table
        dataSource={paginatedData}
        columns={columns}
        rowKey="_id"
        pagination={false}
        className="custom-table"
        scroll={{ x: "max-content" }}
        loading={isLoading}
      />

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      <AddAdminstrator
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />
    </div>
  );
};

export default Administrator;
