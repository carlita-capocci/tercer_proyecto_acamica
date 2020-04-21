const jwt = require("jsonwebtoken");
const { secreto } = require("../configs");

module.exports = function(request, response, next) {
    const token = request.headers.authorization;
    jwt.verify(token, secreto, (err, decoded) => {
        if(!err) {
            request.usuario = decoded;
        }
        next();
    })
}