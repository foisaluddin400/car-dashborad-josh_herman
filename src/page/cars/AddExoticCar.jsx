import { Form, Input, message, Modal, Select, Spin, Upload } from "antd";
import React, { useState } from "react";
const { TextArea } = Input;

const onPreview = async (file) => {
  let src = file.url;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

const AddExoticCar = ({ openAddModal, setOpenAddModal }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {
    console.log("Submitted values:", values);
    console.log("Uploaded files:", fileList);
    // Add your API call here to save the car
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className="mb-4 mt-4">
        <div>
          <div className="font-bold text-center mb-8">
            + Add Royal 
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="px-2"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter title!" }]}
            >
              <Input placeholder="Enter car title" style={{ height: "40px" }} />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please enter category!" }]}
            >
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
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter price!" }]}
            >
              <Input placeholder="Enter price" style={{ height: "40px" }} />
            </Form.Item>

            <Form.Item
              label="Time / Hours"
              name="timeHours"
              rules={[{ required: true, message: "Please enter time/hours!" }]}
            >
              <Input
                placeholder="Enter time or hours"
                style={{ height: "40px" }}
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter description!" }]}
            >
              <TextArea placeholder="Enter description" rows={4} />
            </Form.Item>

            <Form.Item label="Upload Photos">
              <Upload
                style={{ width: "100%" }}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                multiple={true}
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 mt-2 bg-[#D7B473] text-white rounded-md"
              >
                {loading ? <Spin size="small" /> : "Add Car"}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddExoticCar;
