# KioscoAgroTalentoBack 🌐🚀

![Versión](https://img.shields.io/badge/Versión-1.0-brightgreen)
**Desarrollado con [Express.js](https://expressjs.com/) y [Prisma](https://www.prisma.io/)**

## Descripción

**KioscoAgroTalentoBack** es el backend del proyecto Kiosco Agrosavia, una plataforma diseñada para gestionar contenido multimedia y documentos en eventos educativos y profesionales. Este backend proporciona una API robusta para manejar datos de manera eficiente, utilizando Express.js como framework y Prisma como ORM, con una base de datos SQLite.


## Características

- **API RESTful:** Proporciona endpoints para gestionar videos, imágenes, archivos PDF y otros contenidos multimedia.
- **Gestión de contenidos:** Permite agregar, editar y eliminar contenidos desde una interfaz de administración.
- **Base de datos ligera:** Utiliza SQLite para un almacenamiento de datos eficiente y sencillo.
- **ORM moderno:** Implementado con Prisma para facilitar la interacción con la base de datos.
- **Framework robusto:** Construido con Express.js para una gestión eficiente de rutas y middleware.


## Instalación y Uso

### Requisitos previos

- **Node.js:** 22 o superior
- **npm:** Versión 10 o superior.

### Pasos para la instalación

1. **Clonar el repositorio:**
   ```bash
   git clone repourl
   ```
2. Navegar al directorio del proyecto:
   ```bash
   cd KioscoAgroTalentoBack
   ```
3. Instalar las dependencias:
   ```bash
   npm install
   ```
4. Iniciar el servidor:
   ```bash
   npm start
   ```

### Comandos útiles
1. Ejecutar seed.js, este BORRARÁ los multimedia types adicionales que fueron creados (no se recomienda crear más) y creará lo estrictamente necesarios. Hará lo mismo con los themes, los tags y archivos multimedia para testeo.
   ```bash
   npx prisma db seed
   ```




   
