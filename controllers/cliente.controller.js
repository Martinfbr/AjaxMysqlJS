const Cliente = require("../models/cliente.model");

//
exports.create = (req, res) => {
    //
    if (!req.body) {
        res.status(400).send({
            message: "Contenido no puede estar vacio"
        });
    }

    //
    const cliente = new Cliente({
        email: req.body.email,
        nombre: req.body.nombre,
        activo: req.body.activo
    })

    Cliente.create(cliente, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error en la creacion del cliente."
            });
        else res.send(data);
    });
}


exports.findAll = (req, res) => {
    Cliente.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error recuperandonlos clientes"
            });
        else res.send(data);
    });
}

//
exports.findOne = (req, res) => {

    Cliente.findById(req.params.clienteId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Cliente no encontrado con el id $(req.params.clienteId."
                });
            }
            else {
                res.status(500).send({
                    message: "Error recuperando cliente con ID" + req.params.clienteId
                });
            }
        } else res.send(data);
    });
};

//
exports.update = (req, res) => {
    //
    if (!req.body) {
        res.status(400).send({
            message: "El contenido no puede estar vacio"
        });
    }

    Cliente.UpdateById(
        req.params.clienteId,
        new Cliente(req.body),
        (err, data) => {
            if (err) {

                if (err.kind === "no_encontrado") {
                    res.status(400).send({
                        message: "Cliente no encontrado con el id $(req.params.clienteId)."
                    });
                } else {
                    res.status(500).send({
                        message: "Error modificando Cliente con Id" + req.params.clienteId
                    });
                }

            }
            else res.send(data);
        }   
    );
}


//
exports.delete = (req, res) => {
    Cliente.remove(req.params.clienteId, (err, data) => {
        if (err) {
            if (err.kind === "no_encontrado") {
                res.status(404).send({
                    message: "Cliente no encontrado con id $(req.params.clienteId)."
                });
            } else {
                res.status(500).send({
                    message: "Error modificando Cliente con Id" + req.params.clienteId
                });
            }
        } else res.send({ message: "Cliente eliminado con exito!." })
    });
}

exports.deleteAll = (req, res) => {
    Cliente.removeALL((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al eliminar los clientes."
            });
        else res.send({ message: "Todos los clientes fueron eliminados con exito" })
    });
};