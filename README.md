# 🎨 EON30 | Blog de Arte & Marketplace

[![Angular](https://img.shields.io/badge/Angular_21-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

## 🔗 Live Demo / Demostración en Vivo
- **🚀 Frontend (Netlify):** [https://tfg-blog-arte.netlify.app](https://tfg-blog-arte.netlify.app)
- **⚙️ Backend (Render):** [https://tfg-art-backend-alfredo.onrender.com](https://tfg-art-backend-alfredo.onrender.com)

[English Version Below](#english-version)

---

## 🇪🇸 Versión en Español

### 🚀 El Proyecto
**EON30** es una plataforma Full-Stack de arte concebida como Trabajo de Fin de Grado (TFG). Combina un **blog colaborativo**, un **marketplace de obras de arte** con carrito de compras funcional, y un **catálogo académico** organizado por períodos históricos (Arte hasta el s. XIX, Vanguardias, Arte Contemporáneo). Todo con autenticación de usuarios, roles y una interfaz moderna.

### ✨ Características Destacadas
- **Marketplace con Carrito Completo**: Flujo de compra en 3 pasos (carrito → checkout → confirmación) con precios reales, simulación de pago y número de pedido generado.
- **Blog Colaborativo**: Los usuarios registrados pueden crear y publicar entradas de blog sobre arte, visibles para toda la comunidad.
- **Catálogo por Períodos Históricos**: Tres secciones dedicadas con fichas bibliográficas detalladas y modales interactivos para cada obra.
- **Autenticación & Roles**: Sistema completo de registro, login, recuperación de contraseña con código de verificación, y roles (admin/usuario).
- **Buscador Inteligente**: Filtrado de obras por nombre de artista, rango de años, tipo y categoría directamente desde el navbar.
- **Imágenes Centralizadas**: Sistema de `ImagePipe` personalizado que resuelve automáticamente las URLs de las obras desde el servidor, eliminando código duplicado.
- **Dropdowns Nativos**: Menús desplegables controlados por Signals de Angular con cierre automático al hacer clic fuera.

### 🛠️ Stack Tecnológico

#### Frontend
- **Framework**: Angular 21 (standalone components, Signals, Effects)
- **Estilos**: Bootstrap 5.3 + CSS custom con tema oscuro y acentos dorados
- **Estado**: Signals nativos de Angular para reactividad sin librerías externas
- **Pipes**: `ImagePipe` personalizada para gestión centralizada de URLs de imágenes
- **Routing**: Angular Router con lazy-compatible standalone components
- **HTTP**: Axios (para autenticación) + HttpClient de Angular (para obras)

#### Backend
- **Runtime**: Node.js con Express 5
- **Base de Datos**: MongoDB Atlas con Mongoose 9 (ODM)
- **Autenticación**: JWT (JSON Web Tokens) + bcrypt para hashing de contraseñas
- **API REST**: Endpoints para obras, autenticación, blog y favoritos
- **CORS**: Configuración dinámica con whitelist de orígenes permitidos
- **Imágenes**: Servidas como archivos estáticos desde `/public/ImagenesDeObras/`

#### Despliegue
- **Frontend**: Netlify (build automático desde GitHub, SPA routing con `_redirects`)
- **Backend**: Render (Node.js, variables de entorno configuradas)
- **Base de datos**: MongoDB Atlas (cluster cloud)

### 📁 Estructura del Proyecto
```
TFG/
├── Front_Proyecto/          # Angular 21 SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── cart/        # Carrito con flujo de checkout
│   │   │   ├── store/       # Marketplace de obras
│   │   │   ├── blog/        # Blog colaborativo
│   │   │   ├── navbar/      # Navbar con dropdowns nativos
│   │   │   ├── pipes/       # ImagePipe centralizada
│   │   │   ├── services/    # ObrasService, CartService
│   │   │   └── models/      # Interfaces TypeScript
│   │   └── environments/    # Configuración dev/prod
│   └── netlify.toml         # Config de despliegue
│
└── Back_proyecto/           # API REST con Express
    ├── routes/              # Endpoints (obras, auth, blog)
    ├── models/              # Schemas de Mongoose
    ├── middleware/           # Auth + Admin guards
    ├── seed/                # Scripts de datos iniciales
    └── public/              # Imágenes estáticas de obras
```

### 📦 Instalación Rápida
1. Clona el repositorio:
   ```bash
   git clone https://github.com/alfredoenei/TFG-BLOG_ARTE.git
   ```
2. **Backend**:
   ```bash
   cd Back_proyecto
   npm install
   cp .env.example .env  # Configura MONGO_URI, JWT_SECRET, PORT
   npm run dev
   ```
3. **Frontend**:
   ```bash
   cd Front_Proyecto
   npm install
   ng serve
   ```
4. **Poblar la base de datos** (opcional):
   ```bash
   cd Back_proyecto
   npm run seed              # Inserta artistas y obras
   node seed/actualizarPrecios.js  # Asigna precios aleatorios
   ```

---

## 🇺🇸 English Version

### 🚀 The Project
**EON30** is a Full-Stack art platform built as a Final Degree Project (TFG). It combines a **collaborative blog**, an **art marketplace** with a fully functional shopping cart, and an **academic catalog** organized by historical periods (Pre-19th Century Art, Avant-Garde, Contemporary Art). Features user authentication, roles, and a modern dark-themed interface.

### ✨ Key Features
- **Full Shopping Cart**: 3-step purchase flow (cart → checkout → confirmation) with real prices, simulated payment form, and auto-generated order number.
- **Collaborative Blog**: Registered users can create and publish blog entries about art, visible to the entire community.
- **Period-Based Catalog**: Three dedicated sections with detailed bibliographic entries and interactive modals for each artwork.
- **Auth & Roles**: Complete registration, login, password recovery with verification code, and role system (admin/user).
- **Smart Search**: Filter artworks by artist name, year range, type, and category directly from the navbar.
- **Centralized Images**: Custom `ImagePipe` that automatically resolves artwork URLs from the server, eliminating duplicate code.
- **Native Dropdowns**: Signal-powered dropdown menus with automatic close-on-outside-click behavior.

### 🛠️ Tech Stack
- **Frontend**: Angular 21 (Signals, standalone components), Bootstrap 5.3, custom dark theme, ImagePipe.
- **Backend**: Node.js, Express 5, MongoDB Atlas (Mongoose 9), JWT authentication, bcrypt.
- **Deployment**: Netlify (frontend) + Render (backend) + MongoDB Atlas (database).

### 📦 Quick Setup
1. Clone the repository.
2. Set up the backend: `cd Back_proyecto && npm install`, configure `.env` (MONGO_URI, JWT_SECRET).
3. Set up the frontend: `cd Front_Proyecto && npm install`.
4. Run both: `npm run dev` (backend) and `ng serve` (frontend).

---

## 👤 Contacto / Contact
Desarrollado por **Alf**
- [LinkedIn](https://www.linkedin.com/in/alfredo-enei-61b61034b)
- [GitHub](https://github.com/alfredoenei)

> [!NOTE]
> Este proyecto fue desarrollado con un enfoque en **limpieza de código** y **escalabilidad**. Cada componente ha sido refactorizado para eliminar código duplicado, centralizar la lógica de imágenes y garantizar una arquitectura mantenible a largo plazo.

---
