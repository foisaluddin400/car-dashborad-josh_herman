import { Table, Space, Modal, Pagination } from "antd";
import { LuEye } from "react-icons/lu";
import { useState } from "react";
import { Navigate } from "../../Navigate";


const HeplSupport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Dummy contact data
  const dummyData = Array.from({ length: 25 }, (_, index) => ({
    key: index + 1,
    sl: index + 1,
    date: new Date().toLocaleDateString(),
    userName: `User ${index + 1}`,
    contactNumber: `+8801${Math.floor(100000000 + Math.random() * 900000000)}`,
    email: `user${index + 1}@example.com`,
    message: `This is a sample message from user ${index + 1}`,
  }));

  // Pagination
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = dummyData.slice(start, end);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openModal = (record) => {
    setSelectedRecord(record);
    setModal2Open(true);
  };

  const closeModal = () => {
    setModal2Open(false);
    setSelectedRecord(null);
  };

  const columns = [
    {
      title: "SL no.",
      dataIndex: "sl",
      width: 70,
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "contactNumber",
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => openModal(record)}>
            <span className="bg-black text-white w-[35px] h-[35px] flex justify-center items-center rounded text-xl">
              <LuEye />
            </span>
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="mx-auto h-screen bg-white p-3">
      <div className="flex justify-between pb-4">
        <Navigate title={"Help Center"} />
      </div>

      <Table columns={columns} dataSource={paginatedData} pagination={false} />

      <div className="mt-4 flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={dummyData.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      <Modal
        title="Details"
        centered
        open={modal2Open}
        onCancel={closeModal}
        footer={null}
        closable={true}
        width={400}
        className="no-border-radius-modal"
        closeIcon={<span className="text-lg text-black">×</span>}
      >
        <div>
          <div className="grid grid-cols-2">
            <div className="text-lg gap-4">
              <h4>User Name</h4>
              <h4>Date</h4>
              <h4>Contact Number:</h4>
              <h4>Email:</h4>
              <h4>Message:</h4>
            </div>
            <div className="gap-4 text-lg">
              <h3>{selectedRecord?.userName || "N/A"}</h3>
              <h3>{selectedRecord?.date || "N/A"}</h3>
              <h3>{selectedRecord?.contactNumber || "N/A"}</h3>
              <h3>{selectedRecord?.email || "N/A"}</h3>
              <h3>{selectedRecord?.message || "N/A"}</h3>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HeplSupport;
