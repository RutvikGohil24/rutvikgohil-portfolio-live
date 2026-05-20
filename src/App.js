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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
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
            <p style={{ fontSize: "clamp(28px,4vw,28px)", fontWeight: 600, color: theme.primary, marginBottom: 16, fontFamily: "'Sora', sans-serif" }}>
              Microsoft Dynamics 365 CE & Power Platform Developer
            </p>
            <p style={{ fontSize: 20, color: textMuted, lineHeight: 1.75, marginBottom: 36, maxWidth: 500 }}>
              Building scalable apps with Microsoft Dynamics 365 CRM and Power Platform - Power Apps, Power Automate, and Dataverse.
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
      name: "Power Apps",
      icon: (
        <svg viewBox="0 0 48 48" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pa1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C539B4" />
              <stop offset="100%" stopColor="#7B2D8B" />
            </linearGradient>
            <linearGradient id="pa2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E062AE" />
              <stop offset="100%" stopColor="#C539B4" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="8" fill="url(#pa1)" />
          <polygon points="24,8 38,24 24,40 10,24" fill="url(#pa2)" opacity="0.9" />
          <polygon points="24,14 34,24 24,34 14,24" fill="white" opacity="0.95" />
          <circle cx="24" cy="24" r="5" fill="url(#pa1)" />
        </svg>
      ),
    },
    {
      name: "Power Automate",
      icon: (
        <svg viewBox="0 0 48 48" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pau1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D7AE0" />
              <stop offset="100%" stopColor="#0A40B5" />
            </linearGradient>
            <linearGradient id="pau2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5EA4F5" />
              <stop offset="100%" stopColor="#2D7AE0" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="8" fill="url(#pau1)" />
          {/* Right-pointing chevron / arrow shape like official icon */}
          <path d="M10 14h16l12 10-12 10H10l12-10z" fill="url(#pau2)" />
          <path d="M22 14h16l-12 10 12 10H22L10 24z" fill="white" opacity="0.2" />
        </svg>
      ),
    },
    {
      name: "Power BI",
      icon: (
        <svg viewBox="0 0 48 48" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pbi1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5D247" />
              <stop offset="100%" stopColor="#E8A800" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="8" fill="white" />
          {/* Bar chart bars - official Power BI style */}
          <rect x="8" y="30" width="8" height="10" rx="2" fill="#E8A800" opacity="0.6" />
          <rect x="20" y="22" width="8" height="18" rx="2" fill="#F5D247" />
          <rect x="32" y="14" width="8" height="26" rx="2" fill="#F2C811" />
          {/* Small top accent */}
          <circle cx="36" cy="10" r="4" fill="#F5D247" opacity="0.8" />
        </svg>
      ),
    },
    {
      name: "Dataverse",
      icon: (
        <svg viewBox="0 0 48 48" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dv1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F6CBD" />
              <stop offset="100%" stopColor="#115EA3" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="8" fill="url(#dv1)" />
          {/* Stacked cylinder / database shape */}
          <ellipse cx="24" cy="14" rx="13" ry="5" fill="white" opacity="0.9" />
          <rect x="11" y="14" width="26" height="7" fill="white" opacity="0.6" />
          <ellipse cx="24" cy="21" rx="13" ry="5" fill="white" opacity="0.75" />
          <rect x="11" y="21" width="26" height="7" fill="white" opacity="0.45" />
          <ellipse cx="24" cy="28" rx="13" ry="5" fill="white" opacity="0.6" />
          <rect x="11" y="28" width="26" height="6" fill="white" opacity="0.3" />
          <ellipse cx="24" cy="34" rx="13" ry="5" fill="white" opacity="0.5" />
        </svg>
      ),
    },
    {
      name: "Dynamics 365",
      icon: (
        <svg viewBox="0 0 48 48" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="d365a" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1B6EC2" />
              <stop offset="100%" stopColor="#0D47A1" />
            </linearGradient>
            <linearGradient id="d365b" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00BCF2" />
              <stop offset="100%" stopColor="#0078D4" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="8" fill="url(#d365a)" />
          {/* Circular orbit / CRM icon shape */}
          <circle cx="24" cy="24" r="14" fill="none" stroke="white" strokeWidth="2.5" opacity="0.4" />
          <circle cx="24" cy="24" r="8" fill="none" stroke="white" strokeWidth="2.5" opacity="0.7" />
          <circle cx="24" cy="24" r="4" fill="white" />
          {/* Orbit dot */}
          <circle cx="38" cy="24" r="3.5" fill="url(#d365b)" />
          <circle cx="10" cy="24" r="3.5" fill="url(#d365b)" opacity="0.7" />
          <circle cx="24" cy="10" r="3.5" fill="url(#d365b)" opacity="0.5" />
        </svg>
      ),
    },
    {
      name: "Azure",
      icon: (
        <svg viewBox="0 0 48 48" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="az1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0078D4" />
              <stop offset="50%" stopColor="#1FA2FF" />
              <stop offset="100%" stopColor="#0FD0FF" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="8" fill="white" />
          {/* Official Azure "A" mountain shape */}
          <path d="M18 38L27 14l9 12H27l-3-4-6 16z" fill="url(#az1)" />
          <path d="M10 38l10-8h16l-5-8-7 20z" fill="#0078D4" opacity="0.5" />
          <path d="M27 14L18 26h18z" fill="url(#az1)" />
        </svg>
      ),
    },
    {
      name: "C# / .NET",
      icon: (
        <svg viewBox="0 0 48 48" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cs1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9B4FE8" />
              <stop offset="100%" stopColor="#512BD4" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="8" fill="url(#cs1)" />
          {/* Official .NET purple "C#" */}
          <text x="6" y="34" fontSize="24" fontWeight="900" fill="white" fontFamily="'Segoe UI',Arial,sans-serif">C#</text>
        </svg>
      ),
    },
    {
      name: "Azure DevOps",
      icon: (
        <svg viewBox="0 0 48 48" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ado1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0078D7" />
              <stop offset="100%" stopColor="#005A9E" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="8" fill="url(#ado1)" />
          {/* DevOps infinite loop / pipeline shape */}
          <path d="M10 20 Q10 10 20 10 L28 10 Q38 10 38 20 L38 22 Q38 28 32 28 L22 28" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M38 28 Q38 38 28 38 L20 38 Q10 38 10 28 L10 26 Q10 20 16 20 L26 20" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.65" />
          {/* Arrow heads */}
          <polygon points="22,23 26,28 22,33" fill="white" opacity="0.65" />
          <polygon points="26,15 22,20 26,25" fill="white" />
        </svg>
      ),
    },
  ];

  const categories = [...new Set(skills.map(s => s.category))];

  const skillIcons = {
    "Microsoft Dynamics 365 CRM": "/icons/dynamics365.png",
    "Sales & Customer Service Modules": "/icons/dynamics365.png",
    "Power Apps (Model-Driven & Canvas)": "/icons/powerapps.png",
    "Power Automate": "/icons/powerautomate.png",
    "Dataverse": "/icons/dataverse.png",
    "Azure DevOps / ALM": "/icons/azure.png",
  };

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      {/* Microsoft Tech Icon Strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 14 }}>
        {techIcons.map((tech, i) => (
          <div key={i} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
            border: `1px solid ${border}`, borderRadius: 16, padding: "18px 10px",
            transition: "all 0.25s", cursor: "default",
          }} className="card-hover">
            {tech.icon}
            <span style={{ fontSize: 10, fontWeight: 600, color: textMuted, textAlign: "center", lineHeight: 1.4, fontFamily: "'Sora', sans-serif" }}>{tech.name}</span>
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
                          width: 34,
                          height: 34,
                          borderRadius: 8,
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                          flexShrink: 0,
                          padding: 4,
                        }}
                      >
                        {skillIcons[skill.name] ? (
                          <img
                            src={skillIcons[skill.name]}
                            alt={skill.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#fff",
                            }}
                          >
                            •
                          </span>
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