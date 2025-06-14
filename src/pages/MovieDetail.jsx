import { useParams, useNavigate } from 'react-router-dom';
import movies from '../data/movies.json';
import './MovieDetail.css';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return <h2>해당 영화를 찾을 수 없습니다.</h2>;
  }

  return (
    <div className="movie-detail">
      <button onClick={() => navigate(-1)} className="back-button">← 뒤로가기</button>
      <div className="movie-content">
        <img src={movie.poster} alt={movie.title} className="detail-poster" />
        <div className="detail-info">
          <h1>{movie.title}</h1>
          <p><strong>⭐ 평점:</strong> {movie.rating}</p>
          <p><strong>🎬 장르:</strong> {movie.genre.join(', ')}</p>
          <p><strong>📅 개봉일:</strong> {movie.releaseDate}</p>
          <p><strong>⏱️ 러닝타임:</strong> {movie.runningTime}분</p>
          <p><strong>📖 줄거리:</strong> {movie.description}</p>
          <iframe
            width="560"
            height="315"
            src={movie.trailer}
            title="예고편"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
