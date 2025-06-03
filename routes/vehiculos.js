const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoControlador');

router.post('/entrada', vehiculoController.registrarEntrada);

module.exports = router;