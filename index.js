const express = require('express'); // imports en node js sin ninguna configuracion, 
//cuando se agregan los traspiladores en vez de require se realizan imports
const app = express(); //creacion de instancia app, la parte de express como función y se puede reducir :
//const app = requiere(express)();  esta forma haria las dos instrucciones anteriores en una sola
const port = process.env.port || 3000; //se instancia el puerto, que por lo regular el puerto es el 3000

// config para recibir info, explica que dentro de express acepte los json, permite que nuestra
//petición post reciba información desde el body
app.use(express.json())

let peliculas = [ // corchetes = arreglos
    { // llaves = json / objetojs
        // key = variable : value = valor
        id: 1,
        nombre: "Pixeles",
        narrativa: 'Los video juegos se vuelven realidad gracias a la llegada de una tecnologia extraterrestre que interpreto mal los video juegos viendolo como declaracion de guerra',
        renta: 100 ,
        duracion: "1hora 30 minutos",
        genero: "animacion, comedia"
    },
    {
        id: 2,
        nombre: "John Wick",
        narrativa: 'Pelicula de accion sobre un justiciero, algo sangrienta',
        renta: 30,
        duracion: "1hora 15 minutos",
        genero: "accion"
    },
    {
        id: 3,
        nombre: "Top Gun, Maverick" ,
        narrativa: 'Los pilotos elite de estados unidos que son enviados a diferentes misiones',
        renta: 30,
        duracion: "2 horas 10 minutos",
        genero: "accion, aventura"
    }
]


// req = request ( lo que recibimos de lado front )
// res = response ( lo que mandamos )
app.get('/pelicula/todas', (req, res) => {
    res
        .status(200)
        .json({
            mensaje: 'Presentamos la lista de peliculas de nuestra plataforma:',
            peliculas: peliculas
        })
        .send()
})

app.get('/pelicula/:id', (req, res) => {
    console.log(typeof req.params.id)
    res
        .status(200)
        .json({
            mensaje: 'Pelicula elegida correctamente',
            peliculas: peliculas.find(peliculas => peliculas.id == req.params.id)
        })
        .send()
})

app.post('/pelicula', (req, res) => {
    const { id, nombre, narrativa, renta, duracion, genero } = req.body; // destructoring  = extraer toda la info de un json/objectjs
    peliculas.push({
        id: id,
        nombre: nombre, 
        narrativa: narrativa,
        renta: renta,
        duracion: duracion,
        genero: genero
    })
    res
        .status(201)
        .json({
            mensaje: 'Se ha agregado una nueva pelicula ',
            peliculas: peliculas
        })
        .send()
})
//EL VERBO PUT ES PARA ACTUALIZAR
app.put('/pelicula/:id', (req, res) => {
    const{id} =req.params; // Destructoring
    const {nombre, narrativa, renta, duracion, genero}=req.body; //lo que se requiere leer para actualizar
    const auxPeliculas=peliculas.filter( peliculas=> peliculas.id !==Number(id)) //traera todo lo que no se parece al id
    auxPeliculas.push({
        id: Number(id),
        nombre: nombre, 
        narrativa: narrativa,
        renta: renta,
        duracion: duracion,
        genero: genero
    })
    peliculas=auxPeliculas
    res
    .status(201)
    .json({
        mensaje: 'Se ha Actualizado correctamente una nueva pelicula ',
        peliculas: peliculas
    })
    .send()
})

app.delete('/pelicula/:id', (req, res) => {
    const{id} =req.params; // Destructoring
    peliculas=peliculas.filter( peliculas=> peliculas.id !==Number(id)) //traera todo lo que no se parece al id
    res
    .status(200)
    .json({
        mensaje: 'Se ha Eliminado correctamente ',
        peliculas: peliculas
    })
    .send()
})

// servidor
app.listen(port, () => {
    console.log('Servidor funcionando en el puerto: ' + port)
});

