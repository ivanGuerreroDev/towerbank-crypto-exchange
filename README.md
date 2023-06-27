# TowerBank RESTful API

API RESTful de los restos para el Bankathon de Towerbank


## Instalación manual

Instala las dependencias:

```bash
yarn install
```

Configura las variables de entorno:

```bash
cp .env.example .env

# abre .env y modifica las variables de entorno (si es necesario)
```

## Tabla de contenidos

- [Características](#características)
- [Comandos](#comandos)
- [Variables de entorno](#variables-de-entorno)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Documentación de la API](#documentación-de-la-api)
- [Manejo de errores](#manejo-de-errores)
- [Validación](#validación)
- [Autenticación](#autenticación)
- [Autorización](#autorización)
- [Logging](#logging)
- [Plugins personalizados de Mongoose](#plugins-personalizados-de-mongoose)
- [Linting](#linting)
- [Contribución](#contribución)

## Características

- **Base de datos NoSQL**: modelado de datos de objeto [MongoDB](https://www.mongodb.com) utilizando [Mongoose](https://mongoosejs.com)
- **Autenticación y autorización**: utilizando [passport](http://www.passportjs.org)
- **Validación**: validación de datos de solicitud utilizando [Joi](https://github.com/hapijs/joi)
- **Logging**: utilizando [winston](https://github.com/winstonjs/winston) y [morgan](https://github.com/expressjs/morgan)
- **Pruebas**: pruebas unitarias e integradas utilizando [Jest](https://jestjs.io)
- **Manejo de errores**: mecanismo centralizado para manejar errores
- **Linting**: garantiza que el código se mantenga limpio y consistente utilizando [ESLint](https://eslint.org)
- **Configuración de entorno**: utilizando [dotenv](https://github.com/motdotla/dotenv)
- **Documentación de API**: generación de documentación de API utilizando [Swagger](https://swagger.io)
- **Integración continua**: configuración de Travis CI para pruebas y cobertura
- **Docker**: soporte para contenedorización utilizando Docker
- **Paginación**: paginación de resultados de API utilizando [mongoose-paginate-v2](https://github.com/aravindnc/mongoose-paginate-v2)
- **Rate limiting**: límite de velocidad para las solicitudes API utilizando [express-rate-limit](https://github.com/nfriedly/express-rate-limit)
- **Cross-Origin Resource Sharing (CORS)**: habilita CORS utilizando [cors](https://github.com/expressjs/cors)
- **Compresión**: compresión de respuestas utilizando [compression](https://github.com/expressjs/compression)
- **Logging de solicitudes**: registro de detalles de solicitudes utilizando [morgan](https://github.com/expressjs/morgan)
- **Encabezados de seguridad**: configuración de encabezados de seguridad utilizando [helmet](https://helmetjs.github.io)
- **Seguridad**: protección contra varios ataques utilizando [hpp](https://github.com/analog-nico/hpp)
- **Transpilación**: ES6+ a ES5 utilizando [Babel](https://babeljs.io)

## Comandos

- `yarn start` - Inicia la aplicación en modo de producción.
- `yarn start:dev` - Inicia la aplicación en modo de desarrollo con reinicio automático en caso de cambios.
- `yarn test` - Ejecuta pruebas unitarias y genera informes de cobertura.
- `yarn test:watch` - Ejecuta pruebas unitarias en modo de observación continua.
- `yarn lint` - Ejecuta ESLint para verificar la calidad del código.
- `yarn lint:fix` - Ejecuta ESLint y arregla automáticamente los problemas si es posible.
- `yarn build` - Compila el código fuente en JavaScript ES5 en la carpeta `dist`.
- `yarn docs` - Genera la documentación de la API en la carpeta `docs`.
- `yarn clean` - Elimina la carpeta `dist` y los archivos generados.

## Variables de entorno

- `.env` - archivo de entorno local.
- `.env.example` - archivo de ejemplo de las variables de entorno.

## Estructura del proyecto

El proyecto tiene la siguiente estructura de carpetas:

```bash
.
├── src
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── app.js
└── tests
```

1. La carpeta `src` contiene todo el código fuente de la aplicación.
2. La carpeta `src/config` contiene la configuración de la aplicación, como la configuración de la base de datos, la configuración de autenticación, etc.
3. La carpeta `src/controllers` contiene los controladores de la aplicación que manejan las solicitudes HTTP.
4. La carpeta `src/middlewares` contiene los middlewares utilizados por las rutas y controladores de

 la aplicación.
5. La carpeta `src/models` contiene los modelos de datos de la aplicación definidos utilizando Mongoose.
6. La carpeta `src/routes` contiene las rutas de la API de la aplicación.
7. La carpeta `src/services` contiene los servicios de la aplicación que encapsulan la lógica empresarial.
8. La carpeta `src/utils` contiene utilidades y funciones de ayuda.
9. El archivo `src/app.js` es el punto de entrada principal de la aplicación.
10. La carpeta `tests` contiene las pruebas unitarias e integradas de la aplicación.

## Documentación de la API

La documentación de la API se genera automáticamente utilizando Swagger. Puedes acceder a la documentación de la API después de iniciar la aplicación en modo de desarrollo en la siguiente URL: [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Manejo de errores

La aplicación utiliza un middleware centralizado para manejar errores. Los errores se pueden lanzar desde cualquier parte de la aplicación y serán capturados y manejados por el middleware de manejo de errores. El middleware de manejo de errores devuelve una respuesta JSON con el mensaje de error correspondiente y el código de estado apropiado.

## Validación

La validación de las solicitudes HTTP se realiza utilizando Joi, una biblioteca de validación de esquemas de datos. Se definen esquemas de validación para las solicitudes de entrada y se validan antes de procesarlas. Si la validación falla, se devuelve una respuesta JSON con los errores de validación.

## Autenticación

La autenticación se realiza utilizando JWT (JSON Web Tokens). La aplicación tiene rutas de autenticación para registrarse, iniciar sesión y renovar tokens de acceso. Los tokens de acceso se deben incluir en el encabezado de autorización de las solicitudes protegidas. Los usuarios autenticados tienen acceso a rutas protegidas.

## Autorización

La autorización se puede implementar utilizando middleware personalizado. Puedes definir roles de usuario y verificar si el usuario tiene los permisos necesarios para acceder a una ruta protegida. El middleware de autorización se puede aplicar a nivel de ruta o a nivel de controlador.

## Logging

La aplicación utiliza Winston como biblioteca de registro. Los registros se guardan en archivos de registro y también se pueden enviar a la consola. Morgan se utiliza como middleware para registrar detalles de las solicitudes HTTP.

## Plugins personalizados de Mongoose

La aplicación admite plugins personalizados de Mongoose para extender la funcionalidad de los modelos. Puedes agregar métodos y funciones personalizados a tus modelos utilizando plugins.

## Linting

ESLint se utiliza para mantener un código limpio y consistente. El archivo de configuración de ESLint se proporciona con el proyecto. Puedes ejecutar el comando `yarn lint` para verificar la calidad del código. También puedes ejecutar `yarn lint:fix` para que ESLint arregle automáticamente los problemas si es posible.

## Contribución

¡Las contribuciones son bienvenidas! Si encuentras algún error o quieres mejorar la plantilla, no dudes en abrir un issue o enviar una solicitud de pull.
