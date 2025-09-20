import React, { useState } from "react";
import { Input, Modal, Pagination, Table, message, Tag, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { LuEye } from "react-icons/lu";
import { AiOutlinePhone } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { Navigate } from "../../Navigate";

const { Option } = Select;

const Booking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState(
    Array.from({ length: 25 }, (_, index) => ({
      key: index + 1,
      bookImage: `https://picsum.photos/100/100?random=${index + 1}`,
      bookName: `Book ${index + 1}`,
      bookPrice: `$${(10 + index).toFixed(2)}`,
      date: new Date().toLocaleDateString(),
      time: "10:00 AM",
      status: index % 2 === 0 ? "Approved" : "Pending",
      bookStatus: index % 2 === 0 ? "Pending" : "Completed",

      // Customer info
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      phone: `+8801${Math.floor(100000000 + Math.random() * 900000000)}`,
      address: `House ${index + 1}, Dhaka`,
      postcode: `120${index}`,
      drivingLicenceNumber: `DL-${1000 + index}`,
      drivingLicenceImage: `https://picsum.photos/200/120?random=${index + 50}`,
      age: 20 + index,
    }))
  );

  const pageSize = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [statusModal, setStatusModal] = useState({
    open: false,
    record: null,
  });

  const [bookStatusModal, setBookStatusModal] = useState({
    open: false,
    record: null,
    value: "",
  });

  // Show details modal
  const showModal = (record) => {
    setSelectedBooking(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  // Update Payment Status
  const handleStatusUpdate = () => {
    setBookings((prev) =>
      prev.map((item) =>
        item.key === statusModal.record.key
          ? {
              ...item,
              status:
                statusModal.record.status === "Approved"
                  ? "Pending"
                  : "Approved",
            }
          : item
      )
    );
    setStatusModal({ open: false, record: null });
  };

  // Update Book Status
  const handleBookStatusUpdate = () => {
    setBookings((prev) =>
      prev.map((item) =>
        item.key === bookStatusModal.record.key
          ? { ...item, bookStatus: bookStatusModal.value }
          : item
      )
    );
    setBookStatusModal({ open: false, record: null, value: "" });
  };

  // Reject
  const handleReject = (id) => {
    message.error(`Booking with ID ${id} has been rejected`);
  };

  const columns = [
    {
      title: "Book",
      key: "bookImage",
      render: (_, record) => (
        <img
          src={record.bookImage}
          alt="Book"
          className="w-12 h-12 object-cover rounded-md"
        />
      ),
    },
    { title: "Book Name", dataIndex: "bookName", key: "bookName" },
    { title: "Price", dataIndex: "bookPrice", key: "bookPrice" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Time", dataIndex: "time", key: "time" },

    {
      title: "Payment Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <div className="flex items-center gap-1">
          <span className="bg-green-100 rounded-full font-semibold border border-green-400 text-green-600 px-4 py-[2px]">
            {record.status}
          </span>
          <div className="bg-gray-100 rounded-full p-1 cursor-pointer">
            <FaRegEdit onClick={() => setStatusModal({ open: true, record })} />
          </div>
        </div>
      ),
    },
    {
      title: "Book Status",
      dataIndex: "bookStatus",
      key: "bookStatus",
      render: (_, record) => (
        <div className="flex items-center gap-1">
          <span className="bg-violet-100 rounded-full border font-semibold border-violet-400 text-violet-600 px-4 py-[2px]">
            {record.bookStatus}
          </span>
          <div className="bg-gray-100 rounded-full p-1 cursor-pointer">
            <FaRegEdit
              onClick={() =>
                setBookStatusModal({
                  open: true,
                  record,
                  value: record.bookStatus,
                })
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      key: "Action",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <button className="text-2xl" onClick={() => showModal(record)}>
            <LuEye />
          </button>
          <button
            onClick={() => handleReject(record.key)}
            className="px-2 py-1 bg-red-600 text-white rounded-md"
          >
            Reject
          </button>
        </div>
      ),
    },
  ];

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedBookings = bookings.slice(start, end);

  return (
    <div className="bg-white p-3">
      <div className="flex justify-between">
        <Navigate title={"Booked"} />
        <div className="flex gap-4">
          <div>
            <Select
              style={{ height: "40px" }}
              placeholder="Select Book"
              // onChange={() => setShowStatus(true)}
            >
              <Option value="clothing">Pending</Option>
              <Option value="electronics">Completed</Option>
              <Option value="accessories">Cancel</Option>
            </Select>
          </div>
          <Input
            placeholder="Search by book name..."
            prefix={<SearchOutlined />}
            style={{ maxWidth: "300px", height: "40px" }}
          />
        </div>
      </div>

      <Table
        dataSource={paginatedBookings}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
        className="custom-table mt-3"
      />

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={bookings.length}
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
      </div>

      {/* Booking Details Modal */}
      <Modal
        open={isModalOpen}
        centered
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        {selectedBooking && (
          <div className="w-full max-w-md p-5 mx-auto">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-md bg-gray-100 mb-3 overflow-hidden">
                <img
                  src={selectedBooking.bookImage}
                  alt="Book cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold">{selectedBooking.bookName}</h2>
              <p className="text-gray-500">{selectedBooking.bookPrice}</p>
              <p className="text-gray-500">
                {selectedBooking.date} - {selectedBooking.time}
              </p>
              <Tag
                color={
                  selectedBooking.status === "Approved" ? "green" : "orange"
                }
                className="mt-2"
              >
                {selectedBooking.status}
              </Tag>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {selectedBooking.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {selectedBooking.email}
              </p>
              <p className="flex items-center">
                <AiOutlinePhone className="mr-1" /> {selectedBooking.phone}
              </p>
              <p className="flex items-center">
                <GoLocation className="mr-1" /> {selectedBooking.address}
              </p>
              <p>
                <span className="font-semibold">Postcode:</span>{" "}
                {selectedBooking.postcode}
              </p>
              <p>
                <span className="font-semibold">Driving Licence Number:</span>{" "}
                {selectedBooking.drivingLicenceNumber}
              </p>
              <div>
                <span className="font-semibold">Driving Licence Image:</span>
                <img
                  src={selectedBooking.drivingLicenceImage}
                  alt="Licence"
                  className="mt-1 w-full h-28 object-cover rounded-md"
                />
              </div>
              <p>
                <span className="font-semibold">Age:</span>{" "}
                {selectedBooking.age}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Payment Status Modal */}
      <Modal
        title="Payment Status"
        open={statusModal.open}
        onCancel={() => setStatusModal({ open: false, record: null })}
        onOk={handleStatusUpdate}
      >
        <p>
          Are you sure you want to change Payment status of{" "}
          <b>{statusModal.record?.bookName}</b>?
        </p>
      </Modal>

      {/* Book Status Modal */}
      <Modal
        title="Book Status"
        open={bookStatusModal.open}
        onCancel={() =>
          setBookStatusModal({ open: false, record: null, value: "" })
        }
        onOk={handleBookStatusUpdate}
      >
        <Select
          value={bookStatusModal.value}
          onChange={(value) =>
            setBookStatusModal({ ...bookStatusModal, value })
          }
          style={{ width: "100%" }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Completed">Completed</Option>
          <Option value="Canceled">Canceled</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default Booking;
