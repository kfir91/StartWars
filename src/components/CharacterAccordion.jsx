import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../store/slices/moviesSlice';

const CharacterAccordion = ({ movie }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  
  const characters = useSelector(state => state.movies.characters[movie.episode_id] || []);
  const isLoadingCharacters = useSelector(state => state.movies.loadingCharacters[movie.episode_id] || false);

  const handleToggle = () => {
    if (!isOpen && characters.length === 0 && !isLoadingCharacters) {
      dispatch(fetchCharacters({
        movieId: movie.episode_id,
        characterUrls: movie.characters
      }));
    }
    setIsOpen(!isOpen);
  };

  const formatValue = (value, unit = '') => {
    if (!value || value === 'unknown' || value === 'n/a') {
      return 'Unknown';
    }
    return unit ? `${value} ${unit}` : value;
  };

  const renderCharacterCard = (character, index) => (
    <div key={index} className="character-card">
      <div className="character-header">
        <h4 className="character-name">{character.name}</h4>
        <div className="character-badges">
          <span className="character-badge">{character.gender}</span>
        </div>
      </div>
      
      <div className="character-body">
        <div className="character-stats">
          <div className="stat-group">
            <div className="stat-item">
              <div className="stat-info">
                <span className="stat-label">Birth Year</span>
                <span className="stat-value">{formatValue(character.birth_year)}</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-info">
                <span className="stat-label">Height</span>
                <span className="stat-value">{formatValue(character.height, 'cm')}</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-info">
                <span className="stat-label">Mass</span>
                <span className="stat-value">{formatValue(character.mass, 'kg')}</span>
              </div>
            </div>
          </div>
          
          <div className="appearance-group">
            <div className="appearance-item">
              <span className="appearance-label">Hair: {formatValue(character.hair_color)}</span>
            </div>
            
            <div className="appearance-item">
              <span className="appearance-label">Eyes: {formatValue(character.eye_color)}</span>
            </div>
            
            <div className="appearance-item">
              <span className="appearance-label">Skin: {formatValue(character.skin_color)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="character-accordion">
      <button
        onClick={handleToggle}
        className={`accordion-toggle ${isOpen ? 'open' : ''}`}
        aria-expanded={isOpen}
      >
        <div className="toggle-content">
          <div className="toggle-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div className="toggle-text">
            <span className="toggle-title">Characters</span>
            <span className="toggle-count">({movie.characters.length} characters)</span>
          </div>
        </div>
        <div className="toggle-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="6,9 12,15 18,9"/>
          </svg>
        </div>
      </button>
      
      <div className={`accordion-panel ${isOpen ? 'open' : ''}`}>
        <div className="panel-content">
          {isLoadingCharacters ? (
            <div className="loading-state">
              <div className="loading-spinner">
                <div className="spinner-ring"></div>
              </div>
              <span className="loading-message">Loading characters from a galaxy far, far away...</span>
            </div>
          ) : characters.length > 0 ? (
            <div className="characters-list">
              {characters.map((character, index) => renderCharacterCard(character, index))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CharacterAccordion;
