import { useState } from 'react';
import movies from '../data/movies.json';
import MovieCard from '../components/MovieCard';
import './Home.css';

const allGenres = ['전체', '액션', '코미디', '드라마', '로맨스', 'SF', '스릴러']; // 실제 데이터 장르 맞게 변경

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('전체');

  // 장르 필터링 + 검색어 필터링 적용
  const filteredMovies = movies.filter(movie => {
    const matchesGenre = selectedGenre === '전체' || movie.genre.includes(selectedGenre);
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="home">
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
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
