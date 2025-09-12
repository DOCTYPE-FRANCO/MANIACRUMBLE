import { useState } from 'react'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Homepage from './Homepage'

function App() {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
