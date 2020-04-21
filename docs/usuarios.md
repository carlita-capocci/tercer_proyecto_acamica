# Endpoints de Usuarios

## Login

**METODO**: POST

**PATH**: /usuarios/login

**HEADERS**:

- Content-Type: application/json

**BODY**:

- **usuario**: nombre de usuario o email 
- **password**: password del usuario

Ejemplo:
```json
{
    "usuario":"nombre_de_usuario",
    "password": "password"
}
```

**RESPONSE**:

- **error**: descripcion del error
- **loggedIn**: true si fue logueado
- **usuario**: usuario
- **token**: JWT token

Ejemplo:

```json
{
    "loggedIn": "true",
    "usuario":"carla",
    "token": "[jwt token]"   
}
```

## Crear usuario 

**METODO**: POST

**PATH**: /usuarios

**HEADERS**:

- Content-Type: application/json

**BODY**:

- **usuario**: nombre de usuario 
- **nombre_y_apellido**: nombre completo del usuario
- **telefono**: telefono del usuario
- **email**: email del usuario 
- **direccion**: direccion del usuario 
- **password**: password del usuario 
- **rol**: 'admin' u otro rol, pero solo lo puede setear un admin

Ejemplo:
```json
{
    "usuario":"nombre_de_usuario",
    "nombre_y_apellido": "nombre completo",
    "telefono": "telefono",
    "email": "email",
    "direccion": "direccion",
    "password": "password",
    "rol": "admin"
}
```


**RESPONSE**:

- **status**: (string) ok



Ejemplo:

```json
{
    "status": "ok",
      
}
```

## Listar usuarios

**METODO**: GET

**PATH**: /usuarios

**HEADERS**:

- Content-Type: application/json
- Authorization: [jwt token] 


**RESPONSE**:

- **error**: descripcion del error
- **user_id**: id de usuario
- **usuario**: usuario
- **nombre_y_apellido**: nombre completo del usuario
- **telefono**: telefono del usuario
- **email**: email del usuario
- **direccion**:  direccion del usuario
- **rol**: 'admin' u otro rol, pero solo lo puede setear un admin

Ejemplo:

```json
{
    "user_id": 1,
    "usuario": "carlita",
    "nombre_y_apellido": "carla capocci",
    "telefono": "3517654411",
    "email": "carlita@gmail.com",
    "direccion": "bv san juan 222",
    "rol": "admin"  
}
```

## Eliminar usuarios

(Solo el usuario admin puede eliminar usuarios)

**METODO**: DELETE

**PATH**: /usuarios/id

**HEADERS**:

- Content-Type: application/json
- Authorization: [jwt token] 


**RESPONSE**:

- **status**: (string) ok


Ejemplo:

```json
{
    "status": "ok",
      
}
```

## Modificar usuarios

(Solo el usuario admin puede modificar usuarios)

**METODO**: PUT

**PATH**: /usuarios/id

**HEADERS**:

- Content-Type: application/json
- Authorization: [jwt token] 

**BODY**:

- **usuario**:  nombre de usuario 
- **nombre_y_apellido**: nombre completo del usuario
- **telefono**: telefono del usuario
- **email**:  email del usuario 
- **direccion**: direccion del usuario 
- **password**: password del usuario 
- **rol**: 'admin' u otro rol, pero solo lo puede setear un admin

Ejemplo:
```json
{
    "usuario":"nombre_de_usuario",
    "nombre_y_apellido": "nombre completo",
    "telefono": "telefono",
    "email": "email",
    "direccion": "direccion",
    "password": "password",
    "rol": "admin"
}
```


**RESPONSE**:

- **status**: (string) ok


Ejemplo:

```json
{
    "status": "ok",
      
}
```

## Modificar datos del usuario

(Solo el usuario logueado puede modificar datos)

**METODO**: Patch

**PATH**: /usuarios/id

**HEADERS**:

- Content-Type: application/json
- Authorization: [jwt token] 

**BODY**:

- **usuario**: nombre de usuario (Opcional)
- **nombre_y_apellido**: nombre completo del usuario (Opcional)
- **telefono**: telefono del usuario (Opcional)
- **email**: email del usuario (Opcional)
- **direccion**: direccion del usuario (Opcional)
- **password**: password del usuario (Opcional)


Ejemplo:
```json
{
    
    "usuario": "carlita",
    "nombre_y_apellido": "carla capocci",
    "telefono": "3517654411",
    "email": "carlita@gmail.com",
    "direccion": "bv san juan 222",
    "password": "123"
    
}
```


**RESPONSE**:

- **status**: (string) ok


Ejemplo:

```json
{
    "status": "ok",
      
}
```


 
 