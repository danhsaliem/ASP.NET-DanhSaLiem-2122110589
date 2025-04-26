import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Api = 'http://localhost:5001/api/category';

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(Api);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Add category
  const handleAddCategory = async () => {
    if (!categoryName) {
      Swal.fire({ icon: 'warning', text: 'Category name is required' });
      return;
    }

    try {
      const response = await axios.post(Api, {
        name: categoryName,
        description: categoryDesc,
      });
      setCategories([...categories, response.data]);
      setCategoryName('');
      setCategoryDesc('');
      Swal.fire({ icon: 'success', text: 'Category added successfully' });
    } catch (error) {
      Swal.fire({ icon: 'error', text: 'Failed to add category' });
    }
  };

  // Update category
  const handleEditCategory = async () => {
    if (!categoryName || !categoryToEdit) {
      Swal.fire({ icon: 'warning', text: 'Category name is required' });
      return;
    }

    try {
      const response = await axios.put(`${Api}/${categoryToEdit.id}`, {
        id: categoryToEdit.id,
        name: categoryName,
        description: categoryDesc,
      });

      setCategories(
        categories.map((cat) =>
          cat.id === categoryToEdit.id ? response.data : cat
        )
      );
      setCategoryName('');
      setCategoryDesc('');
      setCategoryToEdit(null);
      Swal.fire({ icon: 'success', text: 'Category updated successfully' });
    } catch (error) {
      Swal.fire({ icon: 'error', text: 'Failed to update category' });
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${Api}/${id}`);
      setCategories(categories.filter((cat) => cat.id !== id));
      Swal.fire({ icon: 'success', text: 'Category deleted successfully' });
    } catch (error) {
      Swal.fire({ icon: 'error', text: 'Failed to delete category' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryToEdit) {
      handleEditCategory();
    } else {
      handleAddCategory();
    }
  };

  const handleEditButtonClick = (category) => {
    setCategoryToEdit(category);
    setCategoryName(category.name);
    setCategoryDesc(category.description);
  };

  const handleCancelEdit = () => {
    setCategoryToEdit(null);
    setCategoryName('');
    setCategoryDesc('');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
          className="border p-2 mb-2 block w-full"
        />
        <input
          type="text"
          value={categoryDesc}
          onChange={(e) => setCategoryDesc(e.target.value)}
          placeholder="Category Description"
          className="border p-2 mb-4 block w-full"
        />
        <div className="mb-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          >
            {categoryToEdit ? 'Update Category' : 'Add Category'}
          </button>
          {categoryToEdit && (
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left text-gray-600">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{category.id}</td>
                  <td className="py-3 px-6">{category.name}</td>
                  <td className="py-3 px-6">{category.description}</td>
                  <td className="py-3 px-6">
                    <button
                      className="mr-2 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => handleEditButtonClick(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => deleteCategory(category.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-3 px-6 text-center">
                  No categories available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryManagement;
