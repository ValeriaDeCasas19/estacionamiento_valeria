# estacionamiento_valeria
este es un sistema web desarrollado con node.js, express y mysql para gestionar las entradas y salidas de vehiculos. Lo cual permite calcular el tiempo en el cual el vehiculo fue estacionado y la generacion de reportes filtrados por fecha y hora.

Tecnologias utlizadas
-- Node js y express
-- Mysql worbench 8.0 CE
-- HTML, css , javascript
-- librerias para formar pdf y excel

Instalacion del proyecto 

git clone https://github.com/ValeriaDeCasas19/estacionamiento_valeria

instala dependecias

npm install
npm init -y
npm install express mysql2 body-parser

configura la conexion a la base datos en la carpeta db/conexion.js

Ejecuta el script de la base de datos para la creacion de tablas y base de datos

despues ejecuta
node app.js

y en el navegador agregra la url 
http://localhost:5000/reporte.html


da clic en el boton de registrar entrada
ingresa placa y tipo. clic en guardar
(OJO SOLO AGREGA 8 CARACTERES, MAS DE ESOS NO PERMITE)

esperar minutos
luego clic en el boton registrar salida. ingresa la placa que se registro

despues da clic en reporte e ingresa la fecha y hora en la que se registraron vehiculos.