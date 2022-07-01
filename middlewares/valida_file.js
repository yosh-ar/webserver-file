
const {response, request} = require('express');

const validarSubida = (req = request, res= response, next)=>{
    // console.log(req.files.fotos.length);
    // let file;
    // if (!Array.isArray(req.files)) {
    //     file = Object.values(req.files);
    // }
    // if (!file || Object.keys(file).length === 0) {
    //     return res.status(400).json({
    //         msg : `No cargaron ningun archivo`
    //     })
    // }
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({
            msg: 'No hay archivos que subir - validarArchivoSubir'
        });
    }

    next();
}

module.exports = {
    validarSubida
}