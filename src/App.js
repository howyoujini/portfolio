import React from "react";
import IntroSection from "./components/IntroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
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
      <Link to="projects-section" spy={true} smooth={true} activeClass="active">
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
      <Navigation />
      <section id="intro-section">
        <IntroSection />
      </section>
      <section id="about-section">
        <AboutSection />
      </section>
      <section id="projects-section">
        <ProjectsSection />
      </section>
      <section id="contact-section">
        <ContactSection />
      </section>
    </div>
  );
};

export default App;
