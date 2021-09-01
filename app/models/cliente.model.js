const sql = require("./db.js");

//Constructor 
const Cliente = function (cliente){
    this.email = cliente.email;
    this.nombre = cliente.nombre;
    this.activo = cliente.activo;
};

Cliente.create = (newCliente, result)=>{
    sql.query("INSERT INTO clientes SET ?", newCliente, (err,res)=>
    {
        if(err){
            console.log("error:", err);
            result(err, null);
            return;
        }
        console.log("crear cliente:", {id: res.insertId, ...newCliente});
        result (null, {id: res.insertId, ...newCliente});
    });
};

Cliente.findByid = (clienteId, result) =>{

    sql.query ("SELECT * FROM clientes where id = ${clienteId}",(err,res)=>{
        if(err){
            console.log("error:", err);
            result(err, null);
            return;
        }
        if(res.length){ 
            console.log("hallar cliente: ", res[0]);
            result(null, res[0]);
        }
        result({kind: "no_encontrado"}, null)
    });
};

Cliente.getAll = result => { 
    sql.query("SELECT* FROM clientes", (err, res)=>{
        if (err){
            console.log("error", err);
            result(null,err);
            return;
        }
        console.log("Clientes ", res);
        });
};

Cliente.updateById = (id, cliente, result) => {
    sql.query(
        "UPDATE clientes SET email=?, nombre=?, activo=? WHERE id = ?",
        [cliente.email, cliente.nombre, cliente.activo, id],
        (err, res)=> {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            //Cliente no hayado con esa id
            result({ kind: "not_found"},null);
            return;

        }
        console.log ("modificar cliente: ", { id:id,...cliente});
        result(null, { id:id, ...cliente});
        }
        );
};