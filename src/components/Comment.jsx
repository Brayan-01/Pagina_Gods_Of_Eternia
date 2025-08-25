import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Comment = ({ comment, currentUser, postAuthorId, onDelete, onEdit }) => {
    // --- Todos los Hooks se declaran aquí arriba, incondicionalmente ---
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment?.texto || ''); 
    const textareaRef = useRef(null);

    // ✅ CORRECCIÓN: El useEffect se mueve aquí arriba junto a los otros Hooks
    // para asegurar que se llame en cada renderizado.
    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
            const len = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(len, len);
        }
    }, [isEditing]);

    // --- El 'early return' se mantiene, pero DESPUÉS de todas las llamadas a Hooks ---
    if (!comment || typeof comment.texto !== 'string') {
        console.warn("Comentario inválido o texto de comentario no es una cadena, no se renderizará.");
        return null; 
    }

    // --- El resto de la lógica del componente continúa aquí ---
    const isCommentOwner = !!currentUser && currentUser.id === comment.autor_id;
    const isPostOwner = !!currentUser && currentUser.id === postAuthorId;
    
    const canDelete = isCommentOwner || isPostOwner;
    const canEdit = isCommentOwner;

    const handleEditClick = () => {
        setEditedText(comment.texto);
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        if (typeof onEdit === 'function' && editedText.trim() !== '') {
            onEdit(comment.id, editedText.trim());
        } else if (editedText.trim() === '') {
            console.error("El comentario no puede estar vacío.");
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedText(comment.texto || ''); 
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Fecha desconocida";
        try {
            const utcDateString = dateString.endsWith('Z') ? dateString : `${dateString}Z`;
            const date = new Date(utcDateString);
            if (isNaN(date.getTime())) return "Fecha inválida";
            return date.toLocaleString('es-ES', {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit',
            });
        } catch (error) {
            console.error("Error al formatear la fecha:", error);
            return "Fecha desconocida";
        }
    };

    const profilePic = comment.autor_foto_perfil_url || "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="comment"
        >
            <div className="comment-header">
                <div className="comment-author-info">
                    <img src={profilePic} alt={comment.autor_username || 'Usuario'} className="comment-author-avatar" onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg";
                    }}/>
                    <div>
                        <span className="comment-author">
                            {comment.autor_username || 'Usuario Desconocido'}{" "}
                            {comment.autor_verificado && <span className="verified-badge" title="Verificado">✅</span>}
                        </span>
                        <div className="comment-date">
                            {formatDate(comment.created_at)}{" "}
                            {comment.edited_at && comment.edited_at !== comment.created_at && (
                                <span className="comment-edited-tag">(editado)</span>
                            )}
                        </div>
                    </div>
                </div>
                {(canDelete || canEdit) && !isEditing && (
                    <div className="comment-controls">
                        {canEdit && (
                            <button type="button" onClick={handleEditClick} className="action-button edit" title="Editar comentario">
                                <span>✏️</span>
                            </button>
                        )}
                        {canDelete && (
                            <button type="button" onClick={() => typeof onDelete === 'function' && onDelete(comment.id)} className="action-button delete" title="Eliminar comentario">
                                <span>🗑️</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className="comment-content">
                {isEditing ? (
                    <div className="add-comment-form" style={{ padding: '15px', marginTop: '10px' }}>
                        <textarea
                            ref={textareaRef}
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            maxLength={500}
                            className="comment-textarea"
                        />
                        <div className="comment-input-controls">
                            <span className="character-count">{(editedText || '').length}/500</span>
                            <div className="edit-button-group">
                                <button type="button" onClick={handleSaveEdit} className="action-button save">Guardar</button>
                                <button type="button" onClick={handleCancelEdit} className="action-button cancel-edit">Cancelar</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>{comment.texto || 'No hay texto.'}</p>
                )}
            </div>
        </motion.div>
    );
};

export default Comment;
