import './App.css'

//components

import Footer from './components/Footer'
import NavbarAdm from './components/Navbar-adm'
import { BrowserRouter } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa';

function App() {

  return (
    <BrowserRouter>
      <NavbarAdm />
      <Footer />
    </BrowserRouter>
  )
}

export default App
