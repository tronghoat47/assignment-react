import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Book from "./pages/Books";
import CreateBook from "./pages/Book/CreateBook";
import EditBook from "./pages/Book/EditBook";
import BookDetail from "./pages/Book/BookDetail";
import Login from "./pages/Login";
import Profile from "./pages/User/Profile";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Book />} />
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
