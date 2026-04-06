'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removed Github and Linkedin from here to stop the build error
import { 
  Mail, Database, ShieldCheck, TrendingUp, Layers, 
  MapPin, Phone, Menu, X, ChevronDown, CheckCircle, Download, Send,
  Briefcase, GraduationCap
} from 'lucide-react';

// --- FAIL-SAFE ICONS ---
// Manually defining these ensures Turbopack won't block your build
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/mreorngq', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setIsSent(true);
        form.reset();
        setTimeout(() => setIsSent(false), 5000);
      }
    } catch (error) {
      console.error("Submission failed");
    }
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-[#050810] text-slate-100 font-sans selection:bg-blue-500/30 scroll-smooth">
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'
      }`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={scrollToTop}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              AK
            </div>
            <span className="text-xl font-bold tracking-widest uppercase hidden sm:block">The Data Folio</span>
          </motion.div>

          <div className="hidden md:flex gap-10 items-center">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">{item.name}</a>
            ))}
            <div className="h-4 w-px bg-white/10" />
            <div className="flex gap-4">
              <a href="https://github.com/Aavashkc" target="_blank" className="text-slate-400 hover:text-white transition-colors">
                <GithubIcon size={20}/>
              </a>
              <a href="https://www.linkedin.com/in/aakc/" target="_blank" className="text-slate-400 hover:text-white transition-colors">
                <LinkedinIcon size={20}/>
              </a>
            </div>
          </div>

          <button className="md:hidden p-2 text-slate-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4"
            >
              {navItems.map((item) => (
                <a key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300 border-b border-white/5 pb-2">
                  {item.name}
                </a>
              ))}
              <div className="flex gap-6 pt-2">
                <a href="https://github.com/Aavashkc" target="_blank" className="text-slate-400"><GithubIcon size={24}/></a>
                <a href="https://www.linkedin.com/in/aakc/" target="_blank" className="text-slate-400"><LinkedinIcon size={24}/></a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20">
        <div className="container mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-12">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute -inset-6 rounded-[3.5rem] border border-dashed border-blue-500/20" />
              <div className="w-full h-full rounded-[3rem] border-4 border-white/10 p-2 bg-slate-900/40 backdrop-blur-md overflow-hidden shadow-2xl">
                <img src="/pp.jpeg" alt="Aavash" className="w-full h-full rounded-[2.5rem] object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </div>

            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter">
              Aavash <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">K C</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
              Data Scientist & IT Strategist. <br />
              <span className="text-white font-medium">BSc.CSIT Expertise meets predictive Intelligence.</span>
            </p>

            <div className="flex flex-col items-center gap-8 pt-4">
              <div className="flex flex-wrap gap-5 justify-center">
                <a href="#projects" className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-bold hover:bg-blue-400 transition-all shadow-lg hover:shadow-blue-500/20">Explore Projects</a>
                <a href="/resume.pdf" download className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold flex items-center gap-3 hover:bg-white/10 transition-all">
                  <Download size={20} /> Download CV
                </a>
              </div>
              
              <div className="flex gap-6 items-center">
                <a href="https://github.com/Aavashkc" target="_blank" className="p-4 bg-white/5 border border-white/10 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
                  <GithubIcon size={20} /> <span className="text-xs font-bold uppercase tracking-widest">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/aakc/" target="_blank" className="p-4 bg-white/5 border border-white/10 rounded-full text-slate-400 hover:text-white hover:bg-blue-600/10 transition-all flex items-center gap-2">
                  <LinkedinIcon size={20} /> <span className="text-xs font-bold uppercase tracking-widest">LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-32 px-6">
        <div className="container mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 italic">Case Studies.</h2>
            <div className="h-1.5 w-20 bg-blue-500 rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                title: "Fraud Detection Engine", 
                icon: <ShieldCheck size={32}/>, 
                desc: "Financial transaction classifier detecting real-time anomalies using specialized ML models.",
                tags: ["Python", "ML", "Streamlit"] 
              },
              { 
                title: "Stock Price Forecaster", 
                icon: <TrendingUp size={32}/>, 
                desc: "Predictive analysis utilizing Prophet and ARIMA architectures for market volatility.",
                tags: ["Time Series", "Prophet", "Analysis"] 
              },
              { 
                title: "Database Architecture", 
                icon: <Database size={32}/>, 
                desc: "High-performance PostgreSQL integration for scalable data environments.",
                tags: ["PostgreSQL", "Backend", "SQL"] 
              }
            ].map((p, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="p-10 bg-white/[0.02] border border-white/10 rounded-[2.5rem] hover:bg-white/[0.04] transition-all relative"
              >
                <div className="text-blue-400 mb-8">{p.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
                <p className="text-slate-400 mb-8 text-sm leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(t => <span key={t} className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded-lg border border-blue-500/20">{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section id="experience" className="py-32 px-6 bg-white/[0.01]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-blue-400">
                <Briefcase size={24} /> Professional Experience
              </h2>
              <div className="relative pl-8 border-l border-white/10">
                <div className="absolute -left-[5px] top-0 w-[10px] h-[10px] bg-blue-500 rounded-full" />
                <h3 className="text-xl font-bold">IT Executive</h3>
                <p className="text-slate-300 font-medium">Pioneer Moto Corp Pvt. Ltd</p>
                <p className="text-xs text-slate-500 mb-4 uppercase tracking-tighter">Oct 2023 - Jan 2025</p>
                <p className="text-sm text-slate-400 leading-relaxed italic">Managing IT infrastructure, network security, and enterprise technical support.</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-emerald-400">
                <GraduationCap size={28} /> Education & Training
              </h2>
              <div className="space-y-6">
                <div className="p-8 bg-white/[0.03] rounded-3xl border border-white/10">
                  <h3 className="text-xl font-bold">BSc.CSIT</h3>
                  <p className="text-slate-300">Himalaya College of Engineering (TU)</p>
                  <p className="text-xs text-slate-500 mt-2 uppercase">Class of 2024</p>
                </div>
                <div className="p-8 bg-white/[0.03] rounded-3xl border border-white/10">
                  <h3 className="text-xl font-bold italic">Data Science Specialist</h3>
                  <p className="text-slate-300">Techaxis Training Center</p>
                  <p className="text-xs text-slate-500 mt-2 uppercase">Machine Learning & Python Focus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-32 px-6">
        <div className="container mx-auto max-w-5xl bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden flex flex-col md:flex-row backdrop-blur-md">
          <div className="md:w-1/3 p-12 bg-gradient-to-br from-blue-600 to-blue-900 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-black mb-6">Let's Connect.</h2>
              <p className="text-blue-100 text-sm leading-relaxed">Available for data-focused roles and innovative tech projects.</p>
            </div>
            <div className="space-y-6 mt-12">
              <div className="flex items-center gap-4 text-xs font-medium"><Mail size={18}/> kcaavash244@gmail.com</div>
              <div className="flex items-center gap-4 text-xs font-medium"><Phone size={18}/> 9861189404</div>
              <div className="flex items-center gap-4 text-xs font-medium"><MapPin size={18}/> Kathmandu, Nepal</div>
            </div>
          </div>
          
          <div className="md:w-2/3 p-12 bg-slate-950/40">
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input name="name" type="text" placeholder="Name" required className="bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm" />
                <input name="email" type="email" placeholder="Email" required className="bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm" />
              </div>
              <textarea name="message" placeholder="How can I help you?" rows={5} className="bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm" required></textarea>
              <button type="submit" className={`py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all ${isSent ? 'bg-emerald-500 shadow-emerald-500/20 shadow-lg' : 'bg-white text-slate-900 hover:bg-blue-400'}`}>
                {isSent ? (
                  <><CheckCircle size={22} /> MESSAGE SENT</>
                ) : (
                  <><Send size={20} /> SEND MESSAGE</>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center">
         <p className="text-slate-600 text-[10px] font-bold tracking-[0.3em] uppercase">© 2026 Aavash K C — The Data Folio</p>
      </footer>

    </div>
  );
};

export default Portfolio;