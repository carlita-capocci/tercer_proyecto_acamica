module.exports = function (app, conn) {


    app.get('/estados', (request, response) => {
        conn.query(
            'SELECT * FROM estados',
            (error, result, field) => {
                if (error) {
                    response.json(error);

                } else {
                    response.json({
                        fields: field,
                        data: result
                    });
                }
            }
        );
    })




    app.get('/pedidos', (request, response) => {
        conn.query(
            `SELECT *
        FROM
            pedidos,
            \`pedidos-plato\`,
            platos
        WHERE
            pedidos.pedido_id = \`pedidos-plato\`.pedido_id
            AND
            \`pedidos-plato\`.plato_id = platos.plato_id
        ORDER BY pedidos.pedido_id;`,
            (error, result, field) => {
                if (error) {
                    response.json(error);
                } else {
                    const pedidos = [];
                    let pedidoActual = {};
                    result.forEach(pedido => {
                        if (pedido.pedido_id !== pedidoActual.pedido_id) {
                            pedidoActual = {
                                pedido_id: pedido.pedido_id,
                                fecha: pedido.fecha,
                                user_id: pedido.user_id,
                                fp_id: pedido.fp_id,
                                estado_id: pedido.estado_id,
                                platos: []
                            }
                            pedidos.push(pedidoActual)
                        }
                        pedidoActual.platos.push({
                            "pedidos-plato_id": pedido["pedidos-plato_id"],
                            plato_id: pedido.plato_id,
                            precio: pedido.precio,
                            cantidad: pedido.cantidad,
                            nombre: pedido.nombre
                        })

                    })
                    response.json(pedidos);
                }
            }
        );
    })

    app.get('/formas_de_pago', (request, response) => {
        conn.query(
            'SELECT * FROM `formas_de_pago`',
            (error, result, field) => {
                if (error) {
                    response.json(error);

                } else {
                    response.json({
                        fields: field,
                        data: result
                    });
                }
            }
        );
    })








    app.delete('/pedidos/:id', (request, response) => {
        conn.query(`DELETE FROM pedidos WHERE pedido_id=${request.params.id};`,
            (error, result, field) => {
                if (error) {
                    response.json(error);

                } else {
                    response.json(result);
                }
            }
        );
    })



    app.patch('/pedidos/:id', (request, response) => {
        const pedido = request.body;
        conn.query(`Update pedidos SET ${Object.keys(pedido).map(key => `${key}="${pedido[key]}"`).join()} WHERE pedido_id=${request.params.id}`,
            (error, result, field) => {
                if (error) {
                    response.json(error);
    
                } else {
                    response.json(result);
                }
            }
        );
    })


    app.patch('/pedidos/:idPedido/plato/:idPedidosPlato', (request, response) => {
        const pedidoPlato = request.body;
        conn.query(`Update \`pedidos-plato\` SET ${
            Object.keys(pedidoPlato).map(key => `${key}="${pedidoPlato[key]}"`).join()
        } WHERE
        \`pedidos-plato_id\`=${request.params.idPedidosPlato}`,
            (error, result, field) => {
                if (error) {
                    response.json(error);
    
                } else {
                    response.json(result);
                }
            }
        );
    })



    app.post('/pedidos/:idPedido/platos/', (request, response) => {
        const pedidoPlato = request.body;
        if (pedidoPlato.plato_id === undefined ||
            pedidoPlato.cantidad === undefined) {
            return response.status(400).send('campos requeridos: plato_id, cantidad')
        }
        conn.query(
            `SELECT * FROM platos WHERE plato_id=${pedidoPlato.plato_id}`,
            (error, resultPlato, field) => {
                if(error) {
                    response.json(error)
                } else {
                    conn.query(
                        `INSERT INTO \`pedidos-plato\`
                        (${Object.keys(pedidoPlato).map(key => `${key}`).join()}, precio, pedido_id)
                    VALUES 
                    (${Object.keys(pedidoPlato).map(key => `"${pedidoPlato[key]}"`).join()}, ${resultPlato[0].precio}, ${request.params.idPedido})
                    `, (error, result, field) => {
                            if (error) {
                                response.json(error);
            
                            } else {
                                response.json(result);
                            }
                        }
                    );
                }

            }
        );
    })

    app.delete('/pedidos/:idPedido/plato/:idPedidosPlato', (request, response) => {
        conn.query(
            `DELETE FROM \`pedidos-plato\` WHERE \`pedidos-plato_id\`=${request.params.idPedidosPlato}`,
            (error, result, field) => {
                if(error) {
                    response.json(error);
                } else {
                    response.json(result);
                }
            }
        );
    });





    app.post('/pedidos', (request, response) => {
        const pedido = request.body;
        const hoy = new Date();
        conn.query(
            `INSERT INTO pedidos(
            fecha, user_id, fp_id, estado_id)
            VALUE("${hoy.getFullYear()}-${hoy.getMonth()+1}-${
                hoy.getDate()}","${pedido.user_id}",
            "${pedido.fp_id}",1)`,
            (error, result, field) => {
                if (error) {
                    response.json(error);

                } else {
                    const pedido_id = result.insertId;
                    conn.query(
                        `SELECT plato_id, precio
                    FROM platos WHERE plato_id IN (${pedido.platos.map(plato=>plato.id).join()})`,
                        (error, result, field) => {
                            if (error) {
                                response.json(error);

                            } else {
                                const str = [];
                                pedido.platos.forEach(plato => {
                                    str.push(`(${pedido_id}, ${plato.id}, ${result.find(pla=>pla.plato_id === plato.id).precio})`)
                                });
                                conn.query(
                                    `INSERT INTO \`pedidos-plato\`(
                                    pedido_id, plato_id, precio, cantidad
                                ) VALUES 
                                    ${str.join()}
                                `, (error, result, field) => {
                                        if (error) {
                                            response.json(error);

                                        } else {
                                            response.json(result);
                                        }
                                    }
                                )

                            }
                        }
                    )


                }
            }
        );
    })



























}