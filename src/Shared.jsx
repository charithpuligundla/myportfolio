import { useEffect, useState, useRef } from "react";

export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${on ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function ProjectCard({ p, n }) {
  const [broken, setBroken] = useState(false);
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    const s = e.currentTarget.style;
    s.setProperty("--rx", `${(0.5 - y) * 8}deg`); s.setProperty("--ry", `${(x - 0.5) * 10}deg`);
    s.setProperty("--gx", `${x * 100}%`); s.setProperty("--gy", `${y * 100}%`);
  };
  const onLeave = (e) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); };
  return (
    <a className="project" href={p.link} target="_blank" rel="noopener noreferrer" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="project-media">
        {!broken && <img src={p.image} alt={p.name} onError={() => setBroken(true)} />}
        <span className="project-num">0{n}</span>
        {p.category && <span className="project-cat">{p.category}</span>}
        {broken && <span className="project-ph">{"</>"}</span>}
      </div>
      <div className="project-body">
        <h3>{p.name}<span className="arrow">↗</span></h3>
        <p>{p.description}</p>
        <div className="tags">{p.techstack.map((t) => <span key={t}>{t}</span>)}</div>
      </div>
    </a>
  );
}

export function Cosmos() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, x = c.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, raf, mx = 0, my = 0, stars = [], shoots = [];
    const hues = [190, 265, 320, 0, 0];
    const resize = () => {
      w = c.width = innerWidth * dpr; h = c.height = innerHeight * dpr;
      c.style.width = innerWidth + "px"; c.style.height = innerHeight + "px";
      stars = Array.from({ length: Math.round((innerWidth * innerHeight) / 5500) }, () => ({
        x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.8 + 0.2,
        t: Math.random() * 6.28, hue: hues[Math.floor(Math.random() * hues.length)],
      }));
    };
    const move = (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; };
    const draw = () => {
      x.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.t += 0.02; s.y -= s.z * 0.12 * dpr;
        if (s.y < 0) { s.y = h; s.x = Math.random() * w; }
        const a = (0.35 + 0.65 * Math.abs(Math.sin(s.t))) * s.z;
        x.beginPath();
        x.arc(s.x - mx * 30 * s.z * dpr, s.y - my * 30 * s.z * dpr, s.z * 1.5 * dpr, 0, 6.283);
        x.fillStyle = s.hue ? `hsla(${s.hue},90%,80%,${a})` : `rgba(255,255,255,${a})`;
        x.fill();
      }
      if (Math.random() < 0.008) shoots.push({ x: Math.random() * w, y: Math.random() * h * 0.5, vx: (6 + Math.random() * 4) * dpr, vy: (3 + Math.random() * 2) * dpr, l: 1 });
      shoots = shoots.filter((s) => s.l > 0);
      for (const s of shoots) {
        const ex = s.x - s.vx * 8, ey = s.y - s.vy * 8;
        const g = x.createLinearGradient(s.x, s.y, ex, ey);
        g.addColorStop(0, `rgba(255,255,255,${s.l})`); g.addColorStop(1, "rgba(34,211,238,0)");
        x.strokeStyle = g; x.lineWidth = 1.6 * dpr;
        x.beginPath(); x.moveTo(s.x, s.y); x.lineTo(ex, ey); x.stroke();
        s.x += s.vx; s.y += s.vy; s.l -= 0.015;
      }
      raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener("resize", resize); window.addEventListener("mousemove", move);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", move); };
  }, []);
  return <div className="cosmos" aria-hidden="true"><div className="nebula" /><canvas ref={ref} /><div className="floor" /></div>;
}

export function usePageFx() {
  const bar = useRef();
  useEffect(() => {
    const move = (e) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    const scroll = () => {
      const h = document.documentElement;
      if (bar.current) bar.current.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("scroll", scroll); };
  }, []);
  return bar;
}
