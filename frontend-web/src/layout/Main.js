import React from 'react'
import { Route, Routes } from 'react-router-dom'; 
import Register from '../pages/login/Register';
import Login from '../pages/login/Login';
import AllProduct from '../pages/Product/AllProduct';
import Profile from '../pages/login/Profile';
import ProductDetail from '../pages/Product/ProductDetail';
import Contact from '../pages/Contact';
import Cart from '../pages/Product/Cart';
import OrderDetail from '../pages/Product/OrderDetail';  // Import thêm OrderDetail

const Main = () => (
  <main>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/allProduct" element={<AllProduct />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/productdetail/:id" element={<ProductDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
     <Route path="/orderdetail/:id" element={<OrderDetail />} />
    </Routes>
  </main>
)

export default Main;
