import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import Blog from './pages/Blog';
import AISommelier from './components/AISommelier';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: 'admin' | 'customer' }> = ({ children, role }) => {
  const { user } = useStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/blog" element={<Blog />} />
        
        {/* Protected Customer Routes */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

        {/* Protected Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <AISommelier />
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <AppRoutes />
      </Router>
    </StoreProvider>
  );
};

export default App;
