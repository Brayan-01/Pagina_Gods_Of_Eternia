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

    const inputGroupClasses = "mb-6";
    const labelClasses = "block text-yellow-400 text-sm sm:text-base font-['Cinzel',_serif] font-semibold mb-2";
    const inputBaseClasses = "w-full p-3 border-2 border-[#c4a484] rounded-lg bg-black/30 text-gray-200 text-sm font-['MedievalSharp',_cursive] transition-colors duration-300 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 disabled:opacity-50";
    const charCountClasses = "text-right text-xs text-gray-400 mt-1";
    const buttonBaseClasses = "px-5 py-2.5 rounded-lg font-['Cinzel',_serif] text-sm font-bold cursor-pointer transition-all duration-300 uppercase whitespace-nowrap disabled:opacity-50";


    return (
        <div className="bg-gradient-to-br from-[rgba(155,126,32,0.9)] to-[rgba(119,75,31,0.9)] p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-4xl border-2 border-[#c4a484]">
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl mt-0 mb-6 text-shadow-[2px_2px_6px_rgba(0,0,0,0.6)] font-['Cinzel',_serif] text-center border-b-2 border-yellow-700/50 pb-4">{isEditing ? 'Editar Crónica' : 'Forjar Nueva Crónica'}</h2>
            <form onSubmit={handleSubmit}>
                <div className={inputGroupClasses}>
                    <label htmlFor="title" className={labelClasses}>Título de la Crónica:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Un título épico para tu aventura..."
                        maxLength={100}
                        required
                        disabled={isSubmitting}
                        className={inputBaseClasses}
                    />
                    <div className={charCountClasses}>{title.length}/100</div>
                </div>

                <div className={inputGroupClasses}>
                    <label htmlFor="content" className={labelClasses}>Contenido de la Crónica:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Detalla tu gesta, tus descubrimientos o tus reflexiones..."
                        rows="8"
                        maxLength={2000}
                        required
                        disabled={isSubmitting}
                        className={`${inputBaseClasses} min-h-[120px] resize-vertical`}
                    ></textarea>
                    <div className={charCountClasses}>{content.length}/2000</div>
                </div>

                <div className={inputGroupClasses}>
                    <label htmlFor="category" className={labelClasses}>Categoría:</label>
                    <select
                        id="category"
                        value={selectedCategoryId}
                        onChange={(e) => setSelectedCategoryId(e.target.value)}
                        required
                        disabled={isSubmitting}
                        className={`${inputBaseClasses} appearance-none bg-no-repeat bg-right_1rem_center bg-[length:1em] bg-[url("data:image/svg+xml,%3csvg_xmlns='http://www.w3.org/2000/svg'_viewBox='0_0_16_16'%3e%3cpath_fill='none'_stroke='%23c4a484'_stroke-linecap='round'_stroke-linejoin='round'_stroke-width='2'_d='M2_5l6_6_6-6'/%3e%3c/svg%3e")] invalid:text-gray-400`}
                    >
                        <option value="" disabled>Selecciona una categoría...</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id} className="bg-[#2b1d0f] text-gray-200">
                                {category.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={inputGroupClasses}>
                    <label htmlFor="imageUpload" className="inline-block bg-[#593d1b] text-white px-5 py-2.5 rounded-lg cursor-pointer border-2 border-yellow-400 transition-all duration-300 font-['Cinzel',_serif] font-semibold text-sm hover:bg-yellow-400 hover:text-[#2b1d0f] disabled:opacity-50">
                        {imagePreview ? 'Cambiar Estandarte' : 'Seleccionar Estandarte'}
                    </label>
                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isSubmitting}
                        ref={fileInputRef}
                        className="hidden"
                    />
                    <p className="text-gray-400 text-xs mt-2">
                        Recomendado: imagen de 800px de ancho.
                    </p>
                    {imagePreview && (
                        <div className="mt-4 text-center">
                            <img src={imagePreview} alt="Vista previa" className="max-w-xs h-auto mt-4 rounded-lg border-2 border-[#c4a484] mx-auto" onError={(e) => { e.target.onerror = null; e.target.src = defaultImagePlaceholder; }} />
                            <button type="button" onClick={handleClearImage} className="bg-red-600 text-white px-3 py-1.5 rounded-md cursor-pointer mt-4 text-xs transition-colors duration-300 hover:bg-red-700 disabled:opacity-50" disabled={isSubmitting}>
                                Borrar Imagen
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-4 mt-8 pt-6 border-t-2 border-yellow-800/50 flex-wrap">
                    <button type="button" className={`${buttonBaseClasses} bg-transparent text-gray-200 border-2 border-[#c4a484] hover:enabled:bg-white/10 hover:enabled:border-gray-200`} onClick={handleCancel} disabled={isSubmitting}>
                        Cancelar
                    </button>
                    <button type="submit" className={`${buttonBaseClasses} bg-yellow-400 text-[#2b1d0f] border-2 border-yellow-400 hover:enabled:bg-[#593d1b] hover:enabled:text-yellow-400`} disabled={isSubmitting}>
                        {isSubmitting ? (isEditing ? 'Guardando...' : 'Publicando...') : (isEditing ? 'Guardar Cambios' : 'Publicar Crónica')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;