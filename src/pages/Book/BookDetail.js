import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const BookDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/books/${id}`);
      setPost(response.data);
    };
    fetchData();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">{post.name}</h1>
      <p>
        <strong>Author:</strong> {post.author}
      </p>
      <p>
        <strong>Description:</strong> {post.description}
      </p>
      <p>
        <strong>Release Year:</strong> {post.releaseYear}
      </p>
    </div>
  );
};

export default BookDetail;
