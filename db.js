


const firebase = require('firebase');
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyBna6ZFdu9NslYQRkNJbjjiEoHwFvsO4kk",
    authDomain: "manillasdb.firebaseapp.com",
    projectId: "manillasdb",
    storageBucket: "manillasdb.appspot.com",
    messagingSenderId: "976591616481",
    appId: "1:976591616481:web:f23bb8765fefcddeb4faa0",
    measurementId: "G-ETRL8ZL7T2"
});

var db = firebase.firestore();

var productos = [
    {"idProducto":"43","nombre":"Manillas de Seguridad Tyvek 3\/4\" (2cm)","descripcion":"Manillas en papel Tyvek 3\/4\" (2cm de ancho) de alta resistencia con adhesivo de seguridad color Rojo Neon.","color":"Rojo Neón","imagen":"Neon-Rojo.webp","categoria":"1","created_at":"2020-12-23 21:54:41","updated_at":"2020-12-23 21:54:41"},
    {"idProducto":"44","nombre":"Manillas de Seguridad Tyvek 3\/4\" (2cm)","descripcion":"Manillas en papel Tyvek 3\/4\" (2cm de ancho) de alta resistencia con adhesivo de seguridad color Verde Neon","color":"Verde Neón","imagen":"Verde-Neon.webp","categoria":"1","created_at":"2020-12-23 22:16:22","updated_at":"2020-12-23 22:16:22"},
    {"idProducto":"45","nombre":"Manillas de Seguridad Tyvek 3\/4\" (2cm)","descripcion":"Manillas en papel Tyvek 3\/4\" (2cm de ancho) de alta resistencia con adhesivo de seguridad color Amarillo Neon","color":"Amarillo Neón","imagen":"Amarillo-Neon.webp","categoria":"1","created_at":"2020-12-23 22:17:02","updated_at":"2020-12-23 22:17:02"},
    {"idProducto":"46","nombre":"Manillas de Seguridad Tyvek 3\/4\" (2cm)","descripcion":"Manillas en papel Tyvek 3\/4\" (2cm de ancho) de alta resistencia con adhesivo de seguridad color Amarillo Bandera","color":"Amarillo Bandera","imagen":"amarillo-bandera.webp","categoria":"1","created_at":"2020-12-23 22:17:30","updated_at":"2020-12-23 22:17:30"},
    {"idProducto":"47","nombre":"Manillas de Seguridad Tyvek 3\/4\" (2cm)","descripcion":"Manillas en papel Tyvek 3\/4\" (2cm de ancho) de alta resistencia con adhesivo de seguridad color Naranja Neon","color":"Naranja Neón","imagen":"Naranja-Neon.webp","categoria":"1","created_at":"2020-12-23 22:18:09","updated_at":"2020-12-23 22:18:09"},
    {"idProducto":"48","nombre":"Manillas de Seguridad Tyvek 3\/4\" (2cm)","descripcion":"Manillas en papel Tyvek 3\/4\" (2cm de ancho) de alta resistencia con adhesivo de seguridad color Azul Claro","color":"Azul Claro","imagen":"azul-claro.webp","categoria":"1","created_at":"2020-12-23 22:20:39","updated_at":"2020-12-23 22:20:39"},
    {"idProducto":"49","nombre":"Manillas de Seguridad Tyvek 3\/4\" (2cm)","descripcion":"Manillas en papel Tyvek 3\/4\" (2cm de ancho) de alta resistencia con adhesivo de seguridad color Azul Neon","color":"Azul Neón","imagen":"Azul-Neon.webp","categoria":"1","created_at":"2020-12-23 22:20:59","updated_at":"2020-12-23 22:20:59"},
    {"idProducto":"50","nombre":"Manillas de Seguridad Tyvek 3\/4\" (2cm)","descripcion":"Manillas en papel Tyvek 3\/4\" (2cm de ancho) de alta resistencia con adhesivo de seguridad color Blanco","color":"Blanco","imagen":"blanco.webp","categoria":"1","created_at":"2020-12-23 22:22:41","updated_at":"2020-12-23 22:22:41"},
    {"idProducto":"51","nombre":"Manillas de Seguridad Tyvek 3\/4\" (2cm)","descripcion":"Manillas en papel Tyvek 3\/4\" (2cm de ancho) de alta resistencia con adhesivo de seguridad color Verde Neon","color":"Coral Red","imagen":"coral-red.webp","categoria":"1","created_at":"2020-12-23 22:24:06","updated_at":"2020-12-23 22:24:06"},
    {"idProducto":"52","nombre":"Manillas de Seguridad Tyvek 3\/4\" (2cm)","descripcion":"Manillas en papel Tyvek 3\/4\" (2cm de ancho) de alta resistencia con adhesivo de seguridad color Dorado","color":"Dorado","imagen":"dorado.webp","categoria":"1","created_at":"2020-12-23 22:24:45","updated_at":"2020-12-23 22:24:45"},
    {"idProducto":"53","nombre":"Manillas de Seguridad Tyvek 3\/4\" (2cm)","descripcion":"Manillas en papel Tyvek 3\/4\" (2cm de ancho) de alta resistencia con adhesivo de seguridad color Fucsia Neon","color":"Fucsia Neón","imagen":"Fucsia-Neon.webp","categoria":"1","created_at":"2020-12-23 22:25:13","updated_at":"2020-12-23 22:25:13"},
    {"idProducto":"54","nombre":"Manillas de Seguridad Tyvek 3\/4\" (2cm)","descripcion":"Manillas en papel Tyvek 3\/4\" (2cm de ancho) de alta resistencia con adhesivo de seguridad color Gris","color":"Gris","imagen":"gris.webp","categoria":"1","created_at":"2020-12-23 22:25:52","updated_at":"2020-12-23 22:25:52"},
    {"idProducto":"55","nombre":"Manillas de Seguridad Tyvek 3\/4\" (2cm)","descripcion":"Manillas en papel Tyvek 3\/4\" (2cm de ancho) de alta resistencia con adhesivo de seguridad color Morado","color":"Morado","imagen":"mordao-pantone.webp","categoria":"1","created_at":"2020-12-23 22:26:19","updated_at":"2020-12-23 22:26:19"},
    {"idProducto":"56","nombre":"Manillas de Seguridad Tyvek 3\/4\" (2cm)","descripcion":"Manillas en papel Tyvek 3\/4\" (2cm de ancho) de alta resistencia con adhesivo de seguridad color Verde Lima","color":"Verde Lima","imagen":"verde-lima.webp","categoria":"1","created_at":"2020-12-23 22:26:58","updated_at":"2020-12-23 22:26:58"},
    {"idProducto":"57","nombre":"Manillas de Seguridad Tyvek 3\/4\" (2cm)","descripcion":"Manillas en papel Tyvek 3\/4\" (2cm de ancho) de alta resistencia con adhesivo de seguridad color Verde Oscuro","color":"Verde Oscuro","imagen":"tyvek_t3-16_SU-2.png","categoria":"1","created_at":"2021-01-20 06:37:34","updated_at":"2021-01-20 06:37:34"},
    {"idProducto":"58","nombre":"Manillas de Seguridad Tyvek 1\" (2.5cm)","descripcion":"Manillas en papel Tyvek 1\" (2.5cm de ancho) de alta resistencia con adhesivo de seguridad color Blanco","color":"Blanco","imagen":"tyvek_t2-09_SU.png","categoria":"1","created_at":"2021-01-20 06:48:32","updated_at":"2021-01-20 06:48:32"},
    {"idProducto":"59","nombre":"Manillas de Seguridad Tyvek 1\" (2.5cm)","descripcion":"Manillas en papel Tyvek 1\" (2.5cm de ancho) de alta resistencia con adhesivo de seguridad color Azul Neón","color":"Azul Neón","imagen":"tyvek_t2-05_SU.png","categoria":"1","created_at":"2021-01-20 06:49:12","updated_at":"2021-01-20 06:49:12"},
    {"idProducto":"60","nombre":"Manillas de Seguridad Tyvek 1\" (2.5cm)","descripcion":"Manillas en papel Tyvek 1\" (2.5cm de ancho) de alta resistencia con adhesivo de seguridad color Verde Neón","color":"Verde Neón","imagen":"tyvek_t2-01_SU.png","categoria":"1","created_at":"2021-01-20 06:49:47","updated_at":"2021-01-20 06:49:47"},
    {"idProducto":"61","nombre":"Manillas de Seguridad Tyvek 1\" (2.5cm)","descripcion":"Manillas en papel Tyvek 1\" (2.5cm de ancho) de alta resistencia con adhesivo de seguridad color Rojo Neón","color":"Rojo Neón","imagen":"tyvek_t2-03_SU.png","categoria":"1","created_at":"2021-01-20 06:50:18","updated_at":"2021-01-20 06:50:18"},
    {"idProducto":"62","nombre":"Manillas de Seguridad Tyvek 1\" (2.5cm)","descripcion":"Manillas en papel Tyvek 1\" (2.5cm de ancho) de alta resistencia con adhesivo de seguridad color Fucsia Neón","color":"Fucsia Neón","imagen":"tyvek_t2-07_SU.png","categoria":"1","created_at":"2021-01-20 06:50:52","updated_at":"2021-01-20 06:50:52"},
    {"idProducto":"63","nombre":"Manillas de Seguridad Tyvek 1\" (2.5cm)","descripcion":"Manillas en papel Tyvek 1\" (2.5cm de ancho) de alta resistencia con adhesivo de seguridad color Amarillo Bandera","color":"Amarillo Bandera","imagen":"tyvek_t2-34_SU.png","categoria":"1","created_at":"2021-01-20 06:52:00","updated_at":"2021-01-20 06:52:00"},
    {"idProducto":"64","nombre":"Manillas de Seguridad Tyvek 1\" (2.5cm)","descripcion":"Manillas en papel Tyvek 1\" (2.5cm de ancho) de alta resistencia con adhesivo de seguridad color Naranja Neón","color":"Naranja Neón","imagen":"tyvek_t2-04_SU.png","categoria":"1","created_at":"2021-01-21 07:42:12","updated_at":"2021-01-21 07:42:12"},
    {"idProducto":"65","nombre":"Manillas Plasticas en PVC","descripcion":"Manillas de seguridad con broche en material PVC Plastico","color":"Blanco","imagen":"","categoria":"2","created_at":"2021-02-11 10:09:07","updated_at":"2021-02-11 10:09:14"}
    ];

productos.forEach((obj)=>{
    db.collection('productos')
    .add({
        idProducto: obj.idProducto,
        nombre: obj.nombre,
        descripcion: obj.descripcion,
        color: obj.color,
        imagen: obj.imagen,
        categoria: obj.categoria,
            
    })
    .then((e)=>{ console.log(e); })
    .catch((e)=>{ console.log(e); })
});
