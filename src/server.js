const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const usuarios = require('./entities/usuarios');




const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'carla123',
    database: 'resto',
});

const app = express();
app.use(bodyParser.json());


usuarios(app, conn);


























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









app.listen(33333);