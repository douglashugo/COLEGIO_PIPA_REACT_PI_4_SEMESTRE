import './App.css'

//components
import Footer from './components/Footer'
import NavbarAdm from './components/Navbar-adm'
import CreatePost from './pages/CreatePost/CreatePost'

import { BrowserRouter } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa';

function App() {

  return (
    <BrowserRouter>
      <NavbarAdm />
      <CreatePost />
      <Footer />
    </BrowserRouter>
  )
}

export default App
