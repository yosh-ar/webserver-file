const path = require('path');
const fs   = require('fs');
const { subirArchivo } = require('../helpers/subir-archivo');
const { response } = require('express');


const cargarArchivo = async(req, res = response) => {
    try {
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        res.json({ nombre });
        // este nombre usualmente se guarda en la db 
    } catch (msg) {
        res.status(400).json({ msg });
    }

}
const mostrarImagen = async(req, res = response ) => {
    //usualmente el nombre de la imagen esta almacenado en un registro de db
    let pathImagen = path.join( __dirname, '../uploads', 'imgs', 'nombre imagen' );
    if ( fs.existsSync( pathImagen ) ) {
        return res.sendFile( pathImagen )
    }

    pathImagen = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile( pathImagen );
}

const actualizarImagen = async(req, res = response ) => {

    // en este punto validamos que nuesta tabla o modelo contenga una imagen en el atributo img
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor 
        const pathImagen = path.join( __dirname, '../uploads', 'carpeta', modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );
        }
    }
    // una vez borrado el archivo solo volvemos a guardarlo en nuestros registros
    const nombre = await subirArchivo( req.files, undefined, 'carpeta' );
    modelo.img = nombre;
    await modelo.save();
    res.json( modelo );

    // envidentemente no hay un moddelo o base de datos
    // solo se deja esto de referencia para saber que debemos guardar el nombre de la imagen en la base de datos

}

module.exports = {
    cargarArchivo,
    mostrarImagen
}