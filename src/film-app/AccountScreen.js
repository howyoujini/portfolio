const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("") || "?";

const AccountScreen = ({ navigate, user, onLogOut }) => (
  <div className="fh-screen">
    <header className="fh-page-header">
      <h1>Account</h1>
    </header>

    {user ? (
      <div className="fh-account-body">
        <div className="fh-avatar">{initials(user.name)}</div>
        <p className="fh-account-name">{user.name}</p>
        <p className="fh-account-email">{user.email}</p>
        <div className="fh-account-actions">
          <button
            className="fh-btn fh-btn-outline"
            onClick={() => navigate("#/favorites")}
          >
            ♥ My Favorites
          </button>
          <button className="fh-btn fh-btn-ghost" onClick={onLogOut}>
            Sign Out
          </button>
        </div>
      </div>
    ) : (
      <div className="fh-empty">
        <div className="fh-avatar fh-avatar-muted" aria-hidden="true">?</div>
        <p className="fh-empty-title">You're browsing as a guest</p>
        <p className="fh-empty-body">
          Create an account to save favorites and sync them across devices.
        </p>
        <button
          className="fh-btn fh-btn-primary"
          onClick={() => navigate("#/login", { next: "#/account" })}
        >
          Log In
        </button>
        <button
          className="fh-btn fh-btn-outline"
          onClick={() => navigate("#/signup", { next: "#/account" })}
        >
          Sign Up
        </button>
      </div>
    )}
  </div>
);

export default AccountScreen;
