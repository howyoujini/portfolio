import React from "react";
import IntroSection from "./components/IntroSection";
import { Link } from "react-scroll";
import "./App.css";

const Navigation = () => {
  return (
    <nav className="fixed-nav">
      <Link to="intro-section" spy={true} smooth={true} activeClass="active">
        <div className="nav-button"></div>
      </Link>
      <Link to="about-section" spy={true} smooth={true} activeClass="active">
        <div className="nav-button"></div>
      </Link>
      <Link to="contact-section" spy={true} smooth={true} activeClass="active">
        <div className="nav-button"></div>
      </Link>
    </nav>
  );
};

const App = () => {
  return (
    <div>
      <section id="intro-section">
        <IntroSection />
      </section>
    </div>
  );
};

export default App;
