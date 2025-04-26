import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: null,
    categoryId: '',
    quantity: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/Product');
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm({
      ...form,
      [name]: type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description || !form.price || !form.categoryId || !form.quantity) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("categoryId", form.categoryId);
    formData.append("quantity", form.quantity);

    // Kiểm tra và thêm ảnh nếu có
    if (form.imageUrl) {
      formData.append("imageFile", form.imageUrl); // Trường 'imageFile' trong backend
    } else {
      alert('Vui lòng chọn ảnh!');
      return;
    }

    try {
      if (editingId) {
        // Cập nhật sản phẩm
        await axios.put(`http://localhost:5001/api/Product/${editingId}`, formData);
      } else {
        // Thêm sản phẩm mới
        await axios.post('http://localhost:5001/api/Product', formData);
      }

      setForm({ name: '', description: '', price: '', imageUrl: null, categoryId: '', quantity: '' });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error('Error during API call:', error.response?.data);
      alert('Có lỗi xảy ra khi gửi dữ liệu');
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/Product/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Quản lý Sản phẩm</h2>
      <form onSubmit={handleSubmit} className="mb-4 grid gap-2 grid-cols-2">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Tên sản phẩm" className="p-2 border" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Mô tả" className="p-2 border" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Giá" type="number" className="p-2 border" />
        <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" className="p-2 border" />
        <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Số lượng" type="number" className="p-2 border" />
        <input type="file" name="imageUrl" onChange={handleChange} className="p-2 border" />
        <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded">
          {editingId ? 'Cập nhật' : 'Thêm'}
        </button>
      </form>

      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Mô tả</th>
            <th className="border p-2">Giá</th>
            <th className="border p-2">Ảnh</th>
            <th className="border p-2">CategoryId</th>
            <th className="border p-2">Số lượng</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td className="border p-2">{prod.id}</td>
              <td className="border p-2">{prod.name}</td>
              <td className="border p-2">{prod.description}</td>
              <td className="border p-2">{prod.price}</td>
              <td className="border p-2">
                <img src={`http://localhost:5001/images/${prod.imageUrl}`} alt={prod.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="border p-2">{prod.categoryId}</td>
              <td className="border p-2">{prod.quantity}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(prod)} className="bg-yellow-400 px-2 py-1 mr-2">Sửa</button>
                <button onClick={() => handleDelete(prod.id)} className="bg-red-500 text-white px-2 py-1">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
