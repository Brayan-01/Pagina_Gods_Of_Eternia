// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    // 1. AÑADIMOS UN ESTADO DE CARGA
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Comprueba el token en localStorage solo una vez al cargar la app
        const storedToken = localStorage.getItem("userToken");
        if (storedToken) {
            setToken(storedToken);
        }
        // 2. UNA VEZ VERIFICADO, TERMINAMOS LA CARGA
        setLoading(false); 
    }, []);

    const login = (userToken) => {
        localStorage.setItem("userToken", userToken);
        setToken(userToken);
    };

    const logout = () => {
        localStorage.removeItem("userToken");
        setToken(null);
    };

    const isAuthenticated = !!token;

    // 3. PASAMOS EL ESTADO 'loading' EN EL VALOR DEL CONTEXTO
    const value = {
        isAuthenticated,
        loading, // <-- ¡Nuevo!
        login,
        logout
    };

    // No renderizamos nada hasta que la carga inicial termine
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};