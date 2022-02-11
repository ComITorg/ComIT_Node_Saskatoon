const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const port = 8080;
const urlencodedParser = bodyParser.urlencoded({ extended: false });

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

const superheroes = [
  { id: 1, name: 'SPIDER-MAN', image: 'spiderman.jpg' },
  { id: 2, name: 'CAPAIN MARVEL', image: 'captainmarvel.jpg' },
  { id: 3, name: 'HULK', image: 'hulk.jpg' },
  { id: 4, name: 'THOR', image: 'thor.jpg' },
  { id: 5, name: 'IRON MAN', image: 'ironman.jpg' },
  { id: 6, name: 'DARE DEVEL', image: 'daredevil.jpg' },
  { id: 7, name: 'BLACK WIDOW', image: 'blackwidow.jpg' },
  { id: 8, name: 'CAPTAIN AMERICA', image: 'captainamerica.jpg' },
  { id: 9, name: 'WOLVERINE', image: 'wolverine.jpg' },
]

app.get('/', (req, res) => {
  res.render('index', { superheroes })
});


app.get('/superheroes/:superheroId', (req, res) => {
  res.render('superhero', { superhero: superheroes.find(superhero => superhero.id === parseInt(req.params.superheroId))})
});

app.post('/superhero', upload.single('file'), (req, res) => {
  const id = superheroes[superheroes.length - 1].id + 1;
  superheroes.push({
    id,
    name: req.body.superhero.toUpperCase(),
    image: req.file.filename,
  });
  res.redirect('/')
});







app.listen(port, () => {
  console.log(`Server is running on port ${port} 🚀🚀🚀`)
});

