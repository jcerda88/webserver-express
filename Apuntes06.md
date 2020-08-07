# SECCIÓN 7: Temas puntuales de la sección  

## Temas de la sección (Proyecto 06-webserver):  

Aquí cubriremos varios temas como:  

24. Uso y configuración de Express 
25. Servir contenido estático 
26. Template engines 
27. Handebars 
    * Helpers 
    * Parciales 
    * Variables 
28. Despliegues en Heroku y Github 
29. Hacer carpetas públicas en la web 

## Apuntes video 64

**NOTA:** El packete HTTP o HTTPS de Node es un paquete que nos permite crear web server

El primer paso es crear el servidor con `http.createServer`, el cual recibe un callback y ese callback va a recibir tanto los request (Solicitudes) y los response (respuestas) que nuestro servidor le va a enviar.

Al final de la función se debe especificar el puerto que está escuchando.  De manera local, usualmente usamos los puertos :3000 u :8080

**código (app-old.js):**
```javascript
http.createServer((req, res) => {

        //respondiendo como sitio web
        // res.write('Hola mundo'); 

        //retornando JSON
        res.writeHead(200, { 'Content-Type': 'application/json' });

        let salida = {
            nombre: 'Juan',
            edad: 32,
            url: req.url
        }

        res.write(JSON.stringify(salida)); //Salida JSON
        res.end();
    })
    .listen(8080); //Puerto que está escuchando
```

## Apuntes video 65

### 24. Uso y configuración de Express

**NOTA:** búsqueda de google `npm express`

Intalación de packete express

```
npm i express --save
```

**NOTA:** El `--save` indica que es una dependencia que se necesitará obligadamente para correr nuestro programa

**En el siguiente código (server.js):**

```javascript
const express = require('express');
const app = express(); 

app.get('/', (req, res) => { //
    // res.send('Hello World');

    let salida = {
        nombre: 'Juan',
        edad: 32,
        url: req.url
    };
    
    res.send(salida);
});

app.get('/data', (req, res) => { 
    res.send('Hola Data');
});

// app.listen(3000);
app.listen(3000, () => {
    console.log('Escuchando peticiones en el puerto :3000');
});
```

Variable producto de la función de express

```javascript
const app = express();
```

`app.get` estamos configurando una función GET cuando el path sea un `'/'`

```javascript
app.get('/', function(req, res) { 
```

Si el path es distinto, por ejemplo `'/data'`, a diferencia de createServer, se debe crear una función nueva para dicho path

**Ejemplo:**

```javascript
app.get('/data', (req, res) => { 
```

Se puede escribir como función de flecha para trabajar con `await` (funciones asíncronas)

```javascript
app.get('/', (req, res) => {
```

Internamente, la función .send detecta que es un objeto y lo serializa como JSON. Con esta función, nos olvidamos de serializar con JSON.stringify de manera manual tampoco es necesario indicar los headers del formato JSON, ya que los hace de manera automática

```javascript
res.send(salida);
```

El `app.listen` indica el puerto que estamos escuchando

```javascript
app.listen(3000);
```

El `app.listen` también recibe un callback

```javascript
app.listen(3000, () => {
    console.log('Escuchando peticiones en el puerto :3000');
});
```
**NOTA:** En este ejemplo, el mensaje del `console.log` se debe visualizar en la consola cmd del proyecto.

___

## Apuntes video 66

#### Qué es un Middlewere - definición Udemy:

Un middle were es una instrucción o un callback que se va a ejecutar, siempre, no importa qué URL es el que la persona pida.  

#### Qué es un Middlewere - definición Web:

Un middleware es un bloque de código que se ejecuta entre la petición que hace el usuario (request) hasta que la petición llega al servidor.

#### Ejecución Middlewere

Para ejecutar este middlewere, bastaría con escribir 

```javascript
app.use(express.static(__dirname + '/public'));
```
Especificar Callback (static) y especificar el folder `'/public'`

## Apuntes video 67

#### Creación de un sitio web

##### Paso 1: Descargar bootstrap

bootstrap source

https://getbootstrap.com/docs/4.0/getting-started/download/


## Apuntes video 68

### Handlebars

Creación de páginas web renderizables

https://handlebarsjs.com/


Buscar en google `npm hbs` e instalar la librería con el comando:

```
npm i hbs
```

Luego de haber instalado HBS, se crea la carpeta views y el archivo home.hbs.
Se renombran los antiguos .html como -old.html y en el código de server.js
se renderiza el archivo home.hbs como un html, de esta forma no se visualiza la extensión .html

```javascript
app.get('/', (req, res) => {
    res.render('home');
});
```

De esta manera, cualquier petición get va a renderizar el home


## Apuntes video 69

### Usando parciales con HBS

**Los parciales o Partial**, son un bloque de código html que podemos reutilizar.  En este caso, ocuparemos un folder que contenga todos los parciales.

```javascript
var hbs = require('hbs');
 
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
```


La variable global `__dirname`: es para cuando los sitios están en producción, no importa qué path tenga, toma todo ese path y concatena la ruta que está entre `''`

Como ejercicio, creamos la página about y la llamamos desde el link about de nuestro navbar, también creamos el método en el `server.js`

**NOTA:** Para ejecución de server y no estar actualizando por cada componente modificado, podemo ejecutar el comando 

```
nodemon server.js -e js,hbs,html,css
```

## Apuntes Video 70 

### helpers

helpers del HBS. Un helper, no es más que una función que se dispara cuando el template lo requiere

### Explicación helper capitalizar

```javascript
hbs.registerHelper('capitalizar', (texto) => {

    let palabras = texto.split(' ');
    palabras.forEach((palabra, idx) => {
        palabras[idx] = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    });

    // Se junta el arreglo nuevamente pero se separa por un espacio
    return palabras.join(' ');
});
```

La palbra a actualizar es igual a la palabra
charArt(0) la primera letra
palabras.slice(1): y se concatena lo qe viene de la posición 1 en adelante (Todo demás viene en minúscula)

## Apuntes Video 71 

### Subiendo aplicación a Heroku (Producción)

heroku es un servicio en la nube que nos permite desplegar aplicaciones, ya sea de PHP, Ruby pero entre ellas, también soporta NodeJs.  La utilizaremos para subir nuestro sitio web y que pueda ser accedido desde cualquier lugar del mundo.

Este servicio es gratuito pero limitado, solo cierta cantidad de cosas son gratuitas.

- 500 MG de consumo, entre otras limitantes.
- Limitante de 5 aplicaciones.

User: jcerda.contreras@gmail.com
Pass: Sfdk1314

- Create New App: El nombre de la aplicación debe ser único
- Para subir, usaremos Heroku CLI

Se configura la variable global port

```javascript
// Si no encuentra la variable global o el 3000 por defecto
const port = process.env.PORT || 3000;
```

¿Cómo sabra Heroku que debe ejecutar el server.js como archivo principal? y en caso de recibir parámetros, ¿cómo sabría qué entregar?

Para esto debemos ir al archivo Package.json y agregamos la línea de comando para ejecutar start, ya que este es el comando que heroku ejecutará para levantar nuestra aplicación.



```json
"start": "node server.js",
```

star, es un script de ejecución reconocido y no necesita run para invocarlo desde la consola cmd

```
npm star
```

Para comandos especiales, que fueron creado por nosotros, agregar run
```json
npm run nodemon
```

Heroku trabaja en base a GIT, por ende, debemos hacer lo mismo que para subir a GitHub, por ende, para subir aplicación

inicializar el repositorio
```
git init
```
luego vemos el status de cada archivo y veremos que todos están pendientes de grabación (en rojo).
```
git status
```

```
git init
```

```
git init
```