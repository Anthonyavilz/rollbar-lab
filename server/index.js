const express = require('express')
const cors = require('cors')
const {getAllMovies, deleteMovie, createMovie, updateMovie} = require('./controller')


const app = express()

app.use(express.json())
app.use(cors())

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'd56fa74d32a04b0196460e11c85765ed',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')


app.get('/api/movies', getAllMovies)
app.delete('/api/movies/:id', deleteMovie)
app.post('/api/movies', createMovie)
app.put('/api/movies/:id', updateMovie)


app.listen(4004, () => console.log('Running on port 4004'))