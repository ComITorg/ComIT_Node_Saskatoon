const oneLinerJoke = require('one-liner-joke')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req,res) => {
  const getRandomJoke = oneLinerJoke.getRandomJoke();
  res.json(getRandomJoke)
})

app.listen(port, () => console.log(`Open at http://localhost:${port}`))