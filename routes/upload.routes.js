const {Router} = require('express');
const {check} = require('express-validator');

const {cargarArchivo, mostrarImagen} = require('../controller/upload.controller');
const {validarSubida} = require('../middlewares/valida_file');
const router = Router();

router.post( '/', validarSubida, cargarArchivo );
router.get('/get',  mostrarImagen  )

module.exports = router;