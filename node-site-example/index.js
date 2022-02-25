const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 8000;
const url = process.env.MONGODB_URL;
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.listen(port, () => {
  console.log(`Server is running on port ${port} 🚀🚀🚀`)
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // generate new name 
  }
})

const upload = multer({dest: 'public/img', storage: storage});
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  MongoClient.connect(url, function(err, client) {
    const db = client.db('comics');
    const collection = db.collection('superheroes');
    collection.find({}).toArray((error, documents) => {
      client.close();
      res.render('index', { superheroes: documents });
    })
  });
});


app.get('/superheroes/:superheroId', (req, res) => {
  MongoClient.connect(url, function(err, client) {
    const db = client.db('comics');
    const collection = db.collection('superheroes');
    collection.find({}).toArray((error, documents) => {
      client.close();
      res.render('superhero', { superhero: documents.find(superhero => superhero.name === req.params.superheroId)})
    })
  });
});

app.post('/superhero', upload.single('file'), (req, res) => {
  MongoClient.connect(url, function(err, client) {
    const db = client.db('comics');
    const collection = db.collection('superheroes');
    const doc = { "name": req.body.superhero.toUpperCase(), "image": req.file.filename };
    collection.insertOne(doc, (err, result) => {
      client.close();
      res.redirect('/')
    });
  });
});

app.delete('/superheroes/:superheroId', (req, res) => {
  console.log('here')
  MongoClient.connect(url, function(err, client) {
    const db = client.db('comics');
    const collection = db.collection('superheroes');
    console.log(req.params.superheroId);
    const ObjectID = require('mongodb').ObjectID;
    const filter = { name:  req.params.superheroId };
    collection.deleteOne(filter, function(err, result) {
      client.close();
      res.redirect('/')
    });    
  });
});