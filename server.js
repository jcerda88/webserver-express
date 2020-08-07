const express = require('express');
const app = express(); // Variable producto de la función de express
const hbs = require('hbs');
require('./hbs/helpers'); // Los helpers no es necesario exportarlos 

const port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'));

// hbs.registerPartials(__dirname + '/views/partials', function(err) {});
hbs.registerPartials(__dirname + '/views/partials');
// Express HBS engine 
app.set('view engine', 'hbs');

//Aquí iban los Helpers pero se movieron al directorio hbs/helpers.js


app.get('/', (req, res) => {

    // let salida = {
    //     nombre: 'Juan',
    //     edad: 32,
    //     url: req.url
    // };

    // res.send(salida);

    // Renderiza el archivo home.hbs como un html, de esta forma no se visualiza la extensión .html
    res.render('home', {
        nombre: 'JUAN CERDA' //,
            // anio: new Date().getFullYear()
    });
});


app.get('/about', (req, res) => {
    res.render('about');
});

// app.get('/data', (req, res) => { //la escribimos com función de flecha para trabajar con await (funciones asíncronas)
//     res.send('Hola Data');
// });

// app.listen(3000); Este app.listen también recibe un callback
app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto :${ port }`);
});