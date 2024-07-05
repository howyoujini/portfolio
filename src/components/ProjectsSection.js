import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectsSection.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Scribubble",
    description: "3D 웹 환경에서 함께 낙서할 수 있는 메타버스 그림판",
    link: "https://www.youtube.com/watch?v=12UBC22-zC8",
  },
  { title: "Own love", description: "각자에게도 사랑의 모양이 있다", link: "https://youtu.be/aMips9jhJLM" },
  { title: "Own love", description: "각자에게도 사랑의 모양이 있다", link: "https://youtu.be/aMips9jhJLM" },
  { title: "Own love", description: "각자에게도 사랑의 모양이 있다", link: "https://youtu.be/aMips9jhJLM" },
  { title: "Own love", description: "각자에게도 사랑의 모양이 있다", link: "https://youtu.be/aMips9jhJLM" },
  { title: "Own love", description: "각자에게도 사랑의 모양이 있다", link: "https://youtu.be/aMips9jhJLM" },
  { title: "Own love", description: "각자에게도 사랑의 모양이 있다", link: "https://youtu.be/aMips9jhJLM" },
  { title: "Own love", description: "각자에게도 사랑의 모양이 있다", link: "https://youtu.be/aMips9jhJLM" },
  { title: "Own love", description: "각자에게도 사랑의 모양이 있다", link: "https://youtu.be/aMips9jhJLM" },
  { title: "Own love", description: "각자에게도 사랑의 모양이 있다", link: "https://youtu.be/aMips9jhJLM" },
  { title: "Own love", description: "각자에게도 사랑의 모양이 있다", link: "https://youtu.be/aMips9jhJLM" },
  { title: "Own love", description: "각자에게도 사랑의 모양이 있다", link: "https://youtu.be/aMips9jhJLM" },
  { title: "Own love", description: "각자에게도 사랑의 모양이 있다", link: "https://youtu.be/aMips9jhJLM" },
  { title: "Own love", description: "각자에게도 사랑의 모양이 있다", link: "https://youtu.be/aMips9jhJLM" },
];

const ProjectsSection = () => {
  const projectsRef = useRef(null);

  useEffect(() => {
    gsap.from(projectsRef.current.children, {
      x: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    });
  }, []);

  return (
    <div id="projects-section">
      <div className="horizontal-scroll" ref={projectsRef}>
        {projects.map((project, index) => (
          <div className="card" key={index}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
