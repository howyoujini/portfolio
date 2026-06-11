// Bottom-sheet nudge shown when a guest taps the heart button.
// Keeps the Player visible behind the scrim; dismissing returns to playback.
const AuthGateSheet = ({ onLogin, onSignUp, onDismiss }) => (
  <div className="fh-sheet-root" role="dialog" aria-modal="true" aria-label="Save to favorites">
    <div className="fh-sheet-scrim" onClick={onDismiss} />
    <div className="fh-sheet">
      <div className="fh-sheet-handle" aria-hidden="true" />
      <p className="fh-sheet-title">Save this film to Favorites</p>
      <p className="fh-sheet-sub">
        Create a free account or log in to keep your favorites on every device.
      </p>
      <button className="fh-btn fh-btn-primary" onClick={onLogin}>
        Log In
      </button>
      <button className="fh-btn fh-btn-outline" onClick={onSignUp}>
        Sign Up
      </button>
      <button className="fh-link-btn fh-sheet-dismiss" onClick={onDismiss}>
        Not now
      </button>
    </div>
  </div>
);

export default AuthGateSheet;
