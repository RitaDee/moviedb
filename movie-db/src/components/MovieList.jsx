import { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from './Navbar';
import MovieCard from './MovieCard';

const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchMovies(API_URL);
  }, []);

  const fetchMovies = async (url) => {
    try {
      const response = await Axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const searchMovie = async (e) => {
    e.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=d2f7d216c49d9023f417027b471e0d24&query=${query}`;
    fetchMovies(url);
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar query={query} changeHandler={changeHandler} searchMovie={searchMovie} />
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((movieReq) => (
          <MovieCard key={movieReq.id} {...movieReq} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
