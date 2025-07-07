// src/pages/Blog/BlogPage.jsx

import React, { useState, useEffect } from 'react';
import BlogPost from '../../components/BlogPost';
import CreatePost from '../../components/CreatePost';
import { useAuth } from '../../context/AuthContext';
import './Blog.css';

const initialPosts = [
    {
        id: 1,
        author: 'Gael, el Cronista',
        title: 'La Caída del Dragón de Sombras',
        content: 'En las cimas heladas de las Montañas del Lamento...',
        imageUrl: 'https://picsum.photos/id/10/800/400',
        likes: 42,
        // --- COMENTARIOS AÑADIDOS ---
        comments: [
            { id: 101, author: 'Elara la Sabia', text: 'Una crónica magnífica. Estuve allí y lo narras con gran fidelidad.' },
            { id: 102, author: 'Bjorn, el Herrero', text: 'La hoja que forjé para esa batalla... ¡nunca brilló tanto!' }
        ],
    },
    {
        id: 2,
        author: 'Lira, la Vidente del Bosque',
        title: 'El Secreto de las Ruinas Susurrantes',
        content: 'Entre la maleza del Bosque Olvidado...',
        imageUrl: 'https://picsum.photos/id/142/800/400',
        likes: 27,
        // --- COMENTARIOS AÑADIDOS ---
        comments: [
            { id: 201, author: 'Héroe Actual', text: 'Interesante. ¿Alguien conoce la ubicación exacta?' },
            { id: 202, author: 'Un Viajero Anónimo', text: 'Cuidado con esos susurros, no todos son amistosos.' }
        ],
    },
];


const BlogPage = () => {
    const [posts, setPosts] = useState(initialPosts);
    const { user } = useAuth();

    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
        document.title = 'Crónicas de Eternia | Blog';
    }, []);

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const handleUpdatePost = (postId, updates) => {
        setPosts(posts.map(p => p.id === postId ? { ...p, ...updates } : p));
    };

    const handleDeletePost = (postId) => {
        if (window.confirm('¿Estás seguro de que quieres borrar esta crónica?')) {
            setPosts(posts.filter(p => p.id !== postId));
        }
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
    };


    return (
        <>
            <div className={`notification ${notification.type} ${notification.message ? 'show' : ''}`}>
                {notification.message}
            </div>

            <div className="blog-container">
                {user && <CreatePost onPostCreated={handlePostCreated} />}

                {posts.map((post) => (
                    <BlogPost
                        key={post.id}
                        post={post}
                        currentUser={user ? user.username : null}
                        onUpdatePost={handleUpdatePost}
                        onDeletePost={handleDeletePost}
                        showNotification={showNotification}
                    />
                ))}
            </div>
        </>
    );
};

export default BlogPage;    