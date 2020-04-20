module.exports= function(app, conn){


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
        'SELECT * FROM pedidos',
        (error, result, field) => {
            if (error) {
                response.json(error);

            } else {
                response.json(result);
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
                                    pedido_id, plato_id, precio
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