import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import "./lib/fontawesome/css/all.min.css";
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import MovieCard from './components/MovieCard/MovieCard';
import EmptyPage from './components/EmptyPage';
import { useEffect, useState, useRef } from 'react';

const MoviesPage = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const cancelToken = useRef(null);

  const getMovies = async (pageNumber, query) => {
    cancelToken.current = axios.CancelToken.source();

    try {
      const response = await axios.get('http://www.omdbapi.com?apikey=5431115e', {
        params: {
          s: query || 'movie', 
          page: pageNumber
        },
        cancelToken: cancelToken.current.token
      });

      if (Array.isArray(response.data.Search)) {
        setMovies(response.data.Search);
      } else {
        console.error('Expected Search:', response.data);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled', err.message);
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const pageNumber = parseInt(page) || 1;
    getMovies(pageNumber, searchQuery);

    window.scrollTo(0, 0);
  }, [page, searchQuery]);

  useEffect(() => {
    if (!page || page === '1') {
      navigate(`/1`);
    }
  }, [page, navigate]);

  const handlePrevious = () => {
    const currentPage = parseInt(page) || 1;
    if (currentPage > 1) {
      navigate(`/${currentPage - 1}`);
    }
  };

  const handleNext = () => {
    const currentPage = parseInt(page) || 1;
    navigate(`/${currentPage + 1}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query); 
    navigate(`/1`); 
  };

  return (
    <div>
      <Header />
      <Search onSearch={handleSearch} />
      <div className="movie-list">
        {movies && movies.length > 0 && movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={parseInt(page) <= 1} className='previous'>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button onClick={handleNext} className='next'>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:page" element={<MoviesPage />} />
        <Route path="/" element={<MoviesPage />} />
        <Route path="/izlenecekler" element={<EmptyPage />} />
        <Route path="/film" element={<EmptyPage />} />
        <Route path="/film/:imdbID" element={<EmptyPage />} />
        <Route path="/dizi" element={<EmptyPage />} />
        <Route path="/kirala&&satinal" element={<EmptyPage />} />
        <Route path="/cocuk" element={<EmptyPage />} />
        <Route path="/canlitv" element={<EmptyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
