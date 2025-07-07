/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';

import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("userToken");
        if (storedToken) {
            try {
                const decodedUser = jwtDecode(storedToken);
                setUser(decodedUser);
            } catch (error) {
                console.error("Token inválido:", error);
                localStorage.removeItem("userToken");
            }
        }
        setLoading(false);
    }, []);

    const login = (userToken) => {
        localStorage.setItem("userToken", userToken);
        try {
            const decodedUser = jwtDecode(userToken);
            setUser(decodedUser); // <-- 3. Al iniciar sesión, también guardamos el usuario
        } catch (error) {
            console.error("Error al decodificar token en login:", error);
            setUser(null);
        }
    };

    const logout = () => {
        localStorage.removeItem("userToken");
        setUser(null); // <-- 4. Al cerrar sesión, limpiamos el usuario
    };

    const value = {
        user, // <-- 5. Exponemos el objeto 'user' completo
        loading,
        login,
        logout,
        // 'isAuthenticated' se puede deducir directamente si 'user' existe
        isAuthenticated: !!user
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