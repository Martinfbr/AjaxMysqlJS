const { Router, request } = require('express');
const clientes = require("../controllers/cliente.controller")

const app = Router();

app.post("/clientes", clientes.create);

app.get("/clientes", clientes.findAll);

app.get('clientes/:clienteId', clientes.findOne);

app.put("clientes/:clienteId", clientes.update);
  
app.delete("clientes/:clienteId", clientes.delete);

   
app.delete("clientes/:clienteId", clientes.deleteAll);

    // app.post("/", clientes.create);

    // app.get("/", clientes.findAll);
    
    // app.get("/:clienteId", clientes.findOne);
    
    // app.put("/:clienteId", clientes.update);
    
    // app.delete("/:clienteId", clientes.delete);
    
    // app.delete("/", clientes.deleteAll);

module.exports = app ;