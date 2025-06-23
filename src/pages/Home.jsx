import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Leaderboard from "../pages/Leaderboard"; 
import Footer from "../components/Footer";

function Home() {
    // 1. Añadimos un estado para guardar el enlace del botón.
    // Por defecto, apuntará a la página de registro.
    const [playLink, setPlayLink] = useState("/register");

    useEffect(() => {
        document.title = 'Inicio | Gods Of Eternia';

        // 2. Comprobamos si existe un token en el almacenamiento local.
        const userToken = localStorage.getItem("userToken");

        // 3. Si el token existe, actualizamos el estado para que el enlace apunte al perfil.
        if (userToken) {
            setPlayLink("/player"); // Cambia el enlace al perfil del jugador
        }
        // Si no hay token, el enlace se queda con su valor por defecto: "/register"

    }, []); // El array vacío [] asegura que esta comprobación se haga solo una vez, cuando la página carga.

    return (
        <div className="page-container">
            <Header />
            <main className="content">
                {/* Sección Hero */}
                <section className="hero-section">
                    {/* Capa oscura */}
                    <div className="overlay"></div>

                    {/* Contenido */}
                    <div className="hero-content">
                        <h2>
                            Bienvenido a <span>Gods of Eternia</span>
                        </h2>
                        <p>
                            Sumérgete en un mundo épico de fantasía medieval donde los dioses caminan entre los mortales.
                        </p>

                        {/* Botón */}
                        <div className="btn-container">
                            {/* 4. Usamos la variable de estado para definir el destino del enlace. */}
                            <Link to={playLink}>
                                <button className="play-button">Jugar Ahora</button>
                            </Link>
                            
                            <Leaderboard />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Home;
