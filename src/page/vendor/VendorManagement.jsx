import React, { useState } from "react";
import { Input, Modal, Pagination, Table, message, Tag } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { SearchOutlined } from "@ant-design/icons";
import { LuEye } from "react-icons/lu";
import { Navigate } from "../../Navigate";

const VendorManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState(
    Array.from({ length: 25 }, (_, index) => ({
      key: index + 1,
      no: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      phone: `+8801${Math.floor(100000000 + Math.random() * 900000000)}`,
      block: index + 1,
      blockId: index % 2 === 0,
      image: `https://avatar.iran.liara.run/public/${index + 1}`,
      createdAt: new Date().toLocaleDateString(),
      about:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dolor vel quam.",
      status: "Pending",
    }))
  );

  const pageSize = 10;

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const showModal = (record) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleAccept = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.key === id ? { ...u, status: "Accepted" } : u))
    );
    message.success("Vendor accepted successfully!");
  };

  const handleReject = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.key === id ? { ...u, status: "Rejected" } : u))
    );
    message.error("Vendor rejected!");
  };

  const handleBlockUnblock = (id) => {
    message.success(`User with ID ${id} blocked/unblocked successfully`);
  };

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag
          color={
            record.status === "Accepted"
              ? "green"
              : record.status === "Rejected"
              ? "red"
              : "blue"
          }
        >
          {record.status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <div className="flex justify-end gap-2 items-center">
          <button
            className="text-2xl text-blue-500 hover:text-blue-700"
            onClick={() => showModal(record)}
          >
            <LuEye />
          </button>
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

  // Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedUsers = users.slice(start, end);

  return (
    <div className="bg-white p-3">
      <div className="flex justify-between">
        <Navigate title={"Vendor Management"} />
        <Input
          placeholder="Search by name..."
          prefix={<SearchOutlined />}
          style={{ marginBottom: "16px", maxWidth: "300px", height: "40px" }}
        />
      </div>

      <Table
        dataSource={paginatedUsers}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
        className="custom-table"
      />

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={users.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      {/* Beautiful View Modal */}
      <Modal
        open={isModalOpen}
        centered
        onCancel={handleCancel}
        footer={null}
        width={500}
        className="rounded-lg overflow-hidden"
      >
        {selectedUser && (
          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-28 h-28 rounded-full border-4 border-blue-100 overflow-hidden shadow-md mb-3">
                <img
                  src={selectedUser.image}
                  alt="Profile avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedUser.name}
              </h2>
              <Tag
                color={
                  selectedUser.status === "Accepted"
                    ? "green"
                    : selectedUser.status === "Rejected"
                    ? "red"
                    : "blue"
                }
                className="mt-2"
              >
                {selectedUser.status}
              </Tag>
            </div>

            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-2">
                <AiOutlinePhone size={18} className="text-gray-500" />
                <span>{selectedUser.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <AiOutlineMail size={18} className="text-gray-500" />
                <span>{selectedUser.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <GoLocation size={18} className="text-gray-500" />
                <span>Location unavailable</span>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-700 mb-1">About</h3>
                <p className="text-sm leading-relaxed">{selectedUser.about}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VendorManagement;
