import React, { useState } from 'react';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    category_id: '',
    photo: null,
    brand: '',
    description: '',
    details: '',
    price: '',
    name: '',
  });
  
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://localhost:8000/api/admin/products', { // Đảm bảo đường dẫn API chính xác
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Product added successfully!');
        console.log(data);
        setFormData({
          user_id: '',
          category_id: '',
          photo: null,
          brand: '',
          description: '',
          details: '',
          price: '',
          name: '',
        });
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors || {});
        alert('Failed to add product: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {/* User ID */}
        <div className="mb-4">
          <label className="block text-gray-700">User ID</label>
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.user_id ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.user_id && <p className="text-red-500">{errors.user_id.join(', ')}</p>}
        </div>

        {/* Category ID */}
        <div className="mb-4">
          <label className="block text-gray-700">Category ID</label>
          <input
            type="text"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.category_id ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.category_id && <p className="text-red-500">{errors.category_id.join(', ')}</p>}
        </div>

        {/* Photo */}
        <div className="mb-4">
          <label className="block text-gray-700">Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/jpeg, image/png, image/jpg, image/gif"
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.photo ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.photo && <p className="text-red-500">{errors.photo.join(', ')}</p>}
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label className="block text-gray-700">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.brand ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.brand && <p className="text-red-500">{errors.brand.join(', ')}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.description && <p className="text-red-500">{errors.description.join(', ')}</p>}
        </div>

        {/* Details */}
        <div className="mb-4">
          <label className="block text-gray-700">Details</label>
          <input
            type="text"
            name="details"
            value={formData.details}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.details ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.details && <p className="text-red-500">{errors.details.join(', ')}</p>}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.price && <p className="text-red-500">{errors.price.join(', ')}</p>}
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.name && <p className="text-red-500">{errors.name.join(', ')}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Product
        </button>

        {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
      </form>
    </div>
  );
};

export default CreateProduct;
