import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "./Projects.css";
import { Cosmos, Reveal, ProjectCard, usePageFx } from "./Shared";
import { PROJECTS, CATEGORIES } from "./projectsData";

function Projects() {
  const navigate = useNavigate();
  const bar = usePageFx();
  const [cat, setCat] = useState("All");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const list = cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);
  const count = (c) => (c === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === c).length);
  const back = (e) => { e.preventDefault(); navigate("/"); };

  return (
    <div className="home projects-page">
      <Cosmos />
      <div className="spotlight" aria-hidden="true" />
      <div className="progress" ref={bar} />

      <header className="nav">
        <a href="/" className="logo" onClick={back}>CHΛRITH</a>
        <nav>
          <a href="/" onClick={back}>← Back to portfolio</a>
          <a href="https://github.com/charithpuligundla" target="_blank" rel="noopener noreferrer" className="nav-cta">GitHub ↗</a>
        </nav>
      </header>

      <section className="pp-hero">
        <h1>All my <span className="grad">projects</span></h1>
        <p className="lead">Web apps, ML Models, games and mobile experiments, each built to solve a real problem and teach me something new.</p>
        <div className="pp-stats">
          <div><strong>{String(PROJECTS.length).padStart(2, "0")}</strong><span>Projects</span></div>
          <div><strong>{String(count("Full Stack")).padStart(2, "0")}</strong><span>Full stack</span></div>
          <div><strong>College Cart</strong><span>Favourite Project</span></div>
          <div><strong>LongHand</strong><span>Innovative Project</span></div>
        </div>
      </section>

      <section className="pp-body">
        <div className="project-grid" key={cat}>
          {list.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}><ProjectCard p={p} n={PROJECTS.indexOf(p) + 1} /></Reveal>
          ))}
        </div>
      </section>

      <section className="pp-cta">
        <Reveal className="pp-cta-box">
          <h2>Like what you see?</h2>
          <p>Let's talk about your next idea, internship or collaboration.</p>
          <div className="actions">
            <a className="btn primary" href="/" onClick={back}>Back to portfolio <span>→</span></a>
            <a className="btn ghost" href="https://github.com/charithpuligundla" target="_blank" rel="noopener noreferrer">More on GitHub <span>↗</span></a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default Projects;
