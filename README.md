# Cloud-Native Student Management API ☁️

Una API RESTful robusta y escalable diseñada para la gestión de alumnos y profesores, desplegada completamente en la infraestructura de **AWS**.

Este proyecto demuestra la integración de múltiples servicios en la nube para crear una arquitectura distribuida, segura y persistente, pasando de una implementación monolítica local a una solución nativa en la nube.

## 🏗️ Arquitectura y Tecnologías

El siguiente diagrama ilustra el flujo de datos y la interacción entre los servicios de AWS:

<img width="1312" height="846" alt="image" src="https://github.com/user-attachments/assets/706bab1f-44ac-445e-a964-ce78b29065b3" />

El sistema corre sobre un entorno **Node.js** y orquesta los siguientes servicios de AWS:

| Servicio AWS | Uso en el Proyecto |
|--------------|--------------------|
| **EC2** (Compute) | Servidor Linux (Amazon Linux 2) alojando la API con **Node.js** y **Express**. |
| **RDS** (Database) | Base de datos relacional **MySQL** para la persistencia de datos principales (Alumnos/Profesores). Gestión mediante **Sequelize ORM**. |
| **S3** (Storage) | Almacenamiento de objetos para la subida y gestión de fotos de perfil de usuarios. |
| **DynamoDB** (NoSQL) | Base de datos NoSQL de alta velocidad para la gestión de sesiones de usuario y tokens de autenticación. |
| **SNS** (Messaging) | Sistema de notificaciones Pub/Sub para el envío de reportes de calificaciones por correo electrónico. |

**Otras herramientas:**
* **PM2:** Para la administración de procesos y disponibilidad 24/7 en producción.
* **Git & GitHub:** Control de versiones.
* **Dotenv:** Gestión de seguridad y variables de entorno.

## ✨ Funcionalidades Principales

### 1. Gestión de Entidades (CRUD)
* Creación, lectura, actualización y eliminación de Alumnos y Profesores.
* Validaciones estrictas de tipos de datos y campos obligatorios.
* Manejo correcto de códigos de estado HTTP (200, 201, 400, 404, 405).

### 2. Gestión Multimedia (Cloud Storage)
* Capacidad para subir imágenes de perfil asociadas a un alumno.
* Las imágenes se procesan con `Multer` y se almacenan directamente en un bucket de **S3**, devolviendo una URL pública de acceso.

### 3. Sistema de Notificaciones
* Endpoint dedicado para enviar reportes de calificaciones.
* Integración con **AWS SNS** para despachar correos electrónicos en tiempo real a los suscriptores del tópico.

### 4. Autenticación y Sesiones (NoSQL)
* Sistema de Login seguro.
* Las sesiones activas se almacenan en **DynamoDB** para baja latencia.
* Endpoints para `Login`, `Verify` (verificar estado de sesión) y `Logout` (invalidación de sesión).

## 🛠️ Instalación y Despliegue Local

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/BryanChCh/api-rest-alumnos-profesores.git](https://github.com/BryanChCh/api-rest-alumnos-profesores.git)
    cd api-rest-alumnos-profesores
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crear un archivo `.env` en la raíz con las siguientes credenciales (requiere cuenta de AWS):
    ```env
    AWS_ACCESS_KEY_ID=tu_access_key
    AWS_SECRET_ACCESS_KEY=tu_secret_key
    AWS_SESSION_TOKEN=tu_session_token
    ```

4.  **Ejecutar el servidor:**
    ```bash
    # Modo desarrollo
    nodemon index.js
    
    # Modo producción (recomendado)
    node index.js
    ```

## 🧪 Pruebas

El proyecto incluye un archivo `test.http` compatible con la extensión *REST Client* de VS Code para probar todos los endpoints localmente o en producción.

Además, la API fue validada contra una suite de pruebas automatizadas (JUnit/Maven) garantizando el cumplimiento del 100% de los casos de uso y manejo de errores.

---
*Proyecto desarrollado como parte de la especialización en AWS Cloud Foundations.*
