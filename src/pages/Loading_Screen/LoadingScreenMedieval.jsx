import React from 'react';

const LoadingScreenMedieval = () => {
    return (
        <div className="fixed inset-0 bg-radial-gradient from-[rgba(20,20,40,0.9)] to-[rgba(0,0,0,0.95)] flex justify-center items-center z-[1000] backdrop-blur-sm">
            <div className="relative bg-gradient-to-br from-[#2c1810] to-[#1a0f08] border-2 border-[#8b6914] rounded-2xl shadow-2xl shadow-amber-800/40 w-[90%] max-w-md text-center p-10">
                <h1 className="font-['Cinzel_Decorative',_serif] text-3xl font-bold text-amber-400 mb-4 text-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">Preparando el Reino</h1>
                <p className="font-['Cinzel',_serif] text-lg text-amber-100/80 leading-relaxed my-6 text-shadow-[1px_1px_2px_rgba(0,0,0,0.7)]">
                    Los dragones están calentando sus llamas y los caballeros afilan sus espadas...
                </p>
                <div className="mx-auto border-4 border-amber-900/50 border-t-amber-400 rounded-full w-10 h-10 animate-spin shadow-lg"></div>
            </div>
        </div>
    );
};

export default LoadingScreenMedieval;