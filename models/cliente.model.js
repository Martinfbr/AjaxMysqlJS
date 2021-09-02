const sql = require("./db");


const Cliente = function (cliente) {
    this.email = cliente.email;
    this.nombre = cliente.nombre;
    this.activo = cliente.activo;
};

Cliente.create = (newCliente, result) => {
    sql.connection.query("INSERT INTO clientes SET ?", newCliente, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null)
            return;
        }

        console.log("crear cliente", { id: res.isertId, ...newCliente });
        result(null, { id: res.insertId, ...newCliente });
    });
};

Cliente.findById = (clienteId, result) => {
    sql.connection.query("SELECT * FROM clientes WHERE id = ?", clienteId , (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null)
            return;
        }

        if (res.length) {
            console.log("Hallar cliente", res[0]);
            result(null, res[0])
            return;
        }

        //
        result({ kind: "no_encontrado" }, null);
    });
};

Cliente.getAll = result => {
    sql.connection.query("SELECT * FROM clientes ", (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null)
            return;
        }

        console.log("clientes: ", res);
        result(null, res)
    });
};

Cliente.UpdateById = (id, cliente, result) => {
    sql.connection.query(
        "UPDATE clientes SET email = ? , nombre = ?, activo = ? WHERE id = ?",
        [cliente.email, cliente.nombre, cliente.activo, id],
        (err, res) => {
            if (err) {
                console.log("error", err);
                result(err, null)
                return;
            }

            if (res.affectedRows == 0) {
                //
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("modificar cliente: ", { id: id, ...cliente });
            result(null, { id: id, ...cliente });
        }
    );
};

Cliente.remove = (id, result) => {
    sql.connection.query("DELETE FROM clientes WHERE id = ? ", id, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null)
            return;
        }

        if (res.affectedRows == 0) {
            //
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("cliente borrado con el id :", id);
        result(null, res);
    });
};

Cliente.removeALL = result => {
    sql.connection.query("DELETE FROM clientes", (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null)
            return;
        }

        console.log(`borrados ${res.affectedRows} clientes`);
        result(null, res);
    });
};

module.exports = Cliente;