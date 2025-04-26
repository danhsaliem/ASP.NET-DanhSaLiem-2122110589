import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [logoutMessage, setLogoutMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:8000/api/user/profile/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    localStorage.removeItem('userData'); // Remove userData from localStorage
    setLogoutMessage('Đăng xuất thành công');
    setTimeout(() => {
      navigate('/login'); // Redirect to login page after a short delay
    }, 2000);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Thông tin người dùng</h2>
      
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">Tên:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="phone">Số điện thoại:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="address">Địa chỉ:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Cập nhật</button>
          <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 rounded ml-2">Hủy</button>
        </form>
      ) : (
        <div>
          <p><strong>Tên:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Số điện thoại:</strong> {user.phone}</p>
          <p><strong>Địa chỉ:</strong> {user.address}</p>
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-2 rounded mt-4">Chỉnh sửa</button>
        </div>
      )}

      {logoutMessage && <div className="text-green-500 mt-4">{logoutMessage}</div>}

      <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded mt-4">Đăng xuất</button>
    </div>
  );
};

export default Profile;
