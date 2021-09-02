const express = require("express");
const bodyParser = require("body-parser");
const app = express();


//Analizar solicitudes de tipo: application/json
app.use(bodyParser.json());
//
app.use(bodyParser.urlencoded({ extended:true}));
//
app.get("/",(req,res)=>{
    res.json({message:"Bienvenido a la aplicacion"})
});

app.use('/api/', require('./routes/cliente.routes'))

//
app.listen(3000,()=>{
    console.log("Server ejecutandose en el puerto 3000");;
});
