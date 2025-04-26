import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Api = 'http://localhost:5001/api';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [roleId, setRoleId] = useState('0');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [userToEdit, setUserToEdit] = useState(null);
  const navigate = useNavigate();

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({ icon: 'warning', text: 'No token found. Please log in first.' });
        return;
      }

      try {
        const response = await axios.get(`${Api}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
        Swal.fire({ icon: 'error', text: 'Failed to fetch users.' });
      }
    };

    fetchUsers();
  }, []);

  // Handle submit for creating or updating users
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !userEmail || !password || !confirmPassword || !roleId || !address || !description || !phone) {
      Swal.fire({ icon: 'warning', text: 'All fields are required.' });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({ icon: 'warning', text: 'Passwords do not match.' });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({ icon: 'warning', text: 'No token found. Please log in first.' });
      return;
    }

    const dataToSubmit = {
      name: userName,
      email: userEmail,
      password: password,
      role: roleId === '1' ? 'admin' : 'user',
      address,
      description,
      phone,
    };

    try {
      let response;
      if (userToEdit) {
        // Update existing user
        response = await axios.put(`${Api}/user/${userToEdit.id}`, dataToSubmit, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.map((user) => (user.id === userToEdit.id ? response.data : user)));
        Swal.fire({ icon: 'success', text: 'User updated successfully' });
      } else {
        // Add new user
        response = await axios.post(`${Api}/user/create`, dataToSubmit, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers([...users, response.data]);
        Swal.fire({ icon: 'success', text: 'User added successfully' });
      }

      // Clear form fields after submission
      resetForm();
      navigate('/admin'); // Redirect to admin dashboard
    } catch (error) {
      console.error('Error while submitting user:', error);
      Swal.fire({ icon: 'error', text: 'Failed to submit user.' });
    }
  };

  // Reset form for adding or editing a user
  const resetForm = () => {
    setUserName('');
    setUserEmail('');
    setPassword('');
    setConfirmPassword('');
    setRoleId('0');
    setAddress('');
    setDescription('');
    setPhone('');
    setUserToEdit(null);
  };

  // Handle edit user button click
  const handleEditButtonClick = (user) => {
    setUserToEdit(user);
    setUserName(user.name);
    setUserEmail(user.email);
    setRoleId(user.role === 'admin' ? '1' : '0');
    setAddress(user.address || '');
    setDescription(user.description || '');
    setPhone(user.phone || '');
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    resetForm();
  };

  // Handle delete user
  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({ icon: 'warning', text: 'No token found. Please log in first.' });
        return;
      }

      await axios.delete(`${Api}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.id !== id));
      Swal.fire({ icon: 'success', text: 'User deleted successfully' });
    } catch (error) {
      Swal.fire({ icon: 'error', text: 'Failed to delete user.' });
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">User Management</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6 space-y-4">
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="User Name" className="w-full px-4 py-2 border rounded-md" />
          <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-2 border rounded-md" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-2 border rounded-md" />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full px-4 py-2 border rounded-md" />
          <select value={roleId} onChange={(e) => setRoleId(e.target.value)} className="w-full px-4 py-2 border rounded-md">
            <option value="0">User</option>
            <option value="1">Admin</option>
          </select>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="w-full px-4 py-2 border rounded-md" />
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full px-4 py-2 border rounded-md" />
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full px-4 py-2 border rounded-md" />

          <div className="flex space-x-2">
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
              {userToEdit ? 'Update User' : 'Add User'}
            </button>
            {userToEdit && (
              <button type="button" onClick={handleCancelEdit} className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-200">
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-5 font-semibold">ID</th>
              <th className="py-3 px-5 font-semibold">User Name</th>
              <th className="py-3 px-5 font-semibold">Email</th>
              <th className="py-3 px-5 font-semibold">Role</th>
              <th className="py-3 px-5 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-5">{user.id}</td>
                  <td className="py-3 px-5">{user.name}</td>
                  <td className="py-3 px-5">{user.email}</td>
                  <td className="py-3 px-5">{user.role}</td>
                  <td className="py-3 px-5">
                    <button onClick={() => handleEditButtonClick(user)} className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md mr-2">
                      Edit
                    </button>
                    <button onClick={() => deleteUser(user.id)} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-5 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
