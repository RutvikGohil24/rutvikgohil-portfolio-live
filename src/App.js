import { useState, useEffect, useRef } from "react";

const PHOTO_B64 = "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";

const theme = {
  primary: "#2563EB",
  primaryLight: "#3B82F6",
  primaryDark: "#1D4ED8",
  primaryGlow: "rgba(37,99,235,0.15)",
  primaryGlow2: "rgba(37,99,235,0.08)",
};

const skills = [
  // { name: "Microsoft Dynamics 365 CE", category: "CRM" },
  // { name: "Power Apps (Model-Driven & Canvas)", category: "Power Platform" },
  // { name: "Power Automate", category: "Power Platform" },
  // { name: "Dataverse", category: "Power Platform" },
  // { name: "C# / Plugin Development", category: "Development" },
  // { name: "JavaScript / Web Resources", category: "Development" },
  // { name: "Custom APIs & Integration", category: "Development" },
  // { name: "Sales, Customer Service & Marketing Modules", category: "CRM" },
  // { name: "Azure DevOps / ALM", category: "DevOps" },
  // { name: "SQL / FetchXML / OData", category: "Development" },
];

const experience = [
  {
    title: "Software Engineer",
    company: "InstaCloud Solutions",
    location: "Ahmedabad",
    duration: "July 2022 - Present · 3.9+ Years",
    color: "#2563EB",
    achievements: [
      "Designed and delivered end-to-end enterprise CRM solutions on Dynamics 365 CE, covering Sales and Customer Service modules for large-scale clients.",
      "Built scalable model-driven applications and Canvas Power Apps, automating complex business workflows using Power Automate and Dataverse.",
      "Developed custom Plugins, Custom APIs, and JavaScript Web Resources to extend platform capabilities and integrate with external enterprise systems.",
      "Led requirement gathering, development, deployment, and post-go-live support across multiple full-cycle CRM implementations.",
    ],
  },
];

const projects = [
  {
    title: "Recruitment Management System",
    desc:
      "Developed a Recruitment Management System using Dynamics 365 and Power Platform to streamline hiring processes and automate recruitment workflows.",
    tech: [
      "Dynamics 365 CE",
      "Power Automate",
      "Dataverse",
      "JavaScript",
      "Plugins",
      "REST APIs"
    ],
    github: "https://github.com/RutvikGohil24",
    live: "https://rutvikgohil.vercel.app"
  },
  {
    title: "Dynamics 365 Integration Solution",
    desc:
      "Integrated external enterprise systems with Dynamics 365 using Custom APIs, Plugins, and secure REST integrations.",
    tech: [
      "Dynamics 365",
      "C#",
      "Azure",
      "Custom APIs",
      "JavaScript"
    ],
    github: "https://github.com/RutvikGohil24",
    live: "https://rutvikgohil.vercel.app"
  }
];

const certifications = [
  {
    name: "Get started with classes, properties, and methods in C#",
    issuer: "Microsoft Applied Skills",
    date: "2026",
    badge: "💻",
    color: "#512BD4",
    category: "Development",
    verify: "https://learn.microsoft.com/api/credentials/share/en-gb/RutvikGohil-5221/F07BAFCCEFE227BD?sharingId=13589C96A3FCE379",
  },
  {
    name: "Create and manage canvas apps with Power Apps",
    issuer: "Microsoft Applied Skills",
    date: "2026",
    badge: "🎨",
    color: "#742774",
    category: "Power Platform",
    verify: "https://learn.microsoft.com/api/credentials/share/en-gb/RutvikGohil-5221/9249B14FA91523DA?sharingId",
  },
  {
    name: "Create and manage model-driven apps with Power Apps and Dataverse",
    issuer: "Microsoft Applied Skills",
    date: "2026",
    badge: "🗄️",
    color: "#742774",
    category: "Power Platform",
    verify: "https://learn.microsoft.com/api/credentials/share/en-gb/RutvikGohil-5221/1600AE6F7DDBEAFF?sharingId",
  },
  {
    name: "Create and manage automated processes by using Power Automate",
    issuer: "Microsoft Applied Skills",
    date: "2026",
    badge: "⚡",
    color: "#0066FF",
    category: "Power Platform",
    verify: "https://learn.microsoft.com/api/credentials/share/en-gb/RutvikGohil-5221/4236662E9274F967?sharingId",
  },
];

const education = [
  {
    degree: "Bachelor of Engineering (BE)",
    field: "Electronics and Communication Engineering (ECE)",
    college: "Shantilal Shah Government Engineering College, Bhavnagar",
    university: "Gujarat Technological University, Ahmedabad",
    year: "2022",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, inView];
}

function AnimatedBar({ level, inView, color }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (inView) { setTimeout(() => setWidth(level), 200); }
  }, [inView, level]);
  return (
    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 6, overflow: "hidden" }}>
      <div style={{
        height: "100%", width: width + "%", borderRadius: 99,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        transition: "width 1.1s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: `0 0 12px ${color}88`,
      }} />
    </div>
  );
}

function Section({ id, children, style }) {
  const [ref, inView] = useInView();
  return (
    <section id={id} ref={ref} style={{
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
      ...style,
    }}>
      {children}
    </section>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const bg = dark ? "#0A0A0F" : "#F8F7F4";
  const bg2 = dark ? "#111118" : "#FFFFFF";
  const bg3 = dark ? "#18181F" : "#F0EEE9";
  const text = dark ? "#F2F2F7" : "#111118";
  const textMuted = dark ? "#8A8A9A" : "#6B6B80";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const cardBg = dark ? "#15151D" : "#FFFFFF";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["Home", "About", "Skills", "Experience", "Certifications", "Education", "Contact"];

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const sectionStyle = { maxWidth: 900, margin: "0 auto", padding: "64px 24px" };
  const labelStyle = { fontSize: 14, fontFamily: "'Sora', sans-serif", fontWeight: 700, letterSpacing: 3, color: theme.primary, textTransform: "uppercase", marginBottom: 12 };
  const h2Style = { fontFamily: "'Sora', sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: text, marginBottom: 16, lineHeight: 1.2 };

  return (
    <div style={{ background: bg, color: text, fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", transition: "background 0.3s, color 0.3s", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${theme.primary}66; border-radius: 99px; }
        .nav-link { transition: color 0.2s; cursor: pointer; }
        .nav-link:hover { color: ${theme.primary} !important; }
        .btn-primary {
          background: linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark});
          color: white; border: none; padding: 14px 32px; border-radius: 99px;
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 15px;
          cursor: pointer; transition: all 0.25s; display: inline-flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 24px ${theme.primary}44;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px ${theme.primary}66; }
        .btn-secondary {
          background: transparent; color: ${theme.primary}; border: 1.5px solid ${theme.primary}66;
          padding: 13px 28px; border-radius: 99px; font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 15px; cursor: pointer; transition: all 0.25s;
        }
        .btn-secondary:hover { background: ${theme.primaryGlow}; transform: translateY(-2px); }
        .card-hover { transition: transform 0.25s, box-shadow 0.25s; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.25) !important; }
        .skill-item:hover .skill-name { color: ${theme.primary} !important; }
        .social-link { transition: all 0.2s; opacity: 0.6; }
        .social-link:hover { opacity: 1; transform: translateY(-2px); }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.15); opacity: 0; } }
        @keyframes fadeUp { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .hero-title {
          background: linear-gradient(135deg, ${text} 0%, ${theme.primary} 60%, ${theme.primaryLight} 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .tag { display: inline-block; padding: 4px 12px; border-radius: 99px; font-size: 12px; font-weight: 600;
          background: ${theme.primaryGlow2}; color: ${theme.primary}; border: 1px solid ${theme.primary}33; margin: 3px; }
        .timeline-dot { width: 14px; height: 14px; border-radius: 50%; background: ${theme.primary};
          box-shadow: 0 0 0 4px ${theme.primaryGlow}, 0 0 0 8px ${theme.primaryGlow2}; flex-shrink: 0; margin-top: 6px; }
        input, textarea { outline: none; }
        input:focus, textarea:focus { border-color: ${theme.primary} !important; box-shadow: 0 0 0 3px ${theme.primaryGlow} !important; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? (dark ? "rgba(10,10,15,0.92)" : "rgba(248,247,244,0.92)") : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${border}` : "1px solid transparent",
        transition: "all 0.3s",
        padding: "0 32px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div></div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
            {navLinks.map(l => (
              <span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}
                style={{ fontSize: 22, fontWeight: 500, color: textMuted, letterSpacing: 0.2 }}>{l}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={() => setDark(!dark)} style={{
              background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
              border: `1px solid ${border}`, borderRadius: 99, padding: "9px 12px",
              cursor: "pointer", color: text, transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {dark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              display: "none", background: "transparent", border: "none", cursor: "pointer",
              color: text, fontSize: 22, padding: "4px 8px",
            }} className="mobile-menu-btn">☰</button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background: dark ? "#111118" : "#fff", borderTop: `1px solid ${border}`, padding: "16px 32px 20px" }}>
            {navLinks.map(l => (
              <div key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
                padding: "12px 0", fontSize: 15, fontWeight: 500, color: textMuted,
                borderBottom: `1px solid ${border}`, cursor: "pointer",
              }}>{l}</div>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "80px 24px 40px", maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        {/* BG decoration */}
        <div style={{ position: "fixed", top: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${theme.primaryGlow}, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "fixed", bottom: "15%", left: "2%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${theme.primaryGlow2}, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />

        <div style={{ display: "flex", gap: 80, alignItems: "center", flexWrap: "wrap", zIndex: 1, width: "100%", animation: "fadeUp 0.9s ease both" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: theme.primaryGlow2, border: `1px solid ${theme.primary}33`, borderRadius: 99, padding: "6px 16px", marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, background: theme.primary, borderRadius: "50%", display: "inline-block", boxShadow: `0 0 8px ${theme.primary}` }} />
              <span style={{ fontSize: 16, fontWeight: 600, color: theme.primary, fontFamily: "'Sora', sans-serif", letterSpacing: 1.5, textTransform: "uppercase" }}>Available for Opportunities</span>
            </div>
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(36px,6vw,66px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 20, letterSpacing: -2 }} className="hero-title">
              Rutvik Gohil<br />
            </h1>
            <p style={{ fontSize: "clamp(18px,2vw,22px)", color: textMuted, marginTop: 12, lineHeight: 1.6 }}> Dynamics 365 CE & Power Platform Developer specializing in enterprise CRM solutions, automation, integrations, and scalable business applications.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo("contact")}>
                <span>Let's Connect</span> <span>→</span>
              </button>
              <button className="btn-secondary" onClick={() => scrollTo("experience")}>
                View Experience
              </button>
            </div>
          </div>

          {/* PHOTO */}
          <div style={{ flexShrink: 0, position: "relative", animation: "float 5s ease-in-out infinite" }}>
            <div style={{ position: "absolute", inset: -3, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`, zIndex: 0 }} />
            <div style={{ position: "absolute", inset: -18, borderRadius: "50%", border: `2px solid ${theme.primary}30`, animation: "pulse-ring 2.5s ease-out infinite" }} />
            <div style={{ position: "absolute", inset: -36, borderRadius: "50%", border: `1.5px solid ${theme.primary}15`, animation: "pulse-ring 2.5s ease-out 0.8s infinite" }} />
            <img
              src={`data:image/jpeg;base64,${PHOTO_B64}`}
              alt="Rutvik Gohil"
              style={{ width: 320, height: 320, borderRadius: "50%", objectFit: "cover", display: "block", position: "relative", zIndex: 2, border: `4px solid ${dark ? "#0A0A0F" : "#F8F7F4"}` }}
            />
            {/* Floating chips */}
            <div style={{ position: "absolute", top: -10, right: -60, background: cardBg, border: `1px solid ${border}`, borderRadius: 12, padding: "8px 14px", whiteSpace: "nowrap", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", zIndex: 2 }}>
              <div style={{ fontSize: 14, color: textMuted, fontWeight: 500 }}>Experience</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: theme.primary, fontFamily: "'Sora', sans-serif" }}>3.9+ Years</div>
            </div>
            <div style={{ position: "absolute", bottom: 10, left: -70, background: cardBg, border: `1px solid ${border}`, borderRadius: 12, padding: "8px 14px", whiteSpace: "nowrap", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", zIndex: 2 }}>
              <div style={{ fontSize: 14, color: textMuted, fontWeight: 500 }}>Location</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: text, fontFamily: "'Sora', sans-serif" }}>📍 Gandhinagar, Gujarat, India</div>
            </div>
          </div>
        </div>

      </section>

      {/* ABOUT */}
      <Section id="about">
        <div style={sectionStyle}>
          <p style={labelStyle}>Who I Am</p>
          <h2 style={h2Style}>About Me</h2>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <p style={{ fontSize: 16, color: textMuted, lineHeight: 1.85, marginBottom: 24 }}>
                I'm a <strong style={{ color: text }}>Microsoft Dynamics 365 CE and Power Platform Developer</strong> with <strong style={{ color: theme.primary }}>3.9 years of experience</strong> in designing, customizing, and delivering enterprise CRM solutions.
              </p>
              <p style={{ fontSize: 16, color: textMuted, lineHeight: 1.85, marginBottom: 24 }}>
                I have hands-on expertise in <strong style={{ color: text }}>plugins, custom APIs, JavaScript web resources</strong>, and Power Automate, with deep experience in Sales and Customer Service modules. I build scalable model-driven applications, automate business processes, and integrate external systems seamlessly.
              </p>
              <p style={{ fontSize: 16, color: textMuted, lineHeight: 1.85 }}>
                Experienced in <strong style={{ color: text }}>end-to-end implementation</strong> - from requirement gathering through development, deployment, and ongoing support.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 240 }}>
              {[
                { label: "CRM Platform", value: "Dynamics 365 CE" },
                { label: "Power Platform", value: "Apps · Automate · Dataverse" },
                { label: "Languages", value: "C# · JavaScript · SQL" },
                { label: "Location", value: "Gandhinagar, Gujarat" },
                { label: "Status", value: "Open to Opportunities" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: theme.primary, marginTop: 9, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 11, color: textMuted, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "'Sora', sans-serif" }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: text, fontWeight: 500, marginTop: 2 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills">
        <div style={sectionStyle}>
          <p style={labelStyle}>What I Know</p>
          <h2 style={h2Style}>Technical Skills</h2>
          <SkillsGrid dark={dark} text={text} textMuted={textMuted} border={border} />
        </div>
      </Section>

      {/* EXPERIENCE */}
      < Section id="experience" >
        <div style={sectionStyle}>
          <p style={labelStyle}>Career Journey</p>
          <h2 style={h2Style}>Work Experience</h2>
          <div style={{ position: "relative", paddingLeft: 32 }}>
            <div style={{ position: "absolute", left: 6, top: 6, bottom: 0, width: 2, background: `linear-gradient(${theme.primary}88, transparent)` }} />
            {experience.map((exp, i) => (
              <div key={i} style={{ display: "flex", gap: 24, marginBottom: 40 }}>
                <div className="timeline-dot" style={{ marginTop: 4 }} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    background: cardBg, border: `1px solid ${border}`, borderRadius: 20,
                    padding: "28px 32px", boxShadow: dark ? "0 4px 24px rgba(0,0,0,0.3)" : "0 4px 24px rgba(0,0,0,0.06)",
                  }} className="card-hover">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
                      <div>
                        <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, color: text, marginBottom: 4 }}>{exp.title}</h3>
                        <p style={{ color: theme.primary, fontWeight: 600, fontSize: 14 }}>{exp.company} · <span style={{ color: textMuted, fontWeight: 500 }}>📍 {exp.location}</span></p>
                      </div>
                      <span style={{ fontSize: 12, color: textMuted, background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", padding: "6px 14px", borderRadius: 99, fontWeight: 500, whiteSpace: "nowrap" }}>{exp.duration}</span>
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                      {exp.achievements.map((a, j) => (
                        <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 14, color: textMuted, lineHeight: 1.7 }}>
                          <span style={{ color: theme.primary, flexShrink: 0, marginTop: 2, fontSize: 16 }}>▸</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                    <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap" }}>
                      {["Dynamics 365 CE", "Power Apps", "Power Automate", "Dataverse", "C# Plugins", "JavaScript", "Custom API", "Azure", "Azure DevOps"].map(t => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section >

      {/* CERTIFICATIONS */}
      < Section id="certifications" >
        <div style={sectionStyle}>
          <p style={labelStyle}>Microsoft Applied Skills</p>
          <h2 style={h2Style}>Earned Certifications</h2>
          <p style={{ color: textMuted, fontSize: 15, marginBottom: 40, maxWidth: 560 }}>
            Verified credentials from Microsoft, demonstrating hands-on proficiency across Dynamics 365 and Power Platform.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
            {certifications.map((cert, i) => (
              <a key={i} href={cert.verify} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <div style={{
                  background: cardBg, border: `1px solid ${border}`, borderRadius: 20,
                  padding: "24px 28px", display: "flex", gap: 18, alignItems: "flex-start",
                  boxShadow: dark ? "0 4px 24px rgba(0,0,0,0.25)" : "0 4px 20px rgba(0,0,0,0.06)",
                  transition: "all 0.25s", cursor: "pointer", height: "100%",
                }} className="card-hover">
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                    background: `linear-gradient(135deg, ${cert.color}22, ${cert.color}44)`,
                    border: `1.5px solid ${cert.color}55`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                  }}>
                    {cert.badge}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14, color: text, lineHeight: 1.45 }}>{cert.name}</h3>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: cert.color, fontFamily: "'Sora', sans-serif" }}>
                        {cert.issuer}
                      </span>
                      <span style={{ width: 3, height: 3, borderRadius: "50%", background: textMuted, display: "inline-block" }} />
                      <span style={{ fontSize: 12, color: textMuted }}>{cert.date}</span>
                    </div>
                    <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{
                        fontSize: 11, fontWeight: 600, color: theme.primary,
                        background: theme.primaryGlow2, border: `1px solid ${theme.primary}33`,
                        padding: "3px 10px", borderRadius: 99, letterSpacing: 0.5,
                        display: "inline-flex", alignItems: "center", gap: 4,
                      }}>
                        ✓ Verified Credential
                      </span>
                      <span style={{
                        fontSize: 11, fontWeight: 600, color: cert.color,
                        background: `${cert.color}15`, border: `1px solid ${cert.color}33`,
                        padding: "3px 10px", borderRadius: 99,
                      }}>
                        {cert.category}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          {/* Microsoft badge strip */}
          <div style={{
          }}>
          </div>
        </div>
      </Section >

      {/* EDUCATION */}
      < Section id="education" >
        <div style={sectionStyle}>
          <p style={labelStyle}>Academic Background</p>
          <h2 style={h2Style}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} style={{
              background: cardBg, border: `1px solid ${border}`, borderRadius: 20,
              padding: "32px 36px", display: "flex", gap: 28, alignItems: "flex-start", flexWrap: "wrap",
              boxShadow: dark ? "0 4px 24px rgba(0,0,0,0.3)" : "0 4px 24px rgba(0,0,0,0.06)",
            }} className="card-hover">
              <div style={{ width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>🎓</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 18, color: text, marginBottom: 4 }}>{edu.degree}</h3>
                <p style={{ color: theme.primary, fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{edu.field}</p>
                <p style={{ color: textMuted, fontSize: 14, marginBottom: 4 }}>🏛 {edu.college}</p>
                <p style={{ color: textMuted, fontSize: 13, marginBottom: 12 }}>📍 {edu.university}</p>
                <span style={{ fontSize: 12, color: text, background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", padding: "5px 14px", borderRadius: 99, fontWeight: 600 }}>{edu.year}</span>
              </div>
            </div>
          ))}
        </div>
      </Section >

      {/* CONTACT */}
      <Section id="contact">
        <div style={sectionStyle}>
          <p style={labelStyle}>Get In Touch</p>
          <h2 style={h2Style}>Let's Work Together</h2>
          <p style={{ color: textMuted, fontSize: 16, marginBottom: 48, maxWidth: 520 }}>
            I’m open to new opportunities, collaborations, or just a tech chat. Feel free to contact me.
          </p>

          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {/* RIGHT - Contact Form */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 20, padding: "36px 32px", boxShadow: dark ? "0 4px 32px rgba(0,0,0,0.3)" : "0 4px 24px rgba(0,0,0,0.06)" }}>
                <ContactForm dark={dark} text={text} textMuted={textMuted} border={border} cardBg={cardBg} />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      < footer style={{ borderTop: `1px solid ${border}`, padding: "32px 24px", textAlign: "center" }
      }>
        <p style={{ color: textMuted, fontSize: 13, fontFamily: "'Sora', sans-serif" }}>
          © 2026 <span style={{ color: theme.primary, fontWeight: 700 }}>Rutvik Gohil</span>, All rights reserved. Designed with care and built with passion.
        </p>
      </footer >
    </div >
  );
}

function ContactForm({ dark, text, textMuted, border, cardBg }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const inputStyle = {
    width: "100%", background: "transparent",
    border: "none", borderBottom: `1.5px dashed ${border}`,
    padding: "10px 0", fontSize: 14, color: text,
    fontFamily: "'DM Sans', sans-serif", outline: "none",
    transition: "border-color 0.2s",
  };
  const labelStyle2 = {
    fontSize: 12, color: textMuted, fontWeight: 600, letterSpacing: 0.5,
    fontFamily: "'Sora', sans-serif", marginBottom: 4, display: "block",
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    const mailto = `mailto:rutvikgohil246@gmail.com?subject=${encodeURIComponent(form.subject || "Portfolio Contact")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div>
      {/* Social icon circles - exactly like screenshot */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        {[
          {
            href: "mailto:rutvikgohil246@gmail.com", title: "Gmail",
            bg: dark ? "#1e1e1e" : "#f5f5f5", border2: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
            icon: (
              <svg width="19" height="19" viewBox="0 0 48 48" fill="none">
                <path d="M4 10l20 14L44 10" stroke="#EA4335" strokeWidth="3.5" strokeLinecap="round" />
                <rect x="4" y="10" width="40" height="28" rx="2" stroke="#EA4335" strokeWidth="2.5" fill="none" />
              </svg>
            ),
          },
          {
            href: "https://www.linkedin.com/in/rutvik-gohil-1933bb215", title: "LinkedIn",
            bg: dark ? "#1e1e1e" : "#f5f5f5", border2: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
            icon: (
              <svg width="19" height="19" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            ),
          },
          {
            href: "https://github.com/RutvikGohil24", title: "GitHub",
            bg: dark ? "#1e1e1e" : "#f5f5f5", border2: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
            icon: (
              <svg width="19" height="19" viewBox="0 0 24 24" fill={dark ? "#fff" : "#24292e"}>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            ),
          },
          {
            href: "tel:+918238780051", title: "Phone",
            bg: dark ? "#1e1e1e" : "#f5f5f5", border2: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
            icon: (
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3-8.63A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.12 6.12l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            ),
          },
        ].map((s, i) => (
          <a key={i} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer" title={s.title} style={{ textDecoration: "none" }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: s.bg, border: `1.5px solid ${s.border2}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s",
            }} className="social-link">
              {s.icon}
            </div>
          </a>
        ))}
      </div>

      {/* Name + Email row */}
      <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle2}>Name</label>
          <input style={inputStyle} placeholder="Your name" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            onFocus={e => e.target.style.borderBottomColor = theme.primary}
            onBlur={e => e.target.style.borderBottomColor = border} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle2}>E-Mail</label>
          <input style={inputStyle} placeholder="your@email.com" type="email" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            onFocus={e => e.target.style.borderBottomColor = theme.primary}
            onBlur={e => e.target.style.borderBottomColor = border} />
        </div>
      </div>

      {/* Subject */}
      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle2}>Subject</label>
        <input style={inputStyle} placeholder="What's this about?" value={form.subject}
          onChange={e => setForm({ ...form, subject: e.target.value })}
          onFocus={e => e.target.style.borderBottomColor = theme.primary}
          onBlur={e => e.target.style.borderBottomColor = border} />
      </div>

      {/* Message */}
      <div style={{ marginBottom: 32 }}>
        <label style={labelStyle2}>Message</label>
        <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 130, lineHeight: 1.7 }}
          placeholder="Tell me about your project or just say hi…"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          onFocus={e => e.target.style.borderBottomColor = theme.primary}
          onBlur={e => e.target.style.borderBottomColor = border}
        />
      </div>

      <button className="btn-primary" onClick={handleSubmit} style={{ minWidth: 170 }}>
        {sent ? "✓ Opening Mail…" : "Send Message →"}
      </button>
    </div>
  );
}
function SkillsGrid({ dark, text, textMuted, border }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const techIcons = [
    {
      name: "Power BI",
      icon: <img src="data:image/png;base64,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" width="36" height="36" alt="Power BI" style={{ borderRadius: 6, objectFit: "contain" }} />,
    },
    {
      name: "Power Apps",
      icon: <img src="data:image/png;base64,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" width="36" height="36" alt="Power Apps" style={{ borderRadius: 6, objectFit: "contain" }} />,
    },
    {
      name: "Power Automate",
      icon: <img src="data:image/png;base64,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" width="36" height="36" alt="Power Automate" style={{ borderRadius: 6, objectFit: "contain" }} />,
    },
    {
      name: "Power Pages",
      icon: <img src="data:image/png;base64,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" width="36" height="36" alt="Power Pages" style={{ borderRadius: 6, objectFit: "contain" }} />,
    },
    {
      name: "Dataverse",
      icon: <img src="data:image/png;base64,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" width="36" height="36" alt="Dataverse" style={{ borderRadius: 6, objectFit: "contain" }} />,
    },
    {
      name: "Dynamics 365",
      icon: <img src="data:image/png;base64,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" width="36" height="36" alt="Dynamics 365" style={{ borderRadius: 6, objectFit: "contain" }} />,
    },
    {
      name: "Azure",
      icon: <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAADHklEQVR4nO2ZPW8dRRRAz52Z3X1+XvvZsWP7ObaIiYCGFFBAyX+AmgKJ30JPhcT/QJQUCBokREMDEcQRDSYxjhV7P+bjUiwOICEaxlpH2lO816zezNl7586deTJfXyovMGbsCfxfJoGxmQTGZhIYm0lgbCaBsZkE/pu/9Yki1zKCu5ZfVQUDmvjzY/gWW/APqQxci4CqMn/jXe59+AFYwVQzHn3yEU+++AxXr6MpZhsrcwoJpIiZbxDLA9i5w+z+m1T3X2f9rXfQ6LOnUl4BATRgVreJ6rj46ZjUNITfe6rlXUw5Q1PKOuQ1RCBBvYMWM9pfTwGLdoFy7y5ubQNiyBqFa6hCAmu74ArakzO0T8Q+YDZ2KLaXpOCHZzKRV0ATuALqPcQVdGfPCJcNGj22nFPtv4SGHrmZEZBBoKyRlVtgDP7S459eQjIktVSHrwwplnEd5xMQIAVkvonO1kCE6CP9bycghhQCs4NXwdisW0HeCKSI1LtQzBHrSL6lefAdYgtS21HuHWFXVm/uPqAoun4HFUtyJdpf0PzwLZqE2HXYzSVusZ11P8gooIg42NgnSQJjkYsT2h+/ITYtKQRkvqC8fYCGmyiQEpRzqJfDAl5ZI9Zb9MU2/vwpmkBNQbF/hMaAZFrJeXohEYge1nbQ1VuoOPxiCW+/j/fv0TWemS3QKJTL17IMeUWmCAikAPVttKohtNjLU9QYUki0Fx6SoF2k3H0ZU1So5ilF+VJIEywOwZRgK4rHx7izX6BYoXnWQxJi1+A2D7DzxSCcIY2yllHdPCQZQasaPf0Z9+XHUM5oGg8+knzA1FvYzZ1sCzmPgCYoV9CtIxTQokJDg3z/Oe7hV3Smxrc9GhNa1JS797KV0qwRkNBiQ4f4C+TxAxCL+/pTbHdOwmBCQGIEWwGapQ5Jtj84VIcy6uZAJLXnGFU0eezGAW716iQm9E+OEd9niUA+ARhSSYdJqnHDGxaB0D9vHxSQorph+8AVYodmDZCrMqkKrnw+YYG/DvoZyHyo13/vNFXJfRtxxXSxNTaTwNhMAmMzCYzNJDA2L7zAH3D6Rz1BkIk1AAAAAElFTkSuQmCC" width="36" height="36" alt="Azure" style={{ background: "#0a1628", borderRadius: 6, objectFit: "contain" }} />,
    },
    {
      name: "Azure DevOps",
      icon: <img src="data:image/png;base64,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" width="36" height="36" alt="Azure DevOps" style={{ borderRadius: 6, objectFit: "contain" }} />,
    },
    {
      name: "C# / .NET",
      icon: <img src="data:image/png;base64,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" width="36" height="36" alt="C#" style={{ borderRadius: 6, objectFit: "contain" }} />,
    },
    {
      name: "SQL",
      icon: <img src="data:image/png;base64,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p76+nqeffprFixdj2za9vb0Ftj///HMaGxupr6+ntLSUGTNmsHr1au69916i0SgdHR0D5DuvDwQNPM/jnXfeQUR44IEHmDNnDps2beLll19m6dKlmKbJ5s2bicVizJs3j48//phdu3axcOFClixZwr59+9i6dSujRo1i7dq1HD58mE2bNhGNRlm2bBl1dXWUlZVh2zaxWIx77rmn702LprFmzRo2bNjA3r17WbBgAVOnTsWyLFzXPX9YNQxDAFm1apWIiKRSKcnn85LNZsXzPOnq6pJ0Oi0iIk1NTdLQ0CD79++XdDottm2L53mSz+clk8lId3e3+L4vmUxGRESSyaTkcjlxXVey2azkcjnJZDKSTqclkUhIIpEQx3HEcRxJJBKSyWTE8zxJp9PiOI6k02nJZrOFtolEQkREnnrqKQHEMAwZEIxFBNu2sW0bTdPIZDLouo7jOGQyGcaPH89LL71ENptFREilUgWnCj6JRKIQUoMxgjb9N6jgGoyhaRq2bRf62bZd6BNEusFMqaBAS0tL35nNmU0juA8mM02TdDpNbW0tmqaRy+UGTYmDZ/37BhjMDPo75tlznt0n2DdaWlq+7aNpmvi+T3V1NYcOHaKkpIRcLnfORAGG853XpcKyLNra2rjuuuvo6OjoYx0QXdfxPI+HH36YN998E8/zyOVy3+t74gGxXtMKOdd9993H5s2bCWRWnPmvRJDT33333axatYqJEydimuZ3IuCF4LouTU1NrF27lm3btg2sSxjkzx66rjNlyhRisdh5WSgcZF1hlpRSpNNpmpqaCg7dPw0foABQoOaHiMFkO0cBGBgWfwgIksXB2P4/PxVgTmkQOg4AAAAASUVORK5CYII=" width="36" height="36" alt="SQL" style={{ borderRadius: 6, objectFit: "contain" }} />,
    },
    {
      name: "JavaScript",
      icon: <img src="data:image/png;base64,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" width="36" height="36" alt="JavaScript" style={{ borderRadius: 6, objectFit: "contain" }} />,
    },
  ]

  const categories = [...new Set(skills.map(s => s.category))];

  const skillIcons = {
    "Microsoft Dynamics 365 CRM": "/icons/dynamics365.png",
    "Sales & Customer Service Modules": "/icons/dynamics365.png",
    "Power Apps (Model-Driven & Canvas)": "/icons/powerapps.png",
    "Power Automate": "/icons/powerautomate.png",
    "Dataverse": "/icons/dataverse.png",
    "Azure DevOps / ALM": "/icons/azure.png",
    "Microsoft Power BI": "/icons/powerbi.png",
    "Microsoft Power Pages": "/icons/powerpages.png",
  };

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      {/* Microsoft Tech Icon Strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 14 }}>
        {techIcons.map((tech, i) => (
          <div key={i} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
            border: `1px solid ${border}`, borderRadius: 16, padding: "22px 14px", minHeight: 120, justifyContent: "center",
            transition: "all 0.25s", cursor: "default",
          }} className="card-hover">
            {tech.icon}
            <span style={{ fontSize: 11, fontWeight: 700, color: textMuted, textAlign: "center", lineHeight: 1.5, fontFamily: "'Sora', sans-serif" }}>{tech.name}</span>
          </div>
        ))}
      </div>

      {/* Skill bars by category */}
      {categories.map(cat => (
        <div key={cat}>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 12, color: theme.primary, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>{cat}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {skills.filter(s => s.category === cat).map((skill, i) => {
              const ic = skillIcons[skill.name] || { bg: theme.primary, color: "#fff" };
              return (
                <div key={i} className="skill-item" style={{ background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${border}`, borderRadius: 14, padding: "14px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 10,
                          background: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                          flexShrink: 0,
                          border: "1px solid rgba(255,255,255,0.08)",
                          padding: 6,
                        }}
                      >
                        {skillIcons[skill.name]?.img ? (
                          <img
                            src={skillIcons[skill.name]?.img || skillIcons[skill.name]}
                            alt={skill.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          <span style={{ color: "#fff" }}>•</span>
                        )}
                      </div>
                      <span className="skill-name" style={{ fontSize: 13, fontWeight: 500, color: text, transition: "color 0.2s" }}>{skill.name}</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: theme.primary, fontFamily: "'Sora', sans-serif", flexShrink: 0, marginLeft: 8 }}>{skill.level}%</span>
                  </div>
                  <AnimatedBar level={skill.level} inView={visible} color={theme.primary} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}