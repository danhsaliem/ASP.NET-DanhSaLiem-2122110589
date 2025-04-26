import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './components/SidebarComponent';
import Topbar from './components/TopbarComponent';

import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import ProductManagement from './pages/Product';
import CategoryManagement from './pages/Categories';
import AdminOrderManagement from './pages/Order';

import Login from './pages/Login';
import CreateProduct from './pages/CreateProduct';

import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';

// Component bảo vệ route khi chưa đăng nhập
const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Hàm xử lý đăng nhập thành công
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar />}
        <div style={{ flex: 1 }}>
          {isAuthenticated && <Topbar />}
          <main style={{ padding: '20px' }}>
            <Routes>
              {/* Trang đăng nhập */}
              <Route path="/" element={<Login onLogin={handleLogin} />} />

              {/* Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Users */}
              <Route
                path="/users"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/createuser"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <CreateUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edituser"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <EditUser />
                  </ProtectedRoute>
                }
              />

              {/* Products */}
              <Route
                path="/products"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ProductManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/createproduct"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <CreateProduct />
                  </ProtectedRoute>
                }
              />
         

              {/* Categories */}
              <Route
                path="/categories"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <CategoryManagement />
                  </ProtectedRoute>
                }
              />

              {/* Orders */}
              <Route
                path="/orders"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <AdminOrderManagement />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
