import React, { useState, useEffect, useRef } from "react";

const CreatePost = ({ onPostCreated, postToEdit, onCancelEdit, onCancelCreate, showNotification, currentUser, categories }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const fileInputRef = useRef(null);

    const isEditing = !!postToEdit;

    useEffect(() => {
        if (isEditing && postToEdit) {
            setTitle(postToEdit.titulo || '');
            setContent(postToEdit.texto || ''); 
            setSelectedCategoryId(postToEdit.categoria_id || postToEdit.categoria?.id || '');
            setImagePreview(
                postToEdit.imagen_url || 
                (postToEdit.imagenes && postToEdit.imagenes.length > 0 ? postToEdit.imagenes[0].url : '') || ''
            );
            setImageFile(null);
        } else {
            setTitle('');
            setContent('');
            setImageFile(null);
            setImagePreview('');
            setSelectedCategoryId('');
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    }, [isEditing, postToEdit]);

    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('access_token');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImageFile(null);
            setImagePreview('');
        }
    };

    const handleClearImage = () => {
        setImageFile(null);
        setImagePreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleCancel = () => {
        if (isEditing) {
            onCancelEdit?.();
        } else {
            onCancelCreate?.();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!currentUser?.verificado) {
            showNotification("Debes verificar tu cuenta para poder publicar.", "error");
            setIsSubmitting(false);
            return;
        }

        if (!title.trim() || !content.trim() || !selectedCategoryId) {
            showNotification("Por favor, rellena todos los campos obligatorios.", "error");
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append('titulo', title);
        formData.append('texto', content);
        formData.append('categoria_id', selectedCategoryId);

        if (imageFile) {
            formData.append('imagen', imageFile); 
        }

        const method = isEditing ? 'PUT' : 'POST';
        const urlPath = isEditing ? `/blog/editar-publicacion/${postToEdit.id}` : '/blog/crear-publicacion';
        const successMessage = isEditing ? 'Crónica actualizada exitosamente!' : 'Crónica publicada exitosamente!';
        const errorMessage = isEditing ? 'Error al actualizar la crónica.' : 'Error al publicar la crónica.';

        try {
            const url = new URL(urlPath, API_URL);
            const response = await fetch(url.href, {
                method,
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || errorMessage);

            showNotification(successMessage, 'success');

            if (!isEditing) onPostCreated();

            handleCancel();
        } catch (error) {
            console.error("Error en handleSubmit:", error);
            showNotification(error.message || errorMessage, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const defaultImagePlaceholder = "https://placehold.co/800x450/3c2f21/F0F0F0?text=Estandarte";

    return (
        <div className="create-post-container">
            <h2>{isEditing ? 'Editar Crónica' : 'Forjar Nueva Crónica'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="title">Título de la Crónica:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Un título épico para tu aventura..."
                        maxLength={100}
                        required
                        disabled={isSubmitting}
                    />
                    <div className="character-count">{title.length}/100</div>
                </div>

                <div className="input-group">
                    <label htmlFor="content">Contenido de la Crónica:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Detalla tu gesta, tus descubrimientos o tus reflexiones..."
                        rows="8"
                        maxLength={2000}
                        required
                        disabled={isSubmitting}
                    ></textarea>
                    <div className="character-count">{content.length}/2000</div>
                </div>

                <div className="input-group select-wrapper">
                    <label htmlFor="category">Categoría:</label>
                    <select
                        id="category"
                        value={selectedCategoryId}
                        onChange={(e) => setSelectedCategoryId(e.target.value)}
                        required
                        disabled={isSubmitting}
                    >
                        <option value="">Selecciona una categoría...</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="imageUpload" className="image-upload-label">
                        {imagePreview ? 'Cambiar Estandarte' : 'Seleccionar Estandarte'}
                    </label>
                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isSubmitting}
                        ref={fileInputRef}
                    />
                    <p className="image-recommendation">
                        Recomendado: imagen de 800px de ancho.
                    </p>
                    {imagePreview && (
                        <div className="image-preview-container">
                            <img src={imagePreview} alt="Vista previa" className="image-preview" onError={(e) => { e.target.onerror = null; e.target.src = defaultImagePlaceholder; }} />
                            <button type="button" onClick={handleClearImage} className="clear-image-button" disabled={isSubmitting}>
                                Borrar Imagen
                            </button>
                        </div>
                    )}
                </div>

                <div className="button-group">
                    <button type="button" className="cancel-button" onClick={handleCancel} disabled={isSubmitting}>
                        Cancelar
                    </button>
                    <button type="submit" className="save-button" disabled={isSubmitting}>
                        {isSubmitting ? (isEditing ? 'Guardando...' : 'Publicando...') : (isEditing ? 'Guardar Cambios' : 'Publicar Crónica')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;