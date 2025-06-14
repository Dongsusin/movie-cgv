import React from "react";
import movies from "../data/movies.json";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleTicketView = () => {
    navigate("/ticket");
  };

  return (
    <div className="home-container">
      <h1>🎬 영화 목록</h1>
      <button className="view-ticket-button" onClick={handleTicketView}>
        예매 티켓 보기
      </button>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
