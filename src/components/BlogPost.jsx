/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Comment from './Comment'; // Asegúrate de que este componente exista
import ConfirmationModal from '../pages/Blog/Confirmation/ConfirmationModal'; // Importa el modal
import { io } from 'socket.io-client';
import '../pages/Blog/Blog.css'; // La ruta a tu archivo CSS
// Elimina la importación de useAuth si no la usas directamente aquí y la pasas por props


const BlogPost = ({ post, currentUser, token, onDeletePost, onEditClick, showNotification, onBackToList }) => {
    // --- ESTADOS DEL COMPONENTE ---
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [socket, setSocket] = useState(null);
    const [likeCount, setLikeCount] = useState(post.likes || 0);
    const [userHasLiked, setUserHasLiked] = useState(post.currentUserLiked || false);
    const [isLiking, setIsLiking] = useState(false); // Estado para evitar clicks múltiples en like/unlike
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => {}
    });

    // --- CONSTANTES Y VARIABLES ---
    const API_URL = import.meta.env.VITE_API_URL;
    const isPostOwner = currentUser && currentUser.id === post.autor_id;
    const isUserVerified = currentUser?.verificado === true; // Asegurarse de que isUserVerified sea un booleano

    // --- EFECTO: CONEXIÓN SOCKET.IO Y GESTIÓN DE EVENTOS ---
    useEffect(() => {
        // Inicializar socket solo una vez por componente (o cuando API_URL cambia)
        const newSocket = io(API_URL);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Socket.IO conectado en BlogPost.jsx');
            // CORRECCIÓN CRÍTICA: USAR BACKTICKS AQUÍ
            newSocket.emit('join_room', { room: `publicacion_${post.id}` });
        });

        newSocket.on('disconnect', () => {
            console.log('Socket.IO desconectado en BlogPost.jsx');
        });

        // Helper para manejar eventos de comentarios de forma concisa y con orden
        const handleCommentEvent = (data, type) => {
            if (data.publicacion_id === post.id) {
                setComments(prevComments => {
                    let updatedComments = [...prevComments];
                    if (type === 'added') {
                        // Evitar duplicados y añadir
                        if (!updatedComments.some(comment => comment.id === data.comment.id)) {
                            updatedComments.push(data.comment);
                        }
                    } else if (type === 'updated') {
                        // Actualizar comentario existente
                        updatedComments = updatedComments.map(c =>
                            c.id === data.comment.id ? { ...c, texto: data.comment.texto, edited_at: data.comment.edited_at } : c
                        );
                    } else if (type === 'deleted') {
                        // Eliminar comentario
                        updatedComments = updatedComments.filter(c => c.id !== data.id);
                    }
                    // Siempre reordenar por fecha de creación (o edited_at si prefieres)
                    return updatedComments.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                });
            }
        };

        newSocket.on('comment_added', (data) => handleCommentEvent(data, 'added'));
        newSocket.on('comment_updated', (data) => handleCommentEvent(data, 'updated'));
        newSocket.on('comment_deleted', (data) => handleCommentEvent(data, 'deleted'));
        
        newSocket.on('like_update', (data) => {
            console.log('Evento like_update recibido:', data);
            if (data.publicacion_id === post.id) {
                setLikeCount(data.likes);
                if (typeof data.user_has_liked !== 'undefined') {
                    setUserHasLiked(data.user_has_liked);
                }
                setIsLiking(false); // Siempre resetear isLiking al recibir la actualización del servidor
            }
        });

        return () => {
            if (newSocket) {
                // CORRECCIÓN CRÍTICA: USAR BACKTICKS AQUÍ
                newSocket.emit('leave_room', { room: `publicacion_${post.id}` });
                newSocket.disconnect();
            }
        };
    }, [API_URL, post.id, currentUser?.id]); // Mantener currentUser?.id como dependencia para el like_update

    // --- EFECTO: CARGAR DATOS INICIALES (COMENTARIOS) ---
    useEffect(() => {
        const fetchComments = async () => {
            try {
                // CORRECCIÓN CRÍTICA: USAR BACKTICKS AQUÍ
                const response = await fetch(`${API_URL}/user/publicaciones/${post.id}/comentarios`, {
                    headers: { 
                        // CORRECCIÓN CRÍTICA: USAR BACKTICKS AQUÍ
                        'Authorization': `Bearer ${token}` 
                    }
                });
                if (!response.ok) {
                    throw new Error('Error al cargar comentarios.');
                }
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error("Error al cargar comentarios:", error);
            }
        };
        fetchComments();
    }, [post.id, API_URL, token]);

    // --- MANEJADORES DE ACCIONES (API) ---
    const apiRequest = async (endpoint, method, body, successMessage, errorMessage) => {
        // Asegurarse de que el usuario esté verificado antes de cualquier acción API
        if (!currentUser || !isUserVerified) {
            showNotification("Necesitas iniciar sesión y verificar tu cuenta para realizar esta acción.", "error");
            return;
        }

        try {
            // CORRECCIÓN CRÍTICA: USAR BACKTICKS AQUÍ
            const response = await fetch(`${API_URL}${endpoint}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    // CORRECCIÓN CRÍTICA: USAR BACKTICKS AQUÍ
                    'Authorization': `Bearer ${token}` 
                },
                body: body ? JSON.stringify(body) : null
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || errorMessage);
            }
            if (successMessage) showNotification(successMessage, "success");
            return data;
        } catch (error) {
            console.error(error.message);
            showNotification(error.message, "error");
            throw error; // Re-lanzar para manejo específico si es necesario
        }
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            showNotification("El comentario no puede estar vacío.", "error");
            return;
        }
        apiRequest(
            '/user/comentar-publicacion', 'POST',
            { publicacion_id: post.id, comentario: newComment },
            "Comentario añadido!", // Mostrar mensaje de éxito si la API responde 200/201
            "Error al añadir comentario."
        ).then(() => setNewComment(''))
        .catch(() => {}); // Capturar el error para evitar uncaught promise
    };
    
    const handleEditComment = (commentId, updatedText) => {
        apiRequest(`/user/editar-comentario/${commentId}`, 'PUT', { texto: updatedText }, "Comentario actualizado!", "Error al editar.");
    };

    const handleDeleteComment = (commentId) => {
        setModalState({
            isOpen: true, title: "Eliminar Comentario", message: "¿Estás seguro? Esta acción es irreversible.",
            onConfirm: () => {
                apiRequest(`/user/eliminar-comentario/${commentId}`, 'DELETE', null, "Comentario eliminado.", "Error al eliminar.")
                    .finally(() => setModalState({ isOpen: false }));
            }
        });
    };
    
    const handleDeletePost = () => {
        setModalState({
            isOpen: true, title: "Eliminar Crónica", message: "Se eliminará la crónica y todos sus comentarios. ¿Estás seguro?",
            onConfirm: () => {
                // onDeletePost ya viene de BlogPage y es la que realiza la llamada API y emite el socket.
                onDeletePost(post.id); 
                setModalState({ isOpen: false });
            }
        });
    };

    const handleLike = () => {
        if (isLiking) return;
        if (!currentUser || !isUserVerified) {
            showNotification("Debes iniciar sesión y verificar tu correo para dar 'me gusta'.", "error");
            return;
        }
        setIsLiking(true);
        const method = userHasLiked ? 'DELETE' : 'POST';
        // CORRECCIÓN CRÍTICA: USAR BACKTICKS AQUÍ
        const endpoint = `/user/publicaciones/${post.id}/${userHasLiked ? 'unlike' : 'like'}`;
        apiRequest(endpoint, method, {}, null, "Error en la acción 'me gusta'.")
            .catch(() => setIsLiking(false)); // Si la API falla, reactivar el botón
    };

    const defaultImagePlaceholder = "https://placehold.co/800x450/3c2f21/F0F0F0?text=Estandarte";

    return (
        <>
            {modalState.isOpen && (
                <ConfirmationModal
                    title={modalState.title}
                    message={modalState.message}
                    onConfirm={modalState.onConfirm}
                    onCancel={() => setModalState({ ...modalState, isOpen: false })}
                />
            )}
            <article className="blog-post">
                <header className="post-header">
                    <h1 className="post-title">{post.titulo}</h1>
                    <div className="post-meta">
                        <span className="post-author">
                            Por {post.autor_username} {post.autor_verificado && <span className="verified-badge" title="Cuenta Verificada">✔</span>}
                        </span>
                        <span className="post-date">
                            el {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        {post.categoria_nombre && (
                            <span className="post-category">{post.categoria_nombre}</span>
                        )}
                    </div>
                </header>

                {post.imageUrl && (
                    <div className="post-image-container">
                        <img src={post.imageUrl} alt={post.titulo} className="post-image" onError={(e) => { e.target.onerror = null; e.target.src = defaultImagePlaceholder; }}/>
                    </div>
                )}

                <div className="post-content">
                    {/* PELIGRO: Usar dangerouslySetInnerHTML puede ser un riesgo de seguridad si el contenido no es confiable. */}
                    {/* Asegúrate de que `post.content` esté sanitizado en el backend. */}
                    <p dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* --- BARRA DE ACCIONES MEJORADA --- */}
                <div className="post-actions-bar">
                    <div className="user-interactions">
                        <button 
                            onClick={handleLike} 
                            // CORRECCIÓN CRÍTICA: USAR BACKTICKS AQUÍ
                            className={`like-button ${userHasLiked ? 'liked' : ''}`} 
                            disabled={isLiking || !currentUser || !isUserVerified} 
                            title={userHasLiked ? "Quitar 'me gusta'" : "Me gusta"}
                        >
                            <span className="like-icon">{userHasLiked ? '❤' : '🤍'}</span>
                            <span>{likeCount}</span>
                        </button>
                        <div className="interaction-count" title="Número de comentarios">
                            <span className="icon">💬</span>
                            <span>{comments.length}</span>
                        </div>
                    </div>
                    {isPostOwner && (
                        <div className="owner-actions">
                            <button onClick={() => onEditClick(post.id)} className="action-button edit" title="Editar crónica">
                                <span>✏</span><span>Editar</span>
                            </button>
                            <button onClick={handleDeletePost} className="action-button delete" title="Eliminar crónica">
                                <span>🗑</span><span>Eliminar</span>
                            </button>
                        </div>
                    )}
                </div>

                <section className="comments-section">
                    <h3>Comentarios</h3>
                    <div className="comments-list">
                        {comments.length > 0 ? (
                            <AnimatePresence>
                                {comments.map((comment) => (
                                    <Comment 
                                        key={comment.id} 
                                        comment={comment} 
                                        currentUser={currentUser} 
                                        postAuthorId={post.autor_id} 
                                        onDelete={handleDeleteComment} 
                                        onEdit={handleEditComment} 
                                    />
                                ))}
                            </AnimatePresence>
                        ) : (
                            <p className="no-comments">Sé el primero en comentar esta crónica.</p>
                        )}
                    </div>

                    {currentUser && isUserVerified ? (
                        <form onSubmit={handleAddComment} className="add-comment-form">
                            <textarea 
                                value={newComment} 
                                onChange={(e) => setNewComment(e.target.value)} 
                                placeholder="Añade tu verso a esta crónica..." 
                                rows="2" 
                                className="comment-textarea" 
                                maxLength={500}
                            />
                            <div className="comment-input-controls">
                                <span className="character-count">{newComment.length}/500</span>
                                <button type="submit" className="comment-submit-button" disabled={!newComment.trim()}>Enviar</button>
                            </div>
                        </form>
                    ) : (
                        <p className={!currentUser ? "login-prompt" : "verification-warning"}>
                            {!currentUser ? "Inicia sesión para poder comentar." : "Necesitas verificar tu correo para poder comentar."}
                        </p>
                    )}
                </section>
            </article>
        </>
    );
};

export default BlogPost;