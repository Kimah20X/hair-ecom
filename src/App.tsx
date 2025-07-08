import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from '@/components/layout/Layout';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Cart from '@/pages/Cart';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Brands from '@/pages/Brands';
import HairCareGuide from '@/pages/HairCareGuide';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/hair-care-guide" element={<HairCareGuide />} />
              <Route path="*" element={
                <div className="container mx-auto px-4 py-16 text-center">
                  <h1 className="text-2xl font-bold">Page Not Found</h1>
                  <p className="text-slate-600 mt-4">The page you're looking for doesn't exist.</p>
                </div>
              } />
            </Routes>
          </Layout>
          <Toaster richColors position="top-right" />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;