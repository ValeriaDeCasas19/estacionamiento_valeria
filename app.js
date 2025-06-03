
//se importa express
const express = require('express');

//se impprta la conexion a bd
const conexion = require('./db/conexion');

//importamos body-parser
const bodyParser = require('body-parser');

//importamos rutas relacionadas con vehiculos
const vehiculoRouter = require('./routes/vehiculos');


const app = express();

//puerto
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/vehiculos', vehiculoRouter);


app.use(express.static('public'));
//puerto

app.listen(PORT, () =>{
  console.log(`escuchando en puerto ${PORT}`)
})
