import React, { useState, useEffect } from 'react';

const EditUser = ({ user, setUsers }) => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    roleId: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setFormData({
      userName: user.name,
      userEmail: user.email,
      roleId: user.role_id,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    try {
      const response = await fetch(`http://localhost:5001/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('User updated successfully');
        setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? data : u)));
      } else {
        setErrors(data.errors || { general: 'Error updating user.' });
      }
    } catch (err) {
      setErrors({ general: 'Network error, please try again later.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      {errors.general && <div className="text-red-500 mb-4">{errors.general}</div>}
      <div className="mb-4">
        <label htmlFor="userName" className="block text-gray-700 font-semibold mb-2">User Name</label>
        <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="userEmail" className="block text-gray-700 font-semibold mb-2">Email</label>
        <input type="email" id="userEmail" name="userEmail" value={formData.userEmail} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="roleId" className="block text-gray-700 font-semibold mb-2">Role ID</label>
        <input type="number" id="roleId" name="roleId" value={formData.roleId} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Update User</button>
    </form>
  );
};

export default EditUser;