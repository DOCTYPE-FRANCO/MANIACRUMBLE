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

function App() {
  return (
    <div>
      <CartProvider>
        <Header />
        <div>
          <Routes>
            <Route path='/' element={<Homepage />}></Route>
            <Route path='/shop' element={<Shop />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
          </Routes>
        </div>
        <Footer />
        <Toaster position="top-right"/>
      </CartProvider>
    </div>
  )
}

export default App
