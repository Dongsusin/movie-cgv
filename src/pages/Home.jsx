import { useRef, useEffect, useState } from "react";
import movies from '../data/movies.json';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';

const allGenres = ['전체', '액션', '코미디', '드라마', '로맨스', 'SF', '스릴러','범죄','애니메이션','모험','판타지','전기','역사','가족'];

const Home = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth >= 1024 ? 20 : 10);
  const filteredMovies = movies.filter(movie => {
    const matchesGenre = selectedGenre === '전체' || movie.genre.includes(selectedGenre);
    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesGenre && matchesSearch;
  });
  const getRandomSamples = (arr, n) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

const randomMovies = getRandomSamples(filteredMovies, 5);
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedMovies = filteredMovies.slice(startIdx, startIdx + itemsPerPage);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 1024 ? 20 : 10);
    };

    window.addEventListener('resize', updateItemsPerPage);
    updateItemsPerPage();

    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
    };
    window.onYouTubeIframeAPIReady = () => {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        if (iframe.src.includes('youtube.com/embed')) {
          new window.YT.Player(iframe, {
            events: {
              onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.PLAYING) {
                  sliderRef.current?.slickPause();
                } else if (
                  event.data === window.YT.PlayerState.PAUSED ||
                  event.data === window.YT.PlayerState.ENDED
                ) {
                  sliderRef.current?.slickPlay();
                }
              }
            }
          });
        }
      });
    };

    loadYouTubeAPI();
  }, []);

  const handleTicketView = () => {
    navigate("/ticket");
  };

  const handleBookNow = (movie) => {
    navigate("/booking", { state: { movie } });
  };

  return (
    <div className="home">
      <h1>영화 프로젝트</h1>
      <button className="view-ticket-button" onClick={handleTicketView}>
        예매 티켓 보기
      </button>
      <div className="trailers">
      <Slider
        ref={sliderRef}
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        arrows={true}
      >
        {randomMovies.map(movie => (
          <div key={movie.id} className="trailer-slide">
            <div className="video-wrapper">
              <iframe
                src={movie.trailer}
                title={`${movie.title} 예고편`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </Slider>
      </div>

      <h1>영화 목록</h1>

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
        {paginatedMovies.map(movie => (
          <div key={movie.id} className="movie-card-with-button">
            <MovieCard movie={movie} />
            <button className="book-now-btn" onClick={() => handleBookNow(movie)}>
              예매하기
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? 'page-btn active' : 'page-btn'}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
