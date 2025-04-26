import React, { useState, useEffect } from 'react';
import Avatar from '../assets/img/user.png'; // Avatar mặc định

function Topbar() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const storedUserName = localStorage.getItem('userName');

    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div className="bg-gray-700 text-white p-3 flex justify-end items-center">
      <div className="dashboard-header">
        {/* Hiển thị tên người dùng và avatar */}
        <div className="user-info flex items-center space-x-4">
          <span className="text-lg font-semibold">{userName}</span>
          <img
            src={Avatar}  // Sử dụng avatar mặc định
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
