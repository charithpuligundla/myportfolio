import { useEffect, useState, useRef } from "react";
import "./Home.css";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { Cosmos, Reveal, ProjectCard, usePageFx } from "./Shared";
import { PROJECTS } from "./projectsData";

// Contact email used by the "Get in touch" button
const EMAIL = "charithpuligundla@gmail.com";

const ROLES = ["FULLSTACK DEVELOPER", "FLUTTER DEVELOPER", "PROBLEM SOLVER", "EFFECTIVE COMMUNICATOR"];

const SKILLS = [
  { title: "Programming Languages", items: ["c", "cpp", "java", "python", "javaScript", "TypeScript"] },
  { title: "Frontend", items: ["html", "css", "React", "Tailwind CSS"] },
  { title: "Backend", items: ["nodejs", "Express"] },
  { title: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL"] },
  { title: "Tools & Platforms", items: ["Git", "GitHub", "Docker"] },
  { title: "Special Interests", items: ["Machine Learning", "Data Science", "Data Analytics", "Cybersecurity", "Computer Networks"] },
];
const LABELS = { cpp: "C++", html: "HTML", css: "CSS", javaScript: "JavaScript", nodejs: "Node.js", c: "C", java: "Java", python: "Python", React: "React", Express: "Express", MongoDB: "MongoDB", Git: "Git", Docker: "Docker" };
const HAS_LOGO = new Set(["c", "cpp", "java", "python", "javaScript", "html", "css", "React", "nodejs", "Express", "MongoDB", "Git", "Docker"]);

const EDU = [
  { school: "NIT Andhra Pradesh", level: "B.Tech · CSE", years: "2024 – 2028", score: "8.62", unit: "GPA (current)", place: "Tadepalligudem, West Godavari, AP", now: true },
  { school: "Vivekanandha", level: "Intermediate", years: "2022 – 2024", score: "99.17%", unit: "Mains · 98.4% IPE", place: "Chittoor, AP" },
  { school: "Bhanodaya", level: "10th", years: "2021 – 2022", score: "88.33%", unit: "Secondary", place: "G.D. Nellore, Chittoor, AP" },
];

function useTypewriter(words) {
  const [text, setText] = useState("");
  useEffect(() => {
    let w = 0, c = 0, del = false, t;
    const tick = () => {
      const word = words[w];
      c += del ? -1 : 1;
      setText(word.slice(0, c));
      let d = del ? 40 : 85;
      if (!del && c === word.length) { del = true; d = 1500; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; d = 300; }
      t = setTimeout(tick, d);
    };
    t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, []);
  return text;
}

function SkillChip({ item }) {
  const [failed, setFailed] = useState(false);
  const label = LABELS[item] || item;
  return (
    <span className="chip">
      {HAS_LOGO.has(item) && !failed
        ? <img src={`/logos/${item}.svg`} alt="" loading="lazy" onError={() => setFailed(true)} />
        : <i className="chip-mark">{label.slice(0, 2).toUpperCase()}</i>}
      {label}
    </span>
  );
}

function Home() {
  const typed = useTypewriter(ROLES);
  const form = useRef();
  const navigate = useNavigate();
  const bar = usePageFx();
  const [status, setStatus] = useState("");
  const gmailsendingId = import.meta.env.VITE_GMAIL_SENDING_ID;

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs.sendForm("service_lb950ea", "template_692uxr4", form.current, gmailsendingId).then(
      () => { setStatus("sent"); form.current.reset(); },
      () => setStatus("error")
    );
  };

  const marquee = [...SKILLS.flatMap((s) => s.items).filter((i) => LABELS[i])];

  return (
    <div className="home">
      <Cosmos />
      <div className="spotlight" aria-hidden="true" />
      <div className="progress" ref={bar} />

      <header className="nav">
        <a href="#top" className="logo">CHΛRITH</a>
        <nav>
          <a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a>
          <a href="#education">Education</a><a href="#contact" className="nav-cta">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <h1>Hi, I'm <span className="grad">Charith Puligundla</span></h1>
          <div className="role"><span>I am a</span><h2>{typed}<em /></h2></div>
          <p className="lead">CS Student @ NIT Andhra Pradesh • Full-Stack Developer • ML Developer</p>
          <div className="actions">
            <a className="btn primary" href="/Resume.pdf" target="_blank" rel="noopener noreferrer">View resume <span>↗</span></a>
            <a className="btn ghost" href={`mailto:${EMAIL}?subject=${encodeURIComponent("Hello Charith")}`}>Get in touch <span>✉</span></a>
          </div>
          <div className="socials">
            <a href="https://www.linkedin.com/in/charith-chowdari-puligundla-7b2210337/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><img src="/logos/linkedinLogo.png" alt="" /></a>
            <a href="https://github.com/charithpuligundla" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><img src="/logos/githubLogo.png" alt="" /></a>
            <a href="https://leetcode.com/u/charithpuligundla/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode"><img src="/logos/LeetCodeLogo.png" alt="" /></a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="portrait">
            <div className="portrait-frame">
              <span className="portrait-ph">CP</span>
              <img src="/cherry-2.jpg" alt="Charith Puligundla" onError={(e) => (e.currentTarget.style.display = "none")} />
              <div className="portrait-tag"><strong>Charith Puligundla</strong><small>B.Tech CSE · NIT Andhra Pradesh</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats" id="about">
        {[["8.62", "Current GPA"], ["99.17%", "JEE Mains"], ["4+", "Featured projects"], ["6", "Skill domains"]].map(([v, l], i) => (
          <Reveal key={l} delay={i * 80} className="stat"><strong>{v}</strong><span>{l}</span></Reveal>
        ))}
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="track">{[...marquee, ...marquee].map((m, i) => <span key={i}>{LABELS[m]}<b>✦</b></span>)}</div>
      </div>

      <section className="section" id="skills">
        <Reveal><h2 className="title">Technical <span className="grad">Skills</span></h2></Reveal>
        <div className="skill-grid">
          {SKILLS.map((g, i) => (
            <Reveal key={g.title} delay={i * 70} className="skill-card">
              <div className="skill-head"><h3>{g.title}</h3><small>{String(g.items.length).padStart(2, "0")}</small></div>
              <div className="chips">{g.items.map((it) => <SkillChip key={it} item={it} />)}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <Reveal><h2 className="title">Things I've <span className="grad">built</span></h2></Reveal>
        <div className="project-grid">
          {PROJECTS.slice(0, 4).map((p, i) => <Reveal key={p.name} delay={i * 90}><ProjectCard p={p} n={i + 1} /></Reveal>)}
        </div>
        <Reveal className="more-wrap">
          <button className="btn primary" onClick={() => navigate("/projects")}>View more projects <span>→</span></button>
        </Reveal>
      </section>

      <section className="section" id="education">
        <Reveal><h2 className="title"><span className="grad">Education</span></h2></Reveal>
        <div className="timeline">
          {EDU.map((e, i) => (
            <Reveal key={e.school} delay={i * 100} className={`edu ${e.now ? "now" : ""}`}>
              <span className="dot" />
              <div className="edu-main"><small>{e.years}</small><h3>{e.school}</h3><p>{e.level}</p><p className="place">📍 {e.place}</p></div>
              <div className="edu-score"><strong>{e.score}</strong><span>{e.unit}</span></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="contact">
        <Reveal className="contact">
          <div className="contact-copy">
            <p className="kicker">Contact</p>
            <h2 className="title">Let's build something <span className="grad">together</span></h2>
            <p className="lead">Have an idea, an internship, an Oppurtunity or need to hire me ?Just Drop a message and I'll get back to you soon.</p>
          </div>
          <form ref={form} onSubmit={sendEmail}>
            <label><span>Name</span><input name="name" placeholder="Your name" required /></label>
            <label><span>Email</span><input name="email" type="email" placeholder="you@example.com" required /></label>
            <label><span>Message</span><textarea name="message" rows="4" placeholder="Tell me about your idea…" required /></label>
            <button className="btn primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"} <span>→</span></button>
            {status === "sent" && <p className="note ok">Message sent. Thank you!</p>}
            {status === "error" && <p className="note bad">Couldn't send. Please try again.</p>}
          </form>
        </Reveal>
      </section>
    </div>
  );
}

export default Home;
