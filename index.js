const mongoose = require('mongoose');
const app = require('./app.js');
const port = 4000;

mongoose.Promise = global.Promise;

async function run(){
    await mongoose.connect("your db url", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
        console.log("Conectado a la base de datos");

        // Creacion del servidor
        app.listen(port, ()=> {
            console.log(`Servidor corriendo en el puerto ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
}

run();