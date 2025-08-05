import CharacterAccordion from './CharacterAccordion';

const MovieCard = ({ movie }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="sw-gradient-bg border-2 border-transparent rounded-lg p-6 shadow-lg relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6 border-b border-yellow-400 border-opacity-30 pb-4">
          <h2 className="text-2xl font-black text-yellow-400 flex-1 mr-4">
            {movie.title}
          </h2>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-3 py-1 rounded-full font-bold text-sm whitespace-nowrap shadow-lg">
            Episode {movie.episode_id}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center text-sm">
              <strong className="text-yellow-400 font-semibold min-w-32 mb-1 sm:mb-0 sm:mr-3">
                Release Date:
              </strong>
              <span className="text-white">{formatDate(movie.release_date)}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center text-sm">
              <strong className="text-yellow-400 font-semibold min-w-32 mb-1 sm:mb-0 sm:mr-3">
                Director:
              </strong>
              <span className="text-white">{movie.director}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-start text-sm">
              <strong className="text-yellow-400 font-semibold min-w-32 mb-1 sm:mb-0 sm:mr-3">
                Producer:
              </strong>
              <span className="text-white">{movie.producer}</span>
            </div>
          </div>
          
          <div className="border-t border-yellow-400 border-opacity-30 pt-4">
            <h3 className="text-yellow-400 font-bold text-lg mb-3 uppercase tracking-wide">
              Opening Crawl
            </h3>
            <div className="max-h-48 overflow-y-auto scrollbar-thin">
              <p className="text-white leading-relaxed text-sm text-justify opacity-90 pr-2">
                {movie.opening_crawl}
              </p>
            </div>
          </div>
          
          <CharacterAccordion movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
