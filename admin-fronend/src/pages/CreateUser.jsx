import React, { useState } from 'react';

const CreateUser = ({ setUsers }) => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    password: '',
    confirmPassword: '',
    roleId: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
  
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: formData.userName,
          email: formData.userEmail,
          password: formData.password,
          role_id: formData.roleId,
        }),
      });
  
      // Kiểm tra mã trạng thái của phản hồi
      if (!response.ok) {
        // Nếu không phải 2xx, giả định rằng có lỗi
        const errorData = await response.json(); // Phân tích phản hồi
        console.error('Error details:', errorData); // Hiển thị thông tin chi tiết lỗi ra console
        setErrors(errorData.errors || { submit: 'An error occurred while creating the user.' });
        return; // Ra khỏi hàm nếu có lỗi
      }
  
      // Nếu phản hồi thành công
      const data = await response.json(); 
      setUsers((prevUsers) => [...prevUsers, data]);
      setSuccessMessage('User created successfully!');
  
      // Reset form
      setFormData({
        userName: '',
        userEmail: '',
        password: '',
        confirmPassword: '',
        roleId: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: 'User created successfully!' });
    }
  };
  
  

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create New User</h2>
      <form onSubmit={handleSubmit}>
        {/* User Name */}
        <div className="mb-4">
          <label className="block text-gray-700">User Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.userName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.userName && <p className="text-red-500">{errors.userName}</p>}
        </div>

        {/* User Email */}
        <div className="mb-4">
          <label className="block text-gray-700">User Email</label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.userEmail ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.userEmail && <p className="text-red-500">{errors.userEmail}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
        </div>

        {/* Role ID */}
        <div className="mb-4">
          <label className="block text-gray-700">Role ID</label>
          <input
            type="text"
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.roleId ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.roleId && <p className="text-red-500">{errors.roleId}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          Create User
        </button>

        {/* Success Message */}
        {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
        {/* Error Message */}
        {errors.submit && <p className="mt-4 text-red-500">{errors.submit}</p>}
      </form>
    </div>
  );
};

export default CreateUser;
