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

    const actionButtonBase = "inline-flex items-center justify-center gap-2 bg-transparent border-2 px-2 py-1 rounded-md cursor-pointer transition-all duration-300 font-['Cinzel',_serif] text-xs font-semibold leading-none whitespace-nowrap";
    const editControlsButtonBase = "py-2 px-4 rounded-full font-['Cinzel',_serif] text-sm font-bold cursor-pointer transition-all duration-300 uppercase whitespace-nowrap shadow-lg";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-black/30 rounded-lg p-4 mb-4 border-l-4 border-[#c4a484] transition-colors duration-300 ease-in-out hover:border-yellow-400"
        >
            <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img src={profilePic} alt={comment.autor_username || 'Usuario'} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#c4a484] flex-shrink-0" onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg";
                    }}/>
                    <div className="min-w-0">
                        <span className="text-yellow-400 font-bold text-sm break-words">
                            {comment.autor_username || 'Usuario Desconocido'}{" "}
                            {comment.autor_verificado && <span className="text-green-400" title="Verificado">✅</span>}
                        </span>
                        <div className="text-xs text-white/50">
                            {formatDate(comment.created_at)}{" "}
                            {comment.edited_at && comment.edited_at !== comment.created_at && (
                                <span className="italic">(editado)</span>
                            )}
                        </div>
                    </div>
                </div>
                {(canDelete || canEdit) && !isEditing && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {canEdit && (
                            <button type="button" onClick={handleEditClick} className={`${actionButtonBase} border-sky-600 text-sky-400 hover:bg-sky-500/10 hover:text-sky-300 hover:border-sky-400`} title="Editar comentario">
                                <span>✏️</span>
                            </button>
                        )}
                        {canDelete && (
                            <button type="button" onClick={() => typeof onDelete === 'function' && onDelete(comment.id)} className={`${actionButtonBase} border-red-600 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-400`} title="Eliminar comentario">
                                <span>🗑️</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap break-words">
                {isEditing ? (
                    <div className="bg-black/20 p-3 mt-2 rounded-md">
                        <textarea
                            ref={textareaRef}
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            maxLength={500}
                            className="w-full p-2 border-2 border-[#c4a484] rounded-lg bg-black/30 text-white text-sm font-['MedievalSharp',_cursive] resize-vertical min-h-[70px] transition-all duration-300 shadow-inner focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
                        />
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-white/60 font-['Cinzel',_serif]">{(editedText || '').length}/500</span>
                            <div className="flex gap-3">
                                <button type="button" onClick={handleSaveEdit} className={`${editControlsButtonBase} bg-green-600 border-2 border-green-500 text-white hover:bg-green-500`}>Guardar</button>
                                <button type="button" onClick={handleCancelEdit} className={`${editControlsButtonBase} bg-gray-600 border-2 border-gray-500 text-white hover:bg-gray-500`}>Cancelar</button>
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
