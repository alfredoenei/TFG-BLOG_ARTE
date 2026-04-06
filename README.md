# EON30 — Blog de Arte

Un proyecto full-stack desarrollado como Trabajo de Fin de Grado. Es una plataforma web donde los usuarios pueden explorar obras de arte a lo largo de la historia, leer y escribir entradas en un blog colectivo, y gestionar un carrito de compra de obras.

---

## ¿Qué puedes hacer en la app?

- **Explorar arte** por épocas: arte rupestre, clásico, vanguardias y arte contemporáneo
- **Tienda** de obras, con filtros por artista, año, tipo y disponibilidad
- **Blog comunitario**: leer las publicaciones de otros usuarios y crear las tuyas propias
- **Sistema de usuarios**: registro, login y recuperación de contraseña
- **Panel de usuario** en el navbar con accesos rápidos y cierre de sesión
- **Carrito de compra** para obras de la tienda
- **Favoritos** vinculados a tu cuenta

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | Angular 21 (standalone components) |
| Estilos | Bootstrap 5 + CSS personalizado |
| Backend | Node.js + Express 5 |
| Base de datos | MongoDB Atlas (Mongoose 9) |
| Autenticación | JWT (jsonwebtoken) + bcrypt |
| HTTP (frontend) | Axios |

---

## Estructura del repositorio

```
TFG/
├── Back_proyecto/          # API REST en Node.js
│   ├── models/             # Esquemas de Mongoose (Artista, Obra, Blog, User)
│   ├── routes/             # Rutas de la API
│   ├── Services/           # Lógica de negocio (auth, blog...)
│   ├── middleware/         # Autenticación JWT e isAdmin
│   ├── seed/               # Script para poblar la base de datos
│   ├── public/             # Imágenes estáticas servidas por Express
│   └── index.js            # Punto de entrada del servidor
│
└── Front_Proyecto/         # Aplicación Angular
    ├── src/app/            # Componentes, rutas y servicios de la app
    └── services/           # Servicios de conexión con la API
```

---

## Cómo ejecutarlo en tu propio equipo

### Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — necesitas una cuenta gratuita y un cluster activo
- [Angular CLI](https://angular.io/cli) instalado globalmente (`npm install -g @angular/cli`)

---

### 1. Clonar el repositorio

```bash
git clone https://github.com/alfredoenei/TFG-BLOG_ARTE.git
cd TFG-BLOG_ARTE
```

### 2. Configurar el Backend

```bash
cd Back_proyecto
npm install
```

Crea un archivo `.env` en la raíz de `Back_proyecto/` con el siguiente contenido:

```env
PORT=3000
MONGO_URI=mongodb+srv://<tu_usuario>:<tu_contraseña>@<tu_cluster>.mongodb.net/<nombre_db>?retryWrites=true&w=majority
JWT_SECRET=una_clave_secreta_larga_y_segura
```

> ⚠️ Sustituye los valores entre `< >` con los de tu propio cluster de MongoDB Atlas.
> El archivo `.env` nunca se sube a GitHub por motivos de seguridad, así que hay que crearlo manualmente.

**Opcional pero recomendado:** poblar la base de datos con obras y artistas de ejemplo:

```bash
npm run seed
```

Luego arranca el servidor:

```bash
npm run dev
```

Si todo va bien verás en la terminal:
```
🔥 Conectado a MongoDB
🚀 Servidor corriendo en el puerto 3000
```

### 3. Configurar el Frontend

Abre una segunda terminal:

```bash
cd Front_Proyecto
npm install
npm run dev
```

La aplicación estará disponible en **http://localhost:4200**.

---

## Rutas principales de la API

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/auth/register` | Registro de usuario |
| `POST` | `/api/auth/login` | Inicio de sesión |
| `POST` | `/api/auth/get-email` | Solicitar código de recuperación |
| `POST` | `/api/auth/code-check` | Verificar código |
| `POST` | `/api/auth/reset-password` | Restablecer contraseña |
| `GET` | `/api/obras` | Listar obras (con filtros y paginación) |
| `GET` | `/api/obras/:id` | Detalle de una obra |
| `GET` | `/api/auth/blog` | Listar entradas del blog |
| `POST` | `/api/auth/blog` | Crear entrada (requiere auth) |
| `GET` | `/api/me/favorites` | Ver favoritos del usuario |
| `POST` | `/api/me/favorites/:obraId` | Añadir favorito |
| `DELETE` | `/api/me/favorites/:obraId` | Eliminar favorito |

---

## Notas adicionales

- Las imágenes de las obras se sirven de forma estática desde `Back_proyecto/public/`.
- El usuario administrador no se puede crear desde el formulario de registro. Hay que asignarlo directamente en MongoDB cambiando el campo `role` de `"user"` a `"admin"`.
- Si tu proveedor de internet bloquea conexiones SRV de MongoDB (`mongodb+srv://...`), puedes usar el formato clásico de conexión con los hostnames explícitos del cluster.

---

## Autor

Alfredo Enei — Trabajo de Fin de Grado  
[GitHub](https://github.com/alfredoenei)
