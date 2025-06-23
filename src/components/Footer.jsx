import React from 'react';

const footerSections = [
  {
    title: 'Enlaces Útiles',
    links: [
      { text: 'Soporte', url: '/soporte' },
      { text: 'Guía del Juego', url: '/guia' },
    ],
  },
  {
    title: 'Legal',
    links: [
      {
        text: 'Términos de Servicio',
        url: '/Terminos y Condiciones de Gods Of Eternia.pdf',
        isPdf: true,
      },
      {
        text: 'Política de Privacidad',
        url: '/Política de Privacidad de Gods of Eternia.pdf',
        isPdf: true,
      },
    ],
  },
  // Puedes añadir aquí una sección para los iconos cuando los tengas
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // La clase del bloque principal se mantiene
    <footer className="footer">
      {/* CAMBIO: Se aplica la clase BEM para el contenedor */}
      <div className="footer__container">
        {footerSections.map((section) => (
          // CAMBIO: Este div ahora es una "columna" y necesita su propia clase
          <div className="footer__column" key={section.title}>
            {/* CAMBIO: Se aplica la clase BEM para el título */}
            <h4 className="footer__title">{section.title}</h4>
            {/* CAMBIO: La lista <ul> también tiene una clase más específica */}
            <ul className="footer__links-list">
              {section.links.map((link) => (
                <li key={link.text}>
                  {/* CAMBIO: El enlace <a> ahora es un elemento BEM */}
                  <a
                    className="footer__link"
                    href={link.url}
                    {...(link.isPdf || link.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(link.isPdf ? { download: true } : {})}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      {/* CAMBIO: Se aplica la clase BEM para mantener la consistencia */}
      <div className="footer__copyright">
        <p>&copy; {currentYear} Gods Of Eternia. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;