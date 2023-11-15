import './App.css'

//components
import Footer from './components/Footer'
import NavbarAdm from './components/Navbar-adm'
import Cadastro from './pages/CreatePost/CreatePost'

import { BrowserRouter } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa';

function App() {

  return (
    <BrowserRouter>
      <NavbarAdm />
      <Cadastro />
      <Footer />
    </BrowserRouter>
  )
}

export default App
