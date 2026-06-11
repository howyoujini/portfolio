// Demo auth + favorites store backed by localStorage.
// Mirrors the shape of a real account API (signUp / logIn / logOut / favorites
// keyed per user) so it can be swapped for a backend without touching the UI.
// NOTE: passwords are kept in plain localStorage — demo only, never production.

const USERS_KEY = "filmhaus.users";
const SESSION_KEY = "filmhaus.session";
const favsKey = (email) => `filmhaus.favorites.${email}`;

const readJSON = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable (private mode) — session-only behavior is fine
  }
};

export const getCurrentUser = () => readJSON(SESSION_KEY, null);

export const signUp = ({ name, email, password }) => {
  const users = readJSON(USERS_KEY, []);
  const normalized = email.trim().toLowerCase();
  if (users.some((u) => u.email === normalized)) {
    return { error: "An account with this email already exists. Try logging in." };
  }
  const user = { name: name.trim(), email: normalized, password };
  writeJSON(USERS_KEY, [...users, user]);
  const session = { name: user.name, email: user.email };
  writeJSON(SESSION_KEY, session);
  return { user: session };
};

export const logIn = ({ email, password }) => {
  const users = readJSON(USERS_KEY, []);
  const normalized = email.trim().toLowerCase();
  const user = users.find((u) => u.email === normalized);
  if (!user || user.password !== password) {
    return { error: "Email or password doesn't match. Please try again." };
  }
  const session = { name: user.name, email: user.email };
  writeJSON(SESSION_KEY, session);
  return { user: session };
};

export const logOut = () => {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
};

export const getFavorites = (email) => (email ? readJSON(favsKey(email), []) : []);

export const setFavorites = (email, ids) => {
  if (email) writeJSON(favsKey(email), ids);
};
