import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Contexto y Rutas Protegidas
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; 

// Componentes y Páginas
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login/loginpage';
import Register from './pages/Register/Register';
import Verification from './pages/Verification/Verification';
import BlogPage from './pages/Blog/BlogPage';
import About from './pages/About/about';
import Player from './pages/Player/Player'; // Tu página de perfil de usuario
import RedirectToGame from './components/RedirectToGame'; // El componente que redirige al juego

const App = () => {
  return (
    // Se asume que BrowserRouter está en un nivel superior (index.js), si no, envuelve todo aquí.
    <AuthProvider>
      <Header />
      <Routes>
        {/* --- Rutas Públicas --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verificar" element={<Verification />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/about" element={<About />} />

        {/* --- Rutas Protegidas --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/player" element={<Player />} />      {/* MUESTRA EL PERFIL */}
          <Route path="/juego" element={<RedirectToGame />} />  {/* REDIRIGE AL JUEGO */}
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;