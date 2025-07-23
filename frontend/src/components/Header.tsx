import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="bg-red-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Strawberry World</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-red-200">Home</Link>
            </li>
            <li>
              <Link to="/strawberries" className="hover:text-red-200">Varieties</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-red-200">Contact</Link>
            </li>
            {token ? (
              <li>
                <button onClick={handleLogout} className="hover:text-red-200">Logout</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-red-200">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-red-200">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
