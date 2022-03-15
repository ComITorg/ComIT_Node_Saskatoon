const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const { snakeCase } = require('snake-case');


const app = express();
const port = 8000;
const forms = multer();
const url = 'mongodb://localhost:27017';
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(forms.array());

app.listen(port, () => {
  console.log(`Server is running on port ${port} 🚀🚀🚀`)
});

app.use(express.static('public'));

app.set('view engine', 'pug');

app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  MongoClient.connect(url, function(err, client) {
    const db = client.db('blogs');
    const collection = db.collection('blog');
    collection.find({}).toArray((error, documents) => {
      client.close();
      res.render('index', {blogs: documents});
    })
  });
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.get('/blog/:id', (req, res) => {
  MongoClient.connect(url, function(err, client) {
    const db = client.db('blogs');
    const collection = db.collection('blog');
    collection.find({}).toArray((error, documents) => {
      client.close();
      res.render('blog', { blog: documents.find(blog => blog.url === req.params.id)})
    })
  });
});

app.get('/edit_blog/:id', (req, res) => {
  MongoClient.connect(url, function(err, client) {
    const db = client.db('blogs');
    const collection = db.collection('blog');
    collection.find({}).toArray((error, documents) => {
      client.close();
      res.render('edit', { blog: documents.find(blog => blog.url === req.params.id)})
    })
  });
});

app.post('/blog', urlencodedParser, (req, res) => {
  MongoClient.connect(url, function(err, client) {
    const db = client.db('blogs');
    const collection = db.collection('blog');
    const doc = { "url": snakeCase(req.body.name), "name": req.body.name, "description": req.body.description, "body": req.body.body};
    collection.insertOne(doc, (err, result) => {
      client.close();
      res.redirect('/')
    });
  });
});

app.delete('/blog/:id', (req, res) => {
  console.log('here')
  MongoClient.connect(url, function(err, client) {
    const db = client.db('blogs');
    const collection = db.collection('blog');
    const filter = { "url":  req.params.id };
    collection.deleteOne(filter, function(err, result) {
      client.close();
      res.redirect('/')
    });   
  });
});

app.patch('/blog/:id', urlencodedParser, (req, res) => {
  console.log(req.body, 'updating a current blog')
});


app.use((req, res, next) => {
  res.status(404);
  res.render('404');
  return;
});



