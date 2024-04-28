# GossipHub
El objetivo del proyecto es crear una aplicación web que integra tanto el desarrollo backend como el frontend, cumpliendo con rigurosos estándares de seguridad y funcionalidad. Este proyecto se enfoca en la creación de un sistema donde los usuarios pueden completar un formulario de inicio de sesión y el usuario con role admin, tiene la capacidad de gestionar estos usuarios. A continuación, se detallan los principales aspectos y requisitos del proyecto:

##Funciones principales.

###Login:
-Validación exhaustiva de los campos del formulario en el lado del cliente y del servidor, asegurando que se cumplan los criterios de formato, longitud y tipo de datos.
-Protección contra ataques de XSS y SQL Injection mediante la aplicación de filtros y escapes de caracteres especiales en los datos ingresados por el usuario.
-Uso de ReCaptcha de Google para prevenir el envío automatizado de formularios por bots.
-Inclusión de campos ocultos en el formulario para evitar envíos no deseados y garantizar la integridad de los datos.

###Gestión de Usuarios:
-Implementación de un sistema de autenticación basado en roles, con dos tipos de usuarios: Administrador (Admin) y Usuario (User).
-Creación de una ruta de administrador que requiere autenticación para acceder al panel de control, donde el administrador puede realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los registros de usuarios en la base de datos.
-Aplicación de JWT (JSON Web Tokens) para la autenticación de usuarios, garantizando la seguridad de las transacciones y la gestión de sesiones.

###Seguridad y Protección de Datos:
-Utilización de middleware para proteger las rutas contra posibles ataques de fuerza bruta, limitando el número de peticiones aceptadas por IP.
-Validación rigurosa de los datos de usuario, incluyendo la aplicación de hashing en las contraseñas para garantizar su cifrado seguro.
-Validación y sanitización de los datos ingresados por el usuario para prevenir vulnerabilidades de XSS y bot attacks.

##Instalación:

###Back-end: 
1. Acceder a la carpeta 'backend'
 **(cd backend)**
2. Iniciar la aplicación
**nodemon**

###Fron-end: 
1. Acceder a la carpeta 'front'
 **(cd front)**
2. Iniciar la aplicación
**npm start**

##Tecnologías Utilizadas:

###Back-end:
-**Express.js**: Framework de Node.js para construir aplicaciones web y APIs.
-**MongoDB**: Base de datos NoSQL utilizada para almacenar los datos del proyecto.
-**Mongoose**: Librería de modelado de objetos MongoDB para Node.js, que proporciona una solución simple basada en esquemas para modelar los datos de la aplicación.
-**bcryptjs**: Librería para cifrar contraseñas.
-**CORS**: Middleware para Express.js que habilita el control de acceso HTTP.
-**dotenv**: Módulo que carga variables de entorno desde un archivo .env en el proceso process.env.
-**jsonwebtoken**: Implementación de JSON Web Tokens (JWT) para autenticación basada en tokens.
-**express-rate-limit**: Middleware para Express.js que limita el número de solicitudes recibidas por un usuario en un período de tiempo determinado.

###Front-end: 
-**React**: Biblioteca de JavaScript para construir interfaces de usuario.
-**React DOM**: Paquete que proporciona métodos específicos para manipular el DOM en aplicaciones React.
-**React Router DOM**: Enrutador para React que permite la navegación declarativa y basada en componentes.
-**Axios**: Cliente HTTP basado en promesas para el navegador y Node.js.
-**jwt-decode**: Librería para decodificar tokens JWT en el navegador.
-**dompurify**: Biblioteca para limpiar HTML utilizando un enfoque seguro para evitar ataques XSS.
-**xss**: Módulo para evitar ataques XSS en aplicaciones web.