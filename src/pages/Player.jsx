import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Player.css";
// Asegúrate de que la ruta a tu imagen sea correcta desde este archivo
import knightAvatar from '../assets/knight.png';

const Player = () => {
  // Efecto para cambiar el título de la página
  useEffect(() => {
    document.title = 'Jugador | Gods of Eternia';
  }, []);

  const navigate = useNavigate();
  // --- DEFINICIÓN DE TODOS LOS ESTADOS ---
  const [loading, setLoading] = useState(true); // Para la carga inicial
  const [editing, setEditing] = useState(false); // Para el modo de edición del perfil
  const [profileImage, setProfileImage] = useState(null); // Almacena la URL de la imagen de perfil
  const [profileData, setProfileData] = useState({ // Guarda los datos del perfil
    username: "",
    email: "",
    description: "",
    puntajes: [],
  });
  const [editedData, setEditedData] = useState({ // Guarda los datos mientras se editan
    username: "",
    description: "",
  });
  const [error, setError] = useState(null); // Para mensajes de error persistentes
  // Estado para las notificaciones temporales (ahora es un objeto)
  const [notification, setNotification] = useState({ message: '', type: '' });

  // --- VARIABLES ---
  const defaultAvatar = knightAvatar; // Usamos la imagen importada

  // --- LÓGICA DE LA APLICACIÓN (FUNCIONES) ---

  // Efecto que se encarga de ocultar las notificaciones después de 3 segundos
  useEffect(() => {
    // Solo aplica el temporizador si el mensaje no es de 'loading'
    if (notification.message && notification.type !== 'loading') {
      const timer = setTimeout(() => {
        setNotification({ message: '', type: '' }); // Limpia la notificación
      }, 3000);

      // Limpia el temporizador si el componente se desmonta para evitar errores
      return () => clearTimeout(timer);
    }
  }, [notification]); // Se ejecuta cada vez que el estado 'notification' cambia

  // Función para obtener los datos del perfil desde el backend
  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/perfil`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setProfileData({
          username: data.username,
          email: data.email,
          description: data.descripcion,
          puntajes: data.puntajes,
        });
        setEditedData({
          username: data.username,
          description: data.descripcion,
        });

        // Si el usuario tiene foto de perfil en la DB, la usamos. Si no, usamos la de por defecto.
        setProfileImage(data.foto_perfil || defaultAvatar);

      } else {
        setError(data.error || "Error al cargar el perfil.");
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("userToken");
          navigate("/login");
        }
      }
    } catch (err) {
      console.error("Error al conectar con el servidor:", err);
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  // Efecto que llama a fetchProfileData solo una vez, cuando el componente se monta
  useEffect(() => {
    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Función para manejar la subida de la imagen
  const handleImageUpload = async (file) => {
    const userToken = localStorage.getItem("userToken");
    if (!file || !userToken) return;

    // 1. Muestra una notificación de "Subiendo..." al instante
    setNotification({ message: 'Subiendo imagen...', type: 'loading' });

    const formData = new FormData();
    formData.append('profile_picture', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/perfil/foto`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${userToken}` },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setProfileImage(result.foto_perfil_url);
        // 2. Cambia la notificación a "Éxito" cuando la subida termina
        setNotification({ message: result.message || '¡Imagen actualizada!', type: 'success' });
      } else {
        setError(result.error || 'Error al subir la imagen.');
        // 3. Cambia la notificación a "Error" si algo falla
        setNotification({ message: 'Error al subir la imagen.', type: 'error' });
        fetchProfileData(); // Restaura la imagen original
      }
    } catch (err) {
      console.error("Error al subir la imagen:", err);
      setError('No se pudo conectar con el servidor para subir la imagen.');
      setNotification({ message: 'Error de conexión.', type: 'error' });
    }
  };

  // Función que se activa cuando el usuario selecciona un archivo
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validaciones del archivo
      if (file.size > 5 * 1024 * 1024) {
        setError("La imagen no puede ser mayor a 5MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError("Por favor selecciona un archivo de imagen válido.");
        return;
      }

      // Muestra una vista previa local de la imagen seleccionada
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);

      // Inicia la subida al backend
      handleImageUpload(file);
      setError(null);
    }
  };

  // Función para activar el modo de edición
  const handleEdit = () => setEditing(true);

  // Función para cancelar la edición
  const handleCancel = () => {
    setEditing(false);
    setEditedData({
      username: profileData.username,
      description: profileData.description,
    });
    setError(null);
  };

  // Función para guardar los cambios del perfil (nombre y descripción)
  const handleSave = async () => {
    setLoading(true);
    setError(null);
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/perfil`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          descripcion: editedData.description,
          username: editedData.username,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        await fetchProfileData(); // Recarga los datos para asegurar consistencia
        setEditing(false);
        setNotification({ message: 'Perfil actualizado correctamente.', type: 'success' });
      } else {
        setError(result.error || "Error al actualizar el perfil.");
      }
    } catch (err) {
      console.error("Error al guardar:", err);
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  // --- RENDERIZADO DEL COMPONENTE (LO QUE SE VE EN PANTALLA) ---

  // Muestra una pantalla de carga la primera vez
  if (loading && !profileImage) {
    return (
      <div className="profile-container">
        <div className="loading-screen">Cargando Perfil...</div>
      </div>
    );
  }

  // El return principal usa un Fragment <> para poder tener elementos hermanos
  return (
    <>
      {/* Componente de Notificación */}
      <div className={`notification ${notification.type} ${notification.message ? 'show' : ''}`}>
        {notification.message}
      </div>

      {/* Contenedor Principal del Perfil */}
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

            <div className="profile-image-container">
              <div className="profile-image">
                <img
                  src={profileImage || defaultAvatar}
                  alt="Perfil del jugador"
                  onError={(e) => { e.target.src = defaultAvatar; }}
                />
              </div>
              <div className="image-controls">
                <label className="image-upload-button" htmlFor="profileImageInput" title="Cambiar imagen">
                  📷
                </label>
              </div>
              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                onClick={(e) => (e.target.value = null)}
              />
              <p> </p>
              <p> </p>
            </div>
            <br /> 
            {editing ? (
              // --- VISTA DE EDICIÓN ---
              <div className="profile-edit">
                <div className="input-group">
                  <label htmlFor="usernameEdit">Nombre de héroe:</label>
                  <input
                    id="usernameEdit"
                    type="text"
                    name="username"
                    value={editedData.username}
                    onChange={handleChange}
                    maxLength={20}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="descriptionEdit">Descripción:</label>
                  <textarea
                    id="descriptionEdit"
                    name="description"
                    value={editedData.description}
                    onChange={handleChange}
                    maxLength={200}
                    rows={4}
                    placeholder="Describe tu historia como héroe..."
                  />
                  <div className="char-counter">
                    {editedData.description?.length || 0}/200
                  </div>
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
              // --- VISTA DE INFORMACIÓN ---
              <div className="profile-info">
                <div className="username-section">
                  <h3>{profileData.username || "Héroe Anónimo"}</h3>
                  <button className="edit-button" onClick={handleEdit} title="Editar perfil">
                    ✏️
                  </button>
                </div>
                <div className="description">
                  <p>{profileData.description || "Un valiente héroe cuya historia está por escribirse..."}</p>
                </div>
                {profileData.email && (
                  <div className="email-info">📧 Correo: {profileData.email}</div>
                )}
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
                {profileData.puntajes && profileData.puntajes.length > 0 && (
                  <div className="stat-section">
                    <h4>🏆 Puntajes por Dificultad</h4>
                    {profileData.puntajes.map((p, index) => (
                      <div className="stat" key={index}>
                        <span className="stat-label">Dificultad {p.dificultad}:</span>
                        <span className="stat-value">{p.puntaje}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Player;