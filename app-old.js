const http = require('http');
const { readdirSync } = require('fs');

//Primero crear el servidor
//Recibe un callback, que tiene como entrada el request (req) y respusta (resp) 
http.createServer((req, res) => {

        //respondiendo como sitio web
        // res.write('Hola mundo'); 

        //retornando JSON
        res.writeHead(200, { 'Content-Type': 'application/json' });

        let salida = {
            nombre: 'Juan',
            edad: 32,
            url: req.url
        };

        res.write(JSON.stringify(salida));
        res.end();
    })
    .listen(8080);


console.log('Escuchando el puerto 8080');