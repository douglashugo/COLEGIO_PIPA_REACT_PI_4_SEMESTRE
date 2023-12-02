import './App.css'

//components
import Footer from './components/Footer';
import NavbarAdm from './components/Navbar-adm';

//pages
import Home from './pages/Home/Home';
import Post from './pages/Post/Post';
import CreatePost from "./pages/CreatePost/CreatePost";
import Register from "./pages/Register/Register"
import UserManagement from "./pages/UserManagement/UserManagement";
import UserDetails from './components/UserDetails';
import EditUser from './pages/EditUser/EditUser';

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
        <Route path="/dashboard-users" element={<UserManagement />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
        <Route path="/user-edit/:id" element={<EditUser />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
