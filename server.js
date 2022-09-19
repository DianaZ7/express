const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://diana:deathnote.7@cluster0.i2msunp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json())

app.listen(3000, function() {
    console.log('listening on 3000')
  })

  MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('frases-herman')
    const coleccion = db.collection('frases')

    // Insertar una frase a la colección frases
    app.post('/frases', (req, res) => {
        coleccion.insertOne(req.body)
          .then(result => {
            console.log(result)
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })

    // Obtener las frases y mostrarlas en el HTML 
      app.get('/', (req, res) => {
        db.collection('frases').find().toArray()
          .then(results => {
            res.render('index.ejs', { frases: results})
          })
          .catch(error => console.error(error))
        
      })

      // Mandar a reemplazar la frase de Alejandro por la de Herman
      app.put('/frases', (req, res) => {
        coleccion.findOneAndUpdate(
            { nombre: 'Alejandro Orduño' },
            {
              $set: {
                nombre: req.body.nombre,
                frase: req.body.frase
              }
            },
            {
              upsert: true
            }
        )
          .then(result => {
            console.log(result)
            
           })
          .catch(error => console.error(error))
      })
      

      // Eliminar una frase de Herman
      app.delete('/frases', (req, res) => {
        coleccion.deleteOne(
          { nombre: req.body.nombre }
        )
      })

 
  })

  .catch(error => console.error(error))


