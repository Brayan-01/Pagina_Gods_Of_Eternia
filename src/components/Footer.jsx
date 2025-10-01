import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // <-- 1. IMPORTA EL COMPONENTE LINK

function Footer() {
    const { t } = useTranslation();
    const API_URL = import.meta.env.VITE_API_URL;
    const currentYear = new Date().getFullYear();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ nombre: '', correo: '', motivo: '' });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const footerSections = useMemo(() => [
        {
            title: t('footer.useful_links_title'),
            links: [
                { text: t('footer.support_link'), action: 'openSupport' },
                // Este enlace a /guia está bien como Link
                { text: t('footer.game_guide_link'), url: '/guia' },
            ],
        },
        {
            title: t('footer.legal_title'),
            links: [
                // --- 2. AQUÍ ESTÁ EL CAMBIO ---
                // Cambiamos las URLs externas por rutas internas que no existen
                { text: t('footer.terms_of_service_link'), url: '/terminos-y-condiciones' },
                { text: t('footer.privacy_policy_link'), url: '/politica-de-privacidad' },
            ],
        },
    ], [t]); // Quitamos API_URL de las dependencias porque ya no se usa aquí

    // ... (El resto de tu código, como handleInputChange, handleSubmit, etc., se mantiene igual)
    const handleLinkClick = (link, e) => {
        if (link.url) return; // Permitir que los <Link> y <a> con url funcionen
        e.preventDefault();
        if (link.action === 'openSupport') {
            setIsModalOpen(true);
            setErrorMessage('');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        if (!formData.nombre || !formData.correo || !formData.motivo) {
            setErrorMessage(t('footer.support_modal.errors.all_fields_required'));
            return;
        }
        if (!formData.correo.includes('@') || !formData.correo.includes('.')) {
            setErrorMessage(t('footer.support_modal.errors.invalid_email'));
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/support`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (response.ok) {
                setShowSuccessMessage(true);
                setTimeout(() => closeModal(), 4000);
            } else {
                setErrorMessage(result.error || t('footer.support_modal.errors.send_failed'));
            }
        } catch {
            setErrorMessage(t('footer.support_modal.errors.connection_failed'));
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setShowSuccessMessage(false);
        setErrorMessage('');
        setFormData({ nombre: '', correo: '', motivo: '' });
    };


    return (
        <div>
            <footer className="footer">
                <div className="footer__container">
                    {footerSections.map((section) => (
                        <div className="footer__column" key={section.title}>
                            <h4 className="footer__title">{section.title}</h4>
                            <ul className="footer__links-list">
                                {section.links.map((link) => (
                                    <li key={link.text}>
                                        {/* --- 3. LÓGICA PARA USAR <Link> O <a> --- */}
                                        {link.url ? (
                                            <Link to={link.url} className="footer__link">
                                                {link.text}
                                            </Link>
                                        ) : (
                                            <a
                                                className="footer__link"
                                                href="#"
                                                onClick={(e) => handleLinkClick(link, e)}
                                            >
                                                {link.text}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="footer__copyright">
                    <p>&copy; {currentYear} Gods Of Eternia. {t('footer.copyright')}</p>
                </div>
            </footer>

            {/* El código del modal se queda exactamente igual */}
            {isModalOpen && (
                 <div className="modal-overlay" onClick={closeModal}>
                     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                         {showSuccessMessage ? (
                             <div className="support-success">
                                 <span className="success-icon">&#10004;</span>
                                 <h3>{t('footer.support_modal.success_title')}</h3>
                                 <p dangerouslySetInnerHTML={{ __html: t('footer.support_modal.success_message', { name: formData.nombre }) }} />
                             </div>
                         ) : (
                             <>
                                 <div className="modal-header">
                                     <h2 className="modal-title">{t('footer.support_modal.title')}</h2>
                                     <button className="modal-close" onClick={closeModal}>×</button>
                                 </div>
                                 <div className="support-form">
                                     {errorMessage && <p className="error-message">{errorMessage}</p>}
                                     <div className="form-group">
                                         <label htmlFor="nombre" className="form-label">{t('footer.support_modal.name_label')}</label>
                                         <input type="text" id="nombre" name="nombre" className="form-input" value={formData.nombre} onChange={handleInputChange} required />
                                     </div>
                                     <div className="form-group">
                                         <label htmlFor="correo" className="form-label">{t('footer.support_modal.email_label')}</label>
                                         <input type="email" id="correo" name="correo" className="form-input" value={formData.correo} onChange={handleInputChange} required />
                                     </div>
                                     <div className="form-group">
                                         <label htmlFor="motivo" className="form-label">{t('footer.support_modal.reason_label')}</label>
                                         <textarea id="motivo" name="motivo" className="form-textarea" rows="4" value={formData.motivo} onChange={handleInputChange} placeholder={t('footer.support_modal.reason_placeholder')} required></textarea>
                                     </div>
                                     <div className="form-actions">
                                         <button type="button" className="btn btn--secondary" onClick={closeModal}>{t('footer.support_modal.cancel_button')}</button>
                                         <button type="button" className="btn btn--primary" onClick={handleSubmit}>{t('footer.support_modal.send_button')}</button>
                                     </div>
                                 </div>
                             </>
                         )}
                     </div>
                 </div>
             )}
        </div>
    );
}

export default Footer;