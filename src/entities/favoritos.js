module.exports= function(app, conn){



  app.get('/favoritos', (request, response) => {
      conn.query(
          'SELECT * FROM favoritos',
          (error, result, field) => {
              if (error) {
                  response.json(error);
  
              } else {
                  response.json(result);
              }
          }
      );
  });
  
  
  app.post('/favoritos', (request, response) => {
      const favorito = request.body;
      if (favorito.plato_id === undefined || favorito.user_id === undefined) {
          return response.status(400).send('campos requeridos: plato_id, user_id')
      }
      conn.query(
          `INSERT INTO favoritos(
              plato_id, user_id)
              VALUE("${favorito.plato_id}",${favorito.user_id})`,
          (error, result, field) => {
              if (error) {
                  response.json(error);
  
              } else {
                  response.json(result);
              }
          }
      );
  });
   
  app.delete('/favoritos/:idUser/:idPlato', (request, response) => {
      conn.query(
          `DELETE FROM favoritos WHERE plato_id=${request.params.idPlato} AND user_id=${request.params.idUser}`,
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