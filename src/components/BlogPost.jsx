// src/components/BlogPost.jsx

import React, { useState } from 'react';
import Comment from './Comment';

// --- 1. RECIBIR LA PROP 'showNotification' ---
const BlogPost = ({ post, currentUser, onUpdatePost, onDeletePost, showNotification }) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [comments, setComments] = useState(post.comments);
    const [newComment, setNewComment] = useState('');

    const isOwner = currentUser && currentUser === post.author;

    const handleLike = () => {
        if (!currentUser) {
            // --- 2. USAR LA NUEVA FUNCIÓN EN LUGAR DE alert() ---
            showNotification("Debes iniciar sesión para dar 'like'.", 'error');
            return;
        }
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    };

    // ... (el resto del componente no cambia)
    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newComment.trim() || !currentUser) return;
        const comment = { id: Date.now(), author: currentUser, text: newComment };
        setComments([...comments, comment]);
        onUpdatePost(post.id, { comments: [...comments, comment] });
        setNewComment('');
    };

    const handleDeleteComment = (commentId) => {
        const updatedComments = comments.filter(c => c.id !== commentId);
        setComments(updatedComments);
        onUpdatePost(post.id, { comments: updatedComments });
    };

    const handleEditComment = (commentId, newText) => {
        if (!newText) return;
        const updatedComments = comments.map(c =>
            c.id === commentId ? { ...c, text: newText } : c
        );
        setComments(updatedComments);
        onUpdatePost(post.id, { comments: updatedComments });
    };

    return (
        <article className="blog-post">
            {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="post-image" />}
            <h2>{post.title}</h2>
            <div className="post-meta">Escrito por: {post.author}</div>
            <p className="post-content">{post.content}</p>
            <div className="post-controls">
                <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
                    ❤️ {likes} {likes === 1 ? 'Like' : 'Likes'}
                </button>
                {isOwner && (
                    <div className="control-buttons">
                        <button className="control-button">✏️ Editar</button>
                        <button className="control-button delete" onClick={() => onDeletePost(post.id)}>🗑️ Borrar</button>
                    </div>
                )}
            </div>
            <div className="comments-section">
                <h3>Comentarios de los Bardos</h3>
                {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        currentUser={currentUser}
                        onDelete={handleDeleteComment}
                        onEdit={handleEditComment}
                    />
                ))}
                {currentUser && (
                    <form className="add-comment-form" onSubmit={handleAddComment}>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Añade tu verso a esta crónica..."
                            rows="2"
                        ></textarea>
                        <button type="submit">Enviar</button>
                    </form>
                )}
            </div>
        </article>
    );
};

export default BlogPost;