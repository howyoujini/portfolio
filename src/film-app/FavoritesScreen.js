import { getFilmById } from "./films";
import Poster from "./Poster";

const FavoritesScreen = ({ navigate, user, favorites }) => {
  if (!user) {
    return (
      <div className="fh-screen">
        <header className="fh-page-header">
          <h1>My Favorites</h1>
        </header>
        <div className="fh-empty">
          <div className="fh-empty-icon" aria-hidden="true">♥</div>
          <p className="fh-empty-title">Keep your favorites everywhere</p>
          <p className="fh-empty-body">
            Log in to save films you love and find them on any device.
          </p>
          <button
            className="fh-btn fh-btn-primary"
            onClick={() => navigate("#/login", { next: "#/favorites" })}
          >
            Log In
          </button>
          <button
            className="fh-btn fh-btn-outline"
            onClick={() => navigate("#/signup", { next: "#/favorites" })}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  const films = favorites.map(getFilmById).filter(Boolean);

  return (
    <div className="fh-screen">
      <header className="fh-page-header">
        <h1>My Favorites</h1>
      </header>

      {films.length === 0 ? (
        <div className="fh-empty">
          <div className="fh-empty-icon" aria-hidden="true">♥</div>
          <p className="fh-empty-title">No favorites yet</p>
          <p className="fh-empty-body">
            Tap ♥ on any film while watching to save it here.
          </p>
          <button className="fh-btn fh-btn-primary" onClick={() => navigate("#/")}>
            Browse Films
          </button>
        </div>
      ) : (
        <ul className="fh-fav-list">
          {films.map((film) => (
            <li key={film.id}>
              <button
                className="fh-fav-row"
                onClick={() => navigate(`#/film/${film.id}`)}
              >
                <Poster film={film} className="fh-fav-thumb" />
                <span className="fh-fav-text">
                  <span className="fh-fav-title">{film.title}</span>
                  <span className="fh-fav-sub">
                    {film.director} · {film.runtime}
                  </span>
                </span>
                <span className="fh-fav-chevron" aria-hidden="true">›</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesScreen;
