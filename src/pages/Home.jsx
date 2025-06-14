import { useState } from 'react';
import movies from '../data/movies.json';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const allGenres = ['전체', '액션', '코미디', '드라마', '로맨스', 'SF', '스릴러'];

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('전체');

  const handleTicketView = () => {
    navigate("/ticket");
  };

  const handleBookNow = (movie) => {
    navigate("/booking", { state: { movie } });
  };

  const filteredMovies = movies.filter(movie => {
    const matchesGenre = selectedGenre === '전체' || movie.genre.includes(selectedGenre);
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="home">
      <h1>🎬 영화 목록</h1>
      <button className="view-ticket-button" onClick={handleTicketView}>
        예매 티켓 보기
      </button>

      <input
        type="search"
        placeholder="영화 제목 또는 장르로 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="genre-filter">
        {allGenres.map((genre) => (
          <button
            key={genre}
            className={genre === selectedGenre ? 'genre-btn active' : 'genre-btn'}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="movie-list">
        {filteredMovies.map(movie => (
          <div key={movie.id} className="movie-card-with-button">
            <MovieCard movie={movie} />
            <button className="book-now-btn" onClick={() => handleBookNow(movie)}>
              예매하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
