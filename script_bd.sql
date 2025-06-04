CREATE DATABASE Estacionamiento;
use Estacionamiento ;

create table vehiculos (
placas varchar(8) primary key,
tipo varchar (20) not null
 );
 
 create table tiempo_estacionado (
 id int auto_increment primary key,
 placas varchar(8),
 fecha_entrada datetime not null,
 fecha_salida datetime default null,
 minutos int,
 pago decimal (10, 2),
 foreign key (placas) references vehiculos (placas));
 

 
 
 
 
 