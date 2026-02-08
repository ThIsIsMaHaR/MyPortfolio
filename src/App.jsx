import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  Mail, 
  Linkedin, 
  Trophy, 
  GraduationCap, 
  Award,
  FileText,
  Sun,
  Moon,
  Send,
  Terminal,
  Cpu,
  Activity,
  Zap
} from 'lucide-react';

// --- DATA (UNCHANGED) ---
const TITLES = ["SOFTWARE DEVELOPER", "WEB DEVELOPER", "MERN STACK", "CLOUD ENTHUSIAST"];

const TIMELINE = [
  { type: "EDUCATION", title: "High School (10th)", org: "St.Francis Senior Secondary School, Tanakpur, Uttarakhand", date: "2018 — 2019", desc: "Science Stream." },
  { type: "EDUCATION", title: "Higher Secondary (12th)", org: "St.Francis Senior Secondary School, Tanakpur, Uttarakhand", date: "2020 — 2021", desc: "PCM with Computer Science." },
  { type: "EDUCATION", title: "B.Tech Graduation", org: "UTTARAKHAND TECHNICAL UNIVERSITY", date: "2021 — 2025", desc: "Specialised in Computer Science and Engineering." }
];

const CERTIFICATES = [
  { name: "FULL STACK DEVELOPER CERTIFICATION", issuer: "ONE ROAD MAP", date: "2025", url: "/ORM.pdf" },
  { name: "WEB DEVELOPMENT CERTIFICATION", issuer: "CodSoft", date: "2024", url: "/CodSoft.pdf" },
  { name: "AWS SOLUTION ARCHITECT ASSOCIATE", issuer: "GFG", date: "2025", url: "/AWS-SAA.pdf" }
];

const PROJECTS = [
  { title: "PAGE TURNER", description: "It is a platform where different e-book and Web Novel writers can upload and publish their work Chapter by chapter and readers can read the work of their interest.", tech: ["MONGODB", "EXPRESS", "REACT", "NODE", "TAILWIND CSS"], github: "https://github.com/ThIsIsMaHaR", link: "#" },
  { title: "TEXTORA", description: "It is an blogging Platform where you can wite your Blogs and Daily Updates.", tech: ["MONGODB", "EXPRESS", "REACT", "NODE", "TAILWIND CSS"], github: "https://github.com/ThIsIsMaHaR", link: "#" },
  { title: "ZAPCHAT", description: "It is a Real Time Chat Web Application.", tech: ["MONGODB", "EXPRESS", "REACT", "NODE", "TAILWIND CSS"], github: "https://github.com/ThIsIsMaHaR", link: "#" }
];

const TECH_STACK = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "#e34f26" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "#1572b6" },
  { name: "JAVASCRIPT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#f7df1e" },
  { name: "REACT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61dafb" },
  { name: "NODE.JS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#68a063" },
  { name: "EXPRESS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", color: "#ffffff" },
  { name: "MONGODB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47a248" },
  { name: "TAILWIND", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#38bdf8" },
  { name: "GIT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#f05032" },
  { name: "GITHUB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", color: "#ffffff" },
];

const TypewriterText = ({ text, isDark }) => {
  const letters = Array.from(text);
  const container = { hidden: { opacity: 0 }, visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.02 * i } }) };
  const child = { visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 15, stiffness: 300 } }, hidden: { opacity: 0, y: 5 } };
  return (
    <motion.div style={{ display: "flex", overflow: "hidden" }} variants={container} initial="hidden" animate="visible" 
      className={`font-mono font-bold tracking-wider uppercase ${isDark ? 'text-[#64ffda]' : 'text-[#0a192f]'}`}>
      {letters.map((l, i) => (<motion.span variants={child} key={i}>{l === " " ? "\u00A0" : l}</motion.span>))}
    </motion.div>
  );
};

const Navbar = ({ isDark, setIsDark }) => (
  <nav className={`fixed top-0 w-full z-50 backdrop-blur-md py-5 px-4 md:px-8 lg:px-12 flex justify-between items-center border-b transition-all duration-300 ${isDark ? 'bg-[#0a192f]/90 border-white/5' : 'bg-white/90 border-black/5'}`}>
    <div className={`font-bold text-xl lg:text-2xl font-mono tracking-widest uppercase shrink-0 ${isDark ? 'text-[#64ffda]' : 'text-[#0a192f]'}`}>A.S.M</div>
    <div className="hidden md:flex flex-1 justify-end items-center gap-3 lg:gap-10 font-mono text-[11px] lg:text-sm uppercase tracking-tighter lg:tracking-[0.2em]">
      <a href="#about" className={`transition shrink-0 ${isDark ? 'hover:text-[#64ffda]' : 'hover:text-blue-600'}`}>ABOUT</a>
      <a href="#experience" className={`transition shrink-0 ${isDark ? 'hover:text-[#64ffda]' : 'hover:text-blue-600'}`}>JOURNEY</a>
      <a href="#credentials" className={`transition shrink-0 ${isDark ? 'hover:text-[#64ffda]' : 'hover:text-blue-600'}`}>CREDENTIALS</a>
      <a href="#projects" className={`transition shrink-0 ${isDark ? 'hover:text-[#64ffda]' : 'hover:text-blue-600'}`}>PROJECTS</a>
      <a href="#contact" className={`transition shrink-0 ${isDark ? 'hover:text-[#64ffda]' : 'hover:text-blue-600'}`}>CONTACT</a>
      <motion.button onClick={() => setIsDark(!isDark)} className={`relative w-10 lg:w-12 h-5 lg:h-6 rounded-full p-1 flex items-center transition-colors shrink-0 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
        <motion.div layout className={`w-3 lg:w-4 h-3 lg:h-4 rounded-full flex items-center justify-center ${isDark ? 'bg-[#64ffda]' : 'bg-[#0a192f]'}`} animate={{ x: isDark ? 24 : 0 }}>
          {isDark ? <Moon size={8} className="text-[#0a192f]" /> : <Sun size={8} className="text-white" />}
        </motion.div>
      </motion.button>
      <a href="/myCV.pdf" download className={`border-2 px-3 lg:px-6 py-1.5 lg:py-2 rounded-sm transition tracking-widest font-bold shrink-0 ${isDark ? 'border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda] hover:text-[#0a192f]' : 'border-[#0a192f] text-[#0a192f] hover:bg-[#0a192f] hover:text-white'}`}>RESUME</a>
    </div>
  </nav>
);

const App = () => {
  const [index, setIndex] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const form = useRef();

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % TITLES.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_2k7grl7', 'template_mggip1l', form.current, 'pYfU8c0aPqtTrq8rS')
      .then(() => {
          alert("SIGNAL DISPATCHED: CONNECTION SUCCESSFUL.");
          e.target.reset();
      }, (error) => {
          alert("COMMUNICATION ERROR: " + error.text);
      });
  };

  const themeClasses = {
    bg: isDark ? 'bg-[#0b0e14]' : 'bg-[#f8fafc]',
    text: isDark ? 'text-slate-300' : 'text-slate-700',
    heading: isDark ? 'text-white' : 'text-[#0a192f]',
    card: isDark ? 'bg-[#112240]' : 'bg-white',
    border: isDark ? 'border-white/10' : 'border-black/10',
    input: isDark ? 'bg-[#0a192f]/50 border-white/10 text-[#64ffda] focus:border-[#64ffda] focus:bg-[#0a192f] px-6 py-3' : 'bg-slate-50 border-black/10 text-[#0a192f] focus:border-blue-600 focus:bg-white px-6 py-3'
  };

  return (
    <div className={`${themeClasses.bg} ${themeClasses.text} min-h-screen font-sans selection:bg-[#64ffda]/30 selection:text-[#64ffda] scroll-smooth transition-colors duration-500`}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      
      <main className="max-w-6xl mx-auto px-6">
        {/* HERO SECTION */}
        <section className="h-screen flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className={`font-mono text-sm tracking-[0.4em] block mb-4 ${isDark ? 'text-[#64ffda]' : 'text-blue-600'}`}>HELLO, I AM</span>
            <h1 className={`text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 ${themeClasses.heading}`}>Abhishek Singh Mahar.</h1>
          </motion.div>
          <div className="h-12 md:h-16 flex items-center mb-10 text-xl md:text-3xl font-mono uppercase">
            <AnimatePresence mode="wait"><div key={TITLES[index]}><TypewriterText text={`${TITLES[index]}`} isDark={isDark} /></div></AnimatePresence>
          </div>
          <a href="#projects" className={`w-fit border-2 px-12 py-4 font-bold rounded-sm transition uppercase text-xs tracking-[0.4em] ${isDark ? 'border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda] hover:text-[#0b0e14]' : 'border-[#0a192f] text-[#0a192f] hover:bg-[#0a192f] hover:text-white'}`}>EXPLORE MY WORK</a>
        </section>

        {/* 01. ABOUT */}
        <section id="about" className="py-24">
          <div className={`flex items-center gap-4 mb-16 border-b pb-6 uppercase tracking-[0.4em] text-lg md:text-xl font-mono ${isDark ? 'text-[#64ffda] border-white/10' : 'text-[#0a192f] border-black/10'}`}>
            <span className={`${themeClasses.heading} font-black border-b-2 ${isDark ? 'border-[#64ffda]' : 'border-[#0a192f]'}`}>01.</span> MY_PROFILE
          </div>
          <div className="grid md:grid-cols-5 gap-12 items-start">
            <div className={`md:col-span-3 space-y-6 text-lg leading-relaxed uppercase tracking-wider font-light text-left ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <p>ENGINEERING GRADUATE SPECIALIZING IN THE <span className={`${themeClasses.heading} font-bold`}>MERN STACK</span>. I BUILD INTERACTIVE APPLICATIONS WITH CLEAN LOGIC.</p>
              <p>CURRENTLY SEEKING OPPORTUNITIES.</p>
            </div>
            <div className="md:col-span-2 flex justify-center lg:justify-end">
              <div className="relative w-64 h-64 group">
                <div className={`absolute inset-0 border-2 rounded-sm translate-x-5 translate-y-5 transition-all duration-500 ${isDark ? 'border-[#64ffda]' : 'border-[#0a192f]'}`}></div>
                <div className={`${themeClasses.card} overflow-hidden relative aspect-square border-2 ${isDark ? 'border-[#64ffda]' : 'border-[#0a192f]'}`}>
                  <img src="/aa.jpeg" alt="Abhishek Mahar" className="w-full h-full object-center opacity-80 hover:opacity-100 transition-all grayscale hover:grayscale-0" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02. TECH */}
        <section id="tech" className="py-24 text-left">
          <div className={`flex items-center gap-4 mb-16 border-b pb-6 uppercase tracking-[0.4em] text-lg md:text-xl font-mono ${isDark ? 'text-[#64ffda] border-white/10' : 'text-[#0a192f] border-black/10'}`}>
            <span className={`${themeClasses.heading} font-black border-b-2 ${isDark ? 'border-[#64ffda]' : 'border-[#0a192f]'}`}>02.</span> TECH_ARSENAL
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-16 justify-items-center">
            {TECH_STACK.map((tech) => (
              <motion.div key={tech.name} whileHover={{ scale: 1.1 }} className="flex flex-col items-center group cursor-pointer">
                <div style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} className={`w-16 h-16 border-2 flex items-center justify-center relative transition-all duration-300 ${isDark ? 'bg-[#112240] border-[#64ffda]/30' : 'bg-white border-[#0a192f]/20'}`}>
                  <div className={`absolute inset-0.5 group-hover:bg-transparent transition-all ${isDark ? 'bg-[#0b0e14]' : 'bg-[#f8fafc]'}`} style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}></div>
                  <img src={tech.icon} alt={tech.name} className="w-8 h-8 z-10" />
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-100 transition-opacity" style={{ background: tech.color, clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}></div>
                </div>
                <span className={`mt-4 font-mono text-[8px] uppercase tracking-[0.3em] transition-colors ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 03. JOURNEY */}
        <section id="experience" className="py-24 text-left">
          <div className={`flex items-center gap-4 mb-16 border-b pb-6 uppercase tracking-[0.4em] text-lg md:text-xl font-mono ${isDark ? 'text-[#64ffda] border-white/10' : 'text-[#0a192f] border-black/10'}`}>
            <span className={`${themeClasses.heading} font-black border-b-2 ${isDark ? 'border-[#64ffda]' : 'border-[#0a192f]'}`}>03.</span> MY_JOURNEY
          </div>
          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <div key={i} className={`relative pl-12 border-l-2 transition-colors group ${isDark ? 'border-[#112240] hover:border-[#64ffda]' : 'border-slate-200 hover:border-[#0a192f]'}`}>
                <div className={`absolute -left-3.25 top-0 w-6 h-6 border-2 flex items-center justify-center transition-colors ${isDark ? 'bg-[#0b0e14] border-[#112240] group-hover:border-[#64ffda]' : 'bg-[#f8fafc] border-slate-200 group-hover:border-[#0a192f]'}`}>
                  {item.type === "EDUCATION" ? <GraduationCap size={12}/> : <Award size={12}/>}
                </div>
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h4 className={`${themeClasses.heading} font-bold tracking-widest uppercase text-lg`}>{item.title}</h4>
                  <span className={`${isDark ? 'text-[#64ffda]' : 'text-[#0a192f]'} font-mono text-sm`}>{item.date}</span>
                </div>
                <p className={`${isDark ? 'text-[#64ffda]' : 'text-slate-500'} font-mono text-xs mb-4 tracking-widest`}>{item.org}</p>
                <p className={`text-sm uppercase leading-relaxed tracking-wider font-light ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 04. CREDENTIALS */}
        <section id="credentials" className="py-24 text-left">
          <div className={`flex items-center gap-4 mb-16 border-b pb-6 uppercase tracking-[0.4em] text-lg md:text-xl font-mono ${isDark ? 'text-[#64ffda] border-white/10' : 'text-[#0a192f] border-black/10'}`}>
            <span className={`${themeClasses.heading} font-black border-b-2 ${isDark ? 'border-[#64ffda]' : 'border-[#0a192f]'}`}>04.</span> CREDENTIALS
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {CERTIFICATES.map((cert, i) => (
              <a key={i} href={cert.url} target="_blank" rel="noreferrer" className="block group">
                <div className={`${themeClasses.card} border ${themeClasses.border} p-8 transition-all rounded-sm shadow-xl hover:-translate-y-2 duration-300 relative overflow-hidden ${isDark ? 'hover:border-[#64ffda]/40 shadow-black' : 'hover:border-[#0a192f]/40 shadow-slate-200'}`}>
                  <div className="flex justify-between items-start mb-6">
                    <Trophy className={`${isDark ? 'text-[#64ffda]' : 'text-[#0a192f]'} transition-transform group-hover:scale-110`} size={24} />
                    <FileText className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                  </div>
                  <h4 className={`${themeClasses.heading} text-sm font-black tracking-[0.2em] mb-4 h-8 uppercase group-hover:text-current`}>{cert.name}</h4>
                  <div className={`flex justify-between items-center mt-6 pt-4 border-t ${themeClasses.border}`}>
                    <span className="text-slate-500 font-mono text-[8px] uppercase tracking-widest">{cert.issuer}</span>
                    <span className={`${isDark ? 'text-[#64ffda]' : 'text-[#0a192f]'} font-mono text-[8px] tracking-widest`}>{cert.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 05. PROJECTS */}
        <section id="projects" className="py-24 text-left border-b border-white/5 pb-20">
          <div className={`flex items-center gap-4 mb-16 border-b pb-6 uppercase tracking-[0.4em] text-lg md:text-xl font-mono ${isDark ? 'text-[#64ffda] border-white/10' : 'text-[#0a192f] border-black/10'}`}>
            <span className={`${themeClasses.heading} font-black border-b-2 ${isDark ? 'border-[#64ffda]' : 'border-[#0a192f]'}`}>05.</span> SELECTED_WORKS
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {PROJECTS.map((p, i) => (
              <div key={i} className={`${themeClasses.card} border ${themeClasses.border} p-10 transition-all group shadow-2xl relative overflow-hidden ${isDark ? 'hover:border-[#64ffda]/40 shadow-black' : 'hover:border-[#0a192f]/40'}`}>
                <div className="flex justify-between items-start mb-8">
                  <h4 className={`${themeClasses.heading} text-2xl font-black tracking-widest`}>{p.title}</h4>
                  <div className="flex gap-6 text-slate-400">
                    <a href={p.github} target="_blank" rel="noreferrer"><Github size={24} className={`${isDark ? 'hover:text-[#64ffda]' : 'hover:text-[#0a192f]'} transition-transform hover:scale-110`} /></a>
                    <a href={p.link} target="_blank" rel="noreferrer"><ExternalLink size={24} className={`${isDark ? 'hover:text-[#64ffda]' : 'hover:text-[#0a192f]'} transition-transform hover:scale-110`} /></a>
                  </div>
                </div>
                <p className={`text-sm mb-8 leading-relaxed uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (<span key={t} className={`text-[10px] font-mono border px-3 py-1 uppercase tracking-tighter ${isDark ? 'text-[#64ffda] border-[#64ffda]/20' : 'text-[#0a192f] border-[#0a192f]/20'}`}>{t}</span>))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06. CONTACT MODULE - FIXED SLIM WIDTHS */}
        <section id="contact" className="py-32 text-left">
          <div className={`flex items-center gap-4 mb-20 uppercase tracking-[0.4em] text-lg md:text-xl font-mono ${isDark ? 'text-[#64ffda]' : 'text-[#0a192f]'}`}>
            <span className={`${themeClasses.heading} font-black border-b-2 ${isDark ? 'border-[#64ffda]' : 'border-[#0a192f]'}`}>06.</span> MY_CONTACT
          </div>
          
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Left Column: Social HUD (Slimmed down with max-width) */}
            <div className="lg:col-span-2 space-y-12 max-w-xs">
              <div className="relative">
                <h3 className={`${themeClasses.heading} text-4xl font-black tracking-tighter mb-6`}>INITIATE <br/> CONNECTION.</h3>
                <p className="font-mono text-xs tracking-widest opacity-40 uppercase mb-10">Available for freelance and full-time positions.</p>
                
                <div className="space-y-4">
                  {[
                    { icon: Linkedin, url: "https://www.linkedin.com/in/itsmahar/", text: "LINKEDIN / itsmahar" },
                    { icon: Github, url: "https://github.com/ThIsIsMaHaR", text: "GITHUB / ThIsIsMaHaR" },
                    { icon: Mail, url: "mailto:abhishek.s.mahar@gmail.com", text: "EMAIL / abhishek.s.mahar" }
                  ].map((social, i) => (
                    <a key={i} href={social.url} target="_blank" rel="noreferrer" 
                      className={`flex items-center gap-4 p-4 border border-transparent hover:border-white/10 hover:bg-white/5 transition-all group rounded-sm`}>
                      <social.icon size={18} className={isDark ? 'group-hover:text-[#64ffda]' : 'group-hover:text-blue-600'} />
                      <span className="font-mono text-[10px] tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{social.text}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Message Box (Slimmed down with max-width) */}
            <div className="lg:col-span-3">
              <div className="relative max-w-md">
                <form ref={form} onSubmit={sendEmail} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="absolute -top-4 left-4 px-2 bg-[#0b0e14] font-mono text-[9px] tracking-widest opacity-40 uppercase">Sender_Name</label>
                      <input type="text" name="user_name" required placeholder="Your-Name" className={`w-full font-mono text-xs border rounded-none outline-none transition-all ${themeClasses.input}`} />
                    </div>
                    <div className="relative group">
                      <label className="absolute -top-4 left-4 px-2 bg-[#0b0e14] font-mono text-[9px] tracking-widest opacity-40 uppercase">Sender_Email</label>
                      <input type="email" name="user_email" required placeholder="Your-email" className={`w-full font-mono text-xs border rounded-none outline-none transition-all ${themeClasses.input}`} />
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <label className="absolute -top-4 left-4 px-2 bg-[#0b0e14] font-mono text-[9px] tracking-widest opacity-40 uppercase">Subject</label>
                    <input type="text" name="subject" required placeholder="Collaboration Request" className={`w-full font-mono text-xs border rounded-none outline-none transition-all ${themeClasses.input}`} />
                  </div>

                  <div className="relative group">
                    <label className="absolute -top-4 left-4 px-2 bg-[#0b0e14] font-mono text-[9px] tracking-widest opacity-40 uppercase">Message_Payload</label>
                    <textarea name="message" required rows="3" placeholder="System details..." className={`w-full font-mono text-xs border rounded-none outline-none transition-all resize-none ${themeClasses.input}`}></textarea>
                  </div>
                  
                  <button type="submit" className={`w-full max-w-[240px] flex items-center justify-center gap-4 py-4 border-2 font-black transition-all uppercase text-[10px] tracking-[0.6em] group ${isDark ? 'border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda] hover:text-[#0b0e14]' : 'border-black text-black hover:bg-black hover:text-white'}`}>
                    TRANSMIT <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>

                <div className="flex justify-between items-center opacity-20 mt-10 max-w-md">
                  <div className="flex gap-2">
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                  </div>
                  <div className="font-mono text-[7px] tracking-[0.3em]">SECURE_V2.0</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={`py-20 text-center border-t transition-all ${isDark ? 'bg-[#0a192f]/30 border-white/5' : 'bg-slate-50 border-black/5'}`}>
        <div className="space-y-4 font-mono uppercase">
          <p className="text-[9px] text-slate-500 tracking-[0.8em]">BUILT_WITH_PRECISION</p>
          <p className={`${isDark ? 'text-[#64ffda]' : 'text-[#0a192f]'} text-xs font-bold tracking-[0.4em]`}>ABHISHEK SINGH MAHAR</p>
        </div>
      </footer>
    </div>
  );
};

export default App;