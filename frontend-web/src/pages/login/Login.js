import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserService from "../../Service/UserService";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Gửi yêu cầu đăng nhập để nhận token
      const response = await UserService.login(email, password);
      console.log('Login response:', response);

      toast.success('Đăng nhập thành công!');

      const userData = {
        token: response.token,  // Lưu token từ phản hồi của API
        user: response.user,
        roles: response.roles,
      };

      // Lưu thông tin người dùng và token vào localStorage
      localStorage.setItem('userData', JSON.stringify(userData));

      setTimeout(() => {
        navigate('/allProduct');
      }, 1500);
    } catch (error) {
      console.log('Login error:', error); // debug
      if (error.response && error.response.data) {
        toast.error(error.response.data.error || 'Địa chỉ email hoặc mật khẩu không đúng!');
      } else {
        toast.error('Đã xảy ra lỗi, vui lòng thử lại!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-lg overflow-hidden">
        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Đăng Nhập</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-gradient-to-r transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white font-semibold rounded-lg"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-8">
            <p>
              <a href="forgot_password" className="text-purple-500 font-semibold hover:underline">
                Quên mật khẩu?
              </a>
            </p>
            <p className="mt-2">
              Chưa có tài khoản?{' '}
              <a href="/register" className="text-purple-500 font-semibold hover:underline">
                Đăng ký ngay
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
