import './App.css'

//components
import Footer from './components/Footer';
import NavbarAdm from './components/Navbar-adm';
import Home from './pages/Home/Home';
import CreatePost from "./pages/CreatePost/CreatePost";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa';

function App() {

  return (
    <BrowserRouter>
      <NavbarAdm />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/posts/create" element={<CreatePost />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
