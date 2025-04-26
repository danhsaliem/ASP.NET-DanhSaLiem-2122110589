import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/orderdetail/${UserId}'); // Thay 1 bằng userId thực tế
        setOrders(response.data);
      } catch (err) {
        setError("Không thể tải thông tin lịch sử đơn hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="order-history-container max-w-6xl mx-auto p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-xl text-white">
      <h2 className="text-4xl font-bold text-center mb-6">Lịch sử đơn hàng</h2>
      
      {orders.length === 0 ? (
        <p className="text-center text-xl">Không có đơn hàng nào.</p>
      ) : (
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-gray-700 bg-gray-200">
                <th className="py-3 px-6 text-left font-semibold">Mã đơn hàng</th>
                <th className="py-3 px-6 text-left font-semibold">Ngày đặt</th>
                <th className="py-3 px-6 text-left font-semibold">Tổng giá</th>
                <th className="py-3 px-6 text-left font-semibold">Trạng thái</th>
                <th className="py-3 px-6 text-left font-semibold">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-all duration-300">
                  <td className="py-4 px-6 border-b text-gray-800">{order.id}</td>
                  <td className="py-4 px-6 border-b text-gray-600">{new Date(order.dateCreated).toLocaleDateString()}</td>
                  <td className="py-4 px-6 border-b text-gray-600">{order.totalAmount.toLocaleString()} VND</td>
                  <td className="py-4 px-6 border-b text-gray-600">{order.status}</td>
                  <td className="py-4 px-6 border-b">
                    <a href={`/orderdetail/${order.id}`} className="text-blue-500 hover:text-blue-700">Xem chi tiết</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
