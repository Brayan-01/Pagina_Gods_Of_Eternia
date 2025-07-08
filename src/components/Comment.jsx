import React from 'react';

const Comment = ({ comment, currentUser, onDelete, onEdit }) => {
    const isOwner = currentUser && currentUser === comment.author;

    return (
        <div className="comment">
            <div className="comment-meta">
                <span className="comment-author">{comment.author}</span>
                {isOwner && (
                    <div className="comment-controls">
                        <button onClick={() => onEdit(comment.id, prompt('Editar comentario:', comment.text))}>
                            ✏️ Editar
                        </button>
                        <button onClick={() => onDelete(comment.id)}>
                            🗑️ Borrar
                        </button>
                    </div>
                )}
            </div>
            <p className="comment-content">{comment.text}</p>
        </div>
    );
};

export default Comment;