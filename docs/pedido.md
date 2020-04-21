# Endpoints de Pedidos

## Listar pedidos

(Solo el usuario admin puede ver todos los pedidos)

**METODO**: GET

**PATH**: /pedidos

**HEADERS**:

- Content-Type: application/json
- Authorization: [jwt token] 


**RESPONSE**:

- **pedido_id**: numero de pedido
- **fecha**: fecha de pedido
- **user_id**: id de usuario que cargo el pedido
- **fp_id**: forma de pago
- **estado_id**: estado del pedido
- **platos**: lista de platos [
    - **pedido-plato_id**: id del pedido del plato cargado
    - **plato_id**: id del plato
    - **precio**: precio del pedido
    - **cantidad**: cantidad de platos
    - **nombre**: nombre del plato

]

Ejemplo:

```json
[
    {
        "pedido_id": 6,
        "fecha": "2020-04-17T03:00:00.000Z",
        "user_id": 1,
        "fp_id": 1,
        "estado_id": 1,
        "platos": [
            {
                "pedidos-plato_id": 1,
                "plato_id": 1,
                "precio": 350,
                "cantidad": 4,
                "nombre": "hamburguesa clasica"
            },
            {
                "pedidos-plato_id": 2,
                "plato_id": 2,
                "precio": 310,
                "cantidad": null,
                "nombre": "sandwich veggie"
            },
            {
                "pedidos-plato_id": 3,
                "plato_id": 3,
                "precio": 425,
                "cantidad": null,
                "nombre": "bagel salmon"
            },
            {
                "pedidos-plato_id": 4,
                "plato_id": 4,
                "precio": 340,
                "cantidad": null,
                "nombre": "ensalada veggie"
            }
        ]
    },
    {
        "pedido_id": 8,
        "fecha": "2020-04-17T03:00:00.000Z",
        "user_id": 1,
        "fp_id": 1,
        "estado_id": 1,
        "platos": [
            {
                "pedidos-plato_id": 5,
                "plato_id": 1,
                "precio": 350,
                "cantidad": null,
                "nombre": "hamburguesa clasica"
            },
            {
                "pedidos-plato_id": 6,
                "plato_id": 2,
                "precio": 310,
                "cantidad": null,
                "nombre": "sandwich veggie"
            },
            {
                "pedidos-plato_id": 7,
                "plato_id": 3,
                "precio": 425,
                "cantidad": null,
                "nombre": "bagel salmon"
            },
            {
                "pedidos-plato_id": 8,
                "plato_id": 4,
                "precio": 340,
                "cantidad": null,
                "nombre": "ensalada veggie"
            }
        ]
    },
    {
        "pedido_id": 9,
        "fecha": "2020-04-17T03:00:00.000Z",
        "user_id": 1,
        "fp_id": 1,
        "estado_id": 1,
        "platos": [
            {
                "pedidos-plato_id": 9,
                "plato_id": 1,
                "precio": 350,
                "cantidad": null,
                "nombre": "hamburguesa clasica"
            },
            {
                "pedidos-plato_id": 10,
                "plato_id": 2,
                "precio": 310,
                "cantidad": null,
                "nombre": "sandwich veggie"
            },
            {
                "pedidos-plato_id": 11,
                "plato_id": 3,
                "precio": 425,
                "cantidad": null,
                "nombre": "bagel salmon"
            },
            {
                "pedidos-plato_id": 12,
                "plato_id": 4,
                "precio": 340,
                "cantidad": null,
                "nombre": "ensalada veggie"
            }
        ]
    },
    {
        "pedido_id": 10,
        "fecha": "2020-04-20T03:00:00.000Z",
        "user_id": 3,
        "fp_id": 1,
        "estado_id": 1,
        "platos": [
            {
                "pedidos-plato_id": 16,
                "plato_id": 1,
                "precio": 350,
                "cantidad": 1,
                "nombre": "hamburguesa clasica"
            },
            {
                "pedidos-plato_id": 17,
                "plato_id": 2,
                "precio": 310,
                "cantidad": 1,
                "nombre": "sandwich veggie"
            }
        ]
    }
]
```

## Listar mis pedidos

(Solo el usuario logueado puede ver los pedidos cargados)

**METODO**: GET

**PATH**: /mis-pedidos

**HEADERS**:

- Content-Type: application/json
- Authorization: [jwt token] 


**RESPONSE**:

- **pedido_id**: numero de pedido
- **fecha**: fecha de pedido
- **user_id**: id de usuario que cargo el pedido
- **fp_id**: forma de pago
- **estado_id**: estado del pedido
- **platos**: lista de platos [
    - **pedido-plato_id**: id del pedido del plato cargado
    - **plato_id**: id del plato
    - **precio**: precio del pedido
    - **cantidad**: cantidad de platos
    - **nombre**: nombre del plato

]

Ejemplo:

```json
[
    {
        "pedido_id": 6,
        "fecha": "2020-04-17T03:00:00.000Z",
        "user_id": 1,
        "fp_id": 1,
        "estado_id": 1,
        "platos": [
            {
                "pedidos-plato_id": 1,
                "plato_id": 1,
                "precio": 350,
                "cantidad": 4,
                "nombre": "hamburguesa clasica"
            },
            {
                "pedidos-plato_id": 2,
                "plato_id": 2,
                "precio": 310,
                "cantidad": null,
                "nombre": "sandwich veggie"
            },
            {
                "pedidos-plato_id": 3,
                "plato_id": 3,
                "precio": 425,
                "cantidad": null,
                "nombre": "bagel salmon"
            },
            {
                "pedidos-plato_id": 4,
                "plato_id": 4,
                "precio": 340,
                "cantidad": null,
                "nombre": "ensalada veggie"
            }
        ]
    },
    {
        "pedido_id": 8,
        "fecha": "2020-04-17T03:00:00.000Z",
        "user_id": 1,
        "fp_id": 1,
        "estado_id": 1,
        "platos": [
            {
                "pedidos-plato_id": 5,
                "plato_id": 1,
                "precio": 350,
                "cantidad": null,
                "nombre": "hamburguesa clasica"
            },
            {
                "pedidos-plato_id": 6,
                "plato_id": 2,
                "precio": 310,
                "cantidad": null,
                "nombre": "sandwich veggie"
            },
            {
                "pedidos-plato_id": 7,
                "plato_id": 3,
                "precio": 425,
                "cantidad": null,
                "nombre": "bagel salmon"
            },
            {
                "pedidos-plato_id": 8,
                "plato_id": 4,
                "precio": 340,
                "cantidad": null,
                "nombre": "ensalada veggie"
            }
        ]
    },
    {
        "pedido_id": 9,
        "fecha": "2020-04-17T03:00:00.000Z",
        "user_id": 1,
        "fp_id": 1,
        "estado_id": 1,
        "platos": [
            {
                "pedidos-plato_id": 9,
                "plato_id": 1,
                "precio": 350,
                "cantidad": null,
                "nombre": "hamburguesa clasica"
            },
            {
                "pedidos-plato_id": 10,
                "plato_id": 2,
                "precio": 310,
                "cantidad": null,
                "nombre": "sandwich veggie"
            },
            {
                "pedidos-plato_id": 11,
                "plato_id": 3,
                "precio": 425,
                "cantidad": null,
                "nombre": "bagel salmon"
            },
            {
                "pedidos-plato_id": 12,
                "plato_id": 4,
                "precio": 340,
                "cantidad": null,
                "nombre": "ensalada veggie"
            }
        ]
    },
    {
        "pedido_id": 10,
        "fecha": "2020-04-20T03:00:00.000Z",
        "user_id": 3,
        "fp_id": 1,
        "estado_id": 1,
        "platos": [
            {
                "pedidos-plato_id": 16,
                "plato_id": 1,
                "precio": 350,
                "cantidad": 1,
                "nombre": "hamburguesa clasica"
            },
            {
                "pedidos-plato_id": 17,
                "plato_id": 2,
                "precio": 310,
                "cantidad": 1,
                "nombre": "sandwich veggie"
            }
        ]
    }
]
```

## Eliminar pedidos

(Solo el usuario admin puede ver eliminar pedidos)

**METODO**: Delete

**PATH**: /pedidos/:id

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

## Crear pedido 

(Solo el usuario logueado puede crear un pedido

**METODO**: POST

**PATH**: /pedidos

**HEADERS**:

- Content-Type: application/json
- Authorization: [jwt token] 

**BODY**:

- **fp_id**: id de forma de pago
- **platos**: array de platos elegidos
    - **id**: id del plato
    - **cantidad**: cantidad 


Ejemplo:
```json
{
    "fp_id": 1,
    "platos": [
        {
            "id":1,
            "cantidad":2
        },
        {
            "id":4,
            "cantidad":2
        }
    ]
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

