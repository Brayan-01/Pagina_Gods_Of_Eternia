import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Contexto y Rutas Protegidas
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; 

// Componentes y Páginas
import Header from './components/Header';
import LoadingScreenMedieval from './pages/Loading_Screen/LoadingScreenMedieval';

// Lazy loading de las páginas
const Home = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const Register = lazy(() => import('./pages/Register/Register'));
const Verification = lazy(() => import('./pages/Verification/Verification'));
const BlogPage = lazy(() => import('./pages/Blog/BlogPage'));
const About = lazy(() => import('./pages/About/About'));
const Player = lazy(() => import('./pages/Player/Player'));
const GameSetupModal = lazy(() => import('./components/GameSetupModal/GameSetupModal'));

const App = () => {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-[linear-gradient(rgba(0,0,0,0.6),_rgba(0,0,0,0.6)),url('/fondo.jpg')] bg-no-repeat bg-center bg-fixed bg-cover font-['Montserrat',_sans-serif] text-white">
        <Header />
        <main className="flex-grow pt-20">
          <Suspense fallback={<LoadingScreenMedieval />}>
            <Routes>
              {/* --- Rutas Públicas --- */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verificar" element={<Verification />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/about" element={<About />} />

              {/* --- Rutas Protegidas --- */}
              <Route element={<ProtectedRoute />}>
                <Route path="/player" element={<Player />} />
                {/* La ruta /juego ahora carga la página del jugador, que controlará el modal */}
                <Route path="/juego" element={<Player showModalOnLoad={true} />} />
              </Route>
            </Routes>
          </Suspense>
        </main>
      </div>
    </AuthProvider>
  );
};

export default App;