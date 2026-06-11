import { featuredFilm, searchFilms } from "./films";
import Poster from "./Poster";

// Query state lives in FilmApp so the search context survives navigating
// to the Player and coming back.
const HomeScreen = ({ navigate, query, setQuery }) => {
  const hasInput = query.length > 0;
  // Filtering kicks in from 2 characters so a single keystroke never
  // flashes a premature "no results" state.
  const searching = query.trim().length >= 2;
  const results = searching ? searchFilms(query) : searchFilms("");

  return (
    <div className="fh-screen">
      <header className="fh-topbar">
        <span className="fh-wordmark">Filmhaus</span>
        <button
          className="fh-account-chip"
          onClick={() => navigate("#/account")}
          aria-label="Account"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </header>

      <div className="fh-search-row">
        <svg className="fh-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          className="fh-search-input"
          placeholder="Search films…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search films"
        />
        {hasInput && (
          <button
            className="fh-search-clear"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {!searching && (
        <button
          className="fh-hero"
          onClick={() => navigate(`#/film/${featuredFilm.id}`)}
        >
          <Poster film={featuredFilm} className="fh-hero-poster" />
          <div className="fh-hero-shade" />
          <div className="fh-hero-info">
            <div>
              <span className="fh-badge">Featured</span>
              <p className="fh-hero-title">{featuredFilm.title}</p>
              <p className="fh-hero-sub">
                {featuredFilm.director} · {featuredFilm.runtime}
              </p>
            </div>
            <span className="fh-hero-cta">▶ Watch Now</span>
          </div>
        </button>
      )}

      {results.length > 0 ? (
        <div className="fh-grid-section">
          <p className="fh-section-label">
            {searching ? `Results for "${query.trim()}"` : "All Films"}
          </p>
          <div className="fh-grid">
            {results.map((film) => (
              <button
                key={film.id}
                className="fh-card"
                onClick={() => navigate(`#/film/${film.id}`)}
              >
                <Poster film={film} className="fh-card-poster" />
                <div className="fh-card-meta">
                  <p className="fh-card-title">{film.title}</p>
                  <p className="fh-card-sub">
                    {film.runtime} · {film.year}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="fh-empty">
          <p className="fh-empty-emoji" aria-hidden="true">🎬</p>
          <p className="fh-empty-title">No films match "{query.trim()}"</p>
          <p className="fh-empty-body">
            Try a different title, director, or genre.
          </p>
          <button className="fh-btn fh-btn-outline" onClick={() => setQuery("")}>
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
