/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CameraModal from "./Modal/CameraModal"; // Ruta de importación actualizada
import knightAvatar from '../../assets/knight.png';

// --- FUNCIONES DE PROCESAMIENTO DE IMAGEN ---

// Función para aplicar filtro medieval (igual que en CameraModal)
const applyMedievalFilter = (canvas, context) => {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Aplicar efecto sepia y ajustes de color medievales
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        const tr = 0.393 * r + 0.769 * g + 0.189 * b;
        const tg = 0.349 * r + 0.686 * g + 0.168 * b;
        const tb = 0.272 * r + 0.534 * g + 0.131 * b;
        
        data[i] = Math.min(255, tr * 1.1);
        data[i + 1] = Math.min(255, tg * 0.95);
        data[i + 2] = Math.min(255, tb * 0.7);
    }
    
    context.putImageData(imageData, 0, 0);
    
    // Aplicar viñeta medieval
    const gradient = context.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    );
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(0.7, 'rgba(0,0,0,0.1)');
    gradient.addColorStop(1, 'rgba(139,69,19,0.4)');
    
    context.globalCompositeOperation = 'multiply';
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Añadir textura de pergamino
    context.globalCompositeOperation = 'overlay';
    context.fillStyle = 'rgba(160,82,45,0.1)';
    
    for (let x = 0; x < canvas.width; x += 4) {
        for (let y = 0; y < canvas.height; y += 4) {
            if (Math.random() > 0.7) {
                context.fillStyle = `rgba(139,69,19,${Math.random() * 0.1})`; // Corregido: Plantilla de cadena `rgba`
                context.fillRect(x, y, 2, 2);
            }
        }
    }
    
    context.globalCompositeOperation = 'source-over';
    
    // Ajustar contraste final
    context.globalCompositeOperation = 'overlay';
    context.fillStyle = 'rgba(101,67,33,0.15)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = 'source-over';
};

// Función para convertir imagen a File con filtro medieval aplicado
const processImageWithMedievalFilter = (file) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            applyMedievalFilter(canvas, context);
            
            canvas.toBlob((blob) => {
                if (blob) {
                    const filteredFile = new File([blob], file.name, {
                        type: file.type,
                        lastModified: Date.now()
                    });
                    resolve(filteredFile);
                } else {
                    reject(new Error('Error al procesar la imagen'));
                }
            }, file.type, 0.9);
        };
        
        img.onerror = () => reject(new Error('Error al cargar la imagen'));
        img.src = URL.createObjectURL(file);
    });
};

import GameSetupModal from "../../components/GameSetupModal/GameSetupModal";

// --- COMPONENTE PRINCIPAL ---

const Player = ({ showModalOnLoad = false }) => {
    const [isGameSetupOpen, setIsGameSetupOpen] = useState(showModalOnLoad);

    useEffect(() => {
        document.title = 'Jugador | Gods of Eternia';
        if (showModalOnLoad) {
            setIsGameSetupOpen(true);
        }
    }, [showModalOnLoad]);

    const { token, user, logout } = useAuth();
    const navigate = useNavigate();
    
    // --- ESTADOS DEL COMPONENTE ---
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageKey, setProfileImageKey] = useState(Date.now()); // NUEVO ESTADO PARA EL CACHE BUSTING
    const [profileData, setProfileData] = useState({
        username: "",
        email: "",
        descripcion: "",
        puntajes: [],
    });
    const [editedData, setEditedData] = useState({
        username: "",
        descripcion: "",
    });
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [showImageOptions, setShowImageOptions] = useState(false);
    const [showCamera, setShowCamera] = useState(false);

    const fileInputRef = useRef(null);
    const defaultAvatar = knightAvatar;
    const API_URL = import.meta.env.VITE_API_URL;

    // --- LÓGICA DE LA APLICACIÓN (FUNCIONES) ---

    useEffect(() => {
        if (notification.message && notification.type !== 'loading') {
            const timer = setTimeout(() => setNotification({ message: '', type: '' }), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const fetchProfileData = useCallback(async () => {
        setLoading(true);
        setError(null);

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(`${API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL}/user/perfil`, {
                headers: { "Authorization": `Bearer ${token}` },
            });
            const data = await response.json();

            if (response.ok) {
                setProfileData({
                    username: data.username || "",
                    email: data.email || "",
                    descripcion: data.descripcion || "Un valiente héroe cuya historia está por escribirse...",
                    puntajes: data.puntajes || [],
                });
                setEditedData({ username: data.username, descripcion: data.descripcion });
                setProfileImage(data.foto_perfil || defaultAvatar);
                setProfileImageKey(Date.now()); // Actualiza la clave al cargar los datos
            } else {
                setError(data.error || "Error al cargar el perfil.");
                if (response.status === 401 || response.status === 403) logout();
            }
        } catch (err) {
            console.error("Error de conexión:", err);
            setError("No se pudo conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    }, [token, navigate, logout, API_URL, defaultAvatar]);

    useEffect(() => {
        fetchProfileData();
    }, [fetchProfileData]);

    const handleImageUpload = async (file) => {
        if (!file || !token) return;

        setNotification({ message: 'Subiendo imagen...', type: 'loading' });
        const formData = new FormData();
        formData.append('profile_picture', file);

        try {
            const response = await fetch(`${API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL}/user/perfil/foto`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });
            const result = await response.json();

            if (response.ok) {
                setProfileImage(result.foto_perfil_url); 
                setProfileImageKey(Date.now()); // ACTUALIZA LA CLAVE PARA FORZAR LA RECARGA
                setNotification({ message: result.message || '¡Imagen actualizada con estilo medieval!', type: 'success' });
            } else {
                setNotification({ message: result.error || 'Error al subir la imagen.', type: 'error' });
                fetchProfileData(); // En caso de error, intenta recargar el perfil
            }
        } catch (err) {
            console.error("Error de conexión al subir imagen:", err);
            setNotification({ message: 'Error de conexión.', type: 'error' });
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setNotification({ message: "La imagen no puede ser mayor a 5MB", type: 'error' });
            return;
        }
        if (!file.type.startsWith('image/')) {
            setNotification({ message: "Por favor selecciona un archivo de imagen válido.", type: 'error' });
            return;
        }

        try {
            setNotification({ message: 'Aplicando filtro medieval...', type: 'loading' });
            const processedFile = await processImageWithMedievalFilter(file);
            
            // PREVIEW LOCAL: Opcional, solo para una respuesta visual instantánea ANTES de la subida
            const reader = new FileReader();
            reader.onload = (event) => setProfileImage(event.target.result); // Esto carga una URL local
            reader.readAsDataURL(processedFile);
            
            // Subir la imagen procesada al servidor
            handleImageUpload(processedFile);
            setError(null);
        } catch (error) {
            console.error('Error al procesar la imagen:', error);
            setNotification({ message: 'Error al aplicar el filtro medieval.', type: 'error' });
        }
    };

    const handlePhotoCaptured = (imageFile) => {
        if (!imageFile) return;

        // PREVIEW LOCAL: Opcional, solo para una respuesta visual instantánea ANTES de la subida
        const reader = new FileReader();
        reader.onload = (event) => setProfileImage(event.target.result); // Esto carga una URL local
        reader.readAsDataURL(imageFile);

        // Subir la imagen capturada al servidor
        handleImageUpload(imageFile);
    };

    const handleProfileImageClick = () => setShowImageOptions(true);
    const handleSelectFromGallery = () => {
        setShowImageOptions(false);
        fileInputRef.current.click();
    };
    const handleTakePhoto = () => {
        setShowImageOptions(false);
        setShowCamera(true);
    };
    const handleEdit = () => setEditing(true);
    const handleCancel = () => {
        setEditing(false);
        setEditedData({
            username: profileData.username,
            descripcion: profileData.descripcion,
        });
        setError(null);
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL}/user/perfil`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(editedData),
            });
            const result = await response.json();

            if (response.ok) {
                await fetchProfileData(); // Asegúrate de que los datos del perfil se actualicen
                setEditing(false);
                setNotification({ message: 'Perfil actualizado correctamente.', type: 'success' });
            } else {
                setError(result.error || "Error al actualizar el perfil.");
            }
        } catch (err) {
            console.error("Error de conexión al guardar:", err);
            setError("No se pudo conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({ ...prevData, [name]: value }));
    };

    // --- DATOS PARA RENDERIZAR ---

    // Array para las estadísticas, fácil de mantener y escalar
    const statsData = [
        { label: 'Nivel', value: 5 },
        { label: 'Victorias', value: 12 },
        { label: 'Insignias', value: 'Dragones del Alba' }
    ];

    const notificationClasses = {
        base: 'fixed top-5 left-1/2 -translate-x-1/2 p-3 px-6 rounded-lg shadow-lg opacity-0 invisible transition-all duration-300 z-[9999] font-["Cinzel",_serif] text-sm text-white max-w-[90vw] text-center',
        show: 'top-10 opacity-100 visible',
        success: 'bg-green-600',
        error: 'bg-red-600',
        loading: 'bg-blue-600 animate-pulse'
    };

    if (loading && !profileData.username) {
        return <div className="flex justify-center items-center h-screen text-yellow-300 text-2xl font-['Cinzel',_serif]">Cargando Perfil...</div>;
    }

    return (
        <>
            {isGameSetupOpen && <GameSetupModal onClose={() => setIsGameSetupOpen(false)} />}

            <div className={`${notificationClasses.base} ${notification.message ? notificationClasses.show : ''} ${notificationClasses[notification.type] || ''}`}>
                {notification.message}
            </div>

            {showImageOptions && (
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000]" onClick={() => setShowImageOptions(false)}>
                    <div className="bg-gradient-to-br from-[#9b7e20] to-[#774b1f] p-8 rounded-xl border border-yellow-600 flex flex-col gap-4 text-center text-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <h3 className="mt-0 text-yellow-400 font-['Cinzel',_serif] text-2xl">🏰 Cambiar Retrato Medieval</h3>
                        <p className="text-yellow-100/80 -mt-2">Elige cómo crear tu retrato épico</p>
                        <button className="bg-transparent border border-yellow-500 text-yellow-300 px-5 py-2.5 rounded-lg text-lg transition-all duration-300 hover:bg-yellow-500 hover:text-black hover:scale-105" onClick={handleTakePhoto}>📸 Capturar Retrato</button>
                        <button className="bg-transparent border border-yellow-500 text-yellow-300 px-5 py-2.5 rounded-lg text-lg transition-all duration-300 hover:bg-yellow-500 hover:text-black hover:scale-105" onClick={handleSelectFromGallery}>🖼 Transformar Imagen</button>
                        <button className="bg-red-800/80 border border-red-600 text-white px-5 py-2.5 rounded-lg text-lg transition-all duration-300 hover:bg-red-700 hover:scale-105 mt-2" onClick={() => setShowImageOptions(false)}>❌ Cancelar</button>
                    </div>
                </div>
            )}

            <CameraModal
                show={showCamera}
                onClose={() => setShowCamera(false)}
                onCapture={handlePhotoCaptured}
            />

            <div className="flex justify-center items-start min-h-screen w-full bg-[linear-gradient(rgba(0,0,0,0.6),_rgba(0,0,0,0.6)),url('/fondo_1.png')] bg-no-repeat bg-center bg-fixed p-5 pt-28 sm:pt-32 pb-10">
                <div className="bg-gradient-to-b from-[#9b7e20] to-[#774b1f] p-6 sm:p-10 rounded-lg shadow-2xl w-full max-w-4xl border-2 border-[#c4a484] flex flex-col gap-6">
                    <h2 className="text-white text-3xl sm:text-4xl m-0 text-shadow-[2px_2px_6px_rgba(0,0,0,0.6)] font-['Cinzel',_serif] text-center pb-4 border-b border-yellow-700/50">Perfil del Héroe</h2>
                    {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md text-center">{error}</div>}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-10 w-full">
                        <div className="relative flex-shrink-0 w-48">
                            <img
                                src={`${profileImage || defaultAvatar}?v=${profileImageKey}`}
                                alt="Perfil del jugador"
                                className="w-44 h-44 rounded-full border-4 border-[#c4a484] shadow-lg object-cover mx-auto"
                                onError={(e) => { e.target.src = defaultAvatar; }}
                            />
                            <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-black/70 flex items-center justify-center text-xl cursor-pointer border-2 border-yellow-400 transition-all duration-300 hover:bg-yellow-400 hover:text-black hover:scale-110" onClick={handleProfileImageClick} title="Cambiar imagen">
                                🏰
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                        <div className="w-full text-center md:text-left">
                            {editing ? (
                                <div className="flex flex-col gap-5 w-full">
                                    <div className="w-full">
                                        <label htmlFor="usernameEdit" className="block text-yellow-400 mb-2 text-lg font-['Cinzel',_serif]">Nombre de héroe:</label>
                                        <input
                                            id="usernameEdit" type="text" name="username"
                                            value={editedData.username} onChange={handleChange} maxLength={20}
                                            className="w-full p-3 border-2 border-[#c4a484] rounded-md bg-black/20 text-white text-lg font-['MedievalSharp',_cursive] focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400/50"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="descriptionEdit" className="block text-yellow-400 mb-2 text-lg font-['Cinzel',_serif]">Descripción:</label>
                                        <textarea
                                            id="descriptionEdit" name="descripcion"
                                            value={editedData.descripcion} onChange={handleChange}
                                            maxLength={200} rows={4}
                                            placeholder="Describe tu historia como héroe..."
                                            className="w-full p-3 border-2 border-[#c4a484] rounded-md bg-black/20 text-white text-lg font-['MedievalSharp',_cursive] focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400/50"
                                        />
                                        <div className="text-right text-sm text-white/70 mt-1">{editedData.descripcion?.length || 0}/200</div>
                                    </div>
                                    <div className="flex justify-end gap-4 mt-2">
                                        <button className="px-6 py-2.5 font-['Cinzel',_serif] text-lg font-bold rounded-md border-2 bg-yellow-400 text-black border-yellow-400 transition-all duration-300 hover:bg-[#593d1b] hover:text-yellow-400 disabled:opacity-50" onClick={handleSave} disabled={loading}>
                                            {loading ? 'Guardando...' : '💾 Guardar'}
                                        </button>
                                        <button className="px-6 py-2.5 font-['Cinzel',_serif] text-lg font-bold rounded-md border-2 bg-transparent border-[#c4a484] text-gray-200 transition-all duration-300 hover:bg-white/10 disabled:opacity-50" onClick={handleCancel} disabled={loading}>
                                            ❌ Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3 justify-center md:justify-start">
                                        <h3 className="m-0 font-['Cinzel',_serif] text-3xl sm:text-4xl text-white text-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">{profileData.username || "Héroe Anónimo"}</h3>
                                        <button className="bg-none border-none p-0 cursor-pointer text-2xl transition-all duration-200 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_5px_rgba(255,215,0,0.7)] focus:outline-none focus-visible:drop-shadow-[0_0_8px_#ffd700]" onClick={handleEdit} title="Editar perfil">✏️</button>
                                    </div>
                                    <div className="bg-black/10 p-4 rounded-md border-l-2 border-yellow-400 min-h-[80px]">
                                        <p className="m-0 italic text-gray-200 leading-relaxed">{profileData.descripcion}</p>
                                    </div>
                                    {profileData.email && <div className="font-['Cinzel',_serif] text-white/80 text-lg">📧 {profileData.email}</div>}
                                    
                                    <div className="flex justify-around items-start w-full mt-4 pt-4 border-t border-yellow-500/20">
                                        {statsData.map((stat) => (
                                            <div className="flex flex-col items-center text-center basis-1/3" key={stat.label}>
                                                <span className="text-sm font-bold text-white/70 uppercase tracking-wider mb-2">{stat.label}</span>
                                                <span className="text-xl font-bold text-yellow-300 leading-tight">{stat.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Player;