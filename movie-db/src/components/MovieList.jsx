import { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import Footer from "./Footer";

const API_KEY = import.meta.env.VITE_API_KEY;
const popularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetchMovies(popularMoviesURL);
  }, []);

  const fetchMovies = async (url) => {
    try {
      setLoading(true); 
      const response = await Axios.get(url);
      setMovies(response.data.results);
      setLoading(false); 
    } catch (error) {
      setError(error); 
      setLoading(false); 
    }
  };

  const searchMovie = async (e) => {
    e.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
    fetchMovies(url);
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  const sortMovies = (movies) => {
    const sortedMovies = movies.slice().sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return dateB - dateA;
    });
    return sortedMovies;
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white pt-24">
      <Navbar query={query} changeHandler={changeHandler} searchMovie={searchMovie} />
      {loading ? (
        <div className="text-center mt-4">Loading...</div>
      ) : error ? (
        <div className="text-center mt-4">Error loading data.</div>
      ) : (
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {sortMovies(movies).map((movieReq) => (
            <MovieCard key={movieReq.id} {...movieReq} />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MovieList;
