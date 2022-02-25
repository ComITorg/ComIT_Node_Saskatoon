const { response } = require('express');
const express = require('express');
const port = 8000;
const app = express();


app.get('/', (req, res) => {
  res.send('Hello Heroku World!');
})

app.listen(port, () => {
  console.log(`Node app is listening on port ${port} 🚀🚀🚀!`);
})