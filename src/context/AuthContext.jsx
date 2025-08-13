/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Inicializar los tokens desde localStorage
    const [accessToken, setAccessToken] = useState(() => localStorage.getItem("access_token"));
    const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refresh_token"));
    
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Asegúrate de que esta variable de entorno esté configurada en tu archivo .env
    const API_URL = import.meta.env.VITE_API_URL;

    // Función para decodificar y establecer el usuario desde un token
    const decodeAndSetUser = useCallback((tokenToDecode) => {
        if (tokenToDecode) {
            try {
                const decodedUser = jwtDecode(tokenToDecode);
                setUser({
                    id: decodedUser.user_id,
                    username: decodedUser.username,
                    email: decodedUser.email,
                    verificado: decodedUser.verificado // Guardar el estado de verificación
                });
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Error al decodificar token:", error);
                // Si el token es inválido, forzar logout
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
            }
        } else {
            setUser(null);
            setIsAuthenticated(false);
        }
    }, []);

    // Función para refrescar el token de acceso
    const refreshAccessToken = useCallback(async () => {
        if (!refreshToken) {
            console.warn("No hay refresh token disponible para refrescar.");
            logout(); // Si no hay refresh token, cerrar sesión
            return false;
        }

        try {
            console.log("Intentando refrescar token...");
            // ¡CORRECCIÓN CLAVE AQUÍ! Usar backticks para la URL y el Authorization header
            const response = await fetch(`${API_URL}/refresh`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${refreshToken}` // Usar el refresh token aquí con backticks
                },
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("access_token", data.access_token);
                setAccessToken(data.access_token);
                decodeAndSetUser(data.access_token); // Decodificar y establecer el usuario inmediatamente
                console.log("Access token refrescado exitosamente.");
                return true;
            } else {
                console.error("Fallo al refrescar token:", await response.json());
                logout(); // Si el refresh token falla, cerrar sesión
                return false;
            }
        } catch (error) {
            console.error("Error de red al refrescar token:", error);
            logout(); // Si hay error de red, cerrar sesión
            return false;
        }
    }, [refreshToken, API_URL, decodeAndSetUser]); // Dependencia de decodeAndSetUser

    // Efecto principal para verificar la autenticación al cargar el componente
    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            if (accessToken) {
                try {
                    const decodedUser = jwtDecode(accessToken);
                    const isAccessTokenExpired = decodedUser.exp * 1000 < Date.now();

                    if (isAccessTokenExpired) {
                        console.log("Access token expirado. Intentando refrescar...");
                        const refreshed = await refreshAccessToken();
                        if (!refreshed) {
                            // Si no se pudo refrescar, logout ya fue llamado por refreshAccessToken
                            setLoading(false);
                            return;
                        }
                        // Si se refrescó, el accessToken se actualizará y este useEffect se re-ejecutará.
                        // No necesitamos hacer nada más aquí en esta ejecución.
                    } else {
                        // Access token válido, decodificar y establecer el usuario
                        decodeAndSetUser(accessToken);
                        console.log("Usuario autenticado con access token válido.");
                    }
                } catch (error) {
                    console.error("Error al decodificar access token en useEffect:", error);
                    logout(); // Limpiar tokens inválidos.
                }
            } else {
                // Si no hay access token, intentar con refresh token si existe
                if (refreshToken) {
                    console.log("No access token pero hay refresh token. Intentando refrescar...");
                    await refreshAccessToken(); // Esto decodificará y seteará el usuario si tiene éxito
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                    console.log("No access token ni refresh token. Usuario no autenticado.");
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, [accessToken, refreshToken, decodeAndSetUser, refreshAccessToken]); // Dependencias para re-ejecutar el efecto

    // Función de login: ahora acepta ambos tokens
    const login = (newAccessToken, newRefreshToken) => { 
        console.log("Login: Recibiendo tokens...");
        localStorage.setItem("access_token", newAccessToken);
        localStorage.setItem("refresh_token", newRefreshToken);
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        decodeAndSetUser(newAccessToken); // ¡Decodificar y establecer el usuario inmediatamente al iniciar sesión!
        console.log("Login exitoso. Tokens y usuario guardados.");
    };

    // Función de logout
    const logout = () => {
        console.log("Cierre de sesión.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    // El valor que se comparte con toda la aplicación.
    const value = {
        token: accessToken, // Renombrado a token para compatibilidad
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        refreshAccessToken // Exponer la función de refresco si es necesario llamarla manualmente
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Solo renderiza los hijos cuando la carga inicial ha terminado */}
            {!loading && children} 
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};