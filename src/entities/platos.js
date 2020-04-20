module.exports= function(app, conn){



app.get('/platos', (request, response) => {
    conn.query(
        'SELECT * FROM platos',
        (error, result, field) => {
            if (error) {
                response.json(error);

            } else {
                response.json(result);
            }
        }
    );
});


app.post('/platos', (request, response) => {
    const plato = request.body;
    if (plato.nombre === undefined || plato.precio === undefined) {
        return response.status(400).send('campos requeridos: nombre, precio')
    }
    conn.query(
        `INSERT INTO platos(
            nombre, precio)
            VALUE("${plato.nombre}",${plato.precio})`,
        (error, result, field) => {
            if (error) {
                response.json(error);

            } else {
                response.json(result);
            }
        }
    );
});


app.patch('/platos/:id', (request, response) => {
    const plato = request.body;
    if (plato.nombre === undefined && plato.precio === undefined) {
        return response.status(400).send('campos requeridos: nombre, precio')
    }
    conn.query(`Update platos SET ${Object.keys(plato).map(key => `${key}="${plato[key]}"`).join()} WHERE plato_id=${request.params.id}`,
        (error, result, field) => {
            if (error) {
                response.json(error);

            } else {
                response.json(result);
            }
        }
    );
})



app.delete('/platos/:idPlato', (request, response) => {
    conn.query(
        `DELETE FROM platos WHERE plato_id=${request.params.idPlato}`,
        (error, result, field) => {
            if(error) {
                response.json(error);
            } else {
                response.json(result);
            }
        }
    );
});


}