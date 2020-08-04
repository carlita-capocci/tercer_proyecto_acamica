const { sign } = require("jsonwebtoken");
const { secreto } = require("../configs");
const soloLogueado = require("../middleware/soloLogueado");
const usuarioActivo = require("../middleware/usuarioActivo");
const soloAdmin = require("../middleware/soloAdmin");


module.exports= function(app, conn){



app.post('/usuarios', usuarioActivo, (request, response) => {
    const user = request.body;
    if (user.usuario === undefined || user.nombre_y_apellido === undefined ||
        user.telefono === undefined || user.email === undefined || user.direccion === undefined || user.password === undefined) {
        return response.status(400).json({ error: 'campos requeridos: usuario, nombre_y_apellido, telefono, email, direccion, password'})
    }
    if (user.rol && request.usuario.rol !== 'admin'){
        return response.status(401).json({ error: 'Solo los administradores pueden crear usuarios con rol admin'})
    }
    conn.query(
        `INSERT INTO Usuario(
            usuario, nombre_y_apellido, telefono, email, direccion, password)
            VALUE("${user.usuario}","${user.nombre_y_apellido}",
            "${user.telefono}","${user.email}","${user.direccion}","${user.password}")`,
        (error, result, field) => {
            if (error) {
                response.status(500).json({error});

            } else {
                response.json({
                    status:'ok'
                });
            }
        }
    );
})





app.get('/usuarios', soloLogueado, (request, response) => {
    conn.query(
        'SELECT * FROM usuario',
        (error, result, field) => {
            if (error) {
                response.json({
                    error
                });

            } else {

                response.json(result.map(usuario => {
                    delete usuario.password;
                    return usuario;
                }));
            }
        }
    );
})



app.delete('/usuarios/:id', soloAdmin, (request, response) => {
    conn.query(`DELETE FROM usuario WHERE user_id=${request.params.id};`,
        (error, result, field) => {
            if (error) {
                response.json({error});

            } else {
                
                    response.json({
                        status:'ok'
                    });

                
               
            }
        }
    );
})



app.put('/usuarios/:id', soloLogueado, (request, response) => {
    const user = request.body;
    if (user.usuario === undefined || user.nombre_y_apellido === undefined ||
        user.telefono === undefined || user.email === undefined || user.direccion === undefined || user.password === undefined) {
        return response.status(400).send('campos requeridos: usuario, nombre_y_apellido, telefono, email, direccion, password')
    }
    if(request.usuario.rol !== 'admin' && request.usuario.user_id !== request.params.id){
        return response.status(401).send('solo los administradores pueden modificar otros usuarios');
    }
    conn.query(
        `UPDATE Usuario SET
            usuario="${user.usuario}",nombre_y_apellido="${user.nombre_y_apellido}",
            telefono="${user.telefono}",email="${user.email}",direccion="${user.direccion}",password="${user.password}"
            WHERE user_id= ${request.params.id}`,

        (error, result, field) => {
            if (error) {
                response.json({error});

            } else {
                response.json({status: "ok"});
            }
        }
    );
});


app.patch('/usuarios/:id',soloLogueado, (request, response) => {
    const user = request.body;
    if(request.usuario.rol !== 'admin' && request.usuario.user_id !== request.params.id){
        return response.status(401).send('solo los administradores pueden modificar otros usuarios');
    }
    conn.query(`Update usuario SET ${Object.keys(user).map(key => `${key}="${user[key]}"`).join()} WHERE user_id=${request.params.id}`,
        (error, result, field) => {
            if (error) {
                response.json({error});

            } else {
                response.json({status: "ok"});
            }
        }
    );
});

app.post('/usuarios/login', (request, response) => {
    const user = request.body;
    if (user.usuario === undefined || user.password === undefined) {
        return response.status(400).send('campos requeridos: usuario, password')
    }
    conn.query(
        `SELECT * FROM usuario WHERE
        (usuario="${user.usuario}" OR email="${user.usuario}") AND password ="${user.password}";`,
        (error, result, field) => {
            if(error) {
                response.json({error});
            } else {
                if(result.length > 0) {
                    const logueado = result[0];
                    response.json({
                        loggedIn: true,
                        usuario: {
                            usuario: logueado.usuario,
                            email: logueado.email,
                            rol: logueado.rol
                        },
                        token: sign({
                            usuario: logueado.usuario,
                            email: logueado.email,
                            rol: logueado.rol,
                            user_id: logueado.user_id
                        }, secreto)
                    });
                } else {
                    response.json({
                        error: "usuario o contraseña incorrectos"
                    })
                }
            }
        }
    )
});








}