import { Form, Input, message, Modal, Spin } from "antd";
import React, { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";

const AddAdminstrator = ({ openAddModal, setOpenAddModal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();

  // Handle profile image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Close modal and reset
  const handleCancel = () => {
    form.resetFields();
    setImage(null);
    setOpenAddModal(false);
  };

  // Submit handler
  const handleSubmit = async (values) => {
    console.log("Submitted values:", values);
    console.log("Profile Image:", image);

    // Example: confirm passwords match
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    // Here you can send `values` and `image` to API
    message.success("Administrator added successfully");
    setOpenAddModal(false);
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className="">
        <div className="font-bold text-center mb-11">
          + Add Vendor
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="px-2"
        >
          {/* Profile Image */}
          <div className="relative w-[140px] h-[140px] mx-auto mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="profileImage"
              style={{ display: "none" }}
            />
            <img
              style={{
                width: 140,
                height: 140,
                borderRadius: "100%",
                objectFit: "cover",
                border: "2px solid #ddd",
              }}
              src={image ? URL.createObjectURL(image) : "https://via.placeholder.com/140"}
              alt="Admin Profile"
            />
            <label
              htmlFor="profileImage"
              className="absolute bottom-2 -right-2 bg-white shadow rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
            >
              <IoCameraOutline className="text-black text-lg" />
            </label>
          </div>

          {/* Name */}
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter name!" }]}
          >
            <Input placeholder="Enter name" style={{ height: "40px" }} />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter email" style={{ height: "40px" }} />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password!" }]}
          >
            <Input.Password placeholder="Enter password" style={{ height: "40px" }} />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" style={{ height: "40px" }} />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 mt-2 bg-[#D7B473] text-white rounded-md"
            >
              {loading ? <Spin size="small" /> : "Add"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddAdminstrator;
