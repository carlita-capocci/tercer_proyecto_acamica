const soloLogueado = require("../middleware/soloLogueado");
const soloAdmin = require("../middleware/soloAdmin");

module.exports = function (app, conn) {


    
    app.get('/pedidos', soloAdmin, (request, response) => {
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
    });

    app.get('/mis-pedidos', soloLogueado, (request, response) => {
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
            AND
            pedidos.user_id=${request.usuario.user_id}
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

  
    app.delete('/pedidos/:id', soloAdmin, (request, response) => {
        conn.query(`DELETE FROM pedidos WHERE pedido_id=${request.params.id};`,
            (error, result, field) => {
                if (error) {
                    response.json(error);

                } else {
                    response.json({status: "ok"});
                }
            }
        );
    })



    app.patch('/pedidos/:id', soloAdmin, (request, response) => {
        const pedido = request.body;
        conn.query(`Update pedidos SET ${Object.keys(pedido).map(key => `${key}="${pedido[key]}"`).join()} WHERE pedido_id=${request.params.id}`,
            (error, result, field) => {
                if (error) {
                    response.json(error);
    
                } else {
                    response.json({status: "ok"});
                }
            }
        );
    })


    app.patch('/pedidos/:idPedido/plato/:idPedidosPlato',soloAdmin, (request, response) => {
        const pedidoPlato = request.body;
        conn.query(`Update \`pedidos-plato\` SET ${
            Object.keys(pedidoPlato).map(key => `${key}="${pedidoPlato[key]}"`).join()
        } WHERE
        \`pedidos-plato_id\`=${request.params.idPedidosPlato}`,
            (error, result, field) => {
                if (error) {
                    response.json(error);
    
                } else {
                    response.json({status: "ok"});
                }
            }
        );
    })



    app.post('/pedidos/:idPedido/platos/', soloAdmin, (request, response) => {
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
                                response.json({status: "ok"});
                            }
                        }
                    );
                }

            }
        );
    })

    app.delete('/pedidos/:idPedido/plato/:idPedidosPlato', soloAdmin, (request, response) => {
        conn.query(
            `DELETE FROM \`pedidos-plato\` WHERE \`pedidos-plato_id\`=${request.params.idPedidosPlato}`,
            (error, result, field) => {
                if(error) {
                    response.json(error);
                } else {
                    response.json({status: "ok"});
                }
            }
        );
    });





    app.post('/pedidos', soloLogueado, (request, response) => {
        const pedido = request.body;
        const hoy = new Date();

        if(pedido.fp_id === undefined || pedido.platos === undefined || pedido.platos.length === 0){
            return response.json({
                error: "campos requeridos: fp_id, platos [id, cantidad]"
            })
        }
        conn.query(
            `INSERT INTO pedidos(
            fecha, user_id, fp_id, estado_id)
            VALUE("${hoy.getFullYear()}-${hoy.getMonth()+1}-${
                hoy.getDate()}","${request.usuario.user_id}",
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
                                    str.push(`(${pedido_id}, ${plato.id}, ${result.find(pla=>pla.plato_id === plato.id).precio}, ${plato.cantidad})`)
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
                                            response.json({status:'ok'});
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