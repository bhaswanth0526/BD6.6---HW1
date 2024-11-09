let request = require('supertest');
let { app } = require('../index.js');
let { getAllMovies, getMoviesById } = require('../controllers');
let http = require('http');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllMovies: jest.fn(),
  getMoviesById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3000, done)
});

afterAll((done) => {
  server.close(done);
});

describe('Controllers Function Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all movies', () => {
    let mockMovies = [
      {
        'movieId': 1,
        'title': 'Inception',
        'genre': 'Sci-Fi',
        'director': 'Christopher Nolan'
      },
      {
        'movieId': 2,
        'title': 'The Shawshank Redemption',
        'genre': 'Drama',
        'director': 'Frank Darabont'
      },
      {
        'movieId': 3,
        'title': 'The Godfather',
        'genre': 'Crime',
        'director': 'Francis Ford Coppola'
      }
    ];

    getAllMovies.mockReturnValue(mockMovies);
    let result = getAllMovies();
    expect(result).toEqual(mockMovies);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoints tests', () => {
  it('GET /movies should get all movies', async () => {
    const res = await request(server).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      movies: [
        {
          'movieId': 1,
          'title': 'Inception',
          'genre': 'Sci-Fi',
          'director': 'Christopher Nolan'
        },
        {
          'movieId': 2,
          'title': 'The Shawshank Redemption',
          'genre': 'Drama',
          'director': 'Frank Darabont'
        },
        {
          'movieId': 3,
          'title': 'The Godfather',
          'genre': 'Crime',
          'director': 'Francis Ford Coppola'
        }
      ]      
    });
    expect(res.body.movies.length).toBe(3);
  });

  it('GET /movies/details/:id should get a movie by ID', async () => {
    const mockMovie = {
      'movieId': 1,
      'title': 'Inception',
      'genre': 'Sci-Fi',
      'director': 'Christopher Nolan'
    };

    getMoviesById.mockResolvedValue(mockMovie);
    const res = await request(server).get('/movies/details/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      movie: mockMovie
    });
  });
});