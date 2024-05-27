import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { Form, Input, Button } from "antd";

const EditBook = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/books/${id}`);
      form.setFieldsValue(response.data);
    };
    fetchData();
  }, [id, form]);

  const onFinish = async (values) => {
    await axiosInstance.put(`/books/${id}`, values);
    navigate("/books");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Edit Book</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="author"
          label="Author"
          rules={[{ required: true, message: "Please input the author!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="releaseYear" label="Release Year">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditBook;
