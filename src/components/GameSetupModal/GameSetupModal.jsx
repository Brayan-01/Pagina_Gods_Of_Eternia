import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import GameSetup from '../../pages/GameSetup/GameSetup'; // Asegúrate de que la ruta sea correcta
import './GameSetupModal.css'; // ¡Importa los estilos del modal!

const GameSetupModal = () => {
    const navigate = useNavigate();
    const modalRef = useRef();

    // Función para cerrar el modal
    const closeGameSetup = useCallback(() => {
        // Agrega la clase de cierre para la animación
        if (modalRef.current) {
            modalRef.current.classList.add('game-setup-modal-closing');
            modalRef.current.addEventListener('animationend', () => {
                navigate('/player'); // O a la ruta que deba ir después de cerrar
            }, { once: true }); // Asegura que el listener se ejecute una sola vez
        } else {
            navigate('/player');
        }
    }, [navigate]);

    // Manejador para cerrar al hacer clic fuera del contenido
    const handleOutsideClick = useCallback((event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeGameSetup();
        }
    }, [closeGameSetup]);

    // Efecto para añadir/limpiar listeners y la clase del body
    useEffect(() => {
        document.body.classList.add('game-setup-modal-open');
        document.addEventListener('mousedown', handleOutsideClick); // Clic fuera
        document.addEventListener('keydown', (e) => { // Escape para cerrar
            if (e.key === 'Escape') {
                closeGameSetup();
            }
        });

        return () => {
            document.body.classList.remove('game-setup-modal-open');
            document.removeEventListener('mousedown', handleOutsideClick);
            // No necesitamos limpiar el keydown si el componente se desmonta
        };
    }, [handleOutsideClick, closeGameSetup]);

    return (
        <div className="game-setup-modal-overlay">
            <div ref={modalRef} className="game-setup-modal-content">
                <button className="game-setup-modal-close-button" onClick={closeGameSetup}>
                    X
                </button>
                <GameSetup onClose={closeGameSetup} /> {/* Pasamos la función de cierre a GameSetup */}
            </div>
        </div>
    );
};

export default GameSetupModal;