import { useState } from "react";
import PropTypes from "prop-types";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

const MovieCard = ({
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
}) => {
  const imageUrl = `${API_IMG}${poster_path}`;

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="max-w-sm bg-grey rounded-lg overflow-hidden shadow-lg m-3 p-1 border-gray-500 border">
      <img src={imageUrl} alt={title} className="w-full h-72" />
      <button
        className="bg-blue-500 mt-4 text-white px-4 py-2 w-full"
        onClick={handleShow}
      >
        View More
      </button>

      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-gray-800 backdrop-blur-3xl opacity-90"
            onClick={handleClose}
          >

          </div>
          <div className="max-w-lg relative bg-white  text-black rounded-lg overflow-hidden shadow-lg m-4">
          <img className="h-72 w-full object-cover" src={imageUrl} alt={title} />
          <div className="p-8">
            <h3 className="text-2xl font-semibold my-2">{title}</h3>
            <p>IMDb: {vote_average}</p>
            <p>Release Date: {release_date}</p>
            <h6 className="my-2 font-bold">Overview</h6>
            <p className="line-clamp-4">{overview}</p>
            <button
              className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4"
              onClick={handleClose}
            >
              Close
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired, 
  poster_path: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  release_date: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
};

export default MovieCard;
