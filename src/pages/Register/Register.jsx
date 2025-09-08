import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Verification from "../Verification/Verification";

const Register = () => {
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
    const [isLoading, setIsLoading] = useState(false);

import { validatePassword } from "../../utils/validation";


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

        setIsLoading(true);

        try {
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
            } else {
                setError(data.error || "Error en el registro");
            }
        } catch (err) {
            console.error("Error al conectar con el servidor de registro:", err);
            setError("No se pudo conectar con el servidor. Verifica que esté activo.");
        } finally {
            setIsLoading(false);
        }
    };

    // Si el usuario se registró o hizo clic en el nuevo botón, muestra la verificación.
    if (isRegistered) {
        // Pasamos el email si viene de un registro exitoso, o un string vacío si no.
        return <Verification prefilledEmail={registrationEmail} />;
    }

    const inputContainerClasses = "relative w-full flex items-center bg-white/10 border-2 border-[#c4a484] rounded-lg my-2 transition-all duration-300 ease-in-out focus-within:border-yellow-400 focus-within:shadow-[0_0_15px_rgba(255,215,0,0.8)]";
    const inputClasses = "w-full h-full p-3.5 border-none bg-transparent text-white text-lg font-['MedievalSharp',_serif] outline-none placeholder:font-['Cinzel',_serif] placeholder:text-white/70";

    // Renderizado del formulario de registro
    return (
        <div className="flex justify-center items-start min-h-screen py-32 w-screen font-['MedievalSharp',_cursive] bg-[linear-gradient(rgba(0,0,0,0.6),_rgba(0,0,0,0.6)),url('/fondo_1.png')] bg-no-repeat bg-center bg-fixed cursor-[url('/assets/sword-cursor.png'),_auto]">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-b from-[#9b7e20] to-[#774b1f] p-10 rounded-lg shadow-lg text-center w-[400px] border-2 border-[#c4a484] transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-yellow-300/50"
            >
                <h2 className="text-white text-2xl mb-5 text-shadow-[3px_3px_8px_rgba(0,0,0,0.5)]">Registro - Gods of Eternia</h2>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-[#8b2635] to-[#a73544] text-white p-3 px-5 rounded-lg mb-5 border-2 border-[#c4a484] font-['Cinzel',_serif] text-sm text-center shadow-[0_4px_12px_rgba(139,38,53,0.4)] flex items-center justify-center gap-2"
                    >
                        <span className="text-base drop-shadow-[0_0_3px_rgba(255,255,255,0.3)]">⚠️</span>
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleRegister} className="flex flex-col items-center w-full">
                    <div className={inputContainerClasses}>
                        <input type="text" name="username" placeholder="Usuario" required value={formData.username} onChange={handleChange} className={inputClasses} />
                        <span className="absolute right-4 text-xl text-white cursor-pointer invisible"><FaEye /></span>
                    </div>

                    <div className={inputContainerClasses}>
                        <input type="email" name="email" placeholder="Correo" required value={formData.email} onChange={handleChange} className={inputClasses} />
                        <span className="absolute right-4 text-xl text-white cursor-pointer invisible"><FaEye /></span>
                    </div>

                    <div className={inputContainerClasses}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Contraseña"
                            required
                            className={inputClasses}
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <span
                            className="absolute right-4 text-xl text-white cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {passwordStrength && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-gradient-to-r from-[#8b4513] to-[#a0522d] text-yellow-400 p-2 px-4 rounded-md mt-[-5px] mb-4 border border-[#c4a484] font-['Cinzel',_serif] text-xs text-center shadow-[0_2px_8px_rgba(139,69,19,0.3)]"
                        >
                            {passwordStrength}
                        </motion.div>
                    )}

                    {formData.password && !passwordStrength && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] text-green-300 p-2 px-4 rounded-md mt-[-5px] mb-4 border border-[#c4a484] font-['Cinzel',_serif] text-xs text-center shadow-[0_2px_8px_rgba(45,80,22,0.3)]"
                        >
                            ✅ Contraseña segura
                        </motion.div>
                    )}

                    <button type="submit" disabled={isLoading} className="w-full mt-2.5 bg-[#593d1b] text-white border-none p-3.5 rounded-md cursor-pointer text-lg uppercase font-['Cinzel',_serif] transition-all duration-300 hover:bg-yellow-400 hover:text-[#593d1b] hover:scale-105 hover:shadow-[0_0_15px_rgba(255,215,0,0.8)] disabled:opacity-60 disabled:cursor-not-allowed">
                        {isLoading ? "Registrando..." : "Registrarse"}
                    </button>
                </form>

                <div className="text-center mt-6 p-4 bg-black/40 rounded-xl border-t border-purple-400/30 leading-relaxed">
                    <span className="text-gray-300 text-sm mr-2">¿Ya te registraste?</span>
                    <button
                        type="button"
                        className="bg-none border-none p-0 text-[#9f8cff] font-sans text-sm font-bold cursor-pointer no-underline relative transition-colors duration-300 ease-out hover:text-purple-300 after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-purple-300 after:scale-x-0 after:origin-center after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.19,1,0.22,1)] hover:after:scale-x-100"
                        onClick={() => setIsRegistered(true)}
                    >
                        Verifica tu cuenta
                    </button>
                </div>

            </motion.div>
        </div>
    );
};

export default Register;