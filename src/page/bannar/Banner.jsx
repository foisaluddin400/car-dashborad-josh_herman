import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Table, Button, Space, Image, Pagination, Input, message } from "antd";
import AddBanner from "./AddBanner";
import UpdateBanner from "./UpdateBanner";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { Navigate } from "../../Navigate";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const Banner = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const isLoading = false;
  // Dummy data
  const dummyBanners = [
    {
      _id: "1",
      banner_url: "https://via.placeholder.com/300x150?text=Banner+1",
      redirect_url: "https://example.com/banner1",
      startDate: "2025-09-01",
      endDate: "2025-09-30",
    },
    {
      _id: "2",
      banner_url: "https://via.placeholder.com/300x150?text=Banner+2",
      redirect_url: "https://example.com/banner2",
      startDate: "2025-09-05",
      endDate: "2025-10-05",
    },
    {
      _id: "3",
      banner_url: "https://via.placeholder.com/300x150?text=Banner+3",
      redirect_url: "https://example.com/banner3",
      startDate: null,
      endDate: null,
    },
    {
      _id: "4",
      banner_url: "https://via.placeholder.com/300x150?text=Banner+4",
      redirect_url: "https://example.com/banner4",
      startDate: "2025-09-10",
      endDate: "2025-10-10",
    },
  ];

  // Filtered & paginated data
  const filteredBanners = dummyBanners.filter((banner) =>
    banner.redirect_url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedBanners = filteredBanners.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleEdit = (record) => {
    setSelectedBanner(record);
    setEditModal(true);
  };

  const handleDelete = (id) => {
    message.success("Deleted banner: " + id);
  };

  const columns = [
    {
      title: "Banner",
      dataIndex: "banner_url",
      key: "banner_url",
      render: (url, record) => (
        <a href={record.redirect_url} target="_blank" rel="noopener noreferrer">
          <Image src={url} alt="banner" width={120} height={60} />
        </a>
      ),
    },
    {
      title: "Redirect URL",
      dataIndex: "redirect_url",
      key: "redirect_url",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) =>
        date ? format(new Date(date), "dd MMM yyyy") : "Not set",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) =>
        date ? format(new Date(date), "dd MMM yyyy") : "Not set",
    },
    {
      title: "Actions",
      key: "actions",
      align:'right',
      render: (_, record) => (
        <div className="flex gap-2 justify-end">
          <div
            onClick={() => handleEdit(record)}
            className="w-[36px] h-[36px] text-lg bg-[#007BFF] flex justify-center items-center text-white rounded cursor-pointer"
          >
            <MdOutlineModeEdit />
          </div>
          <div
            onClick={() => handleDeleteCategory(record._id)}
            className="w-[36px] h-[36px] text-lg bg-[#E63946] flex justify-center items-center text-white rounded cursor-pointer"
          >
            <RiDeleteBin6Line />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-3 h-[87vh]">
      {/* Header */}
      <div className="flex justify-between ">
        <Navigate title={"Banner "} />
        <div>
          <button
            onClick={() => setOpenAddModal(true)}
            className="bg-[#D7B473] w-[150px] text-white py-2 rounded"
          >
            Add Car
          </button>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={paginatedBanners}
        rowKey="_id"
        pagination={false}
        className="custom-table"
        scroll={{ x: "max-content" }}
        loading={isLoading}
      />

      {/* Pagination */}
      <div className=" flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredBanners.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>

      {/* Modals */}
      <AddBanner
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />
      <UpdateBanner
        editModal={editModal}
        setEditModal={setEditModal}
        selectedCategory={selectedBanner}
      />
    </div>
  );
};

export default Banner;
