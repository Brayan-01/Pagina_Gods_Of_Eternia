import React, { useEffect } from 'react';
import LoadingScreenMedieval from '../pages/Loading_Screen/LoadingScreenMedieval'; 

const RedirectToGame = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.replace('/Juego/index.html');
        }, 50); // 50ms es suficiente para que el navegador renderice la pantalla
        return () => clearTimeout(timer);
    }, []); // El array vacío [] asegura que esto se ejecute solo una vez

    // Mientras esperamos esos 50ms, mostramos nuestra pantalla de carga
    return <LoadingScreenMedieval />;
};

export default RedirectToGame;