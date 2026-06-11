import { useState } from "react";
import { logIn, signUp } from "./auth";

const EyeIcon = ({ off }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {off ? (
      <>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </>
    ) : (
      <>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

const PasswordField = ({ value, onChange, autoComplete, placeholder }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="fh-password-wrap">
      <input
        className="fh-input"
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        minLength={4}
      />
      <button
        type="button"
        className="fh-eye-btn"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
      >
        <EyeIcon off={visible} />
      </button>
    </div>
  );
};

export const LoginScreen = ({ navigate, onAuthed, routeState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const fromGate = Boolean(routeState?.pendingFavorite);

  const submit = (e) => {
    e.preventDefault();
    const result = logIn({ email, password });
    if (result.error) {
      setError(result.error);
      return;
    }
    onAuthed(result.user, routeState);
  };

  return (
    <div className="fh-screen fh-auth-screen">
      {fromGate && <span className="fh-badge fh-badge-soft">Log in to save favorites</span>}
      <span className="fh-wordmark fh-auth-mark">Filmhaus</span>
      <h1 className="fh-auth-heading">Log in</h1>

      <form className="fh-form" onSubmit={submit}>
        <label className="fh-label" htmlFor="login-email">Email</label>
        <input
          id="login-email"
          className="fh-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <label className="fh-label" htmlFor="login-password">Password</label>
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          placeholder="••••••••"
        />
        {error && <p className="fh-form-error" role="alert">{error}</p>}
        <button type="submit" className="fh-btn fh-btn-primary">Log In</button>
      </form>

      <p className="fh-auth-alt">
        Don't have an account?{" "}
        <button className="fh-link-btn" onClick={() => navigate("#/signup", routeState)}>
          Sign up
        </button>
      </p>
    </div>
  );
};

export const SignUpScreen = ({ navigate, onAuthed, routeState }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const result = signUp({ name, email, password });
    if (result.error) {
      setError(result.error);
      return;
    }
    onAuthed(result.user, routeState);
  };

  return (
    <div className="fh-screen fh-auth-screen">
      <span className="fh-wordmark fh-auth-mark">Filmhaus</span>
      <h1 className="fh-auth-heading">Create account</h1>
      <p className="fh-auth-sub">Save favorites and pick up where you left off.</p>

      <form className="fh-form" onSubmit={submit}>
        <label className="fh-label" htmlFor="signup-name">Name</label>
        <input
          id="signup-name"
          className="fh-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Maya Park"
          autoComplete="name"
          required
        />
        <label className="fh-label" htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          className="fh-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="maya@example.com"
          autoComplete="email"
          required
        />
        <label className="fh-label" htmlFor="signup-password">Password</label>
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          placeholder="Create a password"
        />
        {error && <p className="fh-form-error" role="alert">{error}</p>}
        <button type="submit" className="fh-btn fh-btn-primary">Create Account</button>
      </form>

      <p className="fh-auth-alt">
        Already have an account?{" "}
        <button className="fh-link-btn" onClick={() => navigate("#/login", routeState)}>
          Log in
        </button>
      </p>
    </div>
  );
};
