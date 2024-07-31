import "./MovieCard.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/film/${movie.imdbID}`);
  };
  return (
    <div className="card-container">
      <div className="card-img-container" onClick={handleClick}>
        <img src={movie.Poster} to={"/movie.imdbID"} className="card-img" />
      </div>
    </div>
  );
};

export default MovieCard;
