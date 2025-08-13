import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import './ConfirmationModal.css'; // Crearemos este archivo de estilos a continuación

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose} // Cierra el modal si se hace clic fuera
                >
                    <motion.div
                        className="modal-content"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()} // Evita que el clic se propague al overlay
                    >
                        <h3 className="modal-title">{title || 'Confirmar Acción'}</h3>
                        <p className="modal-message">{message || '¿Estás seguro de que deseas continuar?'}</p>
                        <div className="modal-actions">
                            <button className="modal-button cancel" onClick={onClose}>
                                Cancelar
                            </button>
                            <button className="modal-button confirm" onClick={onConfirm}>
                                Confirmar
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;
