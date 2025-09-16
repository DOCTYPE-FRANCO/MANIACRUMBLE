import { useState } from 'react'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Homepage from './Homepage'
import Shop from './Shop'
import Cart from './Cart'

function App() {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/shop' element={<Shop />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
