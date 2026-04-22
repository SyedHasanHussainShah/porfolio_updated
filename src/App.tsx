import { useEffect, useMemo, useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AnimatedName from "./components/AnimatedName";
import ScrollProgressCircle from "./components/ScrollProgressCircle";
import Marquee from "./components/Marquee";
import {
  Download,
  Mail,
  GraduationCap,
  Code2,
  Menu,
  X,
  Rocket,
  Heart,
  Clock,
  Copy,
  Check,
  ArrowRight,
  Zap,
  Users,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  FaBootstrap,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiNextdotjs,
  SiExpress,
  SiTypescript,
  SiVite,
  SiCplusplus,
  SiSharp,
  SiOracle,
  SiFlask,
  SiThreedotjs,
  SiLinux,
  SiJavascript,
} from "react-icons/si";
import { useInView as useScrollInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import "./index.css";

/* ─────────────────────────── TYPES ─────────────────────────── */
interface Project {
  title: string;
  stack: string[];
  description: string;
  image: string;
  link: string;
  github?: string;
}

/* ─────────────────────────── DATA ─────────────────────────── */
const PROFILE = {
  name: "SYED HASSAN HUSSAIN SHAH",
  title: "Full-Stack Developer",
  location: "Gujranwala, Pakistan",
  email: "ssyedhassan667@gmail.com",
  github: "https://github.com/SyedHasanHussainShah",
  linkedin: "https://www.linkedin.com/in/syed-hassan-hussain-shah-a3351b2b5/",
};

const SKILL_ROTATION = [
  "HTML", "CSS", "JavaScript", "TypeScript", "Tailwind CSS",
  "Bootstrap", "React", "Next.js", "Node.js", "Express.js",
  "C++", "C#", "Oracle", "Flask", "Three.js", "Linux",
];

const PROJECTS: Project[] = [
  {
    title: "Islam 360",
    stack: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Axios", "ShadCN UI", "Context API"],
    description:
      "A full‑featured Islamic utility app with prayer times, offline Dhikr, Tasbih counter, Islamic content, and an integrated AI chatbot trained on Islamic content. Deployed on Vercel.",
    image: "/Islam360.png",
    link: "https://islam-1xr3.vercel.app/",
    github: "https://github.com/SyedHasanHussainShah",
  },
  {
    title: "Spotify Clone",
    stack: ["React.js", "Vite", "Tailwind CSS", "Bootstrap", "JavaScript", "Spotify API"],
    description:
      "Spotify clone with dynamic playlists, real-time music streaming, and sleek UI powered by the Spotify API for authentic functionality.",
    image: "/Spotify.png",
    link: "https://my-spotify-clone.surge.sh/",
    github: "https://github.com/SyedHasanHussainShah",
  },
  {
    title: "Train Reservation System",
    stack: ["HTML", "Bootstrap", "Tailwind CSS", "JavaScript", "DB integration"],
    description:
      "Responsive booking platform with real‑time train data, secure ticket booking, cancellation, reminders, and account management. Optimized for mobile.",
    image: "/Train.png",
    link: "https://train-delta-bice.vercel.app/",
    github: "https://github.com/SyedHasanHussainShah",
  },
  {
    title: "ChainWallet DApp",
    stack: ["HTML", "CSS", "Tailwind", "JavaScript", "ethers.js", "QRCode.js", "OTPAuth", "Web3"],
    description:
      "Decentralized crypto wallet with MetaMask integration, ETH contract transfers, transaction history, 2FA security, contacts, and PDF/QR export; multi‑network support.",
    image: "/ChainVallet.png",
    link: "https://syedhasanhussainshah.github.io/bc/",
    github: "https://github.com/SyedHasanHussainShah",
  },
  {
    title: "Drive Sense AI",
    stack: ["HTML", "Tailwind CSS", "Bootstrap", "Python", "Flask", "AI model training"],
    description:
      "AI-powered driving analysis with 92% hazard detection accuracy, adjustable sensitivity, and PDF/video reports using Flask & ML models.",
    image: "/DriveSense.png",
    link: "https://syedhasanhussainshah.github.io/Ai-project/",
    github: "https://github.com/SyedHasanHussainShah",
  },
  {
    title: "Transpomate App",
    stack: ["C++", "DSA", "API", "HTML", "CSS", "JavaScript", "Github"],
    description:
      "Bus booking app to check availability, calculate distance, and estimate travel time with efficient algorithms and API integration.",
    image: "/Transpomate.png",
    link: "https://github.com/SyedHasanHussainShah/Transpomate-App-Admin-View-",
    github: "https://github.com/SyedHasanHussainShah/Transpomate-App-Admin-View-",
  },
];

const EDUCATION = [
  {
    school: "University of Engineering and Technology Lahore — Gujranwala Campus",
    degree: "BSC Computer Science",
    period: "12/2027 (In progress)",
    year: "2027",
  },
  {
    school: "Punjab Colleges — Gujranwala",
    degree: "FSC Pre‑Engineering",
    period: "12/2023",
    year: "2023",
  },
];

const SKILLS_DATA = {
  Frontend: [
    { name: "HTML5", icon: <FaHtml5 className="text-orange-500" />, level: 95 },
    { name: "CSS3", icon: <FaCss3Alt className="text-blue-400" />, level: 90 },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" />, level: 75 },
    { name: "TypeScript", icon: <SiTypescript className="text-sky-500" />, level: 65 },
    { name: "React", icon: <FaReact className="text-sky-400" />, level: 82 },
    { name: "Next.js", icon: <SiNextdotjs />, level: 50 },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" />, level: 90 },
    { name: "Bootstrap", icon: <FaBootstrap className="text-purple-500" />, level: 85 },
    { name: "Three.js", icon: <SiThreedotjs className="text-blue-300" />, level: 40 },
    { name: "Vite", icon: <SiVite className="text-purple-400" />, level: 80 },
  ],
  Backend: [
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" />, level: 80 },
    { name: "Express.js", icon: <SiExpress />, level: 48 },
    { name: "Python", icon: <FaPython className="text-yellow-400" />, level: 75 },
    { name: "Flask", icon: <SiFlask className="text-green-400" />, level: 60 },
    { name: "MongoDB", icon: <SiMongodb className="text-green-600" />, level: 70 },
    { name: "Oracle", icon: <SiOracle className="text-red-500" />, level: 70 },
  ],
  Tools: [
    { name: "C++", icon: <SiCplusplus className="text-sky-500" />, level: 80 },
    { name: "C#", icon: <SiSharp className="text-purple-400" />, level: 78 },
    { name: "Linux", icon: <SiLinux className="text-yellow-400" />, level: 70 },
  ],
};

const SKILLS_FLAT = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" />, level: 95 },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-400" />, level: 90 },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" />, level: 75 },
  { name: "Bootstrap", icon: <FaBootstrap className="text-purple-600" />, level: 85 },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" />, level: 90 },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" />, level: 80 },
  { name: "React", icon: <FaReact className="text-sky-400" />, level: 82 },
  { name: "Vite", icon: <SiVite className="text-purple-500" />, level: 80 },
  { name: "Next.js", icon: <SiNextdotjs />, level: 50 },
  { name: "Express.js", icon: <SiExpress />, level: 48 },
  { name: "MongoDB", icon: <SiMongodb className="text-green-700" />, level: 70 },
  { name: "Python", icon: <FaPython className="text-yellow-500" />, level: 75 },
  { name: "C++", icon: <SiCplusplus className="text-sky-500" />, level: 80 },
  { name: "C#", icon: <SiSharp className="text-purple-500" />, level: 78 },
  { name: "Oracle", icon: <SiOracle className="text-red-500" />, level: 70 },
  { name: "Flask", icon: <SiFlask className="text-green-500" />, level: 60 },
  { name: "Three.js", icon: <SiThreedotjs className="text-blue-400" />, level: 40 },
  { name: "Linux", icon: <SiLinux className="text-yellow-500" />, level: 70 },
  { name: "TypeScript", icon: <SiTypescript className="text-sky-500" />, level: 65 },
];

/* ─────────────────────────── HOOKS ─────────────────────────── */
function useTheme(): [string, () => void] {
  const [theme, setTheme] = useState<string>(
    () => localStorage.getItem("theme") || "dark"
  );
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === "dark") {
      root.classList.add("dark");
      body.classList.remove("light-mode");
      document.body.style.background = "#0a0a0f";
      document.body.style.color = "#f1f5f9";
    } else {
      root.classList.remove("dark");
      body.classList.add("light-mode");
      document.body.style.background = "#f8f9ff";
      document.body.style.color = "#171723";
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return [theme, toggle];
}

function useReveal() {
  const { ref, inView } = useScrollInView({ triggerOnce: true, threshold: 0.1 });
  const variants = useMemo(
    () => ({ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }),
    []
  );
  return { ref, variants, inView };
}

/* ─────────────────────────── PAGE LOADER ─────────────────────────── */
function PageLoader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#0a0a0f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 72,
              height: 72,
              borderRadius: "20px",
              background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-1px",
              boxShadow: "0 0 40px rgba(108,99,255,0.5)",
            }}
          >
            SH
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ color: "rgba(148,163,184,0.7)", fontSize: 13, letterSpacing: 4 }}
          >
            LOADING
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────── CUSTOM CURSOR ─────────────────────────── */
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const move = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const enter = () => setHovering(true);
    const leave = () => setHovering(false);

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className={`custom-cursor ${hovering ? "hovering" : ""}`}
      animate={{ x: position.x - 12, y: position.y - 12 }}
      transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.5 }}
    />
  );
};

/* ─────────────────────────── SECTION HEADER ─────────────────────────── */
function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12">
      {eyebrow && (
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(108,99,255,0.7)",
            marginBottom: 6,
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="gradient-text"
        style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.1 }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ marginTop: 8, color: "rgba(148,163,184,0.7)", fontSize: 15 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────── TECH GALAXY ─────────────────────────── */
const TechGalaxy = () => (
  <div className="w-full relative mb-10 overflow-hidden">
    <div
      className="relative h-80 overflow-hidden flex items-center justify-center"
      style={{
        borderRadius: 24,
        background: "rgba(17,17,24,0.7)",
        border: "1px solid rgba(108,99,255,0.15)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Center element */}
      <div
        style={{
          position: "absolute",
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#6c63ff,#00d4ff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 900,
          fontSize: 13,
          zIndex: 10,
          boxShadow: "0 0 30px rgba(108,99,255,0.6)",
        }}
      >
        Tech
      </div>

      {/* Orbiting skills */}
      {SKILLS_FLAT.map((skill, index) => {
        const angle = (index / SKILLS_FLAT.length) * Math.PI * 2;
        const radius = 130;
        return (
          <motion.div
            key={skill.name}
            style={{
              position: "absolute",
              padding: "8px 10px",
              borderRadius: 14,
              background: "rgba(17,17,24,0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(108,99,255,0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 20,
            }}
            animate={{
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
              rotate: 360,
            }}
            transition={{
              x: { duration: 18, repeat: Infinity, ease: "linear" },
              y: { duration: 18, repeat: Infinity, ease: "linear" },
              rotate: { duration: 18, repeat: Infinity, ease: "linear" },
            }}
            whileHover={{ scale: 1.4, boxShadow: "0 0 20px rgba(108,99,255,0.5)" }}
          >
            <div style={{ fontSize: 22, marginBottom: 2 }}>{skill.icon}</div>
            <span style={{ fontSize: 9, fontWeight: 600, color: "rgba(148,163,184,0.8)" }}>
              {skill.name}
            </span>
          </motion.div>
        );
      })}

      {/* Orbital rings */}
      <div
        className="orbit-animation-fast"
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          border: "1px solid rgba(108,99,255,0.15)",
        }}
      />
      <div
        className="orbit-reverse-fast"
        style={{
          position: "absolute",
          width: 310,
          height: 310,
          borderRadius: "50%",
          border: "1px dashed rgba(0,212,255,0.12)",
        }}
      />
    </div>
  </div>
);

/* ─────────────────────────── SKILL BAR ─────────────────────────── */
function SkillBar({ skill, delay = 0 }: { skill: { name: string; icon: React.ReactNode; level: number }; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{
        padding: "12px 16px",
        borderRadius: 14,
        background: "rgba(17,17,24,0.6)",
        border: "1px solid rgba(108,99,255,0.1)",
        transition: "all 0.3s",
      }}
      whileHover={{ borderColor: "rgba(108,99,255,0.35)", scale: 1.01 }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>{skill.icon}</span>
          <span style={{ fontWeight: 600, fontSize: 14 }}>{skill.name}</span>
        </div>
        <span style={{ fontSize: 12, color: "#6c63ff", fontWeight: 700 }}>{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
          style={{
            height: "100%",
            borderRadius: 99,
            background: "linear-gradient(90deg, #6c63ff, #00d4ff)",
            boxShadow: "0 0 8px rgba(108,99,255,0.5)",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────── STATS ROW ─────────────────────────── */
function useCounter(target: number, duration = 1500, startCounting = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);
  return count;
}

const STATS = [
  { value: 6, suffix: "+", label: "Projects Built", icon: "🚀" },
  { value: 19, suffix: "+", label: "Technologies Mastered", icon: "⚡" },
  { value: 2, suffix: "+", label: "Years of Experience", icon: "🏆" },
  { value: 100, suffix: "%", label: "Commitment", icon: "💎" },
];

function StatCard({ stat, isDark }: { stat: typeof STATS[0]; isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useCounter(stat.value, 1400, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: "0 0 30px rgba(108,99,255,0.2)" }}
      style={{
        flex: "1 1 160px",
        padding: "28px 20px",
        borderRadius: 20,
        background: isDark ? "rgba(17,17,24,0.7)" : "rgba(255,255,255,0.7)",
        border: "1px solid rgba(108,99,255,0.15)",
        backdropFilter: "blur(12px)",
        textAlign: "center",
        transition: "box-shadow 0.3s",
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
      <div
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: 6,
          background: "linear-gradient(135deg,#6c63ff,#00d4ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {count}{stat.suffix}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(148,163,184,0.7)" }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

function StatsRow({ isDark }: { isDark: boolean }) {
  return (
    <div className="container-responsive" style={{ paddingTop: "3rem", paddingBottom: "2rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
        {STATS.map((s) => (
          <StatCard key={s.label} stat={s} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── WHAT I DO ─────────────────────────── */
const SERVICES = [
  {
    icon: "🖥️",
    title: "Frontend Development",
    desc: "Pixel-perfect, performant UIs with React, Next.js, TypeScript and Tailwind CSS. Smooth animations with Framer Motion.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    color: "#6c63ff",
  },
  {
    icon: "⚙️",
    title: "Backend Development",
    desc: "Scalable REST APIs and server-side logic using Node.js, Express, Flask and MongoDB. Auth, email, and third-party integrations.",
    tags: ["Node.js", "Express", "Flask", "MongoDB"],
    color: "#00d4ff",
  },
  {
    icon: "🤖",
    title: "AI & Smart Features",
    desc: "Integrating AI chatbots, ML-powered analysis, and intelligent features into web apps. Training models with Python & scikit-learn.",
    tags: ["Python", "Flask", "AI Models", "Chatbot"],
    color: "#ff6b6b",
  },
  {
    icon: "🔗",
    title: "Web3 & Blockchain",
    desc: "Building decentralized apps with MetaMask, ethers.js, smart contract integration, 2FA security and QR/PDF exports.",
    tags: ["Web3", "ethers.js", "Solidity", "MetaMask"],
    color: "#a78bfa",
  },
];

function WhatIDo({ isDark }: { isDark: boolean }) {
  return (
    <section
      style={{
        padding: "5rem 0",
        background: isDark ? "rgba(17,17,24,0.4)" : "rgba(108,99,255,0.03)",
      }}
    >
      <div className="container-responsive">
        <SectionHeader
          eyebrow="What I Do"
          title="Services"
          subtitle="Turning complex problems into elegant digital solutions"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              style={{
                padding: "28px 24px",
                borderRadius: 20,
                background: isDark ? "rgba(17,17,24,0.75)" : "rgba(255,255,255,0.75)",
                border: "1px solid rgba(108,99,255,0.12)",
                backdropFilter: "blur(12px)",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                transition: "box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${s.color}30`;
                (e.currentTarget as HTMLDivElement).style.borderColor = `${s.color}40`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(108,99,255,0.12)";
              }}
            >
              {/* Top color bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${s.color}, transparent)`,
                }}
              />
              {/* Glow blob */}
              <div
                style={{
                  position: "absolute",
                  top: -20, right: -20,
                  width: 120, height: 120,
                  borderRadius: "50%",
                  background: s.color,
                  opacity: 0.06,
                  filter: "blur(30px)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontWeight: 800, fontSize: 17, marginBottom: 10, color: isDark ? "#f1f5f9" : "#171723" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 13, color: "rgba(148,163,184,0.75)", lineHeight: 1.7, marginBottom: 16 }}>
                {s.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "3px 9px",
                      borderRadius: 999,
                      fontSize: 10,
                      fontWeight: 700,
                      background: `${s.color}15`,
                      border: `1px solid ${s.color}35`,
                      color: s.color,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── NAV LINKS ─────────────────────────── */
const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#looking-for", label: "Goals" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

/* ═══════════════════════════ APP ═══════════════════════════ */
export default function App() {
  const [theme, toggleTheme] = useTheme();
  const { ref: heroRef, inView: heroInView } = useReveal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState<keyof typeof SKILLS_DATA>("Frontend");
  const [copied, setCopied] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  // Page loader: hide after 1.4s
  useEffect(() => {
    const t = setTimeout(() => setLoaderDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  // Easter egg
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "u") setEasterEggActive((p) => !p);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Copy email
  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Send email
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.fire({
      title: "Sending...",
      text: "Please wait while we send your message.",
      allowOutsideClick: false,
      background: "#111118",
      color: "#f1f5f9",
      didOpen: () => { Swal.showLoading(); },
    });

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.currentTarget,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you for reaching out. I'll reply soon.",
          showConfirmButton: false,
          timer: 2500,
          background: "#111118",
          color: "#f1f5f9",
        });
        e.currentTarget.reset();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong. Please email me directly.",
          background: "#111118",
          color: "#f1f5f9",
        });
      });
  };

  const isDark = theme === "dark";

  /* ── STYLE HELPERS ── */
  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: isDark ? "#0a0a0f" : "#f8f9ff",
    color: isDark ? "#f1f5f9" : "#171723",
    overflowX: "hidden",
    position: "relative",
  };

  return (
    <div style={pageStyle}>
      <PageLoader done={loaderDone} />
      <CustomCursor />

      {/* ── Hero glow blobs ── */}
      <div
        className="blob-pulse"
        style={{
          position: "fixed",
          top: "-15vh",
          left: "-10vw",
          width: "70vw",
          height: "70vh",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(60px)",
        }}
      />
      <div
        className="blob-pulse-slow"
        style={{
          position: "fixed",
          bottom: "-15vh",
          right: "-10vw",
          width: "60vw",
          height: "60vh",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(60px)",
        }}
      />

      {/* Easter Egg */}
      {easterEggActive && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "linear-gradient(135deg, #6c63ff, #00d4ff, #ff6b6b)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            style={{ position: "absolute", top: 16, right: 16, color: "#fff", fontSize: 24, background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setEasterEggActive(false)}
          >✕</button>
          <div style={{ textAlign: "center", color: "#fff" }}>
            <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 12 }}>You found the secret!</h2>
            <p style={{ fontSize: 20 }}>I see you're the curious type — perfect for innovative teams!</p>
          </div>
        </div>
      )}

      {/* ════════════════ NAVBAR ════════════════ */}
      <nav
        style={{
          position: "fixed",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          width: "calc(100% - 32px)",
          maxWidth: 900,
        }}
      >
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            borderRadius: 999,
            background: isDark ? "rgba(17,17,24,0.75)" : "rgba(255,255,255,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(108,99,255,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          {/* Logo */}
          <a href="#home" style={{ textDecoration: "none" }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "linear-gradient(135deg,#6c63ff,#00d4ff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 15,
                color: "#fff",
                letterSpacing: "-0.5px",
                boxShadow: "0 0 14px rgba(108,99,255,0.5)",
              }}
            >
              SH
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 4 }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  padding: "6px 14px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  color: isDark ? "rgba(241,245,249,0.8)" : "rgba(23,23,35,0.8)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#6c63ff";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(108,99,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = isDark ? "rgba(241,245,249,0.8)" : "rgba(23,23,35,0.8)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              aria-label="GitHub"
              style={{ padding: "6px 10px", borderRadius: "50%" }}
            >
              <FaGithub size={17} />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              aria-label="LinkedIn"
              style={{ padding: "6px 10px", borderRadius: "50%" }}
            >
              <FaLinkedin size={17} style={{ color: "#0077b5" }} />
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn-outline"
              aria-label="Toggle theme"
              style={{
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, y: 10, scale: 0.6 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.6 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 17, height: 17 }}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4" /><path d="M12 3v1" /><path d="M12 20v1" /><path d="M3 12h1" /><path d="M20 12h1" />
                      <path d="m18.364 5.636-.707.707" /><path d="m6.343 17.657-.707.707" /><path d="m5.636 5.636.707.707" /><path d="m17.657 17.657.707.707" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, y: 10, scale: 0.6 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.6 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 17, height: 17 }}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile hamburger — md:hidden */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden btn-outline"
              aria-label="Menu"
              style={{ padding: "6px 10px", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16, scaleY: 0.9 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -16, scaleY: 0.9 }}
              transition={{ duration: 0.25 }}
              style={{
                marginTop: 8,
                padding: "20px 24px",
                borderRadius: 24,
                background: isDark ? "rgba(17,17,24,0.95)" : "rgba(255,255,255,0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(108,99,255,0.2)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
                originY: 0,
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{
                    display: "block",
                    padding: "12px 0",
                    fontSize: 20,
                    fontWeight: 700,
                    color: isDark ? "#f1f5f9" : "#171723",
                    textDecoration: "none",
                    borderBottom: i < NAV_LINKS.length - 1 ? "1px solid rgba(108,99,255,0.1)" : "none",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#6c63ff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = isDark ? "#f1f5f9" : "#171723")}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <Marquee />

      {/* ════════════════ HERO ════════════════ */}
      <header id="home" style={{ paddingTop: 88, position: "relative", zIndex: 1 }}>
        {/* Dot grid */}
        <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: isDark ? 1 : 0.4, pointerEvents: "none" }} />

        <div className="container-responsive" style={{ position: "relative" }}>
          <motion.section
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "show" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
            }}
            style={{
              display: "grid",
              /* Mobile: single col | Desktop: two col */
              gridTemplateColumns: "1fr",
              gap: "2rem",
              alignItems: "center",
              paddingTop: "2rem",
              paddingBottom: "4rem",
            }}
            className="md:grid-cols-2 md:gap-12 md:py-20"
          >
            {/* ── RIGHT (PHOTO) — shown first on mobile ── */}
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } }}
              transition={{ duration: 0.8 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                /* mobile: order 1 (top) | desktop: order 2 (right) */
                order: 1,
              }}
              className="md:order-2"
            >
              {/* Orbiting tech badge chips — hidden on mobile to avoid clutter */}
              <div className="hidden sm:block" style={{ position: "absolute", inset: 0 }}>
                {["React", "Node", "TS", "CSS", "SQL", "AI"].map((badge, i) => (
                  <div
                    key={badge}
                    className={`orbit-badge-${i + 1}`}
                    style={{ position: "absolute", top: "50%", left: "50%", zIndex: 20 }}
                  >
                    <div style={{
                      transform: "translateX(-50%) translateY(-50%)",
                      padding: "4px 12px",
                      borderRadius: 999,
                      background: isDark ? "rgba(17,17,24,0.92)" : "rgba(255,255,255,0.92)",
                      border: "1px solid rgba(108,99,255,0.4)",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#6c63ff",
                      whiteSpace: "nowrap",
                      boxShadow: "0 0 12px rgba(108,99,255,0.25)",
                      backdropFilter: "blur(8px)",
                    }}>
                      {badge}
                    </div>
                  </div>
                ))}
              </div>

              {/* Photo container — smaller on mobile, larger on desktop */}
              <div
                style={{ position: "relative" }}
                /* mobile: 192px | sm: 240px | md: 300px | lg: 360px */
                className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-[340px] lg:h-[340px]"
              >
                {/* Glow */}
                <div style={{
                  position: "absolute", inset: -24, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(108,99,255,0.3) 0%, transparent 70%)",
                  filter: "blur(24px)",
                  animation: "blob-pulse 6s ease-in-out infinite",
                }} />
                {/* Spinning conic border */}
                <div className="spin-gradient" style={{
                  position: "absolute", inset: -5, borderRadius: "50%",
                  background: "conic-gradient(from 0deg, #6c63ff, #00d4ff, #ff6b6b, #6c63ff)",
                  zIndex: 1,
                }} />
                {/* Gap ring */}
                <div style={{
                  position: "absolute", inset: -2, borderRadius: "50%",
                  background: isDark ? "#0a0a0f" : "#f8f9ff",
                  zIndex: 2,
                }} />
                {/* Photo */}
                <div style={{
                  position: "relative", width: "100%", height: "100%",
                  borderRadius: "50%", overflow: "hidden", zIndex: 3,
                }}>
                  <img
                    src="/Profile1.jpg"
                    alt="Syed Hassan"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }}
                    loading="eager"
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(135deg, rgba(108,99,255,0.12), rgba(0,212,255,0.06))",
                    mixBlendMode: "overlay",
                  }} />
                </div>
              </div>
            </motion.div>

            {/* ── LEFT (TEXT) — shown second on mobile ── */}
            <motion.div
              variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } }}
              style={{ order: 2, textAlign: "left" }}
              className="md:order-1"
            >
              {/* Availability badge */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: -16 }, show: { opacity: 1, y: 0 } }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "5px 14px", borderRadius: 999,
                  background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
                  marginBottom: 20, fontSize: 12, fontWeight: 600, color: "#4ade80",
                }}
              >
                <span style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
                  <span className="ping-dot" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22c55e" }} />
                </span>
                Open to Work
              </motion.div>

              {/* Animated Name */}
              <motion.div variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }} style={{ marginBottom: 10 }}>
                <AnimatedName />
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                style={{
                  fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
                  fontWeight: 500,
                  color: "rgba(148,163,184,0.8)",
                  marginBottom: 16,
                  letterSpacing: 0.4,
                }}
              >
                {PROFILE.title}
              </motion.p>

              {/* Description */}
              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                style={{
                  fontSize: "clamp(0.9rem, 1.4vw, 1rem)",
                  color: isDark ? "rgba(148,163,184,0.72)" : "rgba(100,116,139,0.85)",
                  lineHeight: 1.85,
                  maxWidth: 500,
                  marginBottom: 20,
                }}
              >
                I don't just write code—I craft{" "}
                <span style={{ color: "#6c63ff", fontWeight: 600 }}>digital experiences</span>{" "}
                that users love and businesses value. With expertise across the full stack,
                I bridge the gap between{" "}
                <span style={{ color: "#00d4ff", fontWeight: 600 }}>elegant design</span>{" "}
                and{" "}
                <span style={{ color: "#4ade80", fontWeight: 600 }}>robust engineering</span>.
              </motion.p>

              {/* Typewriter */}
              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                style={{ fontSize: 14, fontWeight: 500, marginBottom: 28, color: isDark ? "rgba(148,163,184,0.65)" : "rgba(100,116,139,0.75)" }}
              >
                I work with{" "}
                <span style={{
                  display: "inline-block", padding: "2px 12px", borderRadius: 999,
                  background: "linear-gradient(135deg,rgba(108,99,255,0.18),rgba(0,212,255,0.12))",
                  border: "1px solid rgba(108,99,255,0.3)", fontWeight: 700, fontSize: 14, color: "#6c63ff",
                }}>
                  <Typewriter words={SKILL_ROTATION} loop={0} typeSpeed={70} deleteSpeed={40} delaySpeed={1400} />
                </span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24, alignItems: "center" }}
              >
                {/* Primary */}
                <a href="#projects" className="btn-primary" style={{ minHeight: 44, fontSize: 14 }}>
                  View Projects
                  <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }} style={{ display: "inline-flex" }}>
                    <ArrowRight size={15} />
                  </motion.span>
                </a>
                {/* Ghost */}
                <a href="#contact" className="btn-ghost" style={{ minHeight: 44, fontSize: 14 }}>
                  Hire Me
                </a>
                {/* Text link */}
                <a
                  href="https://drive.google.com/uc?export=download&id=113crhUwGj_f8VfkSnCUh__zPw9PJZfHb"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontSize: 13, fontWeight: 600, color: "rgba(108,99,255,0.75)",
                    textDecoration: "none", padding: "10px 2px",
                    borderBottom: "1px dashed rgba(108,99,255,0.35)",
                    transition: "color 0.2s, border-color 0.2s",
                    minHeight: 44,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#6c63ff";
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "#6c63ff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(108,99,255,0.75)";
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "rgba(108,99,255,0.35)";
                  }}
                >
                  <Download size={13} />
                  Download CV
                </a>
              </motion.div>

              {/* Social Icons */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                style={{ display: "flex", gap: 10 }}
              >
                {[
                  { href: PROFILE.github, icon: <FaGithub size={17} />, label: "GitHub" },
                  { href: PROFILE.linkedin, icon: <FaLinkedin size={17} style={{ color: "#0077b5" }} />, label: "LinkedIn" },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ y: -3, boxShadow: "0 0 18px rgba(108,99,255,0.45)" }}
                    style={{
                      width: 42, height: 42, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.22)",
                      color: isDark ? "#f1f5f9" : "#171723", textDecoration: "none",
                      transition: "box-shadow 0.25s",
                    }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.section>
        </div>
      </header>

      {/* ════════════════ MAIN CONTENT ════════════════ */}
      <main style={{ position: "relative", zIndex: 1 }}>



        {/* ── STATS ROW ── */}
        <StatsRow isDark={isDark} />

        {/* ── WHAT I DO ── */}
        <WhatIDo isDark={isDark} />

        {/* ── PROJECTS ── */}
        <section id="projects" className="container-responsive" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <SectionHeader
            eyebrow="Selected Work"
            title="Projects"
            subtitle="A selection of recently built apps and experiments"
          />


          {/* Featured Project (first) */}
          {PROJECTS[0] && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              onClick={() => setExpandedProject(PROJECTS[0])}
              style={{
                marginBottom: 32,
                borderRadius: 20,
                overflow: "hidden",
                background: isDark ? "#111118" : "#fff",
                border: "1px solid rgba(108,99,255,0.2)",
                cursor: "pointer",
                display: "grid",
                gridTemplateColumns: "1fr",
                boxShadow: "0 4px 40px rgba(108,99,255,0.1)",
              }}
              className="md:grid-cols-2"
              whileHover={{ boxShadow: "0 8px 60px rgba(108,99,255,0.25)" }}
            >
              {/* Image side */}
              <div style={{ position: "relative", overflow: "hidden", minHeight: 260 }}>
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    zIndex: 5,
                    padding: "4px 12px",
                    borderRadius: 999,
                    background: "linear-gradient(135deg,#6c63ff,#00d4ff)",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "0.1em",
                  }}
                >
                  ✦ FEATURED PROJECT
                </div>
                <motion.img
                  src={PROJECTS[0].image}
                  alt={PROJECTS[0].title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 260 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(17,17,24,0.5))" }} />
              </div>

              {/* Content side */}
              <div style={{ padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h3 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }} className="gradient-text">
                  {PROJECTS[0].title}
                </h3>
                <p style={{ fontSize: 14, color: "rgba(148,163,184,0.8)", lineHeight: 1.7, marginBottom: 20 }}>
                  {PROJECTS[0].description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                  {PROJECTS[0].stack.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "3px 10px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 600,
                        background: "rgba(108,99,255,0.1)",
                        border: "1px solid rgba(108,99,255,0.3)",
                        color: "#6c63ff",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <a
                    href={PROJECTS[0].link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="btn-primary"
                    style={{ fontSize: 13, padding: "8px 18px" }}
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                  <a
                    href={PROJECTS[0].github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="btn-ghost"
                    style={{ fontSize: 13, padding: "8px 18px" }}
                  >
                    <FaGithub size={14} /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {PROJECTS.slice(1).map((p, idx) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ boxShadow: "0 0 0 1px #6c63ff, 0 12px 40px rgba(108,99,255,0.2)", y: -4 }}
                onClick={() => setExpandedProject(p)}
                style={{
                  borderRadius: 20,
                  background: isDark ? "#111118" : "#fff",
                  border: "1px solid rgba(108,99,255,0.15)",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "box-shadow 0.3s, transform 0.3s",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", overflow: "hidden", height: 180 }}>
                  <motion.img
                    src={p.image}
                    alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    whileHover={{ scale: 1.06, filter: "brightness(1.1)" }}
                    transition={{ duration: 0.4 }}
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 80,
                      background: `linear-gradient(to top, ${isDark ? "#111118" : "#fff"}, transparent)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: "18px 20px 20px" }}>
                  <h3 style={{ fontWeight: 800, fontSize: 17, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(148,163,184,0.75)", lineHeight: 1.6, marginBottom: 14 }}>
                    {p.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
                    {p.stack.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "2px 8px",
                          borderRadius: 999,
                          fontSize: 10,
                          fontWeight: 600,
                          background: "rgba(108,99,255,0.08)",
                          border: "1px solid rgba(108,99,255,0.25)",
                          color: "#6c63ff",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    {p.stack.length > 4 && (
                      <span style={{ fontSize: 10, color: "rgba(148,163,184,0.5)", padding: "2px 4px" }}>
                        +{p.stack.length - 4}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#6c63ff",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "6px 12px",
                        borderRadius: 8,
                        background: "rgba(108,99,255,0.1)",
                        border: "1px solid rgba(108,99,255,0.25)",
                        transition: "all 0.2s",
                      }}
                    >
                      <ExternalLink size={11} /> Live
                    </a>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: isDark ? "rgba(241,245,249,0.7)" : "rgba(23,23,35,0.7)",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "6px 12px",
                        borderRadius: 8,
                        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                      }}
                    >
                      <FaGithub size={11} /> Code
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── PROJECT MODAL ── */}
        <AnimatePresence>
          {expandedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(10,10,15,0.85)",
                backdropFilter: "blur(16px)",
                zIndex: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
              }}
              onClick={() => setExpandedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.88, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 24, stiffness: 280 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: isDark ? "#111118" : "#fff",
                  borderRadius: 24,
                  maxWidth: 780,
                  width: "100%",
                  maxHeight: "90vh",
                  overflow: "auto",
                  border: "1px solid rgba(108,99,255,0.25)",
                  boxShadow: "0 0 80px rgba(108,99,255,0.2)",
                }}
              >
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => setExpandedProject(null)}
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      zIndex: 10,
                      background: isDark ? "rgba(17,17,24,0.9)" : "rgba(255,255,255,0.9)",
                      border: "1px solid rgba(108,99,255,0.2)",
                      borderRadius: "50%",
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: isDark ? "#f1f5f9" : "#171723",
                    }}
                  >
                    <X size={18} />
                  </button>
                  <img
                    src={expandedProject.image}
                    alt={expandedProject.title}
                    style={{ width: "100%", height: 240, objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 80,
                      background: `linear-gradient(to top, ${isDark ? "#111118" : "#fff"}, transparent)`,
                    }}
                  />
                </div>
                <div style={{ padding: "32px 36px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                    <h2 className="gradient-text" style={{ fontSize: 30, fontWeight: 900 }}>
                      {expandedProject.title}
                    </h2>
                    <div style={{ display: "flex", gap: 10 }}>
                      <a href={expandedProject.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: 13 }}>
                        <ExternalLink size={14} /> Live Project
                      </a>
                      {expandedProject.github && (
                        <a href={expandedProject.github} target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize: 13 }}>
                          <FaGithub size={14} /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                  <p style={{ color: "rgba(148,163,184,0.85)", lineHeight: 1.8, fontSize: 15, marginBottom: 24 }}>
                    {expandedProject.description}
                  </p>
                  <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: "rgba(108,99,255,0.9)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Tech Stack</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {expandedProject.stack.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "6px 14px",
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 600,
                          background: "rgba(108,99,255,0.1)",
                          border: "1px solid rgba(108,99,255,0.3)",
                          color: "#6c63ff",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SKILLS ── */}
        <section id="skills" className="container-responsive" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <SectionHeader
            eyebrow="What I Know"
            title="Skills"
            subtitle="Core technologies I use to build products"
          />

          <TechGalaxy />

          {/* Skill Tabs */}
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                display: "inline-flex",
                gap: 4,
                padding: 4,
                borderRadius: 12,
                background: isDark ? "rgba(17,17,24,0.7)" : "rgba(0,0,0,0.05)",
                border: "1px solid rgba(108,99,255,0.1)",
                overflowX: "auto",
              }}
            >
              {(Object.keys(SKILLS_DATA) as Array<keyof typeof SKILLS_DATA>).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSkillTab(tab)}
                  style={{
                    position: "relative",
                    padding: "8px 20px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 13,
                    border: "none",
                    cursor: "pointer",
                    background: "transparent",
                    color: activeSkillTab === tab ? "#fff" : "rgba(148,163,184,0.7)",
                    transition: "color 0.2s",
                    whiteSpace: "nowrap",
                    minHeight: 44,
                  }}
                >
                  {activeSkillTab === tab && (
                    <motion.div
                      layoutId="skill-tab-indicator"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 8,
                        background: "linear-gradient(135deg,#6c63ff,#00d4ff)",
                        zIndex: 0,
                      }}
                      transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                    />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>{tab}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={activeSkillTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 12,
            }}
          >
            {SKILLS_DATA[activeSkillTab].map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} delay={i * 0.05} />
            ))}
          </motion.div>
        </section>

        {/* ── EDUCATION ── */}
        <section id="education" className="container-responsive" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <SectionHeader
            eyebrow="Where I Learned"
            title="Education"
            subtitle="Academic background & qualifications"
          />

          <ol style={{ position: "relative", paddingLeft: 0, listStyle: "none" }}>
            {/* Animated timeline line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: 20,
                top: 0,
                width: 3,
                background: "linear-gradient(to bottom, #6c63ff, #00d4ff)",
                borderRadius: 99,
                boxShadow: "0 0 12px rgba(108,99,255,0.4)",
                zIndex: 0,
              }}
            />

            {EDUCATION.map((e, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.18, ease: "easeOut" }}
                style={{ paddingLeft: 64, marginBottom: 32, position: "relative" }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: 8,
                    top: 24,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#6c63ff,#00d4ff)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    zIndex: 2,
                    boxShadow: "0 0 16px rgba(108,99,255,0.5)",
                  }}
                >
                  <GraduationCap size={13} />
                </div>
                {/* Pulsing ring */}
                <div
                  className="ping-dot"
                  style={{
                    position: "absolute",
                    left: 8,
                    top: 24,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(108,99,255,0.3)",
                    zIndex: 1,
                  }}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ borderColor: "rgba(108,99,255,0.4)", boxShadow: "0 0 24px rgba(108,99,255,0.12)" }}
                  style={{
                    background: isDark ? "rgba(17,17,24,0.7)" : "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(108,99,255,0.15)",
                    borderRadius: 20,
                    padding: "24px 28px",
                    transition: "all 0.3s",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 12,
                  }}
                >
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: 16, marginBottom: 6 }}>{e.school}</h4>
                    <p style={{ fontWeight: 600, fontSize: 14, color: "#6c63ff", marginBottom: 4 }}>{e.degree}</p>
                    <p style={{ fontSize: 12, color: "rgba(148,163,184,0.6)", fontStyle: "italic" }}>{e.period}</p>
                  </div>
                  <div
                    style={{
                      fontSize: 40,
                      fontWeight: 900,
                      color: "rgba(108,99,255,0.12)",
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {e.year}
                  </div>
                </motion.div>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* ── I'M LOOKING FOR ── */}
        <section id="looking-for" className="container-responsive" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <SectionHeader
            eyebrow="What's Next"
            title="I'm Looking For"
            subtitle="The perfect opportunity to grow and innovate"
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {/* Left card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: isDark ? "rgba(17,17,24,0.8)" : "rgba(255,255,255,0.8)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(108,99,255,0.15)",
                borderRadius: 20,
                padding: "28px 28px 32px",
                borderTop: "4px solid #6c63ff",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg,#6c63ff,#00d4ff)" }} />
              <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <Rocket size={18} style={{ color: "#6c63ff" }} /> My Next Mission
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { icon: <Sparkles size={16} />, text: "A forward-thinking team that values creative technical solutions" },
                  { icon: <Zap size={16} />, text: "A role where I can leverage my full-stack skills on innovative products" },
                  { icon: <Rocket size={16} />, text: "A company with a culture of experimentation and growth" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 14, color: isDark ? "rgba(241,245,249,0.8)" : "rgba(23,23,35,0.8)", lineHeight: 1.6 }}
                  >
                    <span style={{ color: "#6c63ff", marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                    {item.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: isDark ? "rgba(17,17,24,0.8)" : "rgba(255,255,255,0.8)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(0,212,255,0.15)",
                borderRadius: 20,
                padding: "28px 28px 32px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg,#00d4ff,#6c63ff)" }} />
              <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <Heart size={18} style={{ color: "#00d4ff" }} /> Let's Collaborate If
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { icon: <Users size={16} />, text: "You're building something that pushes technological boundaries" },
                  { icon: <Code2 size={16} />, text: "Your team values both clean code and creative problem-solving" },
                  { icon: <Layers size={16} />, text: "You need a developer who can bridge design and technical implementation" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 14, color: isDark ? "rgba(241,245,249,0.8)" : "rgba(23,23,35,0.8)", lineHeight: 1.6 }}
                  >
                    <span style={{ color: "#00d4ff", marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                    {item.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── RESUME ── */}
        <section id="resume" className="container-responsive" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
          <div
            style={{
              borderRadius: 20,
              background: "linear-gradient(135deg, #6c63ff 0%, #00d4ff 100%)",
              padding: "40px 36px",
              boxShadow: "0 0 60px rgba(108,99,255,0.4)",
              display: "flex",
              flexDirection: "column",
              gap: 24,
              position: "relative",
              overflow: "hidden",
            }}
            className="md:flex-row md:items-center md:justify-between"
          >
            <div style={{ position: "absolute", top: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.08)", filter: "blur(30px)" }} />
            <div style={{ position: "absolute", bottom: -40, right: -40, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.06)", filter: "blur(40px)" }} />

            <div style={{ maxWidth: 520, position: "relative", zIndex: 1 }}>
              {/* White title — visible on gradient bg */}
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>My Resume</p>
              <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 900, color: "#ffffff", marginBottom: 16, lineHeight: 1.1 }}>Download Resume</h2>
              <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 15, lineHeight: 1.7 }}>
                Discover my{" "}
                <strong>skills, experience, and achievements</strong>{" "}
                all in one place — crafted to give{" "}
                <em>recruiters, clients, and collaborators</em>{" "}
                a clear and lasting impression of my professional journey.
              </p>
            </div>

            <div style={{ display: "flex", gap: 14, alignItems: "center", position: "relative", zIndex: 1, flexShrink: 0 }}>
              <button
                onClick={() => window.open("https://drive.google.com/file/d/113crhUwGj_f8VfkSnCUh__zPw9PJZfHb/view?usp=sharing")}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.25)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  transition: "background 0.2s",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                  <circle cx="12" cy="12" r="3" className="eye-pupil" />
                </svg>
              </button>
              <a
                href="https://drive.google.com/uc?export=download&id=113crhUwGj_f8VfkSnCUh__zPw9PJZfHb"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.25)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 13v8l-4-4" /><path d="m12 21 4-4" />
                  <path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section
          id="contact"
          style={{
            paddingTop: "5rem",
            paddingBottom: "5rem",
            background: isDark ? "rgba(17,17,24,0.5)" : "rgba(108,99,255,0.03)",
          }}
        >
          <div className="container-responsive">
            <SectionHeader
              eyebrow="Get In Touch"
              title="Let's Build Together"
              subtitle="Open for freelance projects, full-time roles, and collaborations"
            />

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40 }}
              className="lg:grid-cols-2"
            >
              {/* LEFT INFO */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ display: "flex", flexDirection: "column", gap: 24 }}
              >
                <div>
                  <h3 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: 8 }}>
                    Let's build something{" "}
                    <span className="gradient-text">amazing</span>
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 8px #22c55e" }} />
                    <span style={{ fontSize: 13, color: "#4ade80", fontWeight: 600 }}>Currently available for new projects</span>
                  </div>
                </div>

                {/* Email row with copy */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 18px",
                    borderRadius: 14,
                    background: isDark ? "rgba(17,17,24,0.8)" : "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(108,99,255,0.2)",
                  }}
                >
                  <Mail size={18} style={{ color: "#6c63ff", flexShrink: 0 }} />
                  <span style={{ fontSize: 14, fontWeight: 600, flex: 1 }}>{PROFILE.email}</span>
                  <button
                    onClick={copyEmail}
                    title="Copy email"
                    style={{
                      background: "rgba(108,99,255,0.1)",
                      border: "1px solid rgba(108,99,255,0.25)",
                      borderRadius: 8,
                      padding: "5px 10px",
                      cursor: "pointer",
                      color: "#6c63ff",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 12,
                      fontWeight: 700,
                      transition: "all 0.2s",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Check size={13} style={{ color: "#4ade80" }} /> Copied!
                        </motion.span>
                      ) : (
                        <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Copy size={13} /> Copy
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>

                {/* Response time */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(148,163,184,0.65)", fontSize: 13 }}>
                  <Clock size={15} />
                  Response time: usually within 24h
                </div>

                {/* Social links */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {[
                    { href: PROFILE.github, icon: <FaGithub size={20} />, label: "GitHub" },
                    { href: PROFILE.linkedin, icon: <FaLinkedin size={20} style={{ color: "#0077b5" }} />, label: "LinkedIn" },
                    { href: `mailto:${PROFILE.email}`, icon: <Mail size={20} style={{ color: "#6c63ff" }} />, label: "Email" },
                  ].map((s) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, boxShadow: "0 0 20px rgba(108,99,255,0.35)" }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "10px 18px",
                        borderRadius: 12,
                        background: isDark ? "rgba(17,17,24,0.8)" : "rgba(255,255,255,0.8)",
                        border: "1px solid rgba(108,99,255,0.2)",
                        textDecoration: "none",
                        color: isDark ? "#f1f5f9" : "#171723",
                        fontSize: 13,
                        fontWeight: 700,
                        transition: "border-color 0.2s",
                      }}
                    >
                      {s.icon}
                      {s.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT – FORM */}
              <motion.form
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                onSubmit={sendEmail}
                style={{
                  background: isDark ? "rgba(17,17,24,0.7)" : "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(108,99,255,0.15)",
                  borderRadius: 20,
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(108,99,255,0.8)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Name</label>
                    <input type="text" name="name" placeholder="Your name" required className="input-fancy" style={{ color: isDark ? "#f1f5f9" : "#171723" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(108,99,255,0.8)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Email</label>
                    <input type="email" name="email" placeholder="your@email.com" required className="input-fancy" style={{ color: isDark ? "#f1f5f9" : "#171723" }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(108,99,255,0.8)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Subject</label>
                  <input type="text" name="subject" placeholder="What's this about?" required className="input-fancy" style={{ color: isDark ? "#f1f5f9" : "#171723" }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(108,99,255,0.8)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Message</label>
                  <textarea name="message" placeholder="Tell me about your project..." rows={5} required className="input-fancy" style={{ color: isDark ? "#f1f5f9" : "#171723", resize: "vertical" }} />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ boxShadow: "0 0 40px rgba(108,99,255,0.6)" }}
                  whileTap={{ scale: 0.97 }}
                  className="shimmer-btn"
                  style={{
                    width: "100%",
                    padding: "14px 0",
                    borderRadius: 12,
                    border: "none",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 15,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    minHeight: 44,
                  }}
                >
                  <Mail size={16} />
                  Send Message
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer
        style={{
          position: "relative",
          overflow: "hidden",
          background: isDark ? "#0a0a0f" : "#f0f1ff",
          borderTop: "1px solid rgba(108,99,255,0.15)",
        }}
      >
        {/* Gradient top line */}
        <div style={{ height: 3, background: "linear-gradient(90deg,#6c63ff,#00d4ff,#6c63ff)", backgroundSize: "200% auto", animation: "gradient-x 4s ease infinite" }} />

        {/* Grid pattern */}
        <div
          className="dot-grid"
          style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }}
        />

        <div className="container-responsive" style={{ position: "relative", zIndex: 1, paddingTop: 40, paddingBottom: 32 }}>
          {/* Top row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 28 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,#6c63ff,#00d4ff)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#fff", boxShadow: "0 0 16px rgba(108,99,255,0.4)" }}>
              SH
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} style={{ fontSize: 13, color: "rgba(148,163,184,0.65)", textDecoration: "none", padding: "4px 10px", fontWeight: 600, transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#6c63ff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(148,163,184,0.65)")}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Middle row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 }}>
            {[
              { href: `mailto:${PROFILE.email}`, icon: <Mail size={17} />, label: "Email" },
              { href: PROFILE.github, icon: <FaGithub size={17} />, label: "GitHub" },
              { href: PROFILE.linkedin, icon: <FaLinkedin size={17} />, label: "LinkedIn" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(108,99,255,0.1)",
                  border: "1px solid rgba(108,99,255,0.2)",
                  color: isDark ? "rgba(241,245,249,0.7)" : "rgba(23,23,35,0.7)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(108,99,255,0.2)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 14px rgba(108,99,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(108,99,255,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Bottom row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 12, color: "rgba(148,163,184,0.5)", flexWrap: "wrap", textAlign: "center" }}>
            <span>© {new Date().getFullYear()} Syed Hassan Hussain Shah</span>
            <span>·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              Built with React & Tailwind
              <Heart size={11} style={{ color: "#ff6b6b", fill: "#ff6b6b" }} />
            </span>
          </div>
        </div>
      </footer>

      <ScrollProgressCircle />
    </div>
  );
}
