import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import './ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    const handleConfirmClick = () => {
        if (typeof onConfirm === "function") {
            onConfirm();
        }
        if (typeof onClose === "function") {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="modal-content"
                        initial={{ y: -50, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.8 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                            duration: 0.3
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Decorative elements */}
                        <div className="modal-decoration-top"></div>
                        <div className="modal-decoration-bottom"></div>

                        {/* Crown icon */}
                        <div className="modal-crown">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M5 16L3 5l4.5 4L12 4l4.5 5L21 5l-2 11H5zm2.7-2h8.6l.9-5.4-2.1 1.7L12 8l-3.1 2.3-2.1-1.7L7.7 14z" />
                            </svg>
                        </div>

                        <h3 className="modal-title">
                            {title || 'Decreto Real'}
                        </h3>

                        <div className="modal-divider"></div>

                        <p className="modal-message">
                            {message || '¿Su Majestad desea proceder con esta noble acción?'}
                        </p>

                        <div className="modal-actions">
                            <button className="modal-button cancel" onClick={onClose}>
                                <span className="button-text">Cancelar</span>
                            </button>
                            <button className="modal-button confirm" onClick={handleConfirmClick}>
                                <span className="button-text">Confirmar</span>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;