import { useEffect, useRef, useState } from "react";
import "./FilmApp.css";
import { getCurrentUser, getFavorites, logOut, setFavorites as persistFavorites } from "./auth";
import HomeScreen from "./HomeScreen";
import PlayerScreen from "./PlayerScreen";
import FavoritesScreen from "./FavoritesScreen";
import AccountScreen from "./AccountScreen";
import { LoginScreen, SignUpScreen } from "./AuthScreens";

const parseRoute = () => {
  const hash = window.location.hash || "#/";
  const filmMatch = hash.match(/^#\/film\/([\w-]+)/);
  if (filmMatch) return { name: "player", filmId: filmMatch[1] };
  if (hash.startsWith("#/favorites")) return { name: "favorites" };
  if (hash.startsWith("#/login")) return { name: "login" };
  if (hash.startsWith("#/signup")) return { name: "signup" };
  if (hash.startsWith("#/account")) return { name: "account" };
  return { name: "home" };
};

const TabBar = ({ route, navigate, favoritesCount }) => {
  const tabs = [
    { key: "home", label: "Home", hash: "#/", icon: "⌂" },
    { key: "favorites", label: "Favorites", hash: "#/favorites", icon: "♥" },
    { key: "account", label: "Account", hash: "#/account", icon: "●" },
  ];
  return (
    <nav className="fh-tabbar" aria-label="Main navigation">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`fh-tab ${route.name === tab.key ? "is-active" : ""}`}
          onClick={() => navigate(tab.hash)}
          aria-current={route.name === tab.key ? "page" : undefined}
        >
          <span className="fh-tab-icon" aria-hidden="true">
            {tab.icon}
            {tab.key === "favorites" && favoritesCount > 0 && (
              <span className="fh-tab-count">{favoritesCount}</span>
            )}
          </span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

// Navigation intent (redirect target, pending favorite) is mirrored to
// sessionStorage so it survives browser back/forward inside the auth flow.
const ROUTE_STATE_KEY = "filmhaus.routeState";

const readStoredRouteState = () => {
  try {
    const raw = window.sessionStorage.getItem(ROUTE_STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const storeRouteState = (state) => {
  try {
    if (state) {
      window.sessionStorage.setItem(ROUTE_STATE_KEY, JSON.stringify(state));
    } else {
      window.sessionStorage.removeItem(ROUTE_STATE_KEY);
    }
  } catch {
    // storage unavailable — in-memory state still covers the happy path
  }
};

const FilmApp = () => {
  const [route, setRoute] = useState(parseRoute);
  const [user, setUser] = useState(getCurrentUser);
  const [favorites, setFavorites] = useState(() => getFavorites(getCurrentUser()?.email));
  // Search query lives here so Home keeps its results when the user
  // returns from the Player via back navigation.
  const [searchQuery, setSearchQuery] = useState("");
  const routeStateRef = useRef(null);

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  const navigate = (hash, state = null) => {
    routeStateRef.current = state;
    if (state) storeRouteState(state);
    if (window.location.hash === hash) {
      setRoute(parseRoute());
    } else {
      window.location.hash = hash;
    }
  };

  const toggleFavorite = (filmId) => {
    if (!user) return;
    setFavorites((prev) => {
      const next = prev.includes(filmId)
        ? prev.filter((id) => id !== filmId)
        : [...prev, filmId];
      persistFavorites(user.email, next);
      return next;
    });
  };

  const handleAuthed = (authedUser, routeState) => {
    const intent = routeState || readStoredRouteState();
    setUser(authedUser);
    let favs = getFavorites(authedUser.email);
    const pending = intent?.pendingFavorite;
    if (pending && !favs.includes(pending)) {
      favs = [...favs, pending];
      persistFavorites(authedUser.email, favs);
    }
    setFavorites(favs);
    storeRouteState(null);
    navigate(intent?.next || "#/");
  };

  const handleLogOut = () => {
    logOut();
    setUser(null);
    setFavorites([]);
    navigate("#/");
  };

  const routeState = routeStateRef.current;
  const showTabBar = !["player", "login", "signup"].includes(route.name);

  return (
    <div className="fh-app">
      <div className="fh-frame">
        {route.name === "home" && (
          <HomeScreen navigate={navigate} query={searchQuery} setQuery={setSearchQuery} />
        )}
        {route.name === "player" && (
          <PlayerScreen
            filmId={route.filmId}
            navigate={navigate}
            user={user}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
        {route.name === "favorites" && (
          <FavoritesScreen navigate={navigate} user={user} favorites={favorites} />
        )}
        {route.name === "account" && (
          <AccountScreen navigate={navigate} user={user} onLogOut={handleLogOut} />
        )}
        {route.name === "login" && (
          <LoginScreen navigate={navigate} onAuthed={handleAuthed} routeState={routeState} />
        )}
        {route.name === "signup" && (
          <SignUpScreen navigate={navigate} onAuthed={handleAuthed} routeState={routeState} />
        )}
        {showTabBar && (
          <TabBar route={route} navigate={navigate} favoritesCount={user ? favorites.length : 0} />
        )}
      </div>
    </div>
  );
};

export default FilmApp;
