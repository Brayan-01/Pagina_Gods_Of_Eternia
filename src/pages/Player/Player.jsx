/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CameraModal from "./Modal/CameraModal"; // Ruta de importación actualizada
import "./Player.css";
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

// --- COMPONENTE PRINCIPAL ---

const Player = () => {
    useEffect(() => {
        document.title = 'Jugador | Gods of Eternia';
    }, []);

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

    if (loading && !profileData.username) {
        return <div className="loading-screen">Cargando Perfil...</div>;
    }

    return (
        <>
            <div className={`notification ${notification.type} ${notification.message ? 'show' : ''}`}>
                {notification.message}
            </div>

            {showImageOptions && (
                <div className="image-options-modal-overlay" onClick={() => setShowImageOptions(false)}>
                    <div className="image-options-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>🏰 Cambiar Retrato Medieval</h3>
                        <p className="modal-subtitle">Elige cómo crear tu retrato épico</p>
                        <button className="modal-button" onClick={handleTakePhoto}>📸 Capturar Retrato</button>
                        <button className="modal-button" onClick={handleSelectFromGallery}>🖼 Transformar Imagen</button>
                        <button className="modal-button cancel" onClick={() => setShowImageOptions(false)}>❌ Cancelar</button>
                    </div>
                </div>
            )}

            <CameraModal
                show={showCamera}
                onClose={() => setShowCamera(false)}
                onCapture={handlePhotoCaptured}
            />

            <div className="profile-container">
                <div className="profile-box">
                    <h2>Perfil del Héroe</h2>
                    {error && <div className="error-message">{error}</div>}
                    <div className="profile-main-content">
                        <div className="profile-image-container">
                            <img
                                // MODIFICACIÓN CLAVE AQUÍ: AÑADIR EL PARAMETRO DE CONSULTA PARA EVITAR CACHE
                                src={`${profileImage || defaultAvatar}?v=${profileImageKey}`}
                                alt="Perfil del jugador"
                                className="profile-image"
                                onError={(e) => { e.target.src = defaultAvatar; }}
                            />
                            <div className="image-upload-button" onClick={handleProfileImageClick} title="Cambiar imagen">
                                🏰
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                        </div>
                        <div className="profile-details">
                            {editing ? (
                                <div className="profile-edit">
                                    <div className="input-group">
                                        <label htmlFor="usernameEdit">Nombre de héroe:</label>
                                        <input
                                            id="usernameEdit" type="text" name="username"
                                            value={editedData.username} onChange={handleChange} maxLength={20}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="descriptionEdit">Descripción:</label>
                                        <textarea
                                            id="descriptionEdit" name="descripcion"
                                            value={editedData.descripcion} onChange={handleChange}
                                            maxLength={200} rows={4}
                                            placeholder="Describe tu historia como héroe..."
                                        />
                                        <div className="char-counter">{editedData.descripcion?.length || 0}/200</div>
                                    </div>
                                    <div className="button-group">
                                        <button className="save-button" onClick={handleSave} disabled={loading}>
                                            {loading ? 'Guardando...' : '💾 Guardar'}
                                        </button>
                                        <button className="cancel-button" onClick={handleCancel} disabled={loading}>
                                            ❌ Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="profile-info">
                                    <div className="username-section">
                                        <h3>{profileData.username || "Héroe Anónimo"}</h3>
                                        <button className="edit-button" onClick={handleEdit} title="Editar perfil">✏️</button>
                                    </div>
                                    <div className="description">
                                        <p>{profileData.descripcion}</p>
                                    </div>
                                    {profileData.email && <div className="email-info">📧 {profileData.email}</div>}
                                    
                                    {/* SECCIÓN DE ESTADÍSTICAS REORGANIZADA */}
                                    <div className="stats">
                                        {statsData.map((stat) => (
                                            <div className="stat" key={stat.label}>
                                                <span className="stat-label">{stat.label}</span>
                                                <span className="stat-value">{stat.value}</span>
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