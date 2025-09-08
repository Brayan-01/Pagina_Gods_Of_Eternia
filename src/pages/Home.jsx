import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom"; // Importado Link para la navegación
import { useAuth } from "../context/AuthContext"; 

// Componentes
import Header from "../components/Header";
import Footer from "../components/Footer";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import TypingEffect from '../components/TypingEffect';

function Home() {
    const { isAuthenticated, verifyAndPrepareForGame } = useAuth(); 
    const navigate = useNavigate();
    
    const [isTypingDone, setIsTypingDone] = useState(false);
    const fullTitle = "Biienvenidos a Gods of Eternia";
    const [isPreparing, setIsPreparing] = useState(false);

    useEffect(() => {
        document.title = 'Inicio | Gods Of Eternia';
    }, []);

    // Función para manejar el clic en el botón de "Jugar Ahora"
    const handlePlayClick = async () => {
        if (isAuthenticated) {
            setIsPreparing(true);
            const verificationSuccess = await verifyAndPrepareForGame(); 
            setIsPreparing(false);
            
            if (verificationSuccess) {
                navigate("/juego");
            } else {
                console.log("Fallo en la verificación, no se navega a /juego.");
            }
        } else {
            navigate("/register");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <section className="text-center py-20 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="min-h-[3em]">
                            <h2 className="text-4xl font-bold text-white flex justify-center items-center">
                                {isTypingDone ? (
                                    <>
                                        Bienvenidos a <span>Gods of Eternia</span>
                                    </>
                                ) : (
                                    <>
                                        <TypingEffect
                                            text={fullTitle}
                                            speed={80}
                                            onComplete={() => setIsTypingDone(true)}
                                        />
                                        <span className="inline-block bg-white w-2 h-8 ml-2 animate-pulse"></span>
                                    </>
                                )}
                            </h2>
                        </div>
                        
                        <p className="text-xl text-gray-300 mt-4">
                            Sumérgete en un mundo épico de fantasía medieval donde los dioses caminan entre los mortales.
                        </p>
                        <div className="mt-8">
                            <button 
                                className="bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-400 transition-colors duration-300 disabled:bg-gray-500"
                                onClick={handlePlayClick}
                                disabled={isPreparing}
                            >
                                {isPreparing ? 'Preparando...' : 'Jugar Ahora'}
                            </button>
                            <Leaderboard />
                        </div>
                    </div>
                </section>

                <section className="bg-gray-800/50 py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white">Desde el Escritorio del Cronista</h2>
                        <p className="text-lg text-gray-300 mt-4">
                            Explora las leyendas, hazañas y misterios de Eternia contados por sus propios héroes.
                        </p>
                        <Link to="/blog">
                            <button className="mt-6 bg-transparent border-2 border-yellow-500 text-yellow-500 font-bold py-2 px-6 rounded-full hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300">Ir al Blog</button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Home;