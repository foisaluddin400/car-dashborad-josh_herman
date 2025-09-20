import { Modal, Form, Input, Button, Upload, message, DatePicker } from "antd";
import React, { useState } from "react";
// import { useAddBannerMutation } from "../redux/api/metaDataApi";
import dayjs from "dayjs";

const AddBanner = ({ openAddModal, setOpenAddModal }) => {
  // const [addBanner] = useAddBannerMutation();
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  // Handle image upload
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

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

  // Close modal
  const handleCancel = () => {
    setOpenAddModal(false);
    form.resetFields();
    setFileList([]);
  };

  // Submit form
  const handleSubmit = async (values) => {
    // try {
    //   const formData = new FormData();

    //   fileList.forEach((file) => {
    //     formData.append("banner", file.originFileObj);
    //   });

    //   const data = {
    //     startDate: values.startDate?.format("YYYY-MM-DD"),
    //     endDate: values.endDate?.format("YYYY-MM-DD"),
    //     redirect_url: values.redirect_url,
    //   };

    //   formData.append("data", JSON.stringify(data));

    //   const res = await addBanner(formData).unwrap();

    //   message.success(res.message || "Banner added successfully!");
    //   setOpenAddModal(false);
    //   form.resetFields();
    //   setFileList([]);
    // } catch (error) {
    //   console.error(error);
    //   message.error(error?.data?.error || "Failed to add banner");
    // }
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <div>
        <h1 className="text-center font-bold mb-4 text-lg">Add Banner</h1>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {/* Redirect URL */}
          <Form.Item
            label="Redirect URL"
            name="redirect_url"
            rules={[{ required: true, message: "Please enter redirect URL" }]}
          >
            <Input placeholder="https://example.com" />
          </Form.Item>

          {/* Start & End Dates */}
          <div className="grid grid-cols-2 gap-3">
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: "Please select start date" }]}
            >
              <DatePicker
                className="w-full"
                format="DD/MM/YYYY"
                placeholder="Select start date"
              />
            </Form.Item>

            <Form.Item
              label="End Date"
              name="endDate"
              rules={[{ required: true, message: "Please select end date" }]}
            >
              <DatePicker
                className="w-full"
                format="DD/MM/YYYY"
                placeholder="Select end date"
              />
            </Form.Item>
          </div>

          {/* Upload */}
          <Form.Item
            label="Banner Image"
            required
            tooltip="Upload one banner image"
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              maxCount={1}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </Form.Item>

          {/* Actions */}
          <div className="w-full flex gap-3 mt-6">
            <button
              type="primary"
              htmlType="submit"
              className="bg-[#D7B473] w-full py-2 rounded text-white"
            >
              Save
            </button>
            <button
              danger
              type="default"
              className="w-full py-2 rounded border border-[#D7B473] text-[#D7B473] "
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddBanner;
