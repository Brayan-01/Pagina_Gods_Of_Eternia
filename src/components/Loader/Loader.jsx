import React, { useState, useEffect } from 'react';
import './Loader.css';

const MedievalLoader = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const medievalTexts = [
        {
            main: "FORJANDO",
            sub: "Preparando las herramientas sagradas..."
        },
        {
            main: "TEMPLANDO",
            sub: "El acero toma forma en el fuego eterno..."
        },
        {
            main: "MOLDEANDO",
            sub: "Los secretos ancestrales se revelan..."
        },
        {
            main: "CREANDO",
            sub: "La obra maestra está casi lista..."
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => 
                (prevIndex + 1) % medievalTexts.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const currentText = medievalTexts[currentTextIndex];

    return (
        <div className="loader-container">
            <div className="medieval-loader">
                {/* Martillo giratorio */}
                <div className="rotating-hammer">
                    <div className="hammer-head"></div>
                    <div className="hammer-handle"></div>
                </div>
                
                {/* Partículas mágicas */}
                <div className="magic-particles">
                    <div className="particle particle-1"></div>
                    <div className="particle particle-2"></div>
                    <div className="particle particle-3"></div>
                    <div className="particle particle-4"></div>
                    <div className="particle particle-5"></div>
                    <div className="particle particle-6"></div>
                </div>
            </div>
            
            <div className="medieval-text">
                <div className="main-text" key={currentText.main}>
                    {currentText.main}
                </div>
                <div className="sub-text" key={currentText.sub}>
                    {currentText.sub}
                </div>
                
                <div className="progress-dots">
                    <div className="progress-dot"></div>
                    <div className="progress-dot"></div>
                    <div className="progress-dot"></div>
                    <div className="progress-dot"></div>
                    <div className="progress-dot"></div>
                </div>
            </div>
        </div>
    );
};

export default MedievalLoader;