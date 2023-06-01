const movies = require('./db.json')
let globalId = 11

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'd56fa74d32a04b0196460e11c85765ed',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

module.exports = {
    getAllMovies: (req, res) => {
        rollbar.log('Someone accessed the site')
        res.status(200).send(movies)
    },

    deleteMovie: (req, res) => {
        const {id: paramID} = req.params
        // const id = req.params.id
        // this above is the same thing as the deconstrucing thing 
        
        let index = movies.findIndex(movies => movies.id === +paramID)
        console.log(movies[index])
        movies.splice(index, 1)

        rollbar.warning('Someone deleted a movie')
        res.status(200).send(movies)
    },

    createMovie: (req, res) => {
        
        let newMovie = {
            id: globalId,
            title: req.body.title,
            ratings: req.body.ratings,
            imageUrl: req.body.imageUrl 
        }

        movies.push(newMovie)
        globalId++
        
        rollbar.warning('Someone added a movie')
        res.status(200).send(movies)
    },

    updateMovie: (req, res) => {

        const {type} = req.body

        let index = movies.findIndex((movie) => movie.id === +req.params.id)

        if(type === 'plus' && movies[index].rating === 5){
            rollbar.critical('Someone tried to go above 5')
            res.status(400).send('Cannot go above 5')
        } else if(type === 'minus' && movies[index].rating === 0){
            rollbar.critical('Someone tried to go below 0')
            res.status(400).send('Cannot go below 0')
        } else if(type === 'plus'){
            movies[index].rating++
            res.status(200).send(movies)
        } else if(type === 'minus'){
            movies[index].rating--
            res.status(200).send(movies)
        }

    }
}