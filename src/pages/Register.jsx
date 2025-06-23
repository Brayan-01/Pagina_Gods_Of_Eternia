import React, { useState, useEffect } from "react"; // MEJORA: Unificamos imports
import { FaEye, FaEyeSlash } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Verification from "./Verification";
import "./Register.css";

const Register = () => {
    // CAMBIO: Leemos la variable de entorno
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        document.title = 'Registro | Gods Of Eternia';
    }, []);
    
    const [isRegistered, setIsRegistered] = useState(false);
    const [registrationEmail, setRegistrationEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        descripcion: "",
    });
    const [error, setError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [isLoading, setIsLoading] = useState(false); // MEJORA: Usaremos este estado

    // Función para validar la fortaleza de la contraseña (sin cambios)
    const validatePassword = (password) => {
        if (password.length < 8) {
            return "La contraseña debe tener al menos 8 caracteres";
        }
        if (!/[A-Z]/.test(password)) {
            return "La contraseña debe contener al menos una letra mayúscula";
        }
        if (!/[a-z]/.test(password)) {
            return "La contraseña debe contener al menos una letra minúscula";
        }
        if (!/[0-9]/.test(password)) {
            return "La contraseña debe contener al menos un número";
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return "La contraseña debe contener al menos un carácter especial";
        }

        const commonPasswords = [
            "123456", "password", "123456789", "12345678", "12345", "1234567",
            "1234567890", "qwerty", "abc123", "password123", "admin", "letmein",
            "welcome", "monkey", "1234", "dragon", "sunshine", "master", "123123",
            "football", "iloveyou", "admin123", "welcome123", "password1"
        ];

        if (commonPasswords.includes(password.toLowerCase())) {
            return "Esta contraseña es muy común y fácil de adivinar";
        }

        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "password") {
            const strengthMessage = validatePassword(value);
            setPasswordStrength(strengthMessage);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        
        const passwordError = validatePassword(formData.password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        setIsLoading(true); // MEJORA: Activar estado de carga

        try {
            // CAMBIO: Usamos la variable API_URL
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setIsRegistered(true);
                setRegistrationEmail(formData.email);
                // MEJORA: Se elimina el alert para una mejor UX
                // alert(data.message); 
            } else {
                setError(data.error || "Error en el registro");
            }
        } catch (err) {
            console.error("Error al conectar con el servidor de registro:", err);
            setError("No se pudo conectar con el servidor. Verifica que esté activo.");
        } finally {
            setIsLoading(false); // MEJORA: Desactivar estado de carga
        }
    };

    if (isRegistered) {
        return <Verification prefilledEmail={registrationEmail} />;
    }

    return (
        <div className="register-container">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="register-box"
            >
                <h2>Registro - Gods of Eternia</h2>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="error-message"
                    >
                        <span className="error-icon">⚠️</span>
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleRegister}>
                    {/* ... (campos de usuario y email no cambian) ... */}
                    <div className="password-container">
                        <input type="text" name="username" placeholder="Usuario" required value={formData.username} onChange={handleChange}/>
                        <span className="eye-button" style={{ visibility: 'hidden' }}><FaEye /></span>
                    </div>

                    <div className="password-container">
                        <input type="email" name="email" placeholder="Correo" required value={formData.email} onChange={handleChange}/>
                        <span className="eye-button" style={{ visibility: 'hidden' }}><FaEye /></span>
                    </div>

                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Contraseña"
                            required
                            className="password-input"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <span
                            className="eye-button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {passwordStrength && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="password-strength-message"
                        >
                            {passwordStrength}
                        </motion.div>
                    )}

                    {formData.password && !passwordStrength && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="password-strong-message"
                        >
                            ✅ Contraseña segura
                        </motion.div>
                    )}

                    {/* MEJORA: Deshabilitamos el botón y cambiamos el texto */}
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Registrando..." : "Registrarse"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Register;