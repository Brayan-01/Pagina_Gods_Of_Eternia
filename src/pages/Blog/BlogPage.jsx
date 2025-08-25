import React, { useState, useEffect, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import BlogPost from '../../components/BlogPost';
import CreatePost from '../../components/CreatePost'; // Asumo que este componente existe o lo crearé
import { useAuth } from '../../context/AuthContext';
import './Blog.css'; // Asegúrate de que esta ruta CSS sea correcta
import { io } from 'socket.io-client';

const BlogPage = () => {
    // --- ESTADOS ---
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, token } = useAuth();
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [isCreating, setIsCreating] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    // NUEVO: Estado para almacenar las categorías
    const [categories, setCategories] = useState([]);
    // NUEVO: Estado para la categoría seleccionada en el filtro (null para "Todas")
    const [selectedFilterCategory, setSelectedFilterCategory] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    // Función auxiliar para construir URLs de forma segura
    const buildApiUrl = useCallback((path) => {
        let baseUrl = API_URL.replace(/\/+$/, '');
        let cleanedPath = path.replace(/^\/+/g, '');
        return `${baseUrl}/${cleanedPath}`;
    }, [API_URL]);

    // --- EFECTOS ---
    useEffect(() => {
        document.title = 'Crónicas de Eternia | Blog';
    }, []);

    // Efecto para manejar las notificaciones
    useEffect(() => {
        if (!notification.message) return;
        const timerId = setTimeout(() => {
            setNotification({ message: '', type: '' });
        }, 3000);
        return () => clearTimeout(timerId);
    }, [notification]);

    // Lógica de datos (API)
    const showNotification = useCallback((message, type) => {
        setNotification({ message, type });
    }, []);

    // NUEVO: Función para obtener las categorías
    const fetchCategories = useCallback(async () => {
        try {
            const url = buildApiUrl('/user/categorias');
            const response = await fetch(url);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "No se pudieron cargar las categorías.");
            }
            const data = await response.json();
            setCategories(data);
            console.log("DEBUG: Categorías cargadas:", data);
        } catch (error) {
            showNotification(error.message, 'error');
            console.error("Error al cargar categorías:", error);
        }
    }, [buildApiUrl, showNotification]);

    // Función para obtener todos los posts (MODIFICADA para aceptar filtro de categoría)
    const fetchPosts = useCallback(async (categoryId = null) => {
        setLoading(true);
        try {
            let url = buildApiUrl('/user/publicaciones');
            // Si hay una categoría seleccionada, añadirla como parámetro de consulta
            if (categoryId) {
                url = `${url}?categoria_id=${categoryId}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "No se pudieron cargar las crónicas.");
            }
            const data = await response.json();
            setPosts(data);
            console.log("DEBUG: Publicaciones cargadas (filtrado por", categoryId, "):", data);
        } catch (error) {
            showNotification(error.message, 'error');
            console.error("Error al cargar publicaciones:", error);
        } finally {
            setLoading(false);
        }
    }, [buildApiUrl, showNotification]);

    // Carga inicial de posts y categorías, y configuración de Socket.IO
    useEffect(() => {
        fetchPosts(); // Carga todos los posts inicialmente
        fetchCategories(); // Carga las categorías

        const socket = io(API_URL);

        socket.on('connect', () => {
            console.log('DEBUG: Conectado al servidor de Socket.IO');
        });

        socket.on('disconnect', () => {
            console.log('DEBUG: Desconectado del servidor de Socket.IO');
        });

        socket.on('batched_publication_updates', (updatedPostsList) => {
            console.log('DEBUG: Evento batched_publication_updates recibido:', updatedPostsList);
            setPosts(prevPosts => {
                const updatedPostsMap = new Map(prevPosts.map(post => [post.id, post]));
                updatedPostsList.forEach(updatedPost => {
                    updatedPostsMap.set(updatedPost.id, updatedPost);
                });
                return Array.from(updatedPostsMap.values()).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            });
            showNotification('Se han actualizado algunas crónicas.', 'info');
        });

        socket.on('publication_deleted', (data) => {
            console.log('DEBUG: Evento publication_deleted recibido:', data);
            setPosts(prevPosts => prevPosts.filter(post => post.id !== data.id));
            showNotification('Una crónica ha sido eliminada.', 'info');
            if (selectedPostId === data.id) {
                setSelectedPostId(null);
            }
        });

        return () => {
            socket.disconnect();
            console.log('DEBUG: Socket.IO desconectado en limpieza.');
        };
    }, [fetchPosts, fetchCategories, API_URL, showNotification, selectedPostId]);

    // Manejador para la creación de posts (MODIFICADA: ya no recibe postData, solo gatilla el refresco)
    const handlePostCreated = useCallback(async () => {
        // CORRECCIÓN CLAVE: Esta función ahora solo se encarga de refrescar los posts
        // después de que CreatePost.jsx haya hecho la llamada a la API y el backend
        // haya emitido la actualización via Socket.IO.
        // La notificación de éxito y el manejo de errores ya se hacen en CreatePost.jsx
        console.log("DEBUG: handlePostCreated llamado. Refrescando publicaciones.");
        // Refrescar posts después de crear, para que el filtro de categoría funcione correctamente
        fetchPosts(selectedFilterCategory);
        setIsCreating(false); // Cierra el modal de creación
    }, [fetchPosts, selectedFilterCategory]);


    // Lógica para eliminar un post
    const handleDeletePost = async (postId) => {
        if (!token) {
            showNotification("Debes iniciar sesión para esta acción.", "error");
            return;
        }
        // CORRECCIÓN: Usar un modal personalizado en lugar de window.confirm
        // Temporalmente mantenemos window.confirm para no introducir otro componente
        const confirmDelete = window.confirm('¿Estás seguro de que quieres que esta crónica se pierda en el tiempo?');
        if (confirmDelete) {
            try {
                const urlDelete = buildApiUrl(`/user/eliminar-publicacion/${postId}`);
                const response = await fetch(urlDelete, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.error);

                showNotification('La crónica ha sido borrada.', 'success');
                // La eliminación ya se maneja por el evento 'publication_deleted' de Socket.IO
            } catch (error) {
                console.error("Error in handleDeletePost:", error);
                const errorMessage = error instanceof Error ? error.message : String(error);
                showNotification(errorMessage, 'error');
            }
        }
    };

    // Función para manejar el clic en "Ver Más"
    const handleViewMore = (postId) => {
        setSelectedPostId(postId);
    };

    // Función para volver a la lista de publicaciones
    const handleBackToList = () => {
        setSelectedPostId(null);
    };

    // NUEVO: Manejador para el cambio de categoría en la barra de navegación
    const handleCategoryFilterChange = (categoryId) => {
        setSelectedFilterCategory(categoryId);
        fetchPosts(categoryId); // Vuelve a cargar los posts con el nuevo filtro
    };


    // --- RENDERIZADO DEL COMPONENTE ---
    if (loading) {
        return <div className="loading-screen">Cargando crónicas de Eternia...</div>;
    }

    const selectedPost = selectedPostId ? posts.find(post => post.id === selectedPostId) : null;

    return (
        <React.Fragment>
            <div className={`notification ${notification.type} ${notification.message ? 'show' : ''}`}>
                {notification.message}
            </div>

            <div className="blog-container">
                <div className="blog-header">
                    <h1>Crónicas de Eternia</h1>
                    {/* Botón para crear nueva crónica */}
                    {user && !isCreating && !selectedPostId && (
                        <button className="create-new-post-button" onClick={() => setIsCreating(true)}>
                            + Forjar Nueva Crónica
                        </button>
                    )}
                    {/* Botón para volver a la lista, visible solo en la vista de detalle de un post */}
                    {selectedPostId && (
                        <button className="back-to-list-button" onClick={handleBackToList}>
                            ← Volver a Crónicas
                        </button>
                    )}
                </div>

                {/* NUEVO: Barra de navegación de categorías */}
                {!selectedPostId && ( // Solo mostrar la nav bar si no estamos viendo un post en detalle
                    <div className="category-navbar">
                        <button
                            className={`category-button ${selectedFilterCategory === null ? 'active' : ''}`}
                            onClick={() => handleCategoryFilterChange(null)}
                        >
                            Todas las Crónicas
                        </button>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`category-button ${selectedFilterCategory === category.id ? 'active' : ''}`}
                                onClick={() => handleCategoryFilterChange(category.id)}
                            >
                                {category.nombre}
                            </button>
                        ))}
                    </div>
                )}


                {/* Lógica de renderizado condicional de posts */}
            {selectedPost ? (
                selectedPostId && (
                    <BlogPost
                        key={selectedPost.id}
                        post={selectedPost}
                        currentUser={user}
                        token={token}
                        onDeletePost={handleDeletePost}
                        // La prop onEditClick no necesita argumentos aquí si solo establece el ID seleccionado
                        onEditClick={() => setSelectedPostId(selectedPost.id)}
                        showNotification={showNotification}
                        onBackToList={handleBackToList}
                    />
                )
            ) : (
                <>
                    {posts.length > 0 ? (
                        <div className="post-list-grid">
                            {posts.map((post) => (
                                <article key={post.id} className="blog-post-card">
                                    {/* Contenedor de imagen */}
                                    {post.imageUrl && (
                                        <div className="card-image-container">
                                            <img 
                                                src={post.imageUrl} 
                                                alt={post.title} 
                                                className="card-image"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                                    
                                    {/* Contenido de la tarjeta */}
                                    <div className="card-content">
                                        {/* Categoría */}
                                        {post.categoria_nombre && (
                                            <span className="card-category">
                                                {post.categoria_nombre}
                                            </span>
                                        )}
                                        
                               f         {/* Título */}
                                        <h3 className="card-title">
                                            {post.title}
                                        </h3>
                                        
                                        {/* Botón de acción */}
                                        <button 
                                            className="view-more-button" 
                                            onClick={() => handleViewMore(post.id)}
                                            aria-label={`Leer crónica: ${post.title}`}
                                        >
                                            ⚔️ Leer Crónica
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>🏰 Aún no se han escrito crónicas. ¡Sé el primero en forjar una leyenda! ⚔️</p>
                        </div>
                    )}
                    <AnimatePresence>
                        {isCreating && (
                            <motion.div
                                className="create-post-modal-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsCreating(false)}
                            >
                                <motion.div
                                    className="create-post-modal-content"
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -50, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <CreatePost
                                        onPostCreated={handlePostCreated} // Pasa la función corregida
                                        onCancelCreate={() => setIsCreating(false)}
                                        showNotification={showNotification}
                                        currentUser={user}
                                        categories={categories} 
                                    />
                                </motion.div>
                            </motion.div>
                        )}
            </AnimatePresence>
                </>
            )}
            </div>
        </React.Fragment>
    );
};

export default BlogPage;