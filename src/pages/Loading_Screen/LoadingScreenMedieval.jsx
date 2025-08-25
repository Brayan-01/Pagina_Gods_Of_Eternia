import React from 'react';
import './LoadingScreen.css'; // Importamos los estilos

const LoadingScreenMedieval = () => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h1 className="modal-title">Preparando el Reino</h1>
                <p className="modal-message">
                    Los dragones están calentando sus llamas y los caballeros afilan sus espadas...
                </p>
                <div className="loader"></div>
            </div>
        </div>
    );
};

export default LoadingScreenMedieval;