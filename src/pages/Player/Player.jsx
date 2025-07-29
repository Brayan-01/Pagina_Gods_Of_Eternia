/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useRef } from "react"; // 1. Importar useRef
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Player.css";
import knightAvatar from '../../assets/knight.png'

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
    
    // 2. Nuevo estado para controlar la visibilidad del modal de opciones de imagen
    const [showImageOptions, setShowImageOptions] = useState(false);

    // 3. Referencias para los inputs de archivo (galería y cámara)
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

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
            const response = await fetch(`${API_URL}/perfil`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                setProfileData({
                    username: data.username || "",
                    email: data.email || "",
                    descripcion: data.descripcion || "Un valiente héroe cuya historia está por escribirse...",
                    puntajes: data.puntajes || [],
                });
                setEditedData({
                    username: data.username || "",
                    descripcion: data.descripcion || "",
                });
                setProfileImage(data.foto_perfil || defaultAvatar);
            } else {
                setError(data.error || "Error al cargar el perfil.");
                if (response.status === 401 || response.status === 403) {
                    logout();
                }
            }
        } catch (err) {
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
            const response = await fetch(`${API_URL}/perfil/foto`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                setProfileImage(result.foto_perfil_url);
                setNotification({ message: result.message || '¡Imagen actualizada!', type: 'success' });
            } else {
                setNotification({ message: result.error || 'Error al subir la imagen.', type: 'error' });
                fetchProfileData();
            }
        } catch (err) {
            setNotification({ message: 'Error de conexión.', type: 'error' });
        }
    };

    const handleImageChange = (e) => {
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

        const reader = new FileReader();
        reader.onload = (event) => setProfileImage(event.target.result);
        reader.readAsDataURL(file);
        handleImageUpload(file);
        setError(null);
    };

    // 4. Nuevas funciones para manejar las opciones de imagen
    const handleProfileImageClick = () => {
        setShowImageOptions(true);
    };

    const handleSelectFromGallery = () => {
        setShowImageOptions(false);
        fileInputRef.current.click(); // Activa el input de la galería
    };

    const handleTakePhoto = () => {
        setShowImageOptions(false);
        cameraInputRef.current.click(); // Activa el input de la cámara
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
            const response = await fetch(`${API_URL}/perfil`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username: editedData.username,
                    descripcion: editedData.descripcion,
                }),
            });
            const result = await response.json();
            if (response.ok) {
                await fetchProfileData();
                setEditing(false);
                setNotification({ message: 'Perfil actualizado correctamente.', type: 'success' });
            } else {
                setError(result.error || "Error al actualizar el perfil.");
            }
        } catch (err) {
            setError("No se pudo conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({ ...prevData, [name]: value }));
    };

    // --- RENDERIZADO DEL COMPONENTE ---
    if (loading && !profileData.username) {
        return <div className="loading-screen">Cargando Perfil...</div>;
    }

    return (
        <>
            <div className={`notification ${notification.type} ${notification.message ? 'show' : ''}`}>
                {notification.message}
            </div>

            {/* 5. Renderizado del Modal de Opciones de Imagen */}
            {showImageOptions && (
                <div className="image-options-modal-overlay" onClick={() => setShowImageOptions(false)}>
                    <div className="image-options-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Cambiar Foto de Perfil</h3>
                        <button className="modal-button" onClick={handleTakePhoto}>📸 Tomar Foto</button>
                        <button className="modal-button" onClick={handleSelectFromGallery}>🖼️ Elegir de la Galería</button>
                        <button className="modal-button cancel" onClick={() => setShowImageOptions(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            <div className="profile-container">
                {error && !profileData.username ? (
                    <div className="profile-box">
                        <div className="error-message">Error: {error}</div>
                        <button className="save-button" onClick={fetchProfileData}>
                            🔄 Reintentar
                        </button>
                    </div>
                ) : (
                    <div className="profile-box">
                        <h2>Perfil del Héroe</h2>
                        {error && <div className="error-message">{error}</div>}
                        <div className="profile-main-content">
                            <div className="profile-image-container">
                                <img
                                    src={profileImage || defaultAvatar}
                                    alt="Perfil del jugador"
                                    className="profile-image"
                                    onError={(e) => { e.target.src = defaultAvatar; }}
                                />
                                {/* 6. El botón ahora abre el modal en lugar de activar el input directamente */}
                                <div className="image-upload-button" onClick={handleProfileImageClick} title="Cambiar imagen">
                                    📷
                                </div>
                                
                                {/* 7. Inputs de archivo ocultos */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />
                                <input
                                    ref={cameraInputRef}
                                    type="file"
                                    accept="image/*"
                                    capture="user" // Pide usar la cámara frontal
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />
                            </div>

                            <div className="profile-details">
                            {/* ... (el resto del JSX no cambia) ... */}
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
                                        <h3>{profileData.username || (user && user.username) || "Héroe Anónimo"}</h3>
                                        <button className="edit-button" onClick={handleEdit} title="Editar perfil">✏️</button>
                                    </div>
                                    <div className="description">
                                        <p>{profileData.descripcion}</p>
                                    </div>
                                    {profileData.email && <div className="email-info">📧 {profileData.email}</div>}
                                    <div className="stats">
                                        <div className="stat">
                                            <span className="stat-label">Nivel</span>
                                            <span className="stat-value">5</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-label">Victorias</span>
                                            <span className="stat-value">12</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-label">Insignias</span>
                                            <span className="stat-value">Dragones del Alba</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Player;