import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importa el hook de autenticación global

// Componente Dropdown Simplificado (incluido en el mismo archivo para conveniencia)
// Este componente está bien diseñado y no necesita cambios.
const SimpleDropdown = ({ items, onItemSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const dropdownRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleItemClick = (item) => {
    if (item.url || item.id === "cerrar") {
      onItemSelected(item);
      setIsOpen(false);
      setOpenSubmenu(null);
    }
  };
  
  const handleSubmenuToggle = (e, itemId) => {
    e.stopPropagation();
    setOpenSubmenu(openSubmenu === itemId ? null : itemId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setOpenSubmenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-wrapper" ref={dropdownRef}>
      <button onClick={handleToggle} className="dropdown-button">
        <span className="user-icon">👤</span>
        <span className="dropdown-text">Mi Cuenta</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {items.map((item) => (
            <li key={item.id}>
              {item.subItems ? (
                <div className="dropdown-submenu-container">
                  <button 
                    onClick={(e) => handleSubmenuToggle(e, item.id)} 
                    className="dropdown-submenu-toggle"
                  >
                    <span className="dropdown-item-content">
                      <span className="dropdown-icon">{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                    <span className={`submenu-arrow ${openSubmenu === item.id ? 'open' : ''}`}>►</span>
                  </button>
                  {openSubmenu === item.id && (
                    <ul className="dropdown-submenu">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.id}>
                          <Link to={subItem.url} onClick={() => handleItemClick(subItem)} className="dropdown-subitem">
                            <span className="dropdown-icon">{subItem.icon}</span>
                            <span>{subItem.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <button onClick={() => handleItemClick(item)} className="dropdown-item">
                  <span className="dropdown-icon">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
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
    { id: "perfil", name: "Mi perfil", icon: "👤", url: "/player" },
    { 
      id: "ajustes", 
      name: "Ajustes", 
      icon: "⚙️", 
      subItems: [
        { id: "cuenta", name: "Cuenta", icon: "🔐", url: "/settings/account" },
        { id: "notificaciones", name: "Notificaciones", icon: "🔔", url: "/settings/notifications" },
      ],
    },
    { id: "cerrar", name: "Cerrar sesión", icon: "🚪" },
  ];

  const handleDropdownSelect = (item) => {
    setIsMobileMenuOpen(false); // Cierra el menú móvil si estuviera abierto
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
    <header className="header" ref={headerRef}>
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo-link-wrapper" onClick={() => setIsMobileMenuOpen(false)}>
            <img 
              src="/Logo_1.jpg" 
              alt="Gods of Eternia Logo" 
              className="game-logo"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/8b5a2b/FFFFFF?text=GOE&font=roboto'; }}
            />
            <h1 className="game-title">Gods of Eternia</h1>
          </Link>
        </div>

        {/* --- Menú de Navegación --- */}
        <nav className={`nav ${isMobileMenuOpen ? "nav-active" : ""}`}>
          
          {/* ✨ MENÚ PARA ESCRITORIO (con el dropdown complejo) ✨ */}
          <ul className="desktop-nav">
            {isLoggedIn ? (
              <>
                <li><Link to="/" className="nav-link">🏠 Inicio</Link></li>
                <li><Link to="/about" className="nav-link">ℹ️ Acerca de</Link></li>
                <li> 
                  <SimpleDropdown items={dropdownItems} onItemSelected={handleDropdownSelect} />
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="nav-link">🔑 Iniciar Sesión</Link></li>
                <li><Link to="/register" className="nav-link">📝 Registrarse</Link></li>
              </>
            )}
          </ul>

          {/* ✨ MENÚ PARA MÓVIL (simplificado, sin dropdowns anidados) ✨ */}
          <ul className="mobile-nav">
             {isLoggedIn ? (
              <>
                <li><Link to="/" className="nav-link" onClick={toggleMobileMenu}>🏠 Inicio</Link></li>
                <li><Link to="/about" className="nav-link" onClick={toggleMobileMenu}>ℹ️ Acerca de</Link></li>
                {/* Expandimos los items del dropdown aquí */}
                {dropdownItems.map(item => {
                  if (item.subItems) {
                    return item.subItems.map(subItem => (
                      <li key={subItem.id}>
                        <Link to={subItem.url} className="nav-link" onClick={toggleMobileMenu}>
                          <span className="dropdown-icon">{subItem.icon}</span> {subItem.name}
                        </Link>
                      </li>
                    ))
                  }
                  return (
                    <li key={item.id}>
                      <Link to={item.url || '#'} className="nav-link" onClick={() => {
                          handleDropdownSelect(item);
                          toggleMobileMenu();
                      }}>
                        <span className="dropdown-icon">{item.icon}</span> {item.name}
                      </Link>
                    </li>
                  );
                })}
              </>
            ) : (
              <>
                <li><Link to="/login" className="nav-link" onClick={toggleMobileMenu}>🔑 Iniciar Sesión</Link></li>
                <li><Link to="/register" className="nav-link" onClick={toggleMobileMenu}>📝 Registrarse</Link></li>
              </>
            )}
          </ul>
        </nav>

        {/* --- Botón Hamburguesa --- */}
        <button
          className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </header>
  );
}

export default Header;