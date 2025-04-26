import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5001/api/Order'; // Sửa lại URL nếu cần

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setOrders(res.data);
    } catch (err) {
      console.error('Lỗi khi load đơn hàng:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá đơn hàng này?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setOrders(orders.filter((o) => o.id !== id));
    } catch (err) {
      console.error('Lỗi khi xoá đơn hàng:', err);
    }
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
  };

  const handleInputChange = (e) => {
    setSelectedOrder({ ...selectedOrder, [e.target.name]: e.target.value });
  };

  const updateOrder = async () => {
    try {

      await axios.put(`${API_URL}/${selectedOrder.id}`, selectedOrder);
      fetchOrders(); 
      setSelectedOrder(null); 
    } catch (err) {
      console.error('Lỗi khi cập nhật đơn hàng:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h2>


      {loading ? (
        <p>Đang tải đơn hàng...</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Tên</th>
              <th className="border px-4 py-2">SĐT</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Địa chỉ</th>
              <th className="border px-4 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.name}</td>
                <td className="border px-4 py-2">{order.phone}</td>
                <td className="border px-4 py-2">{order.email}</td>
                <td className="border px-4 py-2">{order.address}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => handleEditClick(order)}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => deleteOrder(order.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Sửa đơn hàng */}
      {selectedOrder && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Sửa đơn hàng ID {selectedOrder.id}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={selectedOrder.name}
              onChange={handleInputChange}
              placeholder="Tên"
              className="border p-2 rounded"
            />
            <input
              name="phone"
              value={selectedOrder.phone}
              onChange={handleInputChange}
              placeholder="Số điện thoại"
              className="border p-2 rounded"
            />
            <input
              name="email"
              value={selectedOrder.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border p-2 rounded"
            />
            <input
              name="address"
              value={selectedOrder.address}
              onChange={handleInputChange}
              placeholder="Địa chỉ"
              className="border p-2 rounded"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={updateOrder}
              className="bg-green-600 text-white px-4 py-2 rounded mr-2"
            >
              Lưu
            </button>
            <button
              onClick={() => setSelectedOrder(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Huỷ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderManagement;
