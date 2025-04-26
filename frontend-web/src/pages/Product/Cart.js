import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Fetch Product Details
  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
      toast.error('Lỗi khi lấy chi tiết sản phẩm');
      return null;
    }
  };

  // Fetch Cart Items
  const fetchCartItems = async (userId, token) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        const updatedCartItems = await Promise.all(
          response.data.map(async (item) => {
            const productDetails = await fetchProductDetails(item.productId);
            return { ...item, product: productDetails };
          })
        );
        setCartItems(updatedCartItems);

        const sum = updatedCartItems.reduce(
          (acc, cur) => acc + (cur.product?.price * cur.quantity || 0),
          0
        );
        setTotal(sum);
      } else {
        toast.error('Dữ liệu giỏ hàng không hợp lệ');
      }
    } catch (error) {
      console.error('Lỗi khi lấy giỏ hàng:', error);
      toast.error('Lỗi khi lấy dữ liệu giỏ hàng');
    }
  };

  // Remove Item from Cart
  const handleRemoveItem = async (itemId) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData?.token) return;

    try {
      await axios.delete(`http://localhost:5001/api/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      toast.success('Đã xoá sản phẩm khỏi giỏ hàng');
      fetchCartItems(userData.user.id, userData.token); // Gọi lại
    } catch (error) {
      console.error('Lỗi khi xoá sản phẩm khỏi giỏ hàng:', error);
      toast.error('Không thể xoá sản phẩm');
    }
  };

  // Handle Payment
  const handlePayment = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData?.token || !userData.user?.id) {
      toast.warning("Bạn cần đăng nhập để thanh toán");
      return;
    }

    if (cartItems.length === 0) {
      toast.warning("Giỏ hàng trống");
      return;
    }

    const orderDetails = cartItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));

    const orderData = {
      userId: userData.user.id,
      name: userData.user.name,
      email: userData.user.email,
      phone: userData.user.phone,
      address: userData.user.address,
      orderDetails
    };

    try {
      // Tạo đơn hàng
      const response = await axios.post(
        'http://localhost:5001/api/order',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      if (response.status === 201) {
        // Xoá toàn bộ giỏ hàng sau khi đặt hàng
        await axios.delete(
          `http://localhost:5001/api/order/${userData.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );


        toast.success(' Đặt hàng thành công!');
        setCartItems([]);
        setTotal(0);
      } else {
        toast.error('Đặt hàng thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi đặt hàng:', error);
      toast.error(`Đặt hàng thất bại: ${error.response?.data?.message || "Lỗi không xác định"}`);
    }
  };

  // Fetch Cart Items on Component Load
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData?.token || !userData.user?.id) {
      toast.warning('Bạn cần đăng nhập để xem giỏ hàng');
      navigate('/login');
      return;
    }

    fetchCartItems(userData.user.id, userData.token);
  }, [navigate]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">🛒 Giỏ hàng của bạn</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Giỏ hàng trống.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  {item.product?.imageUrl && (
                    <img
                      src={`http://localhost:5001/images/${item.product.imageUrl}`}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{item.product?.name}</h3>
                    <p className="text-gray-600">Số lượng: {item.quantity}</p>
                    <p className="text-red-500 font-bold">
                      {item.product?.price.toLocaleString()}₫
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-800 transition text-sm font-medium"
                >
                  ❌ Xoá
                </button>
              </div>
            ))}

            <div className="pt-4 text-right text-2xl font-bold text-red-600 border-t">
              Tổng cộng: {total.toLocaleString()}₫
            </div>

            <div className="text-center">
              <button
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                onClick={handlePayment}
              >
                Tiến hành thanh toán
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
