"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_1 = __importDefault(require("./routes/post"));
const server = new server_1.default();
//bodyparser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//fileUpload - toma los archivos subidos y los coloca en una seccion especializada. 
server.app.use((0, express_fileupload_1.default)());
//configurar cors
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
//Rutas 
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
//conectar base de datos.
mongoose_1.default.connect('mongodb://127.0.0.1:27017/fotosgram', (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
server.start(() => {
    console.log(`Servido corriendo en el puerto ${server.port}`);
});
