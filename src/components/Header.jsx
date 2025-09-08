import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import infoIcon from '../assets/Info.png'; // Asegúrate de que la ruta sea correcta
import SalirIcon from '../assets/Salir.png'; // Asegúrate de que la ruta sea correcta
import { motion, AnimatePresence } from "framer-motion";

// Componente Dropdown ultra simplificado, ya que no hay submenús
const SimpleDropdown = ({ items, onItemSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleItemClick = (item) => {
    onItemSelected(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleToggle} className="flex items-center gap-2 bg-black/20 border border-purple-500 text-amber-200 px-4 py-2 rounded-lg cursor-pointer font-semibold transition-all duration-300 hover:bg-black/30 hover:border-amber-200 hover:-translate-y-0.5">
        <span className="text-lg">🤴🏽</span>
        <span>Mi Cuenta</span>
        <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      <AnimatePresence>
        {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 bg-gradient-to-b from-[#3e1f0d] to-[#8b4513] border border-purple-500 rounded-lg shadow-2xl p-2 min-w-[220px] backdrop-blur-md z-[1001]"
            >
              {items.map((item) => (
                <li key={item.id}>
                  <button onClick={() => handleItemClick(item)} className="w-full flex items-center gap-3 p-3 bg-transparent border-none text-amber-200 rounded-md cursor-pointer transition-all duration-200 text-left text-base hover:bg-amber-100/10 hover:text-white hover:translate-x-1">
                    <span className="text-lg w-5">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

// Componente Principal del Header
function Header() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const { isAuthenticated: isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  const dropdownItems = [
    { id: "perfil", name: "Mi perfil", icon: "🤴🏽", url: "/player" },
    { 
      id: "cerrar", 
      name: "Cerrar sesión", 
      icon: <img src={SalirIcon} alt="Cerrar Sesión" className="w-5 h-5" />
    },
  ];
  const handleDropdownSelect = (item) => {
    setIsMobileMenuOpen(false);
    if (item.url) {
      navigate(item.url);
    }
    if (item.id === "cerrar") {
      handleLogout();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-gradient-to-r from-[#3e1f0d] to-[#8b4513] shadow-lg border-b-2 border-amber-600 z-[1000] backdrop-blur-sm" ref={headerRef}>
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center p-2 rounded-lg transition-colors duration-300 hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>
            <img 
              src="/Logo_1.jpg" 
              alt="Gods of Eternia Logo" 
              className="h-12 w-12 mr-3 rounded-full border-2 border-purple-500 object-cover transition-all duration-300 hover:scale-110 hover:rotate-6 hover:border-amber-300"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/8b5a2b/FFFFFF?text=GOE&font=roboto'; }}
            />
            <h1 className="font-['Cinzel',_serif] font-bold text-2xl bg-gradient-to-r from-orange-300 via-amber-200 to-orange-300 bg-clip-text text-transparent animate-shine [text-shadow:0_0_15px_rgba(198,156,109,0.3)]">Gods of Eternia</h1>
          </Link>
        </div>

        <nav>
          {/* Menú para Escritorio */}
          <ul className="hidden md:flex items-center list-none gap-2">
            {isLoggedIn ? (
              <>
                <li><Link to="/" className="text-gray-200 no-underline px-4 py-2 rounded-md transition-colors hover:bg-white/10">🏰 Inicio</Link></li>
                <li>
                  <Link to="/about" className="flex items-center text-gray-200 no-underline px-4 py-2 rounded-md transition-colors hover:bg-white/10">
                    <img src={infoIcon} alt="Acerca de" className="w-5 h-5 mr-2" /> Acerca de
                  </Link>
                </li>
                <li> 
                  <SimpleDropdown items={dropdownItems} onItemSelected={handleDropdownSelect} />
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="text-gray-200 no-underline px-4 py-2 rounded-md transition-colors hover:bg-white/10">🔑 Iniciar Sesión</Link></li>
                <li><Link to="/register" className="text-gray-200 no-underline px-4 py-2 rounded-md transition-colors hover:bg-white/10">📜 Registrarse</Link></li>
              </>
            )}
          </ul>
        </nav>

        {/* Menú para Móvil */}
        <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed top-0 left-0 w-screen h-screen bg-stone-900/95 backdrop-blur-md flex justify-center items-center z-[1002] md:hidden"
            >
              <ul className="flex flex-col items-center list-none gap-8 text-center w-full max-w-xs">
                {isLoggedIn ? (
                  <>
                    <li><Link to="/" className="text-2xl font-['Cinzel',_serif] text-amber-400 p-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2.5 bg-white/5 border border-amber-500/30 w-full hover:bg-amber-200/20 hover:-translate-y-0.5" onClick={toggleMobileMenu}>🏰 Inicio</Link></li>
                    <li>
                      <Link to="/about" className="text-2xl font-['Cinzel',_serif] text-amber-400 p-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2.5 bg-white/5 border border-amber-500/30 w-full hover:bg-amber-200/20 hover:-translate-y-0.5" onClick={toggleMobileMenu}>
                        <img src={infoIcon} alt="Acerca de" className="w-6 h-6" /> Acerca de
                      </Link>
                    </li>
                    {dropdownItems.map(item => (
                      <li key={item.id} className="w-full">
                        <Link
                          to={item.url || '#'}
                          className="text-2xl font-['Cinzel',_serif] text-amber-400 p-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2.5 bg-white/5 border border-amber-500/30 w-full hover:bg-amber-200/20 hover:-translate-y-0.5"
                          onClick={() => handleDropdownSelect(item)}
                        >
                          <span className="text-2xl">{item.icon}</span> {item.name}
                        </Link>
                      </li>
                    ))}
                  </>
                ) : (
                  <>
                    <li><Link to="/login" className="text-2xl font-['Cinzel',_serif] text-amber-400 p-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2.5 bg-white/5 border border-amber-500/30 w-full hover:bg-amber-200/20 hover:-translate-y-0.5" onClick={toggleMobileMenu}>🔑 Iniciar Sesión</Link></li>
                    <li><Link to="/register" className="text-2xl font-['Cinzel',_serif] text-amber-400 p-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2.5 bg-white/5 border border-amber-500/30 w-full hover:bg-amber-200/20 hover:-translate-y-0.5" onClick={toggleMobileMenu}>📜 Registrarse</Link></li>
                  </>
                )}
              </ul>
            </motion.div>
        )}
        </AnimatePresence>

        <button
          className={`md:hidden flex flex-col justify-center items-center w-8 h-8 bg-transparent border-none cursor-pointer relative z-[1003] p-1 rounded-md transition-all duration-300 hover:bg-amber-100/10 ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-amber-400 rounded-sm transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'transform translate-y-2 rotate-45' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-amber-400 rounded-sm my-1 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-amber-400 rounded-sm transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'transform -translate-y-2 -rotate-45' : ''}`}></span>
        </button>
      </div>
    </header>
  );
}

export default Header;