// import axios from 'axios';
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Register() {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [password_confirmation, setPasswordconfirmation] = useState('');
//   const [description, setDescription] = useState('');  // Thêm trường description
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const validatePhone = (phone) => {
//     const regex = /^\d{10,15}$/;
//     return regex.test(phone);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Kiểm tra tính hợp lệ của form
//     if (!name || !email || !phone || !address || !username || !password || !password_confirmation || !description) {
//       toast.error('Vui lòng điền đầy đủ thông tin!');
//       return;
//     }
//     if (!validateEmail(email)) {
//       toast.error('Email không hợp lệ!');
//       return;
//     }
//     if (!validatePhone(phone)) {
//       toast.error('Số điện thoại không hợp lệ!');
//       return;
//     }
//     if (password !== password_confirmation) {
//       toast.error('Mật khẩu không khớp!');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Gửi yêu cầu đăng ký tới backend
//       const response = await axios.post('http://localhost:5001/api/user/register', {
//         name,
//         email,
//         phone,
//         address,
//         username,
//         password,
//         password_confirmation,
//         description  // Gửi trường description
//       });

//       // Hiển thị thông báo thành công và chuyển hướng đến trang đăng nhập
//       toast.success('Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.');
//       localStorage.setItem('token', response.data.token); // Lưu token nếu có
//       navigate('/login'); // Chuyển hướng đến trang đăng nhập
//     } catch (error) {
//       console.error('API error:', error);

//       // Lấy lỗi từ phản hồi của API
//       const errorDetails = error?.response?.data || 'Có lỗi xảy ra, vui lòng thử lại!';
//       console.error('Lỗi chi tiết từ API:', errorDetails);

//       // Hiển thị lỗi chi tiết từ API
//       const errors = error?.response?.data?.errors || {};
//       for (let field in errors) {
//         errors[field].forEach((msg) => {
//           toast.error(`${field}: ${msg}`);
//         });
//       }
//     } finally {
//       setLoading(false); // Đảm bảo setLoading là false sau khi API call
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center">
//       <div className="bg-white shadow-2xl rounded-xl w-full max-w-lg overflow-hidden">
//         <div className="p-8 sm:p-12">
//           <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Đăng Ký</h2>

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-medium text-gray-700" htmlFor="name">Tên</label>
//               <input
//                 type="text"
//                 id="name"
//                 className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Nhập tên"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700" htmlFor="phone">Số điện thoại</label>
//               <input
//                 type="text"
//                 id="phone"
//                 className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Nhập số điện thoại"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700" htmlFor="address">Địa chỉ</label>
//               <input
//                 type="text"
//                 id="address"
//                 className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Nhập địa chỉ"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700" htmlFor="username">Tên đăng nhập</label>
//               <input
//                 type="text"
//                 id="username"
//                 className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Nhập tên đăng nhập"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Nhập email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700" htmlFor="password">Mật khẩu</label>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Nhập mật khẩu"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm text-purple-600">
//                 {showPassword ? 'Ẩn' : 'Hiện'}
//               </button>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700" htmlFor="password_confirmation">Xác nhận mật khẩu</label>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password_confirmation"
//                 className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Xác nhận mật khẩu"
//                 value={password_confirmation}
//                 onChange={(e) => setPasswordconfirmation(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700" htmlFor="description">Mô tả</label>
//               <textarea
//                 id="description"
//                 className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Nhập mô tả"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-3 mt-4 ${loading ? 'bg-gray-400' : 'bg-gradient-to-r bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500'} duration-300 text-white rounded-lg shadow-lg font-medium text-lg`}
//             >
//               {loading ? 'Đang tải...' : 'Đăng ký'}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Đã có tài khoản?{' '}
//               <Link to="/login" className="text-purple-600 hover:underline">Đăng nhập</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Register;
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordconfirmation] = useState('');
  const [description, setDescription] = useState('');  // Thêm trường description
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^\d{10,15}$/;
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của form
    if (!name || !email || !phone || !address || !username || !password || !password_confirmation || !description) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Email không hợp lệ!');
      return;
    }
    if (!validatePhone(phone)) {
      toast.error('Số điện thoại không hợp lệ!');
      return;
    }
    if (password !== password_confirmation) {
      toast.error('Mật khẩu không khớp!');
      return;
    }

    setLoading(true);
    try {
      // Gửi yêu cầu đăng ký tới backend
      const response = await axios.post('http://localhost:5001/api/user/register', {
        name,
        email,
        phone,
        address,
        username,
        password,
        password_confirmation,
        description,  // Gửi trường description
        role: 'user'  // Mặc định role là 'user'
      });

      // Hiển thị thông báo thành công và chuyển hướng đến trang đăng nhập
      toast.success('Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.');
      localStorage.setItem('token', response.data.token); // Lưu token nếu có
      navigate('/login'); // Chuyển hướng đến trang đăng nhập
    } catch (error) {
      console.error('API error:', error);

      // Lấy lỗi từ phản hồi của API
      const errorDetails = error?.response?.data || 'Có lỗi xảy ra, vui lòng thử lại!';
      console.error('Lỗi chi tiết từ API:', errorDetails);

      // Hiển thị lỗi chi tiết từ API
      const errors = error?.response?.data?.errors || {};
      for (let field in errors) {
        errors[field].forEach((msg) => {
          toast.error(`${field}: ${msg}`);
        });
      }
    } finally {
      setLoading(false); // Đảm bảo setLoading là false sau khi API call
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-lg overflow-hidden">
        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Đăng Ký</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">Tên</label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nhập tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="phone">Số điện thoại</label>
              <input
                type="text"
                id="phone"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                id="address"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nhập địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="username">Tên đăng nhập</label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

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
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm text-purple-600">
                {showPassword ? 'Ẩn' : 'Hiện'}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="password_confirmation">Xác nhận mật khẩu</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password_confirmation"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Xác nhận mật khẩu"
                value={password_confirmation}
                onChange={(e) => setPasswordconfirmation(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="description">Mô tả</label>
              <textarea
                id="description"
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nhập mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-4 ${loading ? 'bg-gray-400' : 'bg-gradient-to-r bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500'} duration-300 text-white rounded-lg shadow-lg font-medium text-lg`}
            >
              {loading ? 'Đang tải...' : 'Đăng ký'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-purple-600 hover:underline">Đăng nhập</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
