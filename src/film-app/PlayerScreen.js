import { useState } from "react";
import { getFilmById } from "./films";
import AuthGateSheet from "./AuthGateSheet";

const HeartIcon = ({ filled }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const PlayerScreen = ({ filmId, navigate, user, favorites, onToggleFavorite }) => {
  const film = getFilmById(filmId);
  const [expanded, setExpanded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  if (!film) {
    return (
      <div className="fh-screen fh-empty">
        <p className="fh-empty-title">Film not found</p>
        <button className="fh-btn fh-btn-primary" onClick={() => navigate("#/")}>
          Browse Films
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(film.id);

  const handleHeart = () => {
    if (!user) {
      setGateOpen(true);
      return;
    }
    onToggleFavorite(film.id);
  };

  return (
    <div className="fh-screen fh-player-screen">
      <button
        className="fh-back-link"
        onClick={() => {
          // Preserve where the user came from (e.g. an active search);
          // fall back to home when the player was opened directly.
          if (window.history.length > 1) {
            window.history.back();
          } else {
            navigate("#/");
          }
        }}
      >
        ← Films
      </button>

      <div className="fh-video-frame">
        {videoFailed ? (
          <div className="fh-video-error">
            <p className="fh-empty-emoji" aria-hidden="true">📽️</p>
            <p>This film couldn't be loaded right now.</p>
            <button
              className="fh-btn fh-btn-outline"
              onClick={() => navigate("#/")}
            >
              Try another film
            </button>
          </div>
        ) : (
          <video
            key={film.id}
            src={film.video}
            poster={film.poster || undefined}
            controls
            autoPlay
            playsInline
            preload="metadata"
            onError={() => setVideoFailed(true)}
          />
        )}
      </div>

      <div className="fh-player-body">
        <h1 className="fh-film-title">{film.title}</h1>
        <div className="fh-film-badges">
          <span className="fh-badge fh-badge-soft">Dir. {film.director}</span>
          <span className="fh-badge fh-badge-line">{film.year}</span>
          <span className="fh-badge fh-badge-line">{film.runtime}</span>
          <span className="fh-badge fh-badge-line">{film.genre}</span>
        </div>

        <button
          className={`fh-btn fh-heart-btn ${isFavorite ? "is-favorited" : ""}`}
          onClick={handleHeart}
          aria-pressed={isFavorite}
        >
          <HeartIcon filled={isFavorite} />
          {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
        </button>

        <p className={`fh-film-desc ${expanded ? "" : "is-clamped"}`}>
          {film.description}
        </p>
        <button
          className="fh-link-btn"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      </div>

      {gateOpen && (
        <AuthGateSheet
          onLogin={() => navigate("#/login", { next: `#/film/${film.id}`, pendingFavorite: film.id })}
          onSignUp={() => navigate("#/signup", { next: `#/film/${film.id}`, pendingFavorite: film.id })}
          onDismiss={() => setGateOpen(false)}
        />
      )}
    </div>
  );
};

export default PlayerScreen;
