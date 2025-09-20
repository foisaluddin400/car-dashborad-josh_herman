import { Input, message, Pagination, Select, Table } from "antd";
import { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SearchOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import AddExoticCar from "./AddExoticCar";
import EditExoticCar from "./EditExoticCar";

const RoyalExoticCars = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [categories, setCategories] = useState([
    {
      _id: "1",
      title: "Lamborghini Aventador",
      category: "Supercar",
      price: "$400,000",
      timeHours: "3h",
      imageUrl: "https://via.placeholder.com/100x100/007BFF/ffffff?text=Lamborghini"
    },
    {
      _id: "2",
      title: "Ferrari 488 GTB",
      category: "Supercar",
      price: "$330,000",
      timeHours: "2h",
      imageUrl: "https://via.placeholder.com/100x100/E63946/ffffff?text=Ferrari"
    },
    {
      _id: "3",
      title: "Porsche 911 Turbo",
      category: "Sports Car",
      price: "$200,000",
      timeHours: "4h",
      imageUrl: "https://via.placeholder.com/100x100/28A745/ffffff?text=Porsche"
    },
  ]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const isLoading = false;

  // Filter categories based on search
  const filteredCategories = categories.filter((cat) =>
    cat.title.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate filtered data
  const total = filteredCategories.length;
  const paginatedData = filteredCategories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDeleteCategory = (id) => {
    setCategories((prev) => prev.filter((cat) => cat._id !== id));
    message.success("Category deleted successfully");
    if (paginatedData.length === 1 && currentPage > 1) {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  };

  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModal(true);
  };

  // Table columns
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
          alt={record.title}
          className="w-10 h-10 object-cover rounded mx-auto"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Time/Hours",
      dataIndex: "timeHours",
      key: "timeHours",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
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
    <div className="bg-white p-3 h-[86vh]">
      <div className="flex justify-between mb-4">
        <Navigate title={"Royal Exotic Cars "} /> 
        <div className="flex gap-5">
          <Input
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by title..."
            prefix={<SearchOutlined />}
            style={{ maxWidth: "500px", height: "40px" }}
          />
          <div>
            <Select
              style={{ height: "40px" }}
              placeholder="Select Royal Category"
              // onChange={() => setShowStatus(true)}
            >
              <Option value="clothing">Royal Exotic Cars</Option>
              <Option value="clothing">Royal Yachts</Option>
              <Option value="clothing">Royal Mansions</Option>
              <Option value="clothing">Royal Jet Plane</Option>
            </Select>
          </div>
          <div>
            <button
              onClick={() => setOpenAddModal(true)}
              className="bg-[#D7B473] w-[150px] text-white py-2 rounded"
            >
              Add Car
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

      <AddExoticCar openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />
      <EditExoticCar
        editModal={editModal}
        setEditModal={setEditModal}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default RoyalExoticCars;
