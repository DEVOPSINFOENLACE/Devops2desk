const express = require("express");

const mysql = require("mysql");

const app = express();

let conexion = mysql.createConnection({
    host:"localhost",
    database: "infoenlace",
    user: "root",
    password: ""
})

app.set("view engine", "ejs");

//se utiliza para manejar datos
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", function(req,res){
    res.render("colaboradores");
});

app.post("/validar", function(req,res){
    const datos = req.body;
   // Corregir los nombres de las variables para que coincidan con el formulario
   let nombre = datos.nombre;
   let usuario = datos.usuario;
   let correo = datos.correo;
   let carga = datos.cargo; // Cambié de 'carga' a 'cargo' para mejor comprensión.
   let contacto = datos.contacto;
   let acceso = datos.acceso;
   let password = datos.contrasena;
   let confirmar = datos.confirmar;
   let checar = datos.checar;
   let valor = datos.valor;
   let photo = datos.foto;

   let buscar = "SELECT * FROM colaboradores WHERE nombre = "+nombre+"";

    conexion.query(buscar, function (error,row){
        if(error){
            throw error;
        }else{
            if(row.legth>0){
                console.log("No se puede registrar, el usuario ya existe");
            }else{
                let registrar = "INSERT INTO colaboradores (nombre, usuario, correo, cargo, contacto, acceso, contrasena, confirmar, checar, valor, foto) VALUE ('"+nombre +"','"+usuario +"','"+correo +"','"+carga +"','"+contacto +"','"+acceso +"','"+password +"','"+confirmar +"','"+checar +"','"+valor +"','"+photo +"')";
                conexion.query(registrar,function(error){
                    if(error){
                        throw error;
                    }else{
                       console.log("Datos almacenados correctamente"); 
                    }
                });
            }
        }
    });

});


//ruta de archivos estáticos
app.use('/resources', express.static("public"));

app.listen(3000,function(){
    console.log("Servidor creado http://localhost:3000");
});