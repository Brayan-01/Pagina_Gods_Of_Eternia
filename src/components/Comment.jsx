import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Comment = ({ comment, currentUser, postAuthorId, onDelete, onEdit }) => {
    // --- Verificación defensiva para la prop `comment` y `comment.texto` ---
    // Si el comentario es nulo/indefinido o su texto es undefined, no renderizamos o mostramos un placeholder.
    // Esto previene el TypeError. Puedes ajustar lo que se retorna (ej. un cargador).
    if (!comment || typeof comment.texto === 'undefined') {
        console.warn("Comentario o texto de comentario es undefined en Comment.jsx, no se renderizará.");
        return null; 
    }

    const [isEditing, setIsEditing] = useState(false);
    // --- Asegurarse de que editedText siempre sea un string ---
    const [editedText, setEditedText] = useState(comment.texto || ''); 
    const textareaRef = useRef(null);

    const isCommentOwner = currentUser && currentUser.id === comment.autor_id;
    const isPostOwner = currentUser && currentUser.id === postAuthorId;
    
    const canDelete = isCommentOwner || isPostOwner;
    const canEdit = isCommentOwner;

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.select();
        }
    }, [isEditing]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        if (editedText.trim() === '') {
            console.error("El comentario no puede estar vacío.");
            return;
        }
        onEdit(comment.id, editedText); // Llama a la prop onEdit del padre
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // --- Restablecer a comment.texto con verificación defensiva ---
        setEditedText(comment.texto || ''); 
    };

    // --- FUNCIÓN CORREGIDA (se mantiene tal cual, ya estaba bien para fechas) ---
    const formatDate = (dateString) => {
        if (!dateString) return "Fecha desconocida";

        // Aseguramos que la fecha se interprete como UTC añadiendo 'Z' si no está presente.
        // Esto soluciona el problema de la diferencia horaria.
        const utcDateString = dateString.endsWith('Z') ? dateString : `${dateString}Z`;
        const date = new Date(utcDateString);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        
        // Usamos toLocaleString para convertir la fecha UTC a la zona horaria local del navegador.
        // 'es-ES' o 'undefined' funcionan bien.
        return date.toLocaleString('es-ES', options);
    };

    // La lógica de profilePic ya es defensiva, se mantiene.
    const profilePic = comment.autor_foto_perfil_url || "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="comment-card"
        >
            <div className="comment-header">
                <div className="comment-author-info">
                    {/* Añadir verificación defensiva para alt de imagen y nombre de usuario */}
                    <img src={profilePic} alt={comment.autor_username || 'Usuario'} className="comment-author-avatar" onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg";
                    }}/>
                    <div className="comment-author-details">
                        <span className="comment-author-name">{comment.autor_username || 'Usuario Desconocido'} {comment.autor_verificado && '✅'}</span>
                        <span className="comment-date">{formatDate(comment.created_at)}</span>
                        {comment.edited_at && comment.edited_at !== comment.created_at && (
                           <span className="comment-edited-tag">(editado)</span>
                        )}
                    </div>
                </div>
                {(canDelete || canEdit) && (
                    <div className="comment-actions">
                        {canEdit && (
                            <button onClick={handleEditClick} className="action-button edit-button" title="Editar comentario">
                                ✏️
                            </button>
                        )}
                        {canDelete && (
                            <button onClick={() => onDelete(comment.id)} className="action-button delete-button" title="Eliminar comentario">
                                🗑️
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className="comment-body">
                {isEditing ? (
                    <div className="comment-edit-form">
                        <textarea
                            ref={textareaRef}
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            maxLength={500}
                            className="comment-edit-textarea"
                        />
                        <div className="edit-controls">
                            {/* Asegurarse de que editedText siempre sea un string para .length */}
                            <span className="character-count-edit">{(editedText || '').length}/500</span>
                            <button onClick={handleSaveEdit} className="save-edit-button">Guardar</button>
                            <button onClick={handleCancelEdit} className="cancel-edit-button">Cancelar</button>
                        </div>
                    </div>
                ) : (
                    // Asegurarse de que comment.texto sea un string para mostrar
                    <p>{comment.texto || 'No hay texto.'}</p>
                )}
            </div>
        </motion.div>
    );
};

export default Comment;