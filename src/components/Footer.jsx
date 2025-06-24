import React, { useState } from 'react';

const footerSections = [
    {
      title: 'Enlaces Útiles',
      links: [
        { text: 'Soporte', action: 'openSupport' },
        { text: 'Guía del Juego', url: '/guia' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Términos de Servicio', url: '/Terminos y Condiciones de Gods Of Eternia.pdf', isPdf: true, },
        { text: 'Política de Privacidad', url: '/Política de Privacidad de Gods of Eternia.pdf', isPdf: true, },
      ],
    },
];

function Footer() {
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    motivo: ''
  });


  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  const handleLinkClick = (link, e) => {
    e.preventDefault(); 
    if (link.action === 'openSupport') {
      setIsModalOpen(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría tu lógica para enviar los datos a un servidor
    console.log('Datos del formulario:', formData);

    // 1. Mostramos el mensaje de éxito
    setShowSuccessMessage(true);

    setTimeout(() => {
      setIsModalOpen(false); // Cierra el modal
      setShowSuccessMessage(false); 
      setFormData({ nombre: '', correo: '', motivo: '' });
    }, 4000); 
  };

  // ===== FUNCIÓN closeModal MODIFICADA =====
  const closeModal = () => {
    setIsModalOpen(false);
    // Nos aseguramos de resetear el mensaje de éxito si el usuario cierra manualmente
    setShowSuccessMessage(false); 
    setFormData({ nombre: '', correo: '', motivo: '' });
  };

  return (
    <div>
      {/* El código del footer se mantiene igual */}
      <footer className="footer">
        {/* ... tu código del footer no cambia ... */}
        <div className="footer__container">
          {footerSections.map((section) => (
            <div className="footer__column" key={section.title}>
              <h4 className="footer__title">{section.title}</h4>
              <ul className="footer__links-list">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <a className="footer__link" href={link.url || '#'} onClick={link.action ? (e) => handleLinkClick(link, e) : undefined} {...(link.isPdf || link.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...(link.isPdf ? { download: true } : {})}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__copyright">
          <p>&copy; {currentYear} Gods Of Eternia. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Modal de Soporte */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            { showSuccessMessage ? (
              // Si showSuccessMessage es true, muestra este mensaje:
              <div className="support-success">
                <span className="success-icon">&#10004;</span>
                <h3>¡Mensaje Enviado!</h3>
                <p>Gracias por contactarnos, <strong>{formData.nombre}</strong>. Te responderemos pronto.</p>
              </div>
            ) : (
              // Si no, muestra el formulario como antes:
              <>
                <div className="modal-header">
                  <h2 className="modal-title">Contactar Soporte</h2>
                  <button className="modal-close" onClick={closeModal}>×</button>
                </div>
                <div className="support-form">
                  <div className="form-group">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" id="nombre" name="nombre" className="form-input" value={formData.nombre} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                    <input type="email" id="correo" name="correo" className="form-input" value={formData.correo} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="motivo" className="form-label">Motivo de Contacto</label>
                    <textarea id="motivo" name="motivo" className="form-textarea" rows="4" value={formData.motivo} onChange={handleInputChange} placeholder="Describe tu consulta o problema..." required></textarea>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn btn--secondary" onClick={closeModal}>Cancelar</button>
                    <button type="button" className="btn btn--primary" onClick={handleSubmit}>Enviar</button>
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