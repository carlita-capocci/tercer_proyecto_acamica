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
})



}