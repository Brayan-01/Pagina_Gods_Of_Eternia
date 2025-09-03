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
import Player from './pages/Player/Player';

// ¡NUEVA IMPORTACIÓN!
import GameSetupModal from './components/GameSetupModal/GameSetupModal'; // ¡Importa el nuevo componente Modal!

const App = () => {
  return (
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
          <Route path="/player" element={<Player />} />        
          {/* ¡CAMBIO AQUÍ! La ruta /juego ahora carga el MODAL de configuración */}
          <Route path="/juego" element={<GameSetupModal />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;