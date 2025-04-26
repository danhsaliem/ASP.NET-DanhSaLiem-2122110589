import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AllProduct() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchName, setSearchName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Lấy danh mục khi component load
  useEffect(() => {
    fetchCategories();
  }, []);

  // Lấy sản phẩm khi selectedCategory hoặc các tham số lọc thay đổi
  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(); // Lọc sản phẩm theo danh mục
    } else {
      fetchProducts(); // Nếu không chọn danh mục, lấy tất cả sản phẩm
    }
  }, [selectedCategory, searchName, minPrice, maxPrice]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/category');
      setCategories(res.data);
    } catch (err) {
      console.error('Lỗi khi lấy danh mục:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/product', {
        params: {
          name: searchName || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
        }
      });
      setProducts(res.data);
    } catch (err) {
      console.error('Lỗi khi lấy sản phẩm:', err);
    }
  };

  const fetchProductsByCategory = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/product/by-category/${selectedCategory}`);
      setProducts(res.data);
    } catch (err) {
      console.error('Lỗi khi lấy sản phẩm theo danh mục:', err);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <div className="container mx-auto py-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">Tất cả sản phẩm</h2>

      <form className="mb-6">
        <div className="flex items-center space-x-4 flex-wrap">
          <select className="border rounded p-2" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Tất cả danh mục</option>
            {categories.map((cate) => (
              <option key={cate.id} value={cate.id}>
                {cate.name}
              </option>
            ))}
          </select>

          <input 
            type="text" 
            placeholder="Tìm kiếm theo tên sản phẩm" 
            className="border rounded p-2" 
            value={searchName} 
            onChange={handleSearchNameChange} 
          />

          <input 
            type="number" 
            placeholder="Giá tối thiểu" 
            className="border rounded p-2" 
            value={minPrice} 
            onChange={handleMinPriceChange} 
          />
          
          <input 
            type="number" 
            placeholder="Giá tối đa" 
            className="border rounded p-2" 
            value={maxPrice} 
            onChange={handleMaxPriceChange} 
          />

          <button 
            type="button" 
            className="bg-blue-500 text-white rounded px-4 py-2"
            onClick={() => fetchProducts()} // Gọi lại hàm lọc khi nhấn nút
          >
            Lọc
          </button>
        </div>
      </form>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow rounded overflow-hidden group relative">
            <div className="relative">
              <img
                src={`http://localhost:5001/images/${product.imageUrl}`}
                alt={product.name} 
                className="w-full h-60 object-cover" 
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-gray-500">{product.price?.toLocaleString()} VND</p>

              {/* Link to ProductDetail page */}
              <Link 
                to={`/productdetail/${product.id}`} 
                className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProduct;  