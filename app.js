const express = require('express');
const BodyParser = require('body-parser');  
const cors = require('cors');

const createRoles = require('./libs/initialSetup');

const app = express();
createRoles();

// archivos de rutas
const auth_routes = require('./routes/auth.routes.js');
const books_routes = require('./routes/books.routes');
const user_routes = require('./routes/user.routes');


// middleware
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());


// CORS
app.use(cors({
    origin: '*', // Reemplaza con el dominio permitido para acceder a tu API
    methods: 'GET,PUT,POST,DELETE', // Especifica los métodos HTTP permitidos
    allowedHeaders: 'Content-Type,Authorization,x-access-token', // Especifica los encabezados permitidos
}));


// rutes
app.use('/api/books', books_routes)
app.use('/api/auth', auth_routes);
app.use('/api/users', user_routes);


module.exports = app;