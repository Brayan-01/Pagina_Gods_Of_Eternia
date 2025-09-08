import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
    useEffect(() => {
        document.title = 'Login | Gods Of Eternia';
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetMessage, setResetEmailMessage] = useState("");
    const [resetError, setResetError] = useState("");
    const [isResetLoading, setIsResetLoading] = useState(false);

    const [resetStep, setResetStep] = useState('enterEmail');
    const [resetCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    const API_URL = import.meta.env.VITE_API_URL;

    // DESPUÉS (LA SOLUCIÓN)
    useEffect(() => {
        if (isAuthenticated && !isLoginLoading) {
            navigate("/"); 
        }
    }, [isAuthenticated, isLoginLoading, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoginLoading(true);

        if (!email || !email.includes('@') || !email.includes('.')) {
            setError("Por favor, ingresa un correo electrónico válido.");
            setIsLoginLoading(false);
            return;
        }

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

            if (response.ok && data.access_token && data.refresh_token) {
                login(data.access_token, data.refresh_token);
            } else {
                setError(data.error || data.message || "Error al iniciar sesión");
            }
        } catch (err) {
            console.error("Error al conectar con el servidor de login:", err);
            setError("No se pudo conectar con el servidor. Verifica que esté activo.");
        } finally {
            setIsLoginLoading(false);
        }
    };

    const handleApiCall = async (apiFunction, onSuccess) => {
        setIsResetLoading(true);
        setResetError("");
        setResetEmailMessage("");

        try {
            const data = await apiFunction();
            onSuccess(data);
        } catch (error) {
            console.error("Error en la llamada a la API:", error);
            const errorMessage = error.error || error.message || "No se pudo conectar con el servidor.";
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
        setResetError("");

        if (!resetEmail || !resetEmail.includes('@') || !resetEmail.includes('.')) {
            setResetError("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        const apiFunction = async () => {
            const response = await fetch(`${API_URL}/request-password-reset`, { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: resetEmail }),
            });
            const data = await response.json();
            if (!response.ok) throw data;
            return data;
        };

        const onSuccess = (data) => {
            setResetStep('enterCode');
            setResetEmailMessage(data.message || "Se ha enviado un código a tu correo.");
        };

        handleApiCall(apiFunction, onSuccess);
    };

    const handleResetWithCode = (e) => {
        e.preventDefault();
        setResetError("");

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            setResetError("La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setResetError("Las contraseñas no coinciden.");
            return;
        }

        if (resetCode.length !== 6) {
            setResetError("El código de verificación debe tener 6 dígitos.");
            return;
        }
        
        const apiFunction = async () => {
            const response = await fetch(`${API_URL}/reset-password`, { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: resetEmail,      
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

        handleApiCall(apiFunction, onSuccess);
    };

    const inputBaseClasses = "flex-1 w-full p-3.5 border-none bg-transparent text-white text-lg font-['Cinzel',_serif] outline-none placeholder-white/70";
    const containerBaseClasses = "relative w-full flex items-center bg-white/10 border-2 border-[#c4a484] rounded-lg my-2.5 transition-all duration-300 ease-in-out focus-within:border-yellow-400 focus-within:shadow-[0_0_15px_rgba(255,215,0,0.8)]";

    return (
        <div className="flex justify-center items-center h-screen w-screen font-['MedievalSharp',_cursive] bg-[linear-gradient(rgba(0,0,0,0.6),_rgba(0,0,0,0.6)),url('/fondo_1.png')] bg-no-repeat bg-center bg-fixed cursor-[url('/assets/sword-cursor.png'),_auto]">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-b from-[#9b7e20] to-[#774b1f] p-10 rounded-lg shadow-lg text-center w-[400px] border-2 border-[#c3c484] transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-yellow-300/50"
            >
                <h2 className="text-white text-2xl mb-5 text-shadow-[3px_3px_8px_rgba(0,0,0,0.5)]">Iniciar Sesión</h2>
                {error && <p className="text-[#ff6b6b] bg-red-500/10 p-2.5 rounded-md my-2.5 text-center border border-red-500/30">{error}</p>}
                <form onSubmit={handleLogin} noValidate className="flex flex-col items-center w-full gap-1">
                    <div className={containerBaseClasses}>
                        <input
                            type="email"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputBaseClasses}
                            required
                        />
                        <span className="px-4 text-xl text-white cursor-pointer invisible">
                            <FaEye />
                        </span>
                    </div>
                    <div className={containerBaseClasses}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={inputBaseClasses}
                            required
                        />
                        <span className="px-4 text-xl text-white cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <button type="submit" disabled={isLoginLoading} className="w-full mt-2.5 bg-[#593d1b] text-white border-none p-3.5 rounded-md cursor-pointer text-lg uppercase font-['Cinzel',_serif] transition-all duration-300 hover:bg-yellow-400 hover:text-[#593d1b] hover:scale-105 hover:shadow-[0_0_15px_rgba(255,215,0,0.8)] disabled:opacity-60 disabled:cursor-not-allowed">
                        {isLoginLoading ? "Ingresando..." : "Iniciar Sesión"}
                    </button>
                </form>
                <div className="mt-2.5 text-sm text-white/70 cursor-pointer transition-colors duration-300 hover:text-yellow-400" onClick={openForgotPasswordModal}>
                    ¿Olvidaste tu contraseña?
                </div>
            </motion.div>

            <AnimatePresence>
                {showForgotPassword && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 w-screen h-screen bg-black/80 flex justify-center items-center z-50 cursor-pointer"
                        onClick={closeForgotPasswordModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-b from-[#9b7e20] to-[#774b1f] border-2 border-[#c4a484] rounded-lg shadow-lg w-[90%] max-w-md cursor-default font-['MedievalSharp',_cursive] sm:w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center p-5 border-b-2 border-[#c4a484]/30">
                                <h3 className="text-white text-xl font-['Cinzel',_serif] text-shadow-[2px_2px_6px_rgba(0,0,0,0.5)] m-0">Recuperar Contraseña</h3>
                                <FaTimes className="text-white/70 text-xl cursor-pointer transition-colors duration-300 hover:text-yellow-400 hover:scale-110 p-1" onClick={closeForgotPasswordModal} />
                            </div>
                            <div className="p-6">
                                {resetMessage && <p className="p-2.5 rounded-md my-2.5 text-center border border-teal-400/30 bg-teal-500/10 text-teal-200">{resetMessage}</p>}
                                {resetError && <p className="text-[#ff6b6b] bg-red-500/10 p-2.5 rounded-md my-2.5 text-center border border-red-500/30">{resetError}</p>}
                                
                                {resetStep === 'enterEmail' ? (
                                    <form onSubmit={handleRequestCode} noValidate className="flex flex-col gap-0">
                                        <p className="text-white/90 mb-5 leading-relaxed text-center">Ingresa tu correo y te enviaremos un código para restablecer tu contraseña.</p>
                                        <div className={containerBaseClasses}>
                                            <input
                                                type="email"
                                                placeholder="Correo electrónico"
                                                value={resetEmail}
                                                onChange={(e) => setResetEmail(e.target.value)}
                                                className={inputBaseClasses}
                                                required
                                                disabled={isResetLoading}
                                            />
                                        </div>
                                        <div className="flex gap-4 justify-center mt-5">
                                            <button type="submit" className="flex-1 py-3 px-5 rounded-md cursor-pointer text-base font-['Cinzel',_serif] uppercase transition-all duration-300 bg-[#593d1b] text-white border-2 border-[#593d1b] hover:enabled:bg-yellow-400 hover:enabled:text-[#593d1b] hover:enabled:border-yellow-400 hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_4px_15px_rgba(255,215,0,0.4)] disabled:opacity-60 disabled:cursor-not-allowed" disabled={isResetLoading}>
                                                {isResetLoading ? "Enviando..." : "Enviar Código"}
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <form onSubmit={handleResetWithCode} className="flex flex-col gap-0">
                                        <p className="text-white/90 mb-5 leading-relaxed text-center">Ingresa el código que recibiste y tu nueva contraseña.</p>
                                        <div className={containerBaseClasses}>
                                            <input
                                                type="text"
                                                placeholder="Código de verificación"
                                                value={resetCode}
                                                onChange={(e) => setResetCode(e.target.value)}
                                                className={inputBaseClasses}
                                                required
                                                disabled={isResetLoading}
                                            />
                                        </div>
                                        <div className={containerBaseClasses}>
                                            <input
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder="Nueva contraseña"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className={inputBaseClasses}
                                                required
                                                disabled={isResetLoading}
                                            />
                                            <span className="px-4 text-xl text-white cursor-pointer" onClick={() => setShowNewPassword(!showNewPassword)}>
                                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>
                                        <div className={containerBaseClasses}>
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirmar nueva contraseña"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className={inputBaseClasses}
                                                required
                                                disabled={isResetLoading}
                                            />
                                            <span className="px-4 text-xl text-white cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>
                                        <div className="flex gap-4 justify-center mt-5">
                                            <button type="submit" className="flex-1 py-3 px-5 rounded-md cursor-pointer text-base font-['Cinzel',_serif] uppercase transition-all duration-300 bg-[#593d1b] text-white border-2 border-[#593d1b] hover:enabled:bg-yellow-400 hover:enabled:text-[#593d1b] hover:enabled:border-yellow-400 hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_4px_15px_rgba(255,215,0,0.4)] disabled:opacity-60 disabled:cursor-not-allowed" disabled={isResetLoading}>
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
}

export default LoginPage;