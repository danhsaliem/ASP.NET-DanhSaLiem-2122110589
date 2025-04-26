import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function ProductDetail() {
    const { id } = useParams();  
    const navigate = useNavigate(); 
    const [product, setProduct] = useState(null);  
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (!id) {
                    toast.error('ID sản phẩm không hợp lệ');
                    return;
                }
                const response = await axios.get(`http://localhost:5001/api/product/${id}`);
                if (response.data) {
                    setProduct(response.data);
                } else {
                    toast.error('Không tìm thấy sản phẩm');
                }
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
                toast.error('Không thể tải thông tin sản phẩm.');
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className="text-center p-8">Loading sản phẩm...</div>;
    }

    const addToCart = async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));

        // Kiểm tra đăng nhập kỹ
        if (!userData || !userData.token || !userData.user || !userData.user.id) {
            toast.error('Bạn cần đăng nhập để thêm vào giỏ hàng.');
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        try {
            await axios.post('http://localhost:5001/api/cart', {
                userId: userData.user.id, // Gửi userId rõ ràng
                productId: product.id, 
                quantity: qty,
            }, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                    'Content-Type': 'application/json',
                },
            });

            toast.success('Đã thêm vào giỏ hàng!', { position: "top-right", autoClose: 2000 });
        } catch (error) {
            toast.error('Lỗi khi thêm vào giỏ hàng!', { position: "top-right", autoClose: 2000 });
            console.log('Error: ', error);
        }
    };

    return (
        <div className="flex justify-center p-8 bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center mb-6 md:mb-0">
                    <img
                        src={`http://localhost:5001/images/${product.imageUrl}`}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                    />
                </div>

                <div className="flex flex-col justify-between">
                    <h1 className="text-4xl font-semibold text-gray-900 mb-4">{product.name}</h1>
                    <p className="text-lg text-gray-500 mb-4">{product.description}</p>
                    
                    <div className="flex items-center mb-4 text-yellow-500">
                        {[...Array(5)].map((_, index) => (
                            <i key={index} className={`fas ${index < 4 ? 'fa-star' : 'fa-star-half'}`}></i>
                        ))}
                        <span className="ml-2 text-gray-500">| Đã bán: {product.quantity}</span>
                    </div>

                    <div className="text-3xl font-bold text-red-500 mb-6">
                        {product.price.toLocaleString()} VND
                    </div>

                    <div className="flex items-center space-x-4 mb-6">
                        <button 
                            className="bg-gray-200 px-4 py-2 rounded-l hover:bg-gray-300 transition"
                            onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                        >
                            -
                        </button>
                        <span className="px-4 py-2 border border-gray-300">{qty}</span>
                        <button 
                            className="bg-gray-200 px-4 py-2 rounded-r hover:bg-gray-300 transition"
                            onClick={() => setQty(qty + 1)}
                        >
                            +
                        </button>
                        <button 
                            className="bg-black text-white px-6 py-3 rounded-lg ml-4 hover:bg-gray-800 transition"
                            onClick={addToCart}
                        >
                            🛒 Thêm vào giỏ hàng
                        </button>
                    </div>

                    <div className="mt-4">
                        <button 
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                            onClick={() => navigate('/')}
                        >
                            Quay lại trang chủ
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ProductDetail;
