const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoControlador');
const reporteController = require('../controllers/reporteControlador');

//inserta dato de entrada
router.post('/entrada', vehiculoController.registrarEntrada);

//inserta el dato de salida
router.post('/salida', vehiculoController.registrarSalida);

//ruta que lleval reporte
router.post('/reporte', reporteController.obtenerReporte);

module.exports = router;