// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // <-- 1. Importa el hook
import './Construction.css';

const NotFound = () => {
  const { t } = useTranslation(); // <-- 2. Inicializa el hook

  return (
    <div className="medieval-404-container">
      <div className="medieval-404-content">
        <h1 className="medieval-404-title">🏗️</h1>
        <h2 className="medieval-404-subtitle">{t('notFound.subtitle')}</h2>
        <p className="medieval-404-message">
          {t('notFound.message')}
        </p>
        <Link to="/" className="medieval-404-button">
          {t('notFound.button')}
        </Link>
        <div className="medieval-404-image">
          <div className="medieval-404-icon">⚒️</div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;