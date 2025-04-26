import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post(`http://localhost:5001/api/user/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (user.role === 'admin') {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userAvatar', user.avatar || 'default-avatar.jpg');

        onLogin();
        navigate('/dashboard');
      } else {
        setErrorMessage('Bạn không có quyền truy cập.');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error || 'Thông tin đăng nhập không chính xác.');
      } else {
        setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Đăng Nhập Quản Trị</h2>

        {errorMessage && (
          <div className="mb-4 text-center text-sm text-red-500 font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập email của bạn"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập mật khẩu của bạn"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-300"
          >
            Đăng Nhập
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Quên mật khẩu?{' '}
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Lấy lại mật khẩu
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
