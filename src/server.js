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

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

usuarios(app, conn);
pedidos(app, conn);
platos(app, conn);
favoritos(app, conn);





app.listen(33333);