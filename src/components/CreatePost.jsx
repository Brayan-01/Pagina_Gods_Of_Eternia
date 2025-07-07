/* eslint-disable no-unused-vars */
// src/components/CreatePost.jsx

import React, { useState } from 'react';

const CreatePost = ({ onPostCreated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content) {
            alert("El título y el contenido son obligatorios.");
            return;
        }

        const newPost = {
            id: Date.now(),
            author: "Héroe Actual",
            title,
            content,
            imageUrl: imagePreview,
            likes: 0,
            comments: [],
        };

        onPostCreated(newPost);

        setTitle('');
        setContent('');
        setImage(null);
        setImagePreview('');
    };

    return (
        <div className="create-post-container">
            <h2>Forja una Nueva Leyenda</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="title">Título del Manuscrito:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="El título de tu épica..."
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="content">Contenido de la Crónica:</label>
                    <textarea
                        id="content"
                        rows="8"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Narra tus hazañas aquí..."
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="imageUpload" className="image-upload-label">
                        Seleccionar un Estandarte (Imagen)
                    </label>
                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    {/* --- MENSAJE DE RECOMENDACIÓN AÑADIDO --- */}
                    <p className="image-recommendation">
                        Para mejor calidad, se recomienda una imagen de al menos 800px de ancho.
                    </p>

                    {imagePreview && (
                        <img src={imagePreview} alt="Vista previa" className="image-preview" />
                    )}
                </div>
                <div className="button-group">
                    <button type="submit" className="save-button">
                        Publicar Crónica
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;