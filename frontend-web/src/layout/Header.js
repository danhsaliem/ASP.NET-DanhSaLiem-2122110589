import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State quản lý trạng thái đăng nhập

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn); // Thay đổi trạng thái đăng nhập
  };

  return (
    <header className="py-6 bg-white shadow-md">
      <nav className="container mx-auto flex flex-row justify-between items-center">
        <div className="text-3xl font-semibold cursor-pointer">
          SOUVENIRS STORE
        </div>
        <div className="relative w-1/3 mx-3">
          <input
            type="text"
            className="w-full py-2 px-4 text-sm rounded-full border-2 border-gray-300 focus:outline-none focus:border-orange-500 transition duration-200"
            placeholder="tìm kiếm sản phẩm"
          />
          <button className="absolute right-2 top-2 text-gray-500 hover:text-orange-500 transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 0-10.61 0 7.5 7.5 0 0 0 10.61 0z"
              />
            </svg>
          </button>
        </div>

        <ul className="flex items-center space-x-6 uppercase text-sm font-medium text-gray-600">
          <li>
            <Link
              to="/"
              onClick={() => handleLinkClick('home')}
              className={`py-1 no-underline ${activeLink === 'home' ? 'border-b-2 border-orange-500 text-black' : 'hover:text-orange-500'}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/allProduct"
              onClick={() => handleLinkClick('allProduct')}
              className={`py-1 ${activeLink === 'allProduct' ? 'border-b-2 border-orange-500 text-black' : 'hover:text-orange-500'}`}
            >
              Product
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={() => handleLinkClick('contact')}
              className={`py-1 ${activeLink === 'contact' ? 'border-b-2 border-orange-500 text-black' : 'hover:text-orange-500'}`}
            >
              Contact
            </Link>
          </li>
          <li>
            <a
              href="http://localhost:3000/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 hover:text-orange-500"
            >
              WEB
            </a>
          </li>
        </ul>

        {/* User Links */}
        <ul className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/profile" 
                  className="text-gray-600 hover:text-orange-500 transition"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/orderdetail/1" // Thêm link đến trang chi tiết đơn hàng
                  className="text-gray-600 hover:text-orange-500 transition"
                >
                  Order History
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  onClick={handleLoginLogout}
                  className="text-gray-600 hover:text-orange-500 transition"
                >
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-gray-600 hover:text-orange-500 transition"
                >
                  Đăng ký
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              to="/cart"
              className="flex items-center text-gray-600 hover:text-orange-500 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <span className="ml-2">Cart</span>
              <span className="tqd-badge-circle bg-orange-500 text-white ml-2 px-2 rounded-full">1</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
