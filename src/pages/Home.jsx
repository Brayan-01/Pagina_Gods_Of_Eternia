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
        <div className="page-container">
            <Header />
            <main className="content">
                <section className="hero-section">
                    <div className="hero-content">
                        <div className="typing-container">
                            <h2>
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
                                        <span className="typing-cursor"></span>
                                    </>
                                )}
                            </h2>
                        </div>
                        
                        <p className="subtitle">
                            Sumérgete en un mundo épico de fantasía medieval donde los dioses caminan entre los mortales.
                        </p>
                        <div className="btn-container">
                            <button 
                                className="play-button" 
                                onClick={handlePlayClick}
                                disabled={isPreparing}
                            >
                                {isPreparing ? 'Preparando...' : 'Jugar Ahora'}
                            </button>
                            <Leaderboard />
                        </div>
                    </div>
                </section>

                <section className="feature-section">
                    <div className="feature-content">
                        <h2>Desde el Escritorio del Cronista</h2>
                        <p>
                            Explora las leyendas, hazañas y misterios de Eternia contados por sus propios héroes.
                        </p>
                        <Link to="/blog">
                            <button className="feature-button">Ir al Blog</button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Home;