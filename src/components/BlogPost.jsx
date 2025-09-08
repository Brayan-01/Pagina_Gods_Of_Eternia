/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Comment from './Comment';
import ConfirmationModal from '../pages/Blog/Confirmation/ConfirmationModal';
import { io } from 'socket.io-client';

const BlogPost = ({ post, currentUser, token, onDeletePost, onEditClick, showNotification }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [socket, setSocket] = useState(null);
    const [likeCount, setLikeCount] = useState(post.likes || 0);
    const [userHasLiked, setUserHasLiked] = useState(post.currentUserLiked || false);
    const [isLiking, setIsLiking] = useState(false);
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => {}
    });

    const API_URL = import.meta.env.VITE_API_URL;
    const isPostOwner = currentUser && currentUser.id === post.autor_id;
    const isUserVerified = currentUser?.verificado === true;

    useEffect(() => {
        const newSocket = io(API_URL);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            newSocket.emit('join_room', { room: `publicacion_${post.id}` });
        });

        const handleCommentEvent = (data, type) => {
            if (data.publicacion_id === post.id) {
                setComments(prevComments => {
                    let updated = [...prevComments];
                    if (type === 'added') {
                        if (!updated.some(c => c.id === data.comment.id)) {
                            updated.push(data.comment);
                        }
                    } else if (type === 'updated') {
                        updated = updated.map(c =>
                            c.id === data.comment.id ? { ...c, texto: data.comment.texto, edited_at: data.comment.edited_at } : c
                        );
                    } else if (type === 'deleted') {
                        updated = updated.filter(c => c.id !== data.id);
                    }
                    return updated.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                });
            }
        };

        newSocket.on('comment_added', data => handleCommentEvent(data, 'added'));
        newSocket.on('comment_updated', data => handleCommentEvent(data, 'updated'));
        newSocket.on('comment_deleted', data => handleCommentEvent(data, 'deleted'));

        newSocket.on('like_update', data => {
            if (data.publicacion_id === post.id) {
                setLikeCount(data.likes);
                if (typeof data.user_has_liked !== 'undefined') {
                    setUserHasLiked(data.user_has_liked);
                }
                setIsLiking(false);
            }
        });

        return () => {
            newSocket.emit('leave_room', { room: `publicacion_${post.id}` });
            newSocket.disconnect();
        };
    }, [API_URL, post.id, currentUser?.id]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`${API_URL}/blog/publicaciones/${post.id}/comentarios`, {
                    headers: { 'Authorization': `Bearer ${token}`  }
                });
                if (!response.ok) throw new Error('Error al cargar comentarios.');
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error("Error al cargar comentarios:", error);
            }
        };
        fetchComments();
    }, [post.id, API_URL, token]);

    const apiRequest = async (endpoint, method, body, successMessage, errorMessage) => {
        if (!currentUser || !isUserVerified) {
            showNotification("Necesitas iniciar sesión y verificar tu cuenta para realizar esta acción.", "error");
            return;
        }
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: body ? JSON.stringify(body) : null
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || errorMessage);
            if (successMessage) showNotification(successMessage, "success");
            return data;
        } catch (error) {
            console.error(error.message);
            showNotification(error.message, "error");
            throw error;
        }
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            showNotification("El comentario no puede estar vacío.", "error");
            return;
        }
        apiRequest(
            '/blog/comentar-publicacion', 'POST',
            { publicacion_id: post.id, comentario: newComment },
            "Comentario añadido!",
            "Error al añadir comentario."
        ).then(() => setNewComment('')).catch(() => {});
    };

    const handleEditComment = (commentId, updatedText) => {
        apiRequest(`/blog/editar-comentario/${commentId}`, 'PUT', { texto: updatedText }, "Comentario actualizado!", "Error al editar.");
    };

    const handleDeleteComment = (commentId) => {
        setModalState({
            isOpen: true,
            title: "Eliminar Comentario",
            message: "¿Estás seguro? Esta acción es irreversible.",
            onConfirm: () => {
                apiRequest(`/blog/eliminar-comentario/${commentId}`, 'DELETE', null, "Comentario eliminado.", "Error al eliminar.");
            }
        });
    };

    const handleDeletePost = () => {
        setModalState({
            isOpen: true,
            title: "Eliminar Crónica",
            message: "Se eliminará la crónica y todos sus comentarios. ¿Estás seguro?",
            onConfirm: () => {
                onDeletePost(post.id);
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
        const endpoint = `/blog/publicaciones/${post.id}/${userHasLiked ? 'unlike' : 'like'}`;
        apiRequest(endpoint, method, {}, null, "Error en la acción 'me gusta'.")
            .catch(() => setIsLiking(false));
    };

    const defaultImagePlaceholder = "https://placehold.co/800x450/3c2f21/F0F0F0?text=Estandarte";

    return (
        <>
            <ConfirmationModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                onConfirm={() => {
                    if (typeof modalState.onConfirm === "function") {
                        modalState.onConfirm();
                    }
                    setModalState({ ...modalState, isOpen: false });
                }}
                title={modalState.title}
                message={modalState.message}
            />

            <article className="bg-gradient-to-b from-[rgba(10,5,2,0.7)] to-[rgba(20,10,5,0.75)] border border-[#4a3c2a] rounded-lg p-6 sm:p-8 md:p-12 w-full max-w-4xl my-5 flex flex-col relative shadow-[inset_0_0_20px_rgba(0,0,0,0.6),0_0_0_4px_#b8860b,0_10px_40px_rgba(0,0,0,0.7)]">
                <header className="text-center mb-8 pb-6 relative border-b border-yellow-700/50 after:content-['⚜'] after:text-2xl after:text-yellow-600 after:absolute after:-bottom-4 after:left-1/2 after:-translate-x-1/2 after:bg-gray-800 after:px-2">
                    <h1 className="font-['Cinzel',_serif] text-3xl md:text-5xl text-yellow-50 text-shadow-[0_0_15px_rgba(255,190,80,0.5),0_2px_2px_rgba(0,0,0,0.8)] mb-5 leading-tight font-bold">{post.titulo}</h1>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-['Cormorant_Garamond',_serif] text-yellow-100/70 text-base md:text-lg italic">
                        <span className="flex items-center">
                            Por {post.autor_username} {post.autor_verificado && <span className="ml-2 text-green-400 text-sm" title="Cuenta Verificada">✔</span>}
                        </span>
                        <span>
                            el {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        {post.categoria_nombre && (
                            <span className="bg-black/30 px-3 py-1 rounded-full border border-yellow-800/60 text-yellow-100">{post.categoria_nombre}</span>
                        )}
                    </div>
                </header>

                {post.imageUrl && (
                    <div className="w-full max-h-[500px] mb-8 rounded-md overflow-hidden border-4 border-[#3a2d1d] shadow-[inset_0_0_10px_rgba(0,0,0,0.7),0_4px_10px_rgba(0,0,0,0.5)]">
                        <img src={post.imageUrl} alt={post.titulo} className="w-full h-full object-cover block filter sepia-20 contrast-110" onError={(e) => { e.target.onerror = null; e.target.src = defaultImagePlaceholder; }}/>
                    </div>
                )}

                <div className="text-gray-200 text-base md:text-lg leading-loose whitespace-pre-wrap break-words hyphens-auto prose prose-invert max-w-none first-letter:font-['Cinzel',_serif] first-letter:text-5xl first-letter:text-yellow-500 first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:text-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">
                    <p dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                <div className="flex justify-between items-center flex-wrap gap-4 py-5 mt-5 border-t-2 border-yellow-800/50">
                    <div className="flex items-center flex-wrap gap-3">
                        <button
                            onClick={handleLike}
                            className={`inline-flex items-center gap-2 bg-black/30 border-2 border-[#c4a484] px-3 py-2 sm:px-4 rounded-full cursor-pointer font-['Cinzel',_serif] font-bold text-sm text-[#c4a484] transition-all duration-300 ease-in-out whitespace-nowrap hover:enabled:text-yellow-400 hover:enabled:border-yellow-400 hover:enabled:-translate-y-0.5 ${userHasLiked ? 'bg-yellow-400 text-stone-800 border-yellow-400 shadow-lg shadow-yellow-500/30' : ''}`}
                            disabled={isLiking || !currentUser || !isUserVerified}
                            title={userHasLiked ? "Quitar 'me gusta'" : "Me gusta"}
                        >
                            <span className={`transition-transform duration-300 ${userHasLiked ? 'scale-125 text-red-500 animate-ping-once' : ''}`}>{userHasLiked ? '❤' : '🤍'}</span>
                            <span>{likeCount}</span>
                        </button>
                        <div className="flex items-center gap-2 text-sm font-bold text-[#c4a484] whitespace-nowrap" title="Número de comentarios">
                            <span className="text-lg">💬</span>
                            <span>{comments.length}</span>
                        </div>
                    </div>
                    {isPostOwner && (
                        <div className="flex items-center flex-wrap gap-3">
                            <button onClick={() => onEditClick(post.id)} className="inline-flex items-center gap-2 bg-transparent border-2 border-[#c4a484] px-3 py-1.5 rounded-md cursor-pointer transition-all duration-300 font-['Cinzel',_serif] text-sm font-semibold text-[#c4a484] whitespace-nowrap hover:enabled:scale-105 hover:enabled:bg-white/5 hover:enabled:text-sky-400 hover:enabled:border-sky-400" title="Editar crónica">
                                <span>✏️</span><span>Editar</span>
                            </button>
                            <button onClick={handleDeletePost} className="inline-flex items-center gap-2 bg-transparent border-2 border-[#c4a484] px-3 py-1.5 rounded-md cursor-pointer transition-all duration-300 font-['Cinzel',_serif] text-sm font-semibold text-[#c4a484] whitespace-nowrap hover:enabled:scale-105 hover:enabled:bg-white/5 hover:enabled:text-red-500 hover:enabled:border-red-500" title="Eliminar crónica">
                                <span>🗑️</span><span>Eliminar</span>
                            </button>
                        </div>
                    )}
                </div>

                <section className="border-t-2 border-yellow-800/30 pt-6 mt-6">
                    <h3 className="text-yellow-500 font-['Cinzel',_serif] text-xl md:text-2xl mb-6">Comentarios</h3>
                    <div className="mb-6">
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
                            <p className="text-white/70 italic text-center p-5 bg-black/20 rounded-lg border border-dashed border-yellow-800/30 text-sm">Sé el primero en comentar esta crónica.</p>
                        )}
                    </div>

                    {currentUser && isUserVerified ? (
                        <form onSubmit={handleAddComment} className="mt-6 p-4 sm:p-5 rounded-lg bg-black/20 border border-yellow-800/60 flex flex-col gap-4">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Añade tu verso a esta crónica..."
                                rows="2"
                                className="flex-grow p-3 border-2 border-[#c4a484] rounded-lg bg-black/30 text-white text-sm sm:text-base font-['MedievalSharp',_cursive] resize-vertical min-h-[60px] transition-all duration-300 shadow-inner focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                                maxLength={500}
                            />
                            <div className="flex justify-between items-center w-full flex-wrap gap-2">
                                <span className="text-xs text-white/60 font-['Cinzel',_serif]">{newComment.length}/500</span>
                                <button type="submit" className="bg-yellow-400 text-stone-800 border-2 border-yellow-400 px-5 py-2 sm:px-6 rounded-lg cursor-pointer transition-all duration-300 font-['Cinzel',_serif] font-bold uppercase text-xs sm:text-sm shadow-lg hover:enabled:bg-[#593d1b] hover:enabled:text-yellow-400 hover:enabled:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!newComment.trim()}>Enviar</button>
                            </div>
                        </form>
                    ) : (
                        <p className="text-yellow-400 italic mt-4 text-sm text-center p-3 bg-yellow-500/10 rounded-md border border-yellow-500/30">
                            {!currentUser ? "Inicia sesión para poder comentar." : "Necesitas verificar tu correo para poder comentar."}
                        </p>
                    )}
                </section>
            </article>
        </>
    );
};

export default BlogPost;