const { response } = require('express');
const express = require('express');
const port = 8080;
const app = express();


app.get('/', (req, res) => {
  res.send('Hello Heroku World!');
})

app.listen(process.env.PORT || port, () => {
  console.log(`Node app is listening on port ${process.env.PORT || port} 🚀🚀🚀!`);
})
