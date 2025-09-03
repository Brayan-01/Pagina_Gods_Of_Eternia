import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import GameSetup from  '../../GameSetup/GameSetup'; // Asegúrate que la ruta a GameSetup.jsx sea correcta
import '../../GameSetup/GameSetup.css'; // Importamos el CSS combinado

const GameSetupModal = () => {
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    // Función para cerrar el modal con animación
    const closeGameSetup = useCallback(() => {
        if (modalRef.current && overlayRef.current) {
            modalRef.current.classList.add('closing');
            overlayRef.current.classList.add('closing');

            const handleAnimationEnd = () => {
                navigate('/player'); // Navega a la página del jugador después de cerrar
                // Limpiamos el listener para evitar ejecuciones múltiples
                modalRef.current.removeEventListener('animationend', handleAnimationEnd);
            };
            modalRef.current.addEventListener('animationend', handleAnimationEnd);
        } else {
            // Fallback si algo sale mal
            navigate('/player');
        }
    }, [navigate]);

    // Manejador para cerrar al hacer clic fuera del contenido
    const handleOutsideClick = useCallback((event) => {
        // Cierra solo si se hace clic directamente en el overlay (no en sus hijos)
        if (event.target === overlayRef.current) {
            closeGameSetup();
        }
    }, [closeGameSetup]);

    // Efecto para añadir/limpiar listeners y la clase del body
    useEffect(() => {
        // Bloquea el scroll del body
        document.body.classList.add('modal-open');

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeGameSetup();
            }
        };

        // Listeners para cerrar
        document.addEventListener('keydown', handleKeyDown);

        // Función de limpieza
        return () => {
            document.body.classList.remove('modal-open');
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeGameSetup]);

    return (
        // Asignamos el ref y el listener de clic al overlay
        <div ref={overlayRef} className="game-setup-modal-overlay" onMouseDown={handleOutsideClick}>
            <div ref={modalRef} className="game-setup-modal-content">
                <button className="game-setup-modal-close-button" onClick={closeGameSetup} aria-label="Cerrar">
                    &times; {/* Una 'X' más elegante y accesible */}
                </button>
                {/* Renderiza el componente GameSetup dentro del modal */}
                <GameSetup onClose={closeGameSetup} />
            </div>
        </div>
    );
};

export default GameSetupModal;

