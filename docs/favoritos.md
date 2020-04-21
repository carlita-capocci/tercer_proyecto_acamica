## Listar favoritos

(Solo el usuario logueado puede listar los favoritos)

**METODO**: GET

**PATH**: /favoritos

**HEADERS**:

- Content-Type: application/json
- Authorization: [jwt token] 


**RESPONSE**:

- **user_id**: id del usuario 
- **plato_id**: id del plato elegido como favorito


Ejemplo:

```json

[
    {
        "user_id": 1,
        "plato_id": 1
    },
    {
        "user_id": 1,
        "plato_id": 3
    }
]

```

## Agregar favorito

(Solo el usuario logueado puede listar los favoritos)

**METODO**: POST

**PATH**: /favoritos

**HEADERS**:

- Content-Type: application/json
- Authorization: [jwt token] 

**BODY**:

- **plato_id**: id del plato elegido


Ejemplo:
```json
{

	"plato_id":3

	
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

## Eliminar favoritos

(Solo el usuario logueado puede eliminar favoritos)

**METODO**: DELETE

**PATH**: /favoritos/:idPlato

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