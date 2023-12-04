import React from 'react';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

//components
import Footer from './components/Footer';
import NavbarAdm from './components/Navbar-adm';
import PrivateRoute from './components/PrivateRoute';

//pages
import Home from './pages/Home/Home';
import Post from './pages/Post/Post';
import CreatePost from "./pages/CreatePost/CreatePost";
import Register from "./pages/Register/Register"
import UserManagement from "./pages/UserManagement/UserManagement";
import UserDetails from './components/UserDetails';
import EditUser from './pages/EditUser/EditUser';
import Login from './pages/Login/login';
import Dashboard from './pages/Dashboard/Dashboard';

// context
import { AuthProvider, useAuth } from "./contexts/AuthContext";


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <NavbarAdm />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={ <Home />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/register/create" element={<Register />} />
          <Route path="/dashboard-users" element={<UserManagement />} />
          <Route path="/user-details/:id" element={<UserDetails />} />
          <Route path="/user-edit/:id" element={<EditUser />} />
          <Route path="/dashboard-posts" element={<Dashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
