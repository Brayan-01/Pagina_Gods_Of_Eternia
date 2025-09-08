import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlogPost from '../../components/BlogPost';
import CreatePost from '../../components/CreatePost';
import { useAuth } from '../../context/AuthContext';
import { io } from 'socket.io-client';

const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, token } = useAuth();
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [isCreating, setIsCreating] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    // edición
    const [postToEdit, setPostToEdit] = useState(null);

    // categorías
    const [categories, setCategories] = useState([]);
    const [selectedFilterCategory, setSelectedFilterCategory] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    const buildApiUrl = useCallback((path) => {
        let baseUrl = API_URL.replace(/\/+$/, '');
        let cleanedPath = path.replace(/^\/+/g, '');
        return `${baseUrl}/${cleanedPath}`;
    }, [API_URL]);

    useEffect(() => {
        document.title = 'Crónicas de Eternia | Blog';
    }, []);

    useEffect(() => {
        if (!notification.message) return;
        const timerId = setTimeout(() => {
            setNotification({ message: '', type: '' });
        }, 3000);
        return () => clearTimeout(timerId);
    }, [notification]);

    const showNotification = useCallback((message, type) => {
        setNotification({ message, type });
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            const url = buildApiUrl('/blog/categorias');
            const response = await fetch(url);
            if (!response.ok) throw new Error("No se pudieron cargar las categorías.");
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }, [buildApiUrl, showNotification]);

    const fetchPosts = useCallback(async (categoryId = null) => {
        setLoading(true);
        try {
            let url = buildApiUrl('/blog/publicaciones');
            if (categoryId) url = `${url}?categoria_id=${categoryId}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("No se pudieron cargar las crónicas.");
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            showNotification(error.message, 'error');
        } finally {
            setLoading(false);
        }
    }, [buildApiUrl, showNotification]);

    useEffect(() => {
        fetchPosts();
        fetchCategories();

        const socket = io(API_URL);

        socket.on('connect', () => {
            console.log('Conectado a Socket.IO');
        });

        socket.on('disconnect', () => {
            console.log('Desconectado de Socket.IO');
        });

        // 🔥 batch updates
        socket.on('batched_publication_updates', (updatedPostsList) => {
            setPosts(prevPosts => {
                const updatedPostsMap = new Map(prevPosts.map(post => [post.id, post]));
                updatedPostsList.forEach(updatedPost => {
                    updatedPostsMap.set(updatedPost.id, updatedPost);
                });
                return Array.from(updatedPostsMap.values()).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            });
            showNotification('Se han actualizado algunas crónicas.', 'info');
        });

        // 🔥 instant update
        socket.on('publication_updated_instant', (updatedPost) => {
            setPosts(prevPosts => {
                const updatedPostsMap = new Map(prevPosts.map(post => [post.id, post]));
                updatedPostsMap.set(updatedPost.id, updatedPost);
                return Array.from(updatedPostsMap.values()).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            });
            showNotification('Una crónica ha sido editada.', 'info');
        });

        socket.on('publication_deleted', (data) => {
            setPosts(prevPosts => prevPosts.filter(post => post.id !== data.id));
            showNotification('Una crónica ha sido eliminada.', 'info');
            if (selectedPostId === data.id) {
                setSelectedPostId(null);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [fetchPosts, fetchCategories, API_URL, showNotification, selectedPostId]);

    const handlePostCreated = useCallback(async () => {
        fetchPosts(selectedFilterCategory);
        setIsCreating(false);
    }, [fetchPosts, selectedFilterCategory]);

    const handleEditClick = (postId) => {
        const post = posts.find(p => p.id === postId);
        setPostToEdit(post);
    };

    const handleCancelEdit = () => {
        setPostToEdit(null);
    };

    const handlePostUpdated = async () => {
        setPostToEdit(null);
    };

    const handleDeletePost = async (postId) => {
        if (!token) {
            showNotification("Debes iniciar sesión.", "error");
            return;
        }
        try {
            const urlDelete = buildApiUrl(`/blog/eliminar-publicacion/${postId}`);
            const response = await fetch(urlDelete, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Error al borrar publicación");
            showNotification('La crónica ha sido borrada.', 'success');
        } catch (error) {
            showNotification(error.message, 'error');
        }
    };

    const handleViewMore = (postId) => {
        setSelectedPostId(postId);
    };

    const handleBackToList = () => {
        setSelectedPostId(null);
    };

    const handleCategoryFilterChange = (categoryId) => {
        setSelectedFilterCategory(categoryId);
        fetchPosts(categoryId);
    };

    const truncateText = (text, maxLength = 150) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    const notificationClasses = {
        base: 'fixed top-5 left-1/2 -translate-x-1/2 p-3 px-6 rounded-lg shadow-lg opacity-0 invisible transition-all duration-300 z-[9999] font-["Cinzel",_serif] text-sm text-white max-w-[90vw] text-center',
        show: 'top-10 opacity-100 visible',
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-blue-600'
    };

    const mainButtonClasses = "text-sm sm:text-base py-3 px-6 font-['Cinzel',_serif] font-bold text-white bg-[#593d1b] border-2 border-yellow-400 rounded-lg cursor-pointer transition-all duration-300 shadow-lg whitespace-nowrap text-center hover:enabled:bg-yellow-400 hover:enabled:text-[#2b1d0f] hover:enabled:scale-105 hover:enabled:shadow-yellow-500/50 disabled:opacity-60 disabled:cursor-not-allowed";

    if (loading) {
        return <div className="text-[#9b7e20] text-2xl font-bold uppercase tracking-wider flex justify-center items-center h-screen">Cargando crónicas de Eternia...</div>;
    }

    const selectedPost = selectedPostId ? posts.find(post => post.id === selectedPostId) : null;

    return (
        <React.Fragment>
            <div className={`${notificationClasses.base} ${notification.message ? notificationClasses.show : ''} ${notificationClasses[notification.type] || ''}`}>
                {notification.message}
            </div>

            <div className="flex flex-col items-center gap-10 min-h-screen w-full p-5 pt-24">
                <div className="flex justify-between items-center w-full max-w-4xl text-white pb-5 border-b-2 border-[#c4a484] flex-wrap gap-5">
                    <h1 className="font-['Cinzel',_serif] text-2xl sm:text-4xl text-shadow-[2px_2px_8px_rgba(0,0,0,0.7)] text-center flex-1 min-w-[200px]">Crónicas de Eternia</h1>
                    {user && !isCreating && !selectedPostId && (
                        <button className={mainButtonClasses} onClick={() => setIsCreating(true)}>
                            + Forjar Nueva Crónica
                        </button>
                    )}
                    {selectedPostId && (
                        <button className={mainButtonClasses} onClick={handleBackToList}>
                            ← Volver a Crónicas
                        </button>
                    )}
                </div>

                {!selectedPostId && (
                    <div className="flex flex-wrap justify-center gap-3 w-full max-w-5xl bg-[linear-gradient(rgba(0,0,0,0.3),_rgba(0,0,0,0.1)),url('https://www.transparenttextures.com/patterns/old-map.png')] p-4 border-y-2 border-[#c4a484] shadow-inner mb-8 rounded-md">
                        <button
                            className={`px-4 py-2 rounded-md font-['Cinzel',_serif] text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-300 whitespace-nowrap flex-shrink-0 text-shadow-[1px_1px_2px_rgba(0,0,0,0.7)] shadow-md ${selectedFilterCategory === null ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-[#2b1d0f] border-yellow-400 font-bold shadow-inner-lg scale-105' : 'bg-gradient-to-br from-[#6a4f29] to-[#4a2f10] text-gray-200 border border-[#c4a484] hover:bg-gradient-to-br hover:from-yellow-400 hover:to-yellow-500 hover:text-[#2b1d0f] hover:-translate-y-1 hover:shadow-lg'}`}
                            onClick={() => handleCategoryFilterChange(null)}
                        >
                            Todas las Crónicas
                        </button>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`px-4 py-2 rounded-md font-['Cinzel',_serif] text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-300 whitespace-nowrap flex-shrink-0 text-shadow-[1px_1px_2px_rgba(0,0,0,0.7)] shadow-md ${selectedFilterCategory === category.id ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-[#2b1d0f] border-yellow-400 font-bold shadow-inner-lg scale-105' : 'bg-gradient-to-br from-[#6a4f29] to-[#4a2f10] text-gray-200 border border-[#c4a484] hover:bg-gradient-to-br hover:from-yellow-400 hover:to-yellow-500 hover:text-[#2b1d0f] hover:-translate-y-1 hover:shadow-lg'}`}
                                onClick={() => handleCategoryFilterChange(category.id)}
                            >
                                {category.nombre}
                            </button>
                        ))}
                    </div>
                )}

                {selectedPost ? (
                    <BlogPost
                        key={selectedPost.id}
                        post={selectedPost}
                        currentUser={user}
                        token={token}
                        onDeletePost={handleDeletePost}
                        onEditClick={handleEditClick}
                        showNotification={showNotification}
                        onBackToList={handleBackToList}
                    />
                ) : (
                    <>
                        {posts.length > 0 ? (
                            <div className="grid gap-6 md:gap-8 grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] py-6 max-w-7xl w-full">
                                {posts.map((post, index) => (
                                    <motion.article
                                        key={post.id}
                                        className="bg-gradient-to-br from-[rgba(180,146,75,0.95)] to-[rgba(74,48,28,0.98)] backdrop-blur-md rounded-2xl border-2 border-transparent relative overflow-hidden flex flex-col transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] focus-within:outline-2 focus-within:outline-yellow-400"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        {post.imageUrl && (
                                            <div className="h-52 sm:h-60 w-full overflow-hidden relative rounded-t-xl">
                                                <img
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                            </div>
                                        )}
                                        <div className="p-5 sm:p-6 flex flex-col flex-grow gap-4">
                                            {post.categoria_nombre && (
                                                <span className="bg-yellow-500/90 backdrop-blur-sm text-stone-900 px-4 py-1.5 rounded-full text-xs font-bold font-['Cinzel',_serif] uppercase self-start shadow-md">
                                                    {post.categoria_nombre}
                                                </span>
                                            )}
                                            <h3 className="font-['Cormorant_Garamond',_serif] text-yellow-50 text-xl sm:text-2xl font-bold text-shadow-[0_1px_3px_rgba(0,0,0,0.5)] leading-tight flex-grow break-words hyphens-auto">{post.title}</h3>
                                            {post.content && (
                                                <p className="text-gray-300 text-sm leading-relaxed">
                                                    {truncateText(post.content)}
                                                </p>
                                            )}
                                            <button
                                                className="bg-gradient-to-r from-[#6b4423] to-[#8b5a3c] text-slate-50 px-5 py-3 rounded-lg text-sm font-['Cinzel',_serif] font-medium cursor-pointer relative overflow-hidden flex items-center justify-center gap-2 mt-auto self-start transition-all duration-300 ease-in-out uppercase tracking-wider shadow-md hover:shadow-lg hover:from-yellow-500 hover:to-amber-400 hover:text-stone-900 hover:shadow-yellow-400/50 hover:-translate-y-0.5 before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-yellow-300/40 before:to-transparent before:transition-all before:duration-500 hover:before:left-full"
                                                onClick={() => handleViewMore(post.id)}
                                            >
                                                <span className="transition-transform duration-300 group-hover:translate-x-1">⚔️</span> Leer Crónica
                                            </button>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-400 italic bg-black/20 rounded-lg p-8 border-dashed border border-gray-600">
                                <p>🏰 Aún no se han escrito crónicas. ¡Sé el primero en forjar una leyenda! ⚔️</p>
                            </div>
                        )}
                        <AnimatePresence>
                            {isCreating && (
                                <motion.div
                                    className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-5"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsCreating(false)}
                                >
                                    <motion.div
                                        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                                        initial={{ y: -50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -50, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <CreatePost
                                            onPostCreated={handlePostCreated}
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

                {/* Modal de edición */}
                <AnimatePresence>
                    {postToEdit && (
                        <motion.div
                            className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCancelEdit}
                        >
                            <motion.div
                                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <CreatePost
                                    postToEdit={postToEdit}
                                    onCancelEdit={handleCancelEdit}
                                    onPostCreated={handlePostUpdated}
                                    showNotification={showNotification}
                                    currentUser={user}
                                    categories={categories}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </React.Fragment>
    );
};

export default BlogPage;