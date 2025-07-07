// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/loginpage';
import ResetPassword from './pages/resetpassword';
import Register from './pages/Register';
import Player from './pages/Player';
import About from './pages/about';
import BlogPage from './pages/Blog/BlogPage';

const App = () => {
  return (
    <AuthProvider>
      <Header />

      <Routes>
        {/* --- Rutas Públicas --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        {/* --- La ruta del blog ahora es pública --- */}
        <Route path="/blog" element={<BlogPage />} />

        {/* --- Rutas Protegidas --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/player" element={<Player />} />
          {/* Aquí irían otras rutas que sí necesiten protección estricta */}
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;