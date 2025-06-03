const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoControlador');


//inserta dato de entrada
router.post('/entrada', vehiculoController.registrarEntrada);

//inserta el dato de salida
router.post('/salida', vehiculoController.registrarSalida);

module.exports = router;