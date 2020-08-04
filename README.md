# Deliah-Restó.

La creación de la siguiente API se desarrolló en el marco del tercer proyecto de la carrera de Desarrollo Web Full Stack de Acámica.

## Herramientas utilizadas:

- Node.js
- Express.js
- mysql
- JsonWebToken
- Swagger
- GIT 
- Postman


## Cómo usarlo

### Instalación

Primero clonamos el repositorio

```bash
git clone https://github.com/carlita-capocci/tercer_proyecto_acamica
```

Nos metemos en el directorio

```bash
cd tercer_proyecto_acamica
``` 

Instalamos las dependencias

```bash
npm install
```

### Base de datos

El archivo de base de datos se encuentra en './base.sql'

Para poder correr satisfactoriamente el proyecto es necesario contar con una instancia del servidor de base de datos MySQL

Para poder crear la base de datos

```bash
mysql -u [user] -p < base.sql

```

Luego debemos actualizar las credenciales de base de datos en el archivo server.js. Actualizar las lineas

```javascript
    host: 'localhost',
    user: 'root',
    password: 'carla123',
    database: 'resto',

```

### Corremos el proyecto 

```bash
node src/server
```


## Endpoints


- [Usuarios](./docs/usuarios.md)
- [Pedidos](./docs/pedidos.md)
- [Platos](./docs/platos.md)
- [Favoritos](./docs/favoritos.md)



## Especificacion de la API

La especificacion de la API, segun el standar open API (Swagger) se encuentra en '/docs/swagger.json'