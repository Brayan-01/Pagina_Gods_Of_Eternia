import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameSetup from '../../pages/GameSetup/GameSetup'; // Asegúrate de que la ruta sea correcta
import { motion, AnimatePresence } from 'framer-motion';


const GameSetupModal = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    const closeGameSetup = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleAnimationComplete = () => {
        if (!isOpen) {
            navigate('/player');
        }
    };

    // Efecto para la tecla Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeGameSetup();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeGameSetup]);

    return (
        <AnimatePresence onExitComplete={handleAnimationComplete}>
            {isOpen && (
                 <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000] backdrop-blur-sm"
                    onClick={closeGameSetup}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative bg-transparent rounded-2xl max-w-[95%] max-h-[95vh] overflow-y-auto overflow-x-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-6 bg-transparent border-none text-4xl leading-none text-gray-400 cursor-pointer transition-all duration-200 ease-in-out z-[1001] hover:text-white hover:scale-110"
                            onClick={closeGameSetup}
                            aria-label="Cerrar"
                        >
                            &times;
                        </button>
                        <GameSetup onClose={closeGameSetup} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GameSetupModal;