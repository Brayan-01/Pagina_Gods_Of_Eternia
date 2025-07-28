/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Se inicializa desde localStorage con la clave correcta "token".
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                const isExpired = decodedUser.exp * 1000 < Date.now();

                if (isExpired) {
                    // Si el token ha expirado, cerramos la sesión.
                    logout();
                } else {
                    // Si el token es válido, establecemos el usuario y el estado de autenticación.
                    setUser({
                        id: decodedUser.sub, // 'sub' es el ID de usuario estándar en JWT
                        username: decodedUser.username,
                        email: decodedUser.email
                    });
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Token en localStorage es inválido:", error);
                logout(); // Limpia el token inválido.
            }
        } else {
            // Si no hay token, nos aseguramos de que no haya sesión activa.
            setIsAuthenticated(false);
            setUser(null);
        }
        setLoading(false);
    }, [token]); // Este efecto se ejecuta cada vez que el token cambia.

    const login = (newToken) => {
        // CAMBIO CLAVE: Se guarda en localStorage con la clave "token".
        localStorage.setItem("token", newToken);
        setToken(newToken); // Actualiza el estado, lo que dispara el useEffect de arriba.
    };

    const logout = () => {
        // CAMBIO CLAVE: Se elimina la clave "token" de localStorage.
        localStorage.removeItem("token");
        setToken(null);
    };

    // El valor que se comparte con toda la aplicación.
    const value = {
        token, // <--- CAMBIO CLAVE: Exponemos el token para las llamadas a la API.
        user,
        isAuthenticated,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};