/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import Loader from '../components/Loader/Loader';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(() => localStorage.getItem("access_token"));
    const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refresh_token"));
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL;

    const logout = useCallback(() => {
        console.log("Cierre de sesión.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("goe_user"); // 🔥 limpiar goe_user también
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
    }, []);

    useEffect(() => {
        const initializeAuth = async () => {
            if (!refreshToken) {
                setIsInitializing(false);
                return;
            }
            try {
                const response = await fetch(`${API_URL}/refresh`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${refreshToken}`
                    },
                });

                if (!response.ok) {
                    throw new Error("El token de refresco no es válido.");
                }

                const data = await response.json();
                const newAccessToken = data.access_token;
                localStorage.setItem("access_token", newAccessToken);
                setAccessToken(newAccessToken);
                
                const decodedUser = jwtDecode(newAccessToken);
                setUser({
                    id: decodedUser.user_id,
                    username: decodedUser.username,
                    email: decodedUser.email,
                    verificado: decodedUser.verificado
                });
                setIsAuthenticated(true);

                const profileResponse = await fetch(`${API_URL}/user/perfil`, {
                    headers: { "Authorization": `Bearer ${newAccessToken}` },
                });

                if (profileResponse.ok) {
                    const profileData = await profileResponse.json();
                    setProfile(profileData);

                    // 🔥 Guardar en localStorage para el juego
                    const userData = {
                        id: decodedUser.user_id,
                        username: decodedUser.username,
                        email: decodedUser.email,
                        verificado: decodedUser.verificado,
                        foto_perfil: profileData.foto_perfil || "https://via.placeholder.com/150/000000/FFFFFF/?text=Avatar",
                        access_token: newAccessToken,
                        refresh_token: refreshToken
                    };
                    localStorage.setItem("goe_user", JSON.stringify(userData));
                }

            } catch (error) {
                console.error("Fallo en la inicialización de la autenticación:", error.message);
                logout();
            } finally {
                setIsInitializing(false);
            }
        };

        initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = (newAccessToken, newRefreshToken) => {
        localStorage.setItem("access_token", newAccessToken);
        localStorage.setItem("refresh_token", newRefreshToken);
        window.location.reload(); 
    };
    
    const updateUserProfile = (newProfileData) => {
        setProfile(prevProfile => ({...prevProfile, ...newProfileData}));
        // Opcional: También puedes sincronizar esto con localStorage si lo necesitas
        const current = JSON.parse(localStorage.getItem("goe_user")) || {};
        localStorage.setItem("goe_user", JSON.stringify({
            ...current,
            ...newProfileData
        }));
    };

    const value = {
        token: accessToken,
        user,
        profile,
        isAuthenticated,
        loading: isInitializing,
        login,
        logout,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!isInitializing ? children : <Loader />}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
