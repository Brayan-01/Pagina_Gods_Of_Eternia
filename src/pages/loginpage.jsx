import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./loginpage.css";

const Login = () => {
    useEffect(() => {
        document.title = 'Login | Gods Of Eternia';
    }, []);

    // --- Estados para el formulario de Login ---
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    // --- Estados para el modal de recuperación ---
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetMessage, setResetMessage] = useState("");
    const [resetError, setResetError] = useState("");
    const [isResetLoading, setIsResetLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();
    
    // Paso 1: Leemos la variable de entorno desde el objeto que Vite nos da.
    const API_URL = import.meta.env.VITE_API_URL;

    // ===================================================================
    // ===========> LÍNEA DE DEPURACIÓN MÁS IMPORTANTE <===========
    // Esta línea imprimirá el valor de la variable en la consola del navegador (F12).
    // Nos ayuda a saber si el archivo .env se está leyendo correctamente.
    console.log("El valor de VITE_API_URL en el código es:", API_URL);
    // ===================================================================

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoginLoading(true);

        // Verificamos si la URL existe antes de hacer la petición
        if (!API_URL) {
            setError("Error de configuración: La URL de la API no está definida. Revisa el archivo .env y reinicia el servidor.");
            setIsLoginLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            // Si la respuesta no es JSON, esto fallará
            const data = await response.json();

            if (response.ok && data.token) {
                login(data.token);
                navigate("/");
            } else {
                setError(data.error || "Error al iniciar sesión");
            }
        } catch (err) {
            console.error("Error al conectar con el servidor de login:", err);
            setError("No se pudo conectar con el servidor. Verifica que esté activo.");
        } finally {
            setIsLoginLoading(false);
        }
    };

    // --- Lógica del Modal de Recuperación ---
    const resetModalStates = () => {
        setResetEmail("");
        setResetError("");
        setResetMessage("");
    };

    const openForgotPasswordModal = () => {
        resetModalStates();
        setShowForgotPassword(true);
    };

    const closeForgotPasswordModal = () => {
        setShowForgotPassword(false);
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setIsResetLoading(true);
        setResetError("");
        setResetMessage("");

        try {
            const response = await fetch(`${API_URL}/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: resetEmail }),
            });

            const data = await response.json();

            if (response.ok) {
                setResetMessage("Se ha enviado un enlace de recuperación a tu correo electrónico.");
                setResetEmail("");
                setTimeout(() => {
                    closeForgotPasswordModal();
                }, 3000);
            } else {
                setResetError(data.error || "Error al enviar el correo de recuperación");
            }
        } catch (err) {
            console.error("Error al solicitar recuperación:", err);
            setResetError("No se pudo conectar con el servidor. Verifica que esté activo.");
        } finally {
            setIsResetLoading(false);
        }
    };

    return (
        <div className="login-container">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="login-box"
            >
                <h2>Iniciar Sesión</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="password-container">
                        <input
                            type="email"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                         <span className="eye-button" style={{ visibility: 'hidden' }}><FaEye /></span>
                    </div>

                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="password-input"
                            required
                        />
                        <span className="eye-button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    
                    <button type="submit" disabled={isLoginLoading}>
                        {isLoginLoading ? "Ingresando..." : "Iniciar Sesión"}
                    </button>
                </form>

                <div className="forgot-password" onClick={openForgotPasswordModal}>
                    ¿Olvidaste tu contraseña?
                </div>
            </motion.div>

            <AnimatePresence>
                {showForgotPassword && (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-overlay"
                        onClick={closeForgotPasswordModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h3>Recuperar Contraseña</h3>
                                <FaTimes className="close-button" onClick={closeForgotPasswordModal} />
                            </div>
                            
                            <div className="modal-body">
                                <p>Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
                                
                                {resetMessage && <p className="success-message">{resetMessage}</p>}
                                {resetError && <p className="error-message">{resetError}</p>}
                                
                                <form onSubmit={handleForgotPassword}>
                                    <input
                                        type="email"
                                        placeholder="Correo electrónico"
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        required
                                        disabled={isResetLoading}
                                    />
                                    <div className="modal-buttons">
                                        <button 
                                            type="button" 
                                            className="cancel-button"
                                            onClick={closeForgotPasswordModal}
                                            disabled={isResetLoading}
                                        >
                                            Cancelar
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="submit-button"
                                            disabled={isResetLoading}
                                        >
                                            {isResetLoading ? "Enviando..." : "Enviar"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Login;