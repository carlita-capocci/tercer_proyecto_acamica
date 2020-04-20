module.exports= function(app, conn){



app.post('/usuarios', (request, response) => {
    const user = request.body;
    if (user.usuario === undefined || user.nombre_y_apellido === undefined ||
        user.telefono === undefined || user.email === undefined || user.direccion === undefined || user.password === undefined) {
        return response.status(400).send('campos requeridos: usuario, nombre_y_apellido, telefono, email, direccion, password')
    }
    conn.query(
        `INSERT INTO Usuario(
            usuario, nombre_y_apellido, telefono, email, direccion, password)
            VALUE("${user.usuario}","${user.nombre_y_apellido}",
            "${user.telefono}","${user.email}","${user.direccion}","${user.password}")`,
        (error, result, field) => {
            if (error) {
                response.json(error);

            } else {
                response.json(result);
            }
        }
    );
})





app.get('/usuarios', (request, response) => {
    conn.query(
        'SELECT * FROM usuario',
        (error, result, field) => {
            if (error) {
                response.json(error);

            } else {
                response.json(result);
            }
        }
    );
})



app.delete('/usuarios/:id', (request, response) => {
    conn.query(`DELETE FROM usuario WHERE user_id=${request.params.id};`,
        (error, result, field) => {
            if (error) {
                response.json(error);

            } else {
                response.json(result);
            }
        }
    );
})



app.put('/usuarios/:id', (request, response) => {
    const user = request.body;
    if (user.usuario === undefined || user.nombre_y_apellido === undefined ||
        user.telefono === undefined || user.email === undefined || user.direccion === undefined || user.password === undefined) {
        return response.status(400).send('campos requeridos: usuario, nombre_y_apellido, telefono, email, direccion, password')
    }
    conn.query(
        `UPDATE Usuario SET
            usuario="${user.usuario}",nombre_y_apellido="${user.nombre_y_apellido}",
            telefono="${user.telefono}",email="${user.email}",direccion="${user.direccion}",password="${user.password}"
            WHERE user_id= ${request.params.id}`,

        (error, result, field) => {
            if (error) {
                response.json(error);

            } else {
                response.json(result);
            }
        }
    );
})


app.patch('/usuarios/:id', (request, response) => {
    const user = request.body;
    conn.query(`Update usuario SET ${Object.keys(user).map(key => `${key}="${user[key]}"`).join()} WHERE user_id=${request.params.id}`,
        (error, result, field) => {
            if (error) {
                response.json(error);

            } else {
                response.json(result);
            }
        }
    );
})









}