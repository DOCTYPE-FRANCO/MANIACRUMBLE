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
import Profile from './Profile'

function App() {
  return (
    <div>
      <CartProvider>

        <div className="min-h-screen w-full bg-black relative">
           
              {/* Your Content/Components */}

              <Header />
                <div className='z-20 relative'>
                  <Routes>
                    <Route path='/' element={<Homepage />}></Route>
                    <Route path='/shop' element={<Shop />}></Route>
                    <Route path='/cart' element={<Cart />}></Route>
                    <Route path='/profile' element={<Profile />}></Route>
                  </Routes>
                </div>
                <Footer />
                <Toaster position="top-right"/>
        </div>

        
      </CartProvider>
    </div>
  )
}

export default App
