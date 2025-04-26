import React, { useState } from 'react';
import ContactService from '../Service/ContactService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedPhone = formData.phone.replace(/\D/g, '');
    const updatedFormData = { ...formData, phone: formattedPhone };

    try {
      await ContactService.addContact(updatedFormData);

      toast.success('Thêm liên hệ thành công!', {
        position: 'top-right',
        autoClose: 2000,
        progress: undefined,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
      });
    } catch (error) {
      console.error('Lỗi khi thêm liên hệ:', error);

      toast.error('Có lỗi xảy ra, vui lòng thử lại!', {
        position: 'top-right',
        autoClose: 2000,
        progress: undefined,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-1 gap-16 items-center p-8 shadow-lg rounded-3xl max-w-6xl mx-auto bg-white mt-4 mb-5 font-sans relative overflow-hidden min-h-screen">
        <div className="my-6 mx-auto max-w-lg w-full bg-gray-100 p-8 shadow-lg rounded-lg font-[sans-serif]">
          <h1 className="mb-6 text-4xl font-extrabold text-center text-gray-800">Thêm Liên Hệ</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Existing fields */}
            <div>
              <label className="block mb-2 text-sm text-gray-800">Tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tên"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-800">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-800">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Số điện thoại"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-800 mb-2">Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Địa chỉ"
                required
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Thêm liên hệ'}
            </button>
          </form>

          {/* Success/Error messages */}
          {successMessage && (
            <div className="mt-4 text-green-500">
              <p>{successMessage}</p>
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 text-red-500">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
