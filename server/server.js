const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            upload : '/api/upload'
        }

        this.middlewares();

        this.routes();
    }
    middlewares(){
        
        // corss
        this.app.use(cors());
        
        // Lectura y parseo del body
        // basicamente cofiguramos el tipo de dato que recibimos
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true,
        }));
        // pintara lo que tenga la carpeta public
        this.app.use(express.static('public'));

    }
    routes(){
        this.app.use(this.path.upload, require('../routes/upload.routes'));
    }
    listen(){
        this.app.listen(this.port, ()=>console.log(`listening on port ${this.port}`));
    }
}

module.exports = Server;