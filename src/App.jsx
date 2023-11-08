import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


//components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
