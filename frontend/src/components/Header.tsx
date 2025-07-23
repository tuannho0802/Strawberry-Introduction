import React, { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header
      style={{
        background:
          "linear-gradient(to right, #EF4444, #DC2626)",
      }}
      className=" text-white shadow-md sticky top-0 z-50 pb-3"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl text-zinc-200  font-bold tracking-tight hover:opacity-90 transition flex  items-center"
          >
            <div className="text-6xl">🍓</div>{" "}
            Strawberry World
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="text-gray-800 px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Home
            </Link>
            <Link
              to="/strawberries"
              className="text-gray-800 px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Varieties
            </Link>
            <Link
              to="/contact"
              className=" text-gray-800 px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Contact
            </Link>
            {token ? (
              <button
                onClick={handleLogout}
                className="bg-white text-red-600 font-medium px-4 py-2 rounded-md hover:bg-red-100 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md hover:bg-red-700 transition "
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-red-600 font-medium px-4 py-2 rounded-md hover:bg-red-100 transition"
                >
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() =>
              setIsMenuOpen(!isMenuOpen)
            }
            className="md:hidden text-2xl focus:outline-none"
          >
            {isMenuOpen ? "❌" : "☰"}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-2 py-4">
            <Link
              to="/"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className="block px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Home
            </Link>
            <Link
              to="/strawberries"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className="block px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Varieties
            </Link>
            <Link
              to="/contact"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className="block px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Contact
            </Link>
            {token ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left bg-white text-red-600 px-4 py-2 rounded-md hover:bg-red-100 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="block px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="block bg-white text-red-600 px-4 py-2 rounded-md hover:bg-red-100 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
