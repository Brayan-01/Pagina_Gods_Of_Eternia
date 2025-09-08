import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Verification = ({ prefilledEmail = "" }) => {
    // CAMBIO: Leemos la variable de entorno
    const API_URL = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(true);
    const [code, setCode] =useState("");
    const [email, setEmail] = useState(prefilledEmail);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); // MEJORA: Estado de carga para el botón
    const navigate = useNavigate();

    useEffect(() => {
        // MEJORA: Unificamos los efectos que se ejecutan solo al montar el componente
        document.title = 'Verificación | Gods Of Eternia';
        setTimeout(() => setLoading(false), 1000);
    }, []); // MEJORA: Añadido el array de dependencias vacío

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setIsSubmitting(true); // MEJORA: Activar loading

        try {
            // CAMBIO: Usamos la variable API_URL
            const response = await fetch(`${API_URL}/verificar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // AJUSTE CLAVE AQUÍ: Ahora enviamos 'email' y 'verification_code'
                body: JSON.stringify({
                    email: email, // ¡Añadido el email!
                    verification_code: code // Cambiado de 'codigo' a 'verification_code' para coincidir con el backend
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {
                setError(data.error || "Error de verificación");
            }
        } catch (err) {
            console.error("Error al conectar con el servidor de verificación:", err);
            setError("Error al conectar con el servidor. Verifica que esté activo.");
        } finally {
            setIsSubmitting(false); // MEJORA: Desactivar loading en cualquier caso
        }
    };

    const inputClasses = "my-2.5 p-3.5 w-full border-2 border-[#c4a484] rounded-md bg-white/10 text-white outline-none text-lg text-center placeholder:font-['Cinzel',_serif] placeholder:text-white/70";
    const buttonClasses = "w-full bg-[#593d1b] text-white border-none p-3.5 rounded-md cursor-pointer text-lg uppercase font-['Cinzel',_serif] transition-all duration-300 hover:bg-yellow-400 hover:text-[#593d1b] hover:scale-105 hover:shadow-[0_0_15px_rgba(255,215,0,0.8)] disabled:opacity-60 disabled:cursor-not-allowed";


    return (
        <div className="flex justify-center items-center h-screen w-screen font-['MedievalSharp',_cursive] bg-[linear-gradient(rgba(0,0,0,0.6),_rgba(0,0,0,0.6)),url('/fondo_1.png')] bg-no-repeat bg-center bg-fixed">
            {loading ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[#9b7e20] text-2xl font-bold uppercase tracking-wider"
                >
                    Cargando...
                </motion.div>
            ) : (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-b from-[#9b7e20] to-[#774b1f] p-10 rounded-lg shadow-lg text-center w-[400px] border-2 border-[#c4a484]"
                >
                    <h2 className="text-white text-2xl mb-2.5 text-shadow-[3px_3px_8px_rgba(0,0,0,0.5)]">Verificación - Gods of Eternia</h2>
                    <p className="text-white text-lg mb-5">Ingresa tu correo y el código que te enviamos.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClasses}
                        />
                        <input
                            type="text"
                            maxLength="6"
                            placeholder="Código de verificación"
                            required
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className={inputClasses}
                        />
                        <button type="submit" disabled={isSubmitting} className={buttonClasses}>
                            {isSubmitting ? "Verificando..." : "Verificar"}
                        </button>
                    </form>

                    {message && <p className="text-green-400 mt-4">{message}</p>}
                    {error && <p className="text-red-400 mt-4">{error}</p>}
                </motion.div>
            )}
        </div>
    );
};

export default Verification;
