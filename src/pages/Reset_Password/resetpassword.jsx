import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [resetCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    // Si el código viene en la URL, precargarlo
    useEffect(() => {
        const tokenFromUrl = searchParams.get("token");
        if (tokenFromUrl) {
            setResetCode(tokenFromUrl);
        }
        document.title = 'Restablecer Contraseña | Gods Of Eternia';
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        // Validación igual a la del backend (auth.py)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            setError("La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        if (!resetCode || resetCode.length !== 6) {
            setError("El código de verificación debe tener 6 dígitos.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: resetCode, // ✅ importante: coincide con el backend
                    new_password: newPassword
                }),
            });

            const data = await response.json();
            if (!response.ok) throw data;

            setMessage(data.message || "¡Contraseña actualizada con éxito!");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error("Error al restablecer contraseña:", err);
            setError(err.error || err.message || "Ocurrió un error al restablecer la contraseña.");
        } finally {
            setLoading(false);
        }
    };

    const inputBaseClasses = "flex-1 w-full p-3.5 border-none bg-transparent text-white text-lg font-['Cinzel',_serif] outline-none placeholder-white/70";
    const containerBaseClasses = "relative w-full flex items-center bg-white/10 border-2 border-[#c4a484] rounded-lg my-2.5 transition-all duration-300 ease-in-out focus-within:border-yellow-400 focus-within:shadow-[0_0_15px_rgba(255,215,0,0.8)]";

    return (
        <div className="flex justify-center items-center h-screen w-screen font-['MedievalSharp',_cursive] bg-[linear-gradient(rgba(0,0,0,0.6),_rgba(0,0,0,0.6)),url('/fondo_1.png')] bg-no-repeat bg-center bg-fixed cursor-[url('/assets/sword-cursor.png'),_auto]">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-b from-[#9b7e20] to-[#774b1f] p-10 rounded-lg shadow-lg text-center w-[400px] border-2 border-[#c3c484]"
            >
                <h2 className="text-white text-2xl mb-5 text-shadow-[3px_3px_8px_rgba(0,0,0,0.5)]">Restablecer Contraseña</h2>
                {message && <p className="p-2.5 rounded-md my-2.5 text-center border border-teal-400/30 bg-teal-500/10 text-teal-200">{message}</p>}
                {error && <p className="text-[#ff6b6b] bg-red-500/10 p-2.5 rounded-md my-2.5 text-center border border-red-500/30">{error}</p>}

                <form onSubmit={handleSubmit} noValidate className="flex flex-col items-center w-full gap-1">
                    <div className={containerBaseClasses}>
                        <input
                            type="text"
                            placeholder="Código de verificación"
                            value={resetCode}
                            onChange={(e) => setResetCode(e.target.value)}
                            className={inputBaseClasses}
                            required
                            disabled={loading}
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
                            disabled={loading}
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
                            disabled={loading}
                        />
                        <span className="px-4 text-xl text-white cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <button type="submit" disabled={loading} className="w-full mt-2.5 bg-[#593d1b] text-white border-none p-3.5 rounded-md cursor-pointer text-lg uppercase font-['Cinzel',_serif] transition-all duration-300 hover:bg-yellow-400 hover:text-[#593d1b] hover:scale-105 hover:shadow-[0_0_15px_rgba(255,215,0,0.8)] disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:bg-gray-500">
                        {loading ? "Actualizando..." : "Restablecer Contraseña"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default ResetPassword;