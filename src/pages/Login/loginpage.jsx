import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode"; // <-- ¡IMPORTANTE! Asegúrate de tener esta importación
import "./loginpage.css";

const Login = () => {
    useEffect(() => {
        document.title = 'Login | Gods Of Eternia';
    }, []);

    // Estados del formulario de Login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    // Estados del modal de recuperación
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetMessage, setResetEmailMessage] = useState(""); // Renombrado para claridad
    const [resetError, setResetError] = useState("");
    const [isResetLoading, setIsResetLoading] = useState(false);

    // Estados para el flujo de recuperación en dos pasos
    const [resetStep, setResetStep] = useState('enterEmail');
    const [resetCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const API_URL = import.meta.env.VITE_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Limpia errores anteriores

        // --- VALIDACIÓN DE CORREO PERSONALIZADA ---
        if (!email || !email.includes('@')) {
            setError("Por favor, ingresa un correo electrónico válido.");
            return; // Detiene el proceso si el correo no es válido
        }
        // --- FIN DE LA VALIDACIÓN ---

        setIsLoginLoading(true);

        if (!API_URL) {
            setError("Error de configuración: La URL de la API no está definida.");
            setIsLoginLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            // *** ESTA ES LA PARTE CLAVE MODIFICADA ***
            if (response.ok && data.access_token && data.refresh_token) {
                // Decodifica el access_token para obtener la información del usuario
                const decodedUser = jwtDecode(data.access_token);
                
                // Construye el objeto de datos de usuario para el contexto
                const userData = {
                    id: decodedUser.sub, // 'sub' es el ID de usuario estándar en JWT
                    username: data.username || decodedUser.username, // Usa el username si viene en la respuesta, si no del token
                    email: decodedUser.email // El email debería estar en el payload del token
                };

                // Llama a la función login del AuthContext con AMBOS tokens y los datos del usuario
                login(data.access_token, data.refresh_token, userData);
                
                navigate("/player"); // Redirige al usuario
            } else {
                setError(data.msg || "Error al iniciar sesión"); // Usar 'msg' del backend
            }
        } catch (err) {
            console.error("Error al conectar con el servidor de login:", err);
            setError("No se pudo conectar con el servidor. Verifica que esté activo.");
        } finally {
            setIsLoginLoading(false);
        }
    };

    const handleApiCall = async (apiFunction, onSuccess, onError) => {
        setIsResetLoading(true);
        setResetError("");
        setResetEmailMessage("");
        try {
            const data = await apiFunction();
            onSuccess(data);
        } catch (error) {
            console.error("Error en la llamada a la API:", error);
            const errorMessage = onError(error) || "No se pudo conectar con el servidor.";
            setResetError(errorMessage);
        } finally {
            setIsResetLoading(false);
        }
    };

    const resetModalStates = () => {
        setResetEmail("");
        setResetError("");
        setResetEmailMessage("");
        setResetStep('enterEmail');
        setResetCode("");
        setNewPassword("");
        setConfirmPassword("");
        setShowNewPassword(false);
        setShowConfirmPassword(false);
    };

    const openForgotPasswordModal = () => {
        resetModalStates();
        setShowForgotPassword(true);
    };

    const closeForgotPasswordModal = () => {
        setShowForgotPassword(false);
    };

    const handleRequestCode = (e) => {
        e.preventDefault();
        setResetError(""); // Limpia errores anteriores

        // --- VALIDACIÓN DE CORREO PERSONALIZADA (PARA EL MODAL) ---
        if (!resetEmail || !resetEmail.includes('@')) {
            setResetError("Por favor, ingresa un correo electrónico válido.");
            return; // Detiene el proceso si el correo no es válido
        }
        // --- FIN DE LA VALIDACIÓN ---

        const apiFunction = async () => {
            const response = await fetch(`${API_URL}/forgot_password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: resetEmail }),
            });
            const data = await response.json();
            if (!response.ok) throw data;
            return data;
        };

        const onSuccess = () => {
            setResetStep('enterCode');
            setResetEmailMessage("Se ha enviado un código a tu correo.");
        };
        
        const onError = (error) => error.error || "Error al enviar el correo.";

        handleApiCall(apiFunction, onSuccess, onError);
    };

    const handleResetWithCode = (e) => {
        e.preventDefault();
        setResetError("");

        if (newPassword !== confirmPassword) {
            setResetError("Las contraseñas no coinciden.");
            return;
        }
        if (resetCode.length !== 6) {
            setResetError("El código de verificación debe tener 6 dígitos.");
            return;
        }
        if (!newPassword) { // Añadir validación simple para que la nueva contraseña no esté vacía
            setResetError("La nueva contraseña no puede estar vacía.");
            return;
        }

        const apiFunction = async () => {
            const response = await fetch(`${API_URL}/reset_password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: resetCode,
                    new_password: newPassword
                }),
            });
            const data = await response.json();
            if (!response.ok) throw data;
            return data;
        };

        const onSuccess = (data) => {
            setResetEmailMessage(data.message || "¡Contraseña actualizada con éxito!");
            setTimeout(() => {
                closeForgotPasswordModal();
            }, 2000);
        };
        
        const onError = (error) => error.error || "Código incorrecto o expirado.";

        handleApiCall(apiFunction, onSuccess, onError);
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
                <form onSubmit={handleLogin} noValidate>
                    <div className="password-container">
                        <input
                            type="email"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="password-input"
                            required
                        />
                        <span className="eye-button" style={{ visibility: 'hidden' }}>
                            <FaEye />
                        </span>
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
                                {resetMessage && <p className="success-message">{resetMessage}</p>}
                                {resetError && <p className="error-message">{resetError}</p>}
                                
                                {resetStep === 'enterEmail' ? (
                                    <form onSubmit={handleRequestCode} noValidate>
                                        <p>Ingresa tu correo y te enviaremos un código para restablecer tu contraseña.</p>
                                        <div className="password-container">
                                            <input
                                                type="email"
                                                placeholder="Correo electrónico"
                                                value={resetEmail}
                                                onChange={(e) => setResetEmail(e.target.value)}
                                                className="password-input"
                                                required
                                                disabled={isResetLoading}
                                            />
                                        </div>
                                        <div className="modal-buttons">
                                            <button type="submit" className="submit-button" disabled={isResetLoading}>
                                                {isResetLoading ? "Enviando..." : "Enviar Código"}
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <form onSubmit={handleResetWithCode}>
                                        <p>Ingresa el código que recibiste y tu nueva contraseña.</p>
                                        <div className="password-container">
                                            <input
                                                type="text"
                                                placeholder="Código de verificación"
                                                value={resetCode}
                                                onChange={(e) => setResetCode(e.target.value)}
                                                className="password-input"
                                                required
                                                disabled={isResetLoading}
                                            />
                                        </div>
                                        <div className="password-container">
                                            <input
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder="Nueva contraseña"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="password-input"
                                                required
                                                disabled={isResetLoading}
                                            />
                                            <span className="eye-button" onClick={() => setShowNewPassword(!showNewPassword)}>
                                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>
                                        <div className="password-container">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirmar nueva contraseña"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="password-input"
                                                required
                                                disabled={isResetLoading}
                                            />
                                            <span className="eye-button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>
                                        <div className="modal-buttons">
                                            <button type="submit" className="submit-button" disabled={isResetLoading}>
                                                {isResetLoading ? "Actualizando..." : "Restablecer Contraseña"}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Login;