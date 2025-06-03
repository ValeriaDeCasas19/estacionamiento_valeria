//importamos el paquete mysql
const mysql = require('mysql2');

//datos de conexion a bd
const conexion = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'Valeria19_10_01',
    database: 'Estacionamiento'
})

//establecemos conexion
conexion.connect((fallo) =>{
    if(fallo){
        console.error('Error al conectar a la bd', fallo.message);
        return;
    }
    console.log('conexion exitosa');

});

//exportamos conexion para usar en otros archivos
module.exports = conexion