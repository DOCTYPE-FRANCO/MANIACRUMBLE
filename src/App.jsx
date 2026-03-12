import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Homepage from './Homepage'
import Shop from './Shop'
import Cart from './Cart'
import { CartProvider } from './CartContext'
import { AuthProvider } from './AuthContext'
import Profile from './Profile'
import ProductDetail from './ProductDetail'
import Wishlist from './Wishlist'
import OrderHistory from './OrderHistory'
import AdminDashboard from './admin/AdminDashboard'
import AdminProducts from './admin/AdminProducts'
import AdminOrders from './admin/AdminOrders'
import ProtectedRoute from './ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen w-full bg-black relative">
            <Header />
            <div className='z-20 relative'>
              <Routes>
                <Route path='/' element={<Homepage />}></Route>
                <Route path='/shop' element={<Shop />}></Route>
                <Route path='/product/:id' element={<ProductDetail />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/wishlist' element={<ProtectedRoute><Wishlist /></ProtectedRoute>}></Route>
                <Route path='/orders' element={<ProtectedRoute><OrderHistory /></ProtectedRoute>}></Route>
                <Route path='/admin' element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>}></Route>
                <Route path='/admin/products' element={<ProtectedRoute adminOnly><AdminProducts /></ProtectedRoute>}></Route>
                <Route path='/admin/orders' element={<ProtectedRoute adminOnly><AdminOrders /></ProtectedRoute>}></Route>
              </Routes>
            </div>
            <Footer />
            <ScrollToTop />
            <Toaster position="top-right"/>
          </div>
        </CartProvider>
      </AuthProvider>
    </div>
  )
}

export default App
