import React, { useState, useEffect, useRef } from 'react';

// Función de ayuda para convertir el DataURL de la imagen capturada a un objeto File
const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

// Función para aplicar filtro medieval
const applyMedievalFilter = (canvas, context) => {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Aplicar efecto sepia y ajustes de color medievales
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Fórmula sepia mejorada con toque medieval
        const tr = 0.393 * r + 0.769 * g + 0.189 * b;
        const tg = 0.349 * r + 0.686 * g + 0.168 * b;
        const tb = 0.272 * r + 0.534 * g + 0.131 * b;
        
        // Ajustar para tono más cálido y dorado (medieval)
        data[i] = Math.min(255, tr * 1.1); // Más rojo/dorado
        data[i + 1] = Math.min(255, tg * 0.95); // Menos verde
        data[i + 2] = Math.min(255, tb * 0.7); // Menos azul para tono cálido
    }
    
    context.putImageData(imageData, 0, 0);
    
    // Aplicar viñeta medieval
    const gradient = context.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    );
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(0.7, 'rgba(0,0,0,0.1)');
    gradient.addColorStop(1, 'rgba(139,69,19,0.4)'); // Viñeta marrón medieval
    
    context.globalCompositeOperation = 'multiply';
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Añadir textura de pergamino
    context.globalCompositeOperation = 'overlay';
    context.fillStyle = 'rgba(160,82,45,0.1)'; // Color pergamino
    
    // Crear patrón de textura simple
    for (let x = 0; x < canvas.width; x += 4) {
        for (let y = 0; y < canvas.height; y += 4) {
            if (Math.random() > 0.7) {
                context.fillStyle = `rgba(139,69,19,${Math.random() * 0.1})`;
                context.fillRect(x, y, 2, 2);
            }
        }
    }
    
    // Resetear el modo de composición
    context.globalCompositeOperation = 'source-over';
    
    // Ajustar contraste final
    context.globalCompositeOperation = 'overlay';
    context.fillStyle = 'rgba(101,67,33,0.15)'; // Overlay dorado medieval
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = 'source-over';
};

const CameraModal = ({ show, onClose, onCapture }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const streamRef = useRef(null);
    const [error, setError] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Función para detener el stream
    const stopStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => {
                track.stop();
            });
            streamRef.current = null;
        }
    };

    // Función para iniciar la cámara con mejor manejo de errores
    const startCamera = async () => {
        setError(null);
        setIsLoading(true);
        setIsCameraReady(false);

        try {
            // Verificar soporte del navegador
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error("Tu navegador no soporta la API de cámara o estás en un entorno no seguro (requiere HTTPS).");
            }

            // Detener cualquier stream existente
            stopStream();

            // Configuraciones más flexibles para evitar timeouts
            const constraints = {
                video: {
                    width: { 
                        ideal: 1280, 
                        max: 1920,
                        min: 320 
                    },
                    height: { 
                        ideal: 720, 
                        max: 1080,
                        min: 240 
                    },
                    facingMode: "user",
                    frameRate: { ideal: 30, max: 30 }
                },
                audio: false // Asegurar que no pida audio
            };

            console.log('Solicitando acceso a la cámara...');
            
            // Usar Promise.race para timeout manual
            const streamPromise = navigator.mediaDevices.getUserMedia(constraints);
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Timeout: La cámara tardó demasiado en responder')), 30000);
            });

            const stream = await Promise.race([streamPromise, timeoutPromise]);
            
            if (!videoRef.current) {
                stream.getTracks().forEach(track => track.stop());
                return;
            }

            streamRef.current = stream;
            videoRef.current.srcObject = stream;

            // Esperar a que el video esté listo
            await new Promise((resolve, reject) => {
                const video = videoRef.current;
                if (!video) {
                    reject(new Error('Elemento de video no disponible'));
                    return;
                }

                const onLoadedMetadata = () => {
                    console.log('Video metadata cargada');
                    setIsCameraReady(true);
                    setIsLoading(false);
                    resolve();
                };

                const onError = (e) => {
                    console.error('Error en el video:', e);
                    reject(new Error('Error al cargar el video'));
                };

                video.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
                video.addEventListener('error', onError, { once: true });

                // Timeout para loadedmetadata
                setTimeout(() => {
                    reject(new Error('Timeout esperando metadata del video'));
                }, 5000);

                video.play().catch(reject);
            });

        } catch (err) {
            console.error("Error al acceder a la cámara:", err);
            stopStream();
            setIsLoading(false);
            setIsCameraReady(false);
            
            let errorMessage = "Error desconocido al acceder a la cámara.";
            
            if (err.name === "NotAllowedError" || err.message.includes("denied")) {
                errorMessage = "Permiso de cámara denegado. Por favor, permite el acceso a la cámara en tu navegador.";
            } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
                errorMessage = "No se encontró ninguna cámara. Asegúrate de que tienes una conectada y funcionando.";
            } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
                errorMessage = "La cámara está siendo usada por otra aplicación. Cierra otras aplicaciones que puedan estar usando la cámara.";
            } else if (err.name === "OverconstrainedError") {
                errorMessage = "La configuración de cámara solicitada no es compatible. Intenta con otra cámara.";
            } else if (err.name === "SecurityError") {
                errorMessage = "Error de seguridad. Asegúrate de estar en una conexión segura (HTTPS).";
            } else if (err.name === "AbortError" || err.message.includes("Timeout")) {
                errorMessage = "La cámara tardó demasiado en responder. Intenta recargar la página o reiniciar tu navegador.";
            } else {
                errorMessage = `Error: ${err.message}`;
            }
            
            setError(errorMessage);
        }
    };

    useEffect(() => {
        if (show && !capturedImage) {
            startCamera();
        } else {
            stopStream();
            setIsCameraReady(false);
            setIsLoading(false);
        }

        // Cleanup al desmontar el componente
        return () => {
            stopStream();
        };
    }, [show, capturedImage]);

    const handleCapture = () => {
        if (!videoRef.current || !canvasRef.current || !isCameraReady) {
            setError("La cámara no está lista para capturar. Espera un momento e intenta de nuevo.");
            return;
        }

        try {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            
            // Usar las dimensiones reales del video
            canvas.width = video.videoWidth || video.clientWidth;
            canvas.height = video.videoHeight || video.clientHeight;

            const context = canvas.getContext('2d');
            
            // Limpiar el canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            // Transformación para efecto espejo
            context.save();
            context.translate(canvas.width, 0);
            context.scale(-1, 1);

            // Dibuja la imagen del video en el canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            context.restore();
            
            // Aplicar el filtro medieval
            applyMedievalFilter(canvas, context);
            
            const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
            setCapturedImage(dataUrl);

            // Detener el stream después de capturar
            stopStream();
            setIsCameraReady(false);
        } catch (err) {
            console.error('Error al capturar:', err);
            setError('Error al capturar la imagen. Intenta de nuevo.');
        }
    };

    const handleConfirm = () => {
        if (!capturedImage) return;
        const imageFile = dataURLtoFile(capturedImage, 'medieval_capture.jpg');
        onCapture(imageFile);
        setCapturedImage(null);
        onClose();
    };

    const handleRetake = () => {
        setCapturedImage(null);
        setError(null);
        // Reiniciar la cámara
        setTimeout(() => {
            if (show) {
                startCamera();
            }
        }, 100);
    };

    const handleClose = () => {
        setCapturedImage(null);
        setError(null);
        stopStream();
        onClose();
    };

    if (!show) {
        return null;
    }

    const modalButtonClasses = "flex-1 min-w-[120px] p-3 border-2 rounded-lg text-sm sm:text-base font-bold transition-all duration-300 uppercase tracking-wider relative overflow-hidden whitespace-nowrap before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

    return (
        <div className="fixed inset-0 bg-radial-gradient from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.9)] flex justify-center items-center z-[1001] backdrop-blur-sm animate-fade-in p-2.5" onClick={handleClose}>
            <div className="bg-gradient-to-br from-[#2c1810] via-[#8b4513] to-[#654321] p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg shadow-yellow-500/30 text-center border-2 border-yellow-500 text-amber-50 w-full max-w-2xl max-h-[95vh] flex flex-col relative font-['Georgia',_serif] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="mb-4 sm:mb-6 flex-shrink-0">
                    <h3 className="m-0 mb-2 text-xl sm:text-2xl md:text-3xl text-yellow-400 text-shadow-[2px_2px_4px_rgba(0,0,0,0.7)] font-bold tracking-wider leading-tight">{capturedImage ? "Retrato Medieval" : "Cámara del Cronista"}</h3>
                    <p className="m-0 text-sm sm:text-base text-yellow-600 italic opacity-90 leading-tight px-1">
                        {capturedImage 
                            ? "Tu retrato ha sido bendecido con la esencia medieval" 
                            : isLoading 
                                ? "Preparando la cámara mágica..." 
                                : "Prepárate para tu retrato épico"
                        }
                    </p>
                </div>
                
                {error ? (
                    <div className="text-red-300 bg-red-900/50 border-2 border-red-500 p-4 sm:p-5 rounded-lg my-5 font-bold text-shadow-[1px_1px_2px_rgba(0,0,0,0.5)] text-sm sm:text-base leading-relaxed flex flex-col gap-4 text-left">
                        {error}
                        <button 
                            onClick={startCamera} 
                            className="self-center px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md cursor-pointer font-bold text-sm transition-all duration-300 disabled:opacity-60"
                            disabled={isLoading}
                        >
                            {isLoading ? "Intentando..." : "🔄 Reintentar"}
                        </button>
                    </div>
                ) : (
                    <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden mb-4 sm:mb-6 border-2 border-yellow-900 shadow-inner flex-shrink-0">
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            muted
                            className={`absolute inset-0 w-full h-full object-cover transform -scale-x-100 filter sepia-20 contrast-110 brightness-105 ${capturedImage ? 'hidden' : ''}`}
                        ></video>
                        
                        {(isLoading || (!isCameraReady && !capturedImage)) && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-yellow-400 font-bold text-shadow-[2px_2px_4px_rgba(0,0,0,0.8)] p-5 bg-black/70 backdrop-blur-md">
                                <div className="w-8 h-8 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin"></div>
                                {isLoading ? "Iniciando cámara..." : "Cargando..."}
                            </div>
                        )}

                        {capturedImage && 
                            <img 
                                src={capturedImage} 
                                alt="Retrato Medieval" 
                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                            />
                        }
                        
                        <canvas ref={canvasRef} className="hidden"></canvas>
                        <canvas ref={previewCanvasRef} className="hidden"></canvas>
                        
                        {!capturedImage && isCameraReady && (
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute top-2.5 left-2.5 w-10 h-10 border-t-2 border-l-2 border-yellow-500/60 rounded-tl-lg"></div>
                                <div className="absolute top-2.5 right-2.5 w-10 h-10 border-t-2 border-r-2 border-yellow-500/60 rounded-tr-lg"></div>
                                <div className="absolute bottom-2.5 left-2.5 w-10 h-10 border-b-2 border-l-2 border-yellow-500/60 rounded-bl-lg"></div>
                                <div className="absolute bottom-2.5 right-2.5 w-10 h-10 border-b-2 border-r-2 border-yellow-500/60 rounded-br-lg"></div>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex justify-center gap-2 sm:gap-5 w-full flex-shrink-0 flex-col sm:flex-row">
                    {capturedImage ? (
                        <>
                            <button onClick={handleConfirm} className={`${modalButtonClasses} border-green-500 text-green-400 hover:enabled:bg-green-500 hover:enabled:text-white hover:enabled:shadow-lg hover:enabled:shadow-green-500/50`}>
                                ⚔️ Usar este Retrato
                            </button>
                            <button onClick={handleRetake} className={`${modalButtonClasses} border-orange-500 text-orange-400 hover:enabled:bg-orange-500 hover:enabled:text-white hover:enabled:shadow-lg hover:enabled:shadow-orange-500/50`}>
                                🔄 Nuevo Retrato
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleCapture}
                                className={`${modalButtonClasses} border-yellow-400 text-yellow-300 hover:enabled:bg-yellow-400 hover:enabled:text-black hover:enabled:shadow-lg hover:enabled:shadow-yellow-400/50`}
                                disabled={!!error || !isCameraReady || isLoading}
                            >
                                {isLoading ? "⏳ Cargando..." : "📸 Crear Retrato Medieval"}
                            </button>
                            <button onClick={handleClose} className={`${modalButtonClasses} border-gray-500 text-gray-400 hover:enabled:bg-gray-500 hover:enabled:text-white`}>
                                ❌ Cancelar
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CameraModal;