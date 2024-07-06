import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  return (
    <div id="contact-section">
      <div className="links">
        <a href="https://github.com/howyoujini" target="_blank" without rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://medium.com/@howyoujini" target="_blank" without rel="noopener noreferrer">
          Medium
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
