import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthen, logout } = useContext(AuthContext);
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4">
          Home
        </Link>
        <Link to="/books" className="mr-4">
          Books
        </Link>
        {isAuthen && (
          <Link to="/profile" className="mr-4">
            Profile
          </Link>
        )}
      </div>
      <div>
        {isAuthen ? (
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-green-500">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
