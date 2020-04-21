const soloLogueado = require("../middleware/soloLogueado");
const usuarioActivo = require("../middleware/usuarioActivo");
const soloAdmin = require("../middleware/soloAdmin");

module.exports= function(app, conn){



  app.get('/favoritos',soloLogueado, (request, response) => {
      conn.query(
          `SELECT * FROM favoritos WHERE user_id=${request.usuario.user_id}`,
          (error, result, field) => {
              if (error) {
                  response.json(error);
  
              } else {
                  response.json(result);
              }
          }
      );
  });
  
  
  app.post('/favoritos', soloLogueado, (request, response) => {
      const favorito = request.body;
      if (favorito.plato_id === undefined) {
          return response.status(400).send('campos requeridos: plato_id')
      }
      conn.query(
          `INSERT INTO favoritos(
              plato_id, user_id)
              VALUE("${favorito.plato_id}",${request.usuario.user_id})`,
          (error, result, field) => {
              if (error) {
                  response.json(error);
  
              } else {
                  response.json({status:'ok'});
              }
          }
      );
  });
   
  app.delete('/favoritos/:idPlato',soloLogueado, (request, response) => {
      conn.query(
          `DELETE FROM favoritos WHERE plato_id=${request.params.idPlato} AND user_id=${request.usuario.user_id}`,
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