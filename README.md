Gods of Eternia - Interfaz de Usuario
Este repositorio contiene el código fuente de la interfaz de usuario (frontend) para la aplicación web del juego "Gods of Eternia". La aplicación está construida con React y utiliza Vite como herramienta de construcción. Además, está configurada para ser desplegada fácilmente mediante Docker.

Características
Autenticación de Usuarios: Sistema completo de registro, inicio de sesión y verificación de cuentas.

Rutas Protegidas: Ciertas secciones de la aplicación solo son accesibles para usuarios autenticados.

Gestión de Perfil de Jugador: Una sección dedicada para que los usuarios vean y gestionen su perfil.

Internacionalización: Soporte para múltiples idiomas utilizando i18next.

Blog: Una sección de blog para publicar noticias y actualizaciones sobre el juego.

Guía del Juego: Una página con instrucciones y guías sobre cómo jugar.

Tabla de Clasificación (Leaderboard): Muestra las puntuaciones más altas de los jugadores.

Tecnologías Utilizadas
Framework: React 19

Herramienta de Construcción: Vite

Enrutador: React Router DOM

Estilos: Tailwind CSS

Cliente HTTP: Axios

Autenticación JWT: jwt-decode para decodificar tokens en el cliente.

Servidor Web para Producción: Nginx

Contenerización: Docker y Docker Compose

Prerrequisitos
Asegúrate de tener instalados los siguientes programas en tu máquina:

Node.js (versión 18 o superior)

npm (o un gestor de paquetes compatible)

Docker

Docker Compose

Instalación y Configuración Local
Sigue estos pasos para configurar el proyecto en tu entorno de desarrollo:

Clonar el repositorio

Bash

git clone <URL_DEL_REPOSITORIO>
cd Pagina_Gods_Of_Eternia-e99847a087a8af8c08fa0983de28e0b0e5b829b8
Instalar dependencias

Bash

npm install
Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto. Este archivo es ignorado por git y contendrá las variables de entorno necesarias. La más importante es la URL del backend.

Fragmento de código

VITE_API_URL=http://<direccion_ip_o_dominio_del_backend>:<puerto>
Scripts Disponibles
En el directorio del proyecto, puedes ejecutar los siguientes comandos:

npm run dev: Inicia el servidor de desarrollo de Vite. La aplicación se recargará automáticamente al guardar cambios. Por defecto, estará disponible en http://localhost:5173 o el puerto que Vite asigne.

npm run build: Compila la aplicación para producción en el directorio dist/.

npm run lint: Ejecuta ESLint para analizar el código en busca de problemas.

npm run preview: Inicia un servidor local para previsualizar la compilación de producción generada en dist/.

Despliegue con Docker
El proyecto está configurado para ser construido y desplegado fácilmente con Docker y Docker Compose.

Configurar la URL del API en docker-compose.yml:
Abre el archivo docker-compose.yml y modifica el argumento de construcción VITE_API_URL con la dirección de tu backend.

YAML

services:
  frontend:
    build:
      context: .
      args:
        - VITE_API_URL=http://100.107.10.77:5000 # ¡Ajusta esta URL!
Construir y ejecutar el contenedor:
Desde la raíz del proyecto, ejecuta el siguiente comando:

Bash

docker-compose up --build
Este comando construirá la imagen de Docker siguiendo los pasos del Dockerfile y luego iniciará el contenedor. La aplicación estará disponible en http://localhost:8080.

Funcionamiento del Dockerfile
El Dockerfile utiliza una construcción de múltiples etapas para optimizar el tamaño de la imagen final:

Etapa builder:

Usa una imagen de node:18-alpine.

Recibe la variable VITE_API_URL como argumento de construcción y la establece como una variable de entorno.

Instala las dependencias del proyecto.

Copia el código fuente y ejecuta npm run build para generar los archivos estáticos de producción.

Etapa final:

Usa una imagen ligera de nginx:1.23-alpine.

Copia los archivos estáticos generados en la etapa builder al directorio de Nginx.

Reemplaza la configuración por defecto de Nginx con nginx.conf para asegurar que el enrutamiento de React Router funcione correctamente.

Expone el puerto 80 y arranca el servidor Nginx.
