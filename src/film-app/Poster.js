import { useState } from "react";

// Poster tries the film's still image first; if the CDN is unreachable it
// falls back to a per-film gradient card so the grid never shows broken images.
const Poster = ({ film, className = "" }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const [c1, c2] = film.accent;
  const showImg = film.poster && !imgFailed;

  return (
    <div
      className={`fh-poster ${className}`}
      style={{ background: `linear-gradient(160deg, ${c1} 0%, ${c2} 100%)` }}
    >
      {showImg && (
        <img
          src={film.poster}
          alt=""
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      )}
      {!showImg && (
        <div className="fh-poster-fallback" aria-hidden="true">
          <span className="fh-poster-genre">{film.genre}</span>
          <span className="fh-poster-title">{film.title}</span>
        </div>
      )}
    </div>
  );
};

export default Poster;
