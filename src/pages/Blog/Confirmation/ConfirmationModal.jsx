import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCrown } from 'react-icons/fa';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gradient-to-tr from-[rgba(20,20,40,0.9)] to-[rgba(0,0,0,0.95)] flex justify-center items-center z-[1000] backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "backOut" }}
                    className="relative bg-gradient-to-br from-[#2c1810] to-[#1a0f08] border-2 border-[#8b6914] rounded-2xl shadow-2xl shadow-yellow-800/30 w-[90%] max-w-md text-center p-9 pt-12 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Decorations */}
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent">
                        <div className="absolute -top-1 left-0 w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_6px_rgba(255,215,0,0.6)]"></div>
                        <div className="absolute -top-1 right-0 w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_6px_rgba(255,215,0,0.6)]"></div>
                    </div>
                     <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent">
                        <div className="absolute -top-1 left-0 w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_6px_rgba(255,215,0,0.6)]"></div>
                        <div className="absolute -top-1 right-0 w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_6px_rgba(255,215,0,0.6)]"></div>
                    </div>

                    <div className="mx-auto mb-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.5)] animate-pulse">
                        <FaCrown size={48} />
                    </div>

                    <h2 className="font-['Cinzel_Decorative',_serif] text-3xl font-bold text-yellow-400 mb-4 text-shadow-[2px_2px_4px_rgba(0,0,0,0.8),0_0_10px_rgba(255,215,0,0.3)] tracking-wide">
                        {title}
                    </h2>

                    <div className="w-3/5 h-px bg-gradient-to-r from-transparent via-yellow-800 to-transparent mx-auto my-5 relative after:content-['♦'] after:absolute after:-top-2 after:left-1/2 after:-translate-x-1/2 after:bg-[#2c1810] after:text-yellow-400 after:text-lg after:px-2"></div>

                    <p className="font-['Cinzel',_serif] text-lg text-amber-100/80 leading-relaxed my-8 text-shadow-[1px_1px_2px_rgba(0,0,0,0.7)]">
                        {message}
                    </p>

                    <div className="flex justify-center gap-5 mt-8 flex-col sm:flex-row">
                        <button
                            onClick={onClose}
                            className="relative font-['Cinzel',_serif] text-base font-semibold px-7 py-3 border-2 rounded-lg transition-all duration-300 uppercase tracking-wider min-w-[120px] overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 border-gray-600 text-gray-200 shadow-md hover:border-gray-400 hover:-translate-y-0.5 before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:transition-all before:duration-500 hover:before:left-full"
                        >
                            <span className="relative z-10">Cancelar</span>
                        </button>
                        <button
                            onClick={onConfirm}
                            className="relative font-['Cinzel',_serif] text-base font-semibold px-7 py-3 border-2 rounded-lg transition-all duration-300 uppercase tracking-wider min-w-[120px] overflow-hidden bg-gradient-to-br from-red-800 to-red-900 border-red-700 text-white shadow-md shadow-red-900/50 hover:border-red-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-600/50 before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:transition-all before:duration-500 hover:before:left-full"
                        >
                            <span className="relative z-10">Confirmar</span>
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ConfirmationModal;
