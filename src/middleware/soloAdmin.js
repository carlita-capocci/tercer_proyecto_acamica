const jwt = require("jsonwebtoken");
const { secreto } = require("../configs");

module.exports = function(request, response, next) {
    const token = request.headers.authorization;
    jwt.verify(token, secreto, (err, decode) => {
        if(err) {
            response.json({ error: err });
        } else{
            if(decode.rol === 'admin'){
                next();
            } else {
                response.json({
                    error: "solo usuarios administradores"
                })
            }
        }
    })
}