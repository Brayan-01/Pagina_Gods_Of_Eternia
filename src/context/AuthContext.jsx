import React, { createContext, useState, useEffect, useCallback } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh_token"));
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
    const [loading, setLoading] = useState(true);

    // 🔹 logout siempre definido arriba
    const logout = useCallback(() => {
        console.log("Cierre de sesión.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    const decodeAndSetUser = useCallback((token) => {
        try {
            const decoded = jwtDecode(token);
            setUser(decoded);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            logout();
        }
    }, [logout]);

    // 🔹 refresco tolerante
    const refreshAccessToken = useCallback(async () => {
        if (!refreshToken) {
            console.warn("No hay refresh token disponible.");
            logout();
            return false;
        }

        try {
            console.log("Intentando refrescar token...");
            const response = await fetch(`${API_URL}/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh_token: refreshToken }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("access_token", data.access_token);
                setAccessToken(data.access_token);
                decodeAndSetUser(data.access_token);
                console.log("Token refrescado con éxito.");
                return true;
            } else {
                console.warn("No se pudo refrescar el token:", response.status);
                logout();
                return false;
            }
        } catch (error) {
            console.error("Error de red al refrescar token:", error);
            logout();
            return false;
        }
    }, [refreshToken, API_URL, decodeAndSetUser, logout]);

    const checkAuth = useCallback(async () => {
        if (accessToken) {
            try {
                const decoded = jwtDecode(accessToken);
                const now = Date.now() / 1000;
                if (decoded.exp < now) {
                    console.warn("Access token expirado. Intentando refrescar...");
                    await refreshAccessToken();
                } else {
                    decodeAndSetUser(accessToken);
                }
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                await refreshAccessToken();
            }
        }
        // 🔹 siempre liberar loading aunque falle
        setLoading(false);
    }, [accessToken, decodeAndSetUser, refreshAccessToken]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const value = {
        user,
        isAuthenticated,
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        decodeAndSetUser,
        logout,
        refreshAccessToken,
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? <p style={{ textAlign: "center" }}>⏳ Cargando...</p> : children}
        </AuthContext.Provider>
    );
};
