import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { debounce } from "react-axios/lib/utils";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import { Button, Input, Table as AntTable } from "antd";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState(``);
  const [sorter, setSorter] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const { isAuthen, auth } = useContext(AuthContext);

  const fetchData = useCallback(
    debounce(async () => {
      const { current, pageSize } = pagination;
      const { field, order } = sorter;
      let query = `$top=${pageSize}&$skip=${(current - 1) * pageSize}`;

      if (search) {
        query += `&$filter=contains(tolower(Name), tolower('${search}')) or contains(tolower(Author), tolower('${search}'))`;
      }
      if (field && order) {
        const sortOrder = order === "ascend" ? "asc" : "desc";
        query += `&$orderby=${field} ${sortOrder}`;
      }

      const response = await axiosInstance.get(`books?${query}`);
      setBooks(response.data);
      setPagination({
        ...pagination,
      });
    }, 1000),
    [search, sorter, pagination]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    setSorter(sorter);
    fetchData();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/books/${id}`);
    fetchData();
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", sorter: true },
    { title: "Name", dataIndex: "name", key: "name", sorter: true },
    { title: "Author", dataIndex: "author", key: "author", sorter: true },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Release Year",
      dataIndex: "releaseYear",
      key: "releaseYear",
      sorter: true,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Link to={`/books/${record.id}`}>Detail</Link>
          {auth?.role === "admin" && (
            <>
              <Link to={`/books/edit/${record.id}`} className="ml-2">
                Edit
              </Link>
              <Button onClick={() => handleDelete(record.id)} className="ml-2">
                Delete
              </Button>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Input
        placeholder="Search by title or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      {auth?.role === "admin" && (
        <Link to="/books/create">
          <Button>Create Post</Button>
        </Link>
      )}
      <AntTable
        columns={columns}
        dataSource={books}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="id"
      />
    </div>
  );
};

export default Books;
