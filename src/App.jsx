import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import { fetchMovies } from './store/slices/moviesSlice';

function App() {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const filteredMovies = useMemo(() => {
    if (!searchTerm.trim()) {
      return movies;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(searchLower) ||
      movie.director.toLowerCase().includes(searchLower) ||
      movie.producer.toLowerCase().includes(searchLower) ||
      movie.opening_crawl.toLowerCase().includes(searchLower) ||
      movie.episode_id.toString().includes(searchLower)
    );
  }, [movies, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-yellow-400 text-2xl font-bold mb-8">
            Loading Star Wars movies...
          </div>
          <div className="loading-spinner mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-red-500 text-3xl font-bold mb-4">Error</h2>
          <p className="text-white text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-header">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search movies by title, director, producer, or episode..."
        />
      </div>
      
      <main className="movies-container">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.episode_id} movie={movie} />
          ))
        ) : searchTerm ? (
          <div className="no-results">
            <h3>No movies found</h3>
            <p>No movies match your search criteria for "<span className="search-term">{searchTerm}</span>"</p>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;
