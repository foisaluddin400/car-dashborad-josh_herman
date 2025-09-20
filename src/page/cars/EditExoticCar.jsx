import { Form, Input, message, Modal, Select, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
// import { useUpdateCategoryMutation } from "../redux/api/categoryApi";
import { imageUrl } from "../redux/api/baseApi";
import TextArea from "antd/es/input/TextArea";

const EditExoticCar = ({ editModal, setEditModal, selectedCategory }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [updateCategory] = useUpdateCategoryMutation();

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // ✅ Whenever modal opens, fill default data again
  useEffect(() => {
    if (editModal && selectedCategory) {
      form.setFieldsValue({
        name: selectedCategory?.name,
      });

      setFileList([
        {
          uid: "-1",
          name: "category-image.png",
          status: "done",
          url: `${imageUrl}${selectedCategory?.imageUrl}`,
        },
      ]);
    }
  }, [editModal, selectedCategory, form]);

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

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setEditModal(false);
  };

  const handleSubmit = async (values) => {
    // setLoading(true);
    // try {
    //   const formData = new FormData();
    //   if (fileList.length && fileList[0].originFileObj) {
    //     formData.append("image", fileList[0].originFileObj);
    //   }
    //   formData.append("name", values.name);
    //   const res = await updateCategory({ formData, id: selectedCategory?._id });
    //   message.success(res?.data?.message || "Updated successfully");
    //   setEditModal(false);
    // } catch (error) {
    //   console.error(error);
    //   message.error(error?.data?.message || "Update failed");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <Modal
      centered
      open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnClose // ✅ clears content when modal closes
    >
      <div className="mb-20 mt-4">
        <div className="font-bold text-center mb-11">Edit Royal</div>
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
    </Modal>
  );
};

export default EditExoticCar;
