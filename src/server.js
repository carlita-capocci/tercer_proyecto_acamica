const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const usuarios = require('./entities/usuarios');
const pedidos = require('./entities/pedidos');
const platos = require('./entities/platos');
const favoritos = require('./entities/favoritos');





const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'carla123',
    database: 'resto',
});

const app = express();
app.use(bodyParser.json());


usuarios(app, conn);
pedidos(app, conn);
platos(app, conn);
favoritos(app, conn);





app.listen(33333);