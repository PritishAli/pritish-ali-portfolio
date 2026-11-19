// Portfolio app: React 18 + Framer Motion, written with `htm` so it runs
// in the browser with no build step. Content lives in content.js.
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useInView,
  animate,
} from "framer-motion";
import htm from "htm";
import * as C from "./content.js";

const html = htm.bind(React.createElement);
const EASE = [0.22, 1, 0.36, 1];

/* ───────────── helpers ───────────── */

// Fades content up as it enters. Triggers early so text is never left hidden.
function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const Tag = motion[as];
  return html`<${Tag} className=${className}
    initial=${{ opacity: 0, y: 18 }} whileInView=${{ opacity: 1, y: 0 }}
    viewport=${{ once: true, amount: 0.05 }}
    transition=${{ duration: 0.6, ease: EASE, delay }}>${children}</${Tag}>`;
}

function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 250, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 250, damping: 18, mass: 0.4 });
  const fine = typeof matchMedia !== "undefined" && matchMedia("(pointer: fine)").matches;
  const onMove = (e) => {
    if (!fine) return;
    const r = ref.current.getBoundingClientRect();
    x.set(Math.round((e.clientX - (r.left + r.width / 2)) * strength));
    y.set(Math.round((e.clientY - (r.top + r.height / 2)) * strength));
  };
  const reset = () => { x.set(0); y.set(0); };
  return html`<${motion.span} ref=${ref} className="magnetic" style=${{ x, y }}
    onMouseMove=${onMove} onMouseLeave=${reset}>${children}</${motion.span}>`;
}

function SectionHead({ title, lede }) {
  return html`<div className="sec-head">
    <${Reveal} as="h2">${title}</${Reveal}>
    ${lede && html`<${Reveal} as="p" delay=${0.08}>${lede}</${Reveal}>`}
  </div>`;
}

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.4, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return html`<b ref=${ref}>${n}${suffix}</b>`;
}

// Lets the hero console pre-fill the contact form.
const prefill = (type) => {
  window.dispatchEvent(new CustomEvent("prefill-project", { detail: type }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
};

/* ───────────── background lighting ───────────── */

function Aurora() {
  return html`<div className="aurora" aria-hidden="true">
    <span className="blob b1" /><span className="blob b2" /><span className="blob b3" /><span className="blob b4" />
  </div>`;
}

function Spotlight() {
  // A soft light that follows the cursor across the whole page (desktop only).
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;
    const on = (e) => { root.style.setProperty("--cx", e.clientX + "px"); root.style.setProperty("--cy", e.clientY + "px"); };
    addEventListener("pointermove", on, { passive: true });
    return () => removeEventListener("pointermove", on);
  }, []);
  return html`<div className="spotlight" aria-hidden="true" />`;
}

/* ───────────── hero console demos ───────────── */

function DemoLLM() {
  const answer = "Annual plans can be refunded in full within 30 days of purchase. After that, you get a pro-rated credit for the unused months.";
  const [n, setN] = useState(0);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { i += 2; setN(i); if (i >= answer.length) clearInterval(t); }, 28);
    return () => clearInterval(t);
  }, []);
  return html`<div className="demo chat">
    <${motion.div} className="bubble you" initial=${{ opacity: 0, y: 8 }} animate=${{ opacity: 1, y: 0 }}>
      What's the refund window for annual plans?
    </${motion.div}>
    <${motion.div} className="retrieval" initial=${{ opacity: 0 }} animate=${{ opacity: 1 }} transition=${{ delay: 0.3 }}>
      <i /> Searched 1,240 pages · found 3 passages
    </${motion.div}>
    <${motion.div} className="bubble ai" initial=${{ opacity: 0, y: 8 }} animate=${{ opacity: 1, y: 0 }} transition=${{ delay: 0.5 }}>
      ${answer.slice(0, n)}${n < answer.length && html`<span className="caret" />`}
      ${n >= answer.length && html`<${motion.div} className="sources" initial=${{ opacity: 0 }} animate=${{ opacity: 1 }}>
        <span>refund-policy.pdf · p.4</span><span>billing-faq.md</span></${motion.div}>`}
    </${motion.div}>
  </div>`;
}

function DemoVision() {
  const boxes = [
    { x: 46, y: 118, w: 112, h: 66, label: "car 0.97", d: 0.5 },
    { x: 214, y: 96, w: 92, h: 58, label: "car 0.95", d: 0.8 },
    { x: 330, y: 70, w: 70, h: 84, label: "truck 0.93", d: 1.1 },
  ];
  return html`<div className="demo vision">
    <svg viewBox="0 0 420 230" role="img" aria-label="Vehicles detected with bounding boxes and a licence plate read">
      <defs>
        <linearGradient id="road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#231d45"/><stop offset="1" stopColor="#120f26"/></linearGradient>
      </defs>
      <rect width="420" height="230" fill="url(#road)" />
      <path d="M0 200 L170 40 L250 40 L420 200 Z" fill="rgba(255,255,255,.035)" />
      ${[0, 1, 2, 3].map((i) => html`<${motion.rect} key=${i} x="206" width="6" height="18" rx="2" fill="rgba(255,255,255,.35)"
          initial=${{ y: 30 + i * 50 }} animate=${{ y: [30 + i * 50, 80 + i * 50] }}
          transition=${{ duration: 1.2, repeat: Infinity, ease: "linear" }} />`)}
      <rect x="54" y="132" width="96" height="44" rx="8" fill="#3b3470" /><rect x="68" y="122" width="68" height="20" rx="6" fill="#4a4290" />
      <rect x="222" y="108" width="76" height="40" rx="7" fill="#33305e" /><rect x="234" y="99" width="52" height="16" rx="5" fill="#423d7c" />
      <rect x="336" y="78" width="58" height="70" rx="6" fill="#2e2a55" />
      <rect x="84" y="164" width="36" height="10" rx="2" fill="#ECE9F7" />
      ${boxes.map((b) => html`<${motion.g} key=${b.label} initial=${{ opacity: 0, scale: 1.15 }} animate=${{ opacity: 1, scale: 1 }}
          transition=${{ delay: b.d, duration: 0.4, ease: EASE }} style=${{ transformOrigin: b.x + b.w / 2 + "px " + (b.y + b.h / 2) + "px" }}>
        <rect x=${b.x} y=${b.y} width=${b.w} height=${b.h} rx="4" fill="none" stroke="#3FD6C6" strokeWidth="2" />
        <rect x=${b.x} y=${b.y - 18} width=${b.label.length * 6.6 + 10} height="16" rx="3" fill="#3FD6C6" />
        <text x=${b.x + 5} y=${b.y - 6} className="vlabel">${b.label}</text>
      </${motion.g}>`)}
      <${motion.g} initial=${{ opacity: 0 }} animate=${{ opacity: 1 }} transition=${{ delay: 1.6 }}>
        <rect x="80" y="160" width="44" height="18" rx="3" fill="none" stroke="#FFB45C" strokeWidth="2" />
        <path d="M124 169 H170" stroke="#FFB45C" strokeWidth="1.5" strokeDasharray="3 3" />
        <rect x="170" y="158" width="118" height="22" rx="5" fill="#FFB45C" />
        <text x="178" y="173" className="vlabel dark">plate: WB 02 AK 4471</text>
      </${motion.g}>
      <${motion.rect} x="0" width="420" height="2" fill="#3FD6C6" opacity=".6"
        initial=${{ y: 0 }} animate=${{ y: [0, 228, 0] }} transition=${{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
    </svg>
    <${motion.div} className="flag" initial=${{ opacity: 0, y: 8 }} animate=${{ opacity: 1, y: 0 }} transition=${{ delay: 2 }}>
      <i /> Red-light violation logged · 14:32:07
    </${motion.div}>
  </div>`;
}

function DemoWeb() {
  const bars = [42, 64, 50, 78, 58, 88, 72];
  return html`<div className="demo web">
    <div className="kpis">
      ${[["Active users", 2481], ["Orders today", 312], ["Uptime", 99]].map(([k, v], i) => html`<${motion.div} key=${k} className="kpi"
          initial=${{ opacity: 0, y: 10 }} animate=${{ opacity: 1, y: 0 }} transition=${{ delay: 0.1 + i * 0.1 }}>
        <span>${k}</span><${Counter} value=${v} suffix=${k === "Uptime" ? "%" : ""} />
      </${motion.div}>`)}
    </div>
    <div className="bars">
      ${bars.map((h, i) => html`<${motion.i} key=${i} initial=${{ height: 0 }} animate=${{ height: h + "%" }}
          transition=${{ delay: 0.4 + i * 0.07, duration: 0.7, ease: EASE }} />`)}
    </div>
    <div className="rows">
      ${["New signup · Kolkata", "Invoice paid · ₹12,400", "Report exported"].map((r, i) => html`<${motion.div} key=${r}
          initial=${{ opacity: 0, x: -12 }} animate=${{ opacity: 1, x: 0 }} transition=${{ delay: 1 + i * 0.15 }}><i />${r}</${motion.div}>`)}
    </div>
  </div>`;
}

function DemoData() {
  const actual = "M10 150 L50 132 L90 140 L130 112 L170 118 L210 92 L250 98";
  const fc = "M250 98 L290 80 L330 86 L370 64 L410 70";
  const band = "M250 98 L290 66 L330 66 L370 38 L410 40 L410 100 L370 92 L330 108 L290 96 L250 98 Z";
  return html`<div className="demo data">
    <svg viewBox="0 0 420 190" role="img" aria-label="Line chart of actual values and a forecast with a confidence band">
      ${[40, 80, 120, 160].map((y) => html`<line key=${y} x1="10" x2="410" y1=${y} y2=${y} stroke="rgba(255,255,255,.06)" />`)}
      <line x1="250" x2="250" y1="20" y2="170" stroke="rgba(255,255,255,.18)" strokeDasharray="4 4" />
      <text x="256" y="30" className="clabel">forecast →</text>
      <${motion.path} d=${band} fill="rgba(138,123,255,.18)" initial=${{ opacity: 0 }} animate=${{ opacity: 1 }} transition=${{ delay: 1.3, duration: 0.6 }} />
      <${motion.path} d=${actual} fill="none" stroke="#ECE9F7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial=${{ pathLength: 0 }} animate=${{ pathLength: 1 }} transition=${{ duration: 1.1, ease: EASE }} />
      <${motion.path} d=${fc} fill="none" stroke="#8A7BFF" strokeWidth="2.5" strokeDasharray="6 5" strokeLinecap="round"
        initial=${{ pathLength: 0 }} animate=${{ pathLength: 1 }} transition=${{ delay: 1.1, duration: 0.9, ease: EASE }} />
      <${motion.circle} cx="410" cy="70" r="5" fill="#8A7BFF" initial=${{ scale: 0 }} animate=${{ scale: 1 }} transition=${{ delay: 2 }} />
    </svg>
    <div className="legend"><span><i className="l1" />Actual</span><span><i className="l2" />Forecast</span><span><i className="l3" />Confidence band</span></div>
  </div>`;
}

const DEMOS = { llm: DemoLLM, vision: DemoVision, web: DemoWeb, data: DemoData };

function Console() {
  const tabs = C.consoleTabs;
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => setI((i + 1) % tabs.length), 7000);
    return () => clearTimeout(t);
  }, [i, auto]);
  const tab = tabs[i];
  const Demo = DEMOS[tab.key];
  return html`<${motion.div} className="console"
      initial=${{ opacity: 0, y: 30, scale: 0.98 }} animate=${{ opacity: 1, y: 0, scale: 1 }}
      transition=${{ duration: 1, ease: EASE, delay: 0.3 }}
      onMouseEnter=${() => setAuto(false)}>
    <div className="console-bar">
      <span className="dots"><i /><i /><i /></span>
      <span className="console-title">What do you want to build?</span>
      <span className="live"><i />live demo</span>
    </div>
    <div className="console-tabs" role="tablist">
      ${tabs.map((t, k) => html`<button key=${t.key} role="tab" aria-selected=${k === i}
          className=${k === i ? "on" : ""} onClick=${() => { setI(k); setAuto(false); }}>
        ${k === i && html`<${motion.span} layoutId="tab-pill" className="tab-pill" transition=${{ type: "spring", stiffness: 400, damping: 32 }} />`}
        <span>${t.label}</span>
        ${k === i && auto && html`<${motion.span} key=${"p" + i} className="tab-progress"
            initial=${{ scaleX: 0 }} animate=${{ scaleX: 1 }} transition=${{ duration: 7, ease: "linear" }} />`}
      </button>`)}
    </div>
    <div className="console-stage">
      <${AnimatePresence} mode="wait">
        <${motion.div} key=${tab.key} className="stage-in"
          initial=${{ opacity: 0, y: 10 }} animate=${{ opacity: 1, y: 0 }} exit=${{ opacity: 0, y: -10 }}
          transition=${{ duration: 0.35, ease: EASE }}>
          <${Demo} />
        </${motion.div}>
      </${AnimatePresence}>
    </div>
    <div className="console-foot">
      <p>${tab.caption}</p>
      <button className="btn grad sm" onClick=${() => prefill(tab.formType)}>Build this with me</button>
    </div>
  </${motion.div}>`;
}

/* ───────────── chrome ───────────── */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return html`<${motion.div} className="progress" style=${{ scaleX }} />`;
}

const NAV = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
];

function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() || 0;
    setHidden(y > prev + 4 && y > 320 && !open);
    if (y < prev - 4) setHidden(false);
    setScrolled(y > 8);
  });
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["top", ...NAV.map((n) => n.id), "process", "skills", "education", "contact"].forEach((id) => {
      const el = document.getElementById(id); if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  return html`<${React.Fragment}>
    <${motion.nav} className=${"nav" + (scrolled ? " scrolled" : "")}
      animate=${{ y: hidden ? -90 : 0 }} transition=${{ duration: 0.35, ease: EASE }}>
      <div className="wrap nav-in">
        <a className="mark" href="#top"><span className="mark-dot" />${C.profile.firstName} ${C.profile.lastName}</a>
        <ul className="nav-links">
          ${NAV.map((n) => html`<li key=${n.id}><a href=${"#" + n.id} className=${active === n.id ? "on" : ""}>
            ${active === n.id && html`<${motion.span} layoutId="nav-pill" className="nav-pill" transition=${{ type: "spring", stiffness: 380, damping: 30 }} />`}
            <span>${n.label}</span></a></li>`)}
        </ul>
        <a className="btn grad sm nav-cta" href="#contact">Start a project</a>
        <button className=${"burger" + (open ? " x" : "")} aria-label=${open ? "Close menu" : "Open menu"} aria-expanded=${open} onClick=${() => setOpen(!open)}><i/><i/></button>
      </div>
    </${motion.nav}>
    <${AnimatePresence}>
      ${open && html`<${motion.div} key="menu" className="menu"
          initial=${{ clipPath: "circle(0% at 100% 0%)" }} animate=${{ clipPath: "circle(150% at 100% 0%)" }}
          exit=${{ clipPath: "circle(0% at 100% 0%)" }} transition=${{ duration: 0.6, ease: EASE }}>
        ${[...NAV, { id: "contact", label: "Start a project" }].map((n, i) => html`<${motion.a} key=${n.id} href=${"#" + n.id}
            onClick=${() => setOpen(false)}
            initial=${{ opacity: 0, y: 30 }} animate=${{ opacity: 1, y: 0 }} transition=${{ delay: 0.15 + i * 0.06, ease: EASE, duration: 0.6 }}>${n.label}</${motion.a}>`)}
        <p className="menu-mail">${C.profile.email}</p>
      </${motion.div}>`}
    </${AnimatePresence}>
  </${React.Fragment}>`;
}

/* ───────────── sections ───────────── */

function SplitWord({ word, delay }) {
  return html`<span className="split" aria-hidden="true">${[...word].map((ch, i) => html`<span className="ch" key=${i}>
    <${motion.span} initial=${{ y: "105%" }} animate=${{ y: "0%" }}
      transition=${{ duration: 0.9, ease: EASE, delay: delay + i * 0.04 }}>${ch}</${motion.span}></span>`)}</span>`;
}

function Hero() {
  const P = C.profile;
  const up = (d) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: EASE, delay: d } });
  return html`<header className="hero-wrap" id="top">
    <div className="wrap hero">
      <div className="hero-copy">
        ${P.available && html`<${motion.p} className="avail" ...${up(0.1)}><i/>${P.availability}</${motion.p}>`}
        <h1 aria-label=${P.firstName + " " + P.lastName}>
          <${SplitWord} word=${P.firstName} delay=${0.2} /> <${SplitWord} word=${P.lastName} delay=${0.45} />
        </h1>
        <${motion.p} className="headline" ...${up(0.7)}>${P.headline}</${motion.p}>
        <${motion.p} className="role" ...${up(0.85)}>${P.intro}</${motion.p}>
        <${motion.div} className="cta" ...${up(1)}>
          <${Magnetic}><a className="btn grad" href="#contact">Start a project</a></${Magnetic}>
          <${Magnetic}><a className="btn line" href="#work">See my work</a></${Magnetic}>
          ${P.cvFile && html`<a className="btn ghost" href=${P.cvFile} download>Download CV</a>`}
        </${motion.div}>
        <${motion.ul} className="meta" ...${up(1.15)}>${P.meta.map((m) => html`<li key=${m}>${m}</li>`)}</${motion.ul}>
      </div>
      <${Console} />
    </div>
  </header>`;
}

function About() {
  return html`<section id="about"><div className="wrap about">
    <${Reveal} as="p" className="lede">${C.pitch}</${Reveal}>
    <div className="facts">
      ${C.stats.map((s, i) => html`<${Reveal} key=${i} delay=${0.08 * i} className="fact">
        <${Counter} value=${s.value} suffix=${s.suffix} /><span>${s.label}</span></${Reveal}>`)}
    </div>
  </div></section>`;
}

function Marquee() {
  const items = C.skills.flatMap((g) => g.items);
  const row = items.map((t, i) => html`<span key=${i}>${t}</span>`);
  return html`<div className="marquee" aria-hidden="true"><div className="marquee-track">${row}${row}</div></div>`;
}

function ServiceCard({ s, i }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
    e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
  };
  const types = C.inquiry.projectTypes;
  return html`<${motion.article} className="svc glass" onMouseMove=${onMove}
      initial=${{ opacity: 0, y: 24 }} whileInView=${{ opacity: 1, y: 0 }}
      viewport=${{ once: true, amount: 0.1 }} transition=${{ duration: 0.6, ease: EASE, delay: (i % 2) * 0.1 }}
      whileHover=${{ y: -6 }}>
    <span className=${"svc-icon i" + i} aria-hidden="true" />
    <h3>${s.title}</h3>
    <p>${s.body}</p>
    <p className="svc-for">Good for: ${s.goodFor}</p>
    <button className="svc-link" onClick=${() => prefill(types[[0, 2, 3, 4][i]] || "")}>Discuss this project</button>
  </${motion.article}>`;
}

function Services() {
  return html`<section id="services"><div className="wrap">
    <${SectionHead} title="What I can build for you" lede="Fixed-scope projects or ongoing work. Every project ships with clean, documented code that you own." />
    <div className="svc-grid">${C.services.map((s, i) => html`<${ServiceCard} key=${s.title} s=${s} i=${i} />`)}</div>
  </div></section>`;
}

function Work() {
  const [open, setOpen] = useState(0);
  return html`<section id="work"><div className="wrap">
    <${SectionHead} title="Selected work" lede="Projects across language models, fairness, vision and scientific imaging. Select one to see how it works." />
    <ul className="projects">
      ${C.projects.map((p, i) => {
        const isOpen = open === i;
        return html`<${motion.li} key=${p.name} className=${"proj" + (isOpen ? " open" : "")}
            initial=${{ opacity: 0, y: 20 }} whileInView=${{ opacity: 1, y: 0 }}
            viewport=${{ once: true, amount: 0.1 }} transition=${{ duration: 0.6, ease: EASE, delay: i * 0.05 }}>
          <button className="proj-head" aria-expanded=${isOpen} onClick=${() => setOpen(isOpen ? -1 : i)}>
            <span className="proj-idx">${String(i + 1).padStart(2, "0")}</span>
            <span className="proj-title"><b>${p.name}</b><small>${p.tagline}</small></span>
            <span className="tags">${p.tags.map((t) => html`<span className="tag" key=${t}>${t}</span>`)}</span>
            <${motion.span} className="plus" animate=${{ rotate: isOpen ? 45 : 0 }} transition=${{ duration: 0.35, ease: EASE }} />
          </button>
          <${AnimatePresence} initial=${false}>
            ${isOpen && html`<${motion.div} key="body" className="proj-body"
                initial=${{ height: 0, opacity: 0 }} animate=${{ height: "auto", opacity: 1 }} exit=${{ height: 0, opacity: 0 }}
                transition=${{ duration: 0.45, ease: EASE }}>
              <div className="proj-inner">
                <p>${p.summary}</p>
                <ul>${p.points.map((pt) => html`<li key=${pt}>${pt}</li>`)}</ul>
                <div className="proj-foot">
                  ${p.result && html`<span className="result">${p.result}</span>`}
                  ${p.link && html`<a className="btn line sm" href=${p.link} target="_blank" rel="noopener">View project</a>`}
                </div>
              </div>
            </${motion.div}>`}
          </${AnimatePresence}>
        </${motion.li}>`;
      })}
    </ul>
  </div></section>`;
}

function Process() {
  return html`<section id="process"><div className="wrap">
    <${SectionHead} title="How a project runs" lede="Clear scope up front, visible progress every week, no surprises at the end." />
    <ol className="steps">
      ${C.process.map((s, i) => html`<${motion.li} key=${s.title} className="glass"
          initial=${{ opacity: 0, y: 20 }} whileInView=${{ opacity: 1, y: 0 }}
          viewport=${{ once: true, amount: 0.1 }} transition=${{ duration: 0.6, ease: EASE, delay: i * 0.1 }}>
        <b>${i + 1}</b><h3>${s.title}</h3><p>${s.body}</p>
      </${motion.li}>`)}
    </ol>
  </div></section>`;
}

function Research() {
  return html`<section id="research"><div className="wrap">
    <${SectionHead} title="Research" lede="Peer-reviewed work in applied AI and computational palaeoecology, where I handle the data analysis and statistics." />
    <ol className="pubs">
      ${C.publications.map((p, i) => {
        const title = p.doi
          ? html`<a href=${"https://doi.org/" + p.doi} target="_blank" rel="noopener">${p.title}</a>`
          : p.title;
        const doi = p.doi || p.doiText;
        return html`<${Reveal} as="li" key=${i} delay=${i * 0.04} className="pub">
          <div>
            <h3>${title}</h3>
            <p className="venue"><i>${p.venue}</i>, ${p.publisher}</p>
            ${doi && html`<p className="doi">doi:${doi}</p>`}
          </div>
          <aside><b>${p.role}</b>${p.impact}${p.impact && html`<br/>`}
            <span className=${"status " + (p.status === "published" ? "pub-d" : "rev")}>${p.status === "published" ? "Published" : "Under review"}</span></aside>
        </${Reveal}>`;
      })}
    </ol>
  </div></section>`;
}

function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 24 });
  return html`<section id="experience"><div className="wrap">
    <${SectionHead} title="Experience" lede="From stock-price models to full-stack apps to writing expert AI/ML content." />
    <ol className="timeline" ref=${ref}>
      <${motion.span} className="tl-fill" style=${{ scaleY }} />
      ${C.experience.map((j) => html`<${motion.li} key=${j.role} className=${"job" + (j.current ? " now" : "")}
          initial=${{ opacity: 0, x: -16 }} whileInView=${{ opacity: 1, x: 0 }}
          viewport=${{ once: true, amount: 0.1 }} transition=${{ duration: 0.6, ease: EASE }}>
        <div><p className="when">${j.when}${j.where ? " · " + j.where : ""}</p></div>
        <div>
          <h3>${j.role}</h3>
          <p className="org">${j.org}</p>
          <ul>${j.points.map((pt) => html`<li key=${pt}>${pt}</li>`)}</ul>
        </div>
      </${motion.li}>`)}
    </ol>
  </div></section>`;
}

function Toolkit() {
  return html`<section id="skills"><div className="wrap">
    <${SectionHead} title="Toolkit" lede="What I reach for, from research notebooks to production web apps." />
    <div className="skills">
      ${C.skills.map((g, gi) => html`<${Reveal} key=${g.group} delay=${(gi % 3) * 0.06} className="skill">
        <h3>${g.group}</h3>
        <div className="chips">${g.items.map((t) => html`<${motion.span} key=${t} className="chip"
          whileHover=${{ y: -3 }} transition=${{ type: "spring", stiffness: 400, damping: 18 }}>${t}</${motion.span}>`)}</div>
      </${Reveal}>`)}
    </div>
  </div></section>`;
}

function Education() {
  return html`<section id="education"><div className="wrap">
    <${SectionHead} title="Education & honours" />
    <div className="edu">
      <div>${C.education.map((e, i) => html`<${Reveal} key=${e.degree} delay=${i * 0.05} className="edu-item">
        <div><h3>${e.degree}</h3>${e.school && html`<p>${e.school}</p>`}</div>
        <div className="yr"><b>${e.score}</b>${e.note}</div>
      </${Reveal}>`)}</div>
      <ul className="honours">${C.honours.map((h, i) => html`<${Reveal} as="li" key=${h.title} delay=${i * 0.05}>
        ${h.title}<span>${h.detail}</span></${Reveal}>`)}</ul>
    </div>
  </div></section>`;
}

function Contact() {
  const P = C.profile, Q = C.inquiry;
  const [state, setState] = useState("idle"); // idle | sending | sent | error
  const [err, setErr] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [copied, setCopied] = useState(false);
  const [ptype, setPtype] = useState("");
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    const on = (e) => { setState("idle"); setPtype(e.detail || ""); setFlash(true); setTimeout(() => setFlash(false), 1400); };
    addEventListener("prefill-project", on);
    return () => removeEventListener("prefill-project", on);
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const data = Object.fromEntries(new FormData(f));
    if (data._honey) return;
    const missing = [];
    if (!data.name.trim()) missing.push("name");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) missing.push("email");
    if (!data.project_type) missing.push("project type");
    if (!data.message.trim()) missing.push("project details");
    if (missing.length) { setState("error"); setErr("Add your " + missing.join(", ") + " so I can reply."); return; }
    setState("sending"); setErr("");
    data._subject = "New project inquiry: " + data.project_type + " from " + data.name;
    data._template = "table"; data._captcha = "false";
    try {
      const r = await fetch("https://formsubmit.co/ajax/" + Q.formEmail, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error();
      setSentTo(data.email); setState("sent"); setPtype(""); f.reset();
    } catch {
      setState("error"); setErr("That didn't go through. Email me directly at " + P.email + ".");
    }
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(P.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };
  return html`<section className="contact" id="contact"><div className="wrap contact-grid">
    <div>
      <${Reveal} as="h2">Have a project in mind?</${Reveal}>
      <${Reveal} as="p" className="intro" delay=${0.08}>Tell me what you're building. I'll reply by email with questions, an approach and a quote.</${Reveal}>
      <${Reveal} delay=${0.16} className="mail-row">
        <a className="mail" href=${"mailto:" + P.email}>${P.email}</a>
        <button className="copy" onClick=${copy}>${copied ? "Copied" : "Copy"}</button>
      </${Reveal}>
      <${Reveal} delay=${0.24} className="links">
        ${P.links.map((l) => html`<a key=${l.label} href=${l.href} target="_blank" rel="noopener">${l.label}</a>`)}
        <a href=${P.phoneHref}>${P.phone}</a>
      </${Reveal}>
    </div>
    <${Reveal} delay=${0.1} className=${"form-wrap glass" + (flash ? " flash" : "")}>
      <${AnimatePresence} mode="wait">
        ${state === "sent"
          ? html`<${motion.div} key="ok" className="sent" initial=${{ opacity: 0, scale: 0.96 }} animate=${{ opacity: 1, scale: 1 }} exit=${{ opacity: 0 }} transition=${{ duration: 0.5, ease: EASE }}>
              <svg viewBox="0 0 52 52" className="check"><${motion.circle} cx="26" cy="26" r="24" initial=${{ pathLength: 0 }} animate=${{ pathLength: 1 }} transition=${{ duration: 0.7, ease: EASE }} />
                <${motion.path} d="M15 27l7 7 15-16" initial=${{ pathLength: 0 }} animate=${{ pathLength: 1 }} transition=${{ duration: 0.5, ease: EASE, delay: 0.5 }} /></svg>
              <h3>Project details sent</h3>
              <p>I'll reply to ${sentTo} soon.</p>
              <button className="btn line sm" onClick=${() => setState("idle")}>Send another</button>
            </${motion.div}>`
          : html`<${motion.form} key="form" className="form" noValidate onSubmit=${onSubmit}
                initial=${{ opacity: 0 }} animate=${{ opacity: 1 }} exit=${{ opacity: 0, y: -10 }}>
              <div className="field"><label htmlFor="f-name">Your name</label><input id="f-name" name="name" autoComplete="name" placeholder="Jane Doe" /></div>
              <div className="field"><label htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" autoComplete="email" placeholder="jane@company.com" /></div>
              <div className="field"><label htmlFor="f-type">What do you need?</label>
                <select id="f-type" name="project_type" value=${ptype} onChange=${(e) => setPtype(e.target.value)}>
                  <option value="" disabled>Choose one</option>${Q.projectTypes.map((t) => html`<option key=${t}>${t}</option>`)}</select></div>
              <div className="field"><label htmlFor="f-budget">Budget</label>
                <select id="f-budget" name="budget">${Q.budgets.map((t) => html`<option key=${t}>${t}</option>`)}</select></div>
              <div className="field full"><label htmlFor="f-time">When do you need it?</label>
                <select id="f-time" name="timeline">${Q.timelines.map((t) => html`<option key=${t}>${t}</option>`)}</select></div>
              <div className="field full"><label htmlFor="f-msg">About the project</label>
                <textarea id="f-msg" name="message" placeholder="What are you building, who is it for, and what does done look like?"></textarea></div>
              <input className="hp" type="text" name="_honey" tabIndex="-1" autoComplete="off" aria-hidden="true" />
              <div className="form-foot">
                <button className="btn grad" type="submit" disabled=${state === "sending"}>
                  ${state === "sending" ? "Sending…" : "Send project details"}</button>
                <${AnimatePresence}>${err && html`<${motion.p} key="err" className="form-msg err" role="status"
                    initial=${{ opacity: 0, x: -8 }} animate=${{ opacity: 1, x: 0 }} exit=${{ opacity: 0 }}>${err}</${motion.p}>`}</${AnimatePresence}>
              </div>
            </${motion.form}>`}
      </${AnimatePresence}>
    </${Reveal}>
  </div></section>`;
}

function Footer() {
  return html`<footer><div className="wrap">
    <span>© ${new Date().getFullYear()} ${C.profile.firstName} ${C.profile.lastName} · ${C.profile.title}</span>
    <a href="#top">Back to top</a>
  </div></footer>`;
}

function App() {
  return html`<${MotionConfig} reducedMotion="user">
    <a className="skip" href="#about">Skip to content</a>
    <${Aurora} />
    <${Spotlight} />
    <${ScrollProgress} />
    <${Nav} />
    <main>
      <${Hero} />
      <${About} />
      <${Marquee} />
      <${Services} />
      <${Work} />
      <${Process} />
      <${Research} />
      <${Experience} />
      <${Toolkit} />
      <${Education} />
      <${Contact} />
    </main>
    <${Footer} />
  </${MotionConfig}>`;
}

createRoot(document.getElementById("root")).render(html`<${App} />`);
