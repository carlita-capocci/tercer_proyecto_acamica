const soloLogueado = require("../middleware/soloLogueado");
const soloAdmin = require("../middleware/soloAdmin");

module.exports= function(app, conn){



app.get('/platos',soloLogueado, (request, response) => {
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


app.post('/platos', soloAdmin, (request, response) => {
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
                response.json({status:'ok'});
            }
        }
    );
});


app.patch('/platos/:id', soloAdmin, (request, response) => {
    const plato = request.body;
    if (plato.nombre === undefined && plato.precio === undefined) {
        return response.status(400).send('campos requeridos: nombre, precio')
    }
    conn.query(`Update platos SET ${Object.keys(plato).map(key => `${key}="${plato[key]}"`).join()} WHERE plato_id=${request.params.id}`,
        (error, result, field) => {
            if (error) {
                response.json(error);

            } else {
                response.json({status:'ok'});
            }
        }
    );
})



app.delete('/platos/:idPlato', soloAdmin, (request, response) => {
    conn.query(
        `DELETE FROM platos WHERE plato_id=${request.params.idPlato}`,
        (error, result, field) => {
            if(error) {
                response.json(error);
            } else {
                response.json({status:'ok'});
            }
        }
    );
});


}