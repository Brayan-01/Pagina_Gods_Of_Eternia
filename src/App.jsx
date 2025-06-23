// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. IMPORTAR LOS COMPONENTES QUE FALTABAN
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';

// Tus componentes de página
import Home from './pages/Home';
import Login from './pages/loginpage';
import ResetPassword from './pages/resetpassword';
import Register from './pages/Register';
import Player from './pages/Player';
import About from './pages/about';
import ProtectedRoute from './components/ProtectedRoute';

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

        {/* --- Rutas Protegidas --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/player" element={<Player />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;