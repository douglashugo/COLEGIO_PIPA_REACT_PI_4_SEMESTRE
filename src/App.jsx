import './App.css'

//components
import Footer from './components/Footer';
import NavbarAdm from './components/Navbar-adm';
import BlogPost from './components/BlogPost';

//pages
import Home from './pages/Home/Home';
import Post from './pages/Post/Post';
import CreatePost from "./pages/CreatePost/CreatePost";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa';


function App() {

  return (
    <BrowserRouter>
      <NavbarAdm />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/register/create" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
