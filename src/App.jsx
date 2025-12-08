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
            {/* Dark White Dotted Grid Background */}
            <div
              className="absolute inset-0 z-0"
              style={{
                background: "#000000",
                backgroundImage: `
                  radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
                `,
                backgroundSize: "30px 30px",
                backgroundPosition: "0 0",
              }}
            />
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
