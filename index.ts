import Server from "./classes/server";
import mongoose from 'mongoose'
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload';
import cors from 'cors';

import userRoutes from "./routes/usuario";
import postRoutes from "./routes/post";

const server = new Server();

//bodyparser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//fileUpload - toma los archivos subidos y los coloca en una seccion especializada. 
server.app.use(fileUpload());

//configurar cors
server.app.use(cors({ origin: true, credentials: true }));

//Rutas 
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);


//conectar base de datos.
mongoose.connect('mongodb://127.0.0.1:27017/fotosgram',
    (err) => {
        if (err) throw err;

        console.log('Base de datos ONLINE')
    })


server.start(() => {
    console.log(`Servido corriendo en el puerto ${server.port}`)
});