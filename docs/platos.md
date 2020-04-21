## Listar platos

(Solo el usuario logueado puede listar los platos)

**METODO**: GET

**PATH**: /platos

**HEADERS**:

- Content-Type: application/json
- Authorization: [jwt token] 


**RESPONSE**:

- **plato_id**: id del plato
- **nombre**: nombre del plato
- **precio**: precio del plato


Ejemplo:

```json

[
    {
        "plato_id": 1,
        "nombre": "hamburguesa clasica",
        "precio": 350
    },
    {
        "plato_id": 2,
        "nombre": "sandwich veggie",
        "precio": 310
    },
    {
        "plato_id": 3,
        "nombre": "bagel salmon",
        "precio": 425
    },
    {
        "plato_id": 4,
        "nombre": "ensalada veggie",
        "precio": 340
    },
    {
        "plato_id": 5,
        "nombre": "focaccia",
        "precio": 300
    },
    {
        "plato_id": 6,
        "nombre": "sandwich focaccia",
        "precio": 440
    },
    {
        "plato_id": 8,
        "nombre": "berlioz a la parrilla, ricazo",
        "precio": 450
    },
    {
        "plato_id": 9,
        "nombre": "pancho",
        "precio": 200
    }
]

```
## Agregar platos

(Solo el usuario admin puede agregar platos)

**METODO**: POST

**PATH**: /platos

**HEADERS**:

- Content-Type: application/json
- Authorization: [jwt token] 

**BODY**:

- **nombre**: nombre del plato por agregar 
- **precio**: precio del nombre por agregar


Ejemplo:
```json
{
    "plato.nombre":"milanesa",
    "plato.precio": 150
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

## Eliminar platos

(Solo el usuario admin puede eliminar platos)

**METODO**: DELETE

**PATH**: /platos/:idPlato

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

## Modificar datos del plato

(Solo el usuario admin puede modificar datos del plato)

**METODO**: Patch

**PATH**: /platos/:id

**HEADERS**:

- Content-Type: application/json
- Authorization: [jwt token] 

**BODY**:

- **nombre**: nombre del plato (Opcional)
- **precio**: precio del plato  (Opcional)



Ejemplo:
```json
{
    
    "nombre": "hamburgesa",
    "precio": "350",
   
 
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
