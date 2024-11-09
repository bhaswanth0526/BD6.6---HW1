const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const { getAllMovies, getMoviesById } = require('./controllers');

app.get('/movies', async (req, res) => {
  let movies = getAllMovies();
  res.json({movies});
});

app.get('/movies/details/:id', async (req, res) => {
  let movie = await getMoviesById(parseInt(req.params.id));
  res.json({movie,});
});

module.exports = { app };