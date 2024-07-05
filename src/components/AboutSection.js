import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.from(textRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    });
  }, []);

  return (
    <div id="about-section">
      <h1 ref={textRef}>감각적인 개발자 홍유진</h1>
      <p>사용자에게 즐거움을 이끌어내는 감각적인 개발자</p>
    </div>
  );
};

export default AboutSection;
