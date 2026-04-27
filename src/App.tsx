/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Sun, Moon, Menu, X, Rocket, GraduationCap, Users, Briefcase, ChevronRight, Send, ArrowRight, MessageCircle, Layout } from 'lucide-react';
import { COURSES, FEATURES, STATS, TESTIMONIALS } from './constants';

// --- Utility Components ---

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-24 px-8 sm:px-12 lg:px-24 ${className}`}>
    {children}
  </section>
);

const GlassCard = ({ children, className = "", hoverEffect = true, isDarkMode = true }: { children: React.ReactNode, className?: string, hoverEffect?: boolean, isDarkMode?: boolean }) => (
  <motion.div
    whileHover={hoverEffect ? { 
      y: -10, 
      scale: 1.05,
      borderColor: isDarkMode ? "rgba(6, 182, 212, 0.8)" : "rgba(6, 182, 212, 0.4)",
      boxShadow: isDarkMode 
        ? "0 0 50px rgba(6, 182, 212, 0.3), 0 25px 60px -12px rgba(0, 0, 0, 0.7)" 
        : "0 0 50px rgba(6, 182, 212, 0.1), 0 20px 40px -12px rgba(0, 0, 0, 0.1)"
    } : {}}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`
      backdrop-blur-xl border rounded-2xl p-6 overflow-hidden transition-all duration-500 relative group 
      ${className}
      ${isDarkMode 
        ? 'bg-white/5 border-white/10 dark:bg-slate-900/40 dark:border-white/5 hover:dark:bg-slate-900/60' 
        : 'bg-white/70 border-slate-200 shadow-sm hover:shadow-md hover:bg-white'}
    `}
  >
    {/* Animated Border Glow Overlay */}
    <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-sm`} />
    
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

const Badge = ({ children, variant = "default", isDarkMode = true }: { children: React.ReactNode, variant?: "default" | "neon", isDarkMode?: boolean }) => (
  <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full transition-colors duration-500 ${
    variant === "neon" 
      ? "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20" 
      : isDarkMode 
        ? "bg-white/5 text-slate-400 border border-white/10" 
        : "bg-slate-200/50 text-slate-600 border border-slate-300/50"
  }`}>
    {children}
  </span>
);

// --- Main Application ---

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormStatus('success');
      setTimeout(() => setFormStatus(null), 3000);
      setFormData({ name: '', email: '', message: '' });
    } else {
      setFormStatus('error');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 relative overflow-x-hidden ${isDarkMode ? 'bg-slate-950 text-slate-200 selection:bg-cyan-500/30' : 'bg-slate-50 text-slate-900 selection:bg-cyan-200'}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        body { background-color: ${isDarkMode ? '#020617' : '#f8fafc'}; }
      `}} />
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-purple-600 z-[100] origin-left"
      />

      {/* Immersive Blurs - Contained to prevent overflow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-cyan-500/10' : 'bg-cyan-500/5'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-purple-600/10' : 'bg-purple-600/5'}`} />
      </div>

      {/* Background Dots */}
      <div className={`fixed inset-0 z-0 bg-immersive-dots pointer-events-none transition-opacity duration-1000 ${isDarkMode ? 'opacity-40 text-white/5' : 'opacity-10 text-slate-900/10'}`} />
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b px-4 md:px-8 py-4 flex justify-between items-center transition-colors duration-500 ${isDarkMode ? 'border-white/5 bg-slate-950/80' : 'border-slate-200 bg-white/80'}`}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center">
            <Rocket className="text-white w-4 h-4 md:w-5 md:h-5" />
          </div>
          <span className={`text-base md:text-lg font-bold tracking-tight whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Codesphere<span className="font-light opacity-80">Academy</span>
          </span>
        </div>

        <div className={`hidden lg:flex items-center gap-8 text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          <a href="#home" className="text-cyan-500 font-bold">Home</a>
          <a href="#courses" className="hover:text-cyan-500 transition-colors">Courses</a>
          <a href="#about" className="hover:text-cyan-500 transition-colors">Career</a>
          <a href="#contact" className="hover:text-cyan-500 transition-colors">Community</a>
        </div>

        <div className="hidden sm:flex items-center gap-3 md:gap-4">
          <button className={`hidden lg:block text-[10px] md:text-xs font-semibold px-4 py-2 border rounded-full transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5 text-white' : 'border-slate-200 hover:bg-slate-100 text-slate-700'}`}>1:1 Schedule</button>
          <button className={`text-[10px] md:text-xs font-semibold px-4 py-2 rounded-full shadow-lg transition-all ${isDarkMode ? 'bg-white text-slate-950 hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/10'}`}>Get Started</button>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full border transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5 text-white' : 'border-slate-200 hover:bg-slate-100 text-slate-700'}`}
          >
            {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        <div className="flex sm:hidden items-center gap-2">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-full border transition-colors ${isDarkMode ? 'border-white/10 text-white' : 'border-slate-200 text-slate-700'}`}>
            {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={isDarkMode ? "text-white" : "text-slate-900"}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`fixed top-[65px] left-0 right-0 z-40 border-b flex flex-col items-center py-8 gap-6 sm:hidden overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-950/95 border-white/5 text-white' : 'bg-white/95 border-slate-200 text-slate-900'}`}
          >
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Home</a>
            <a href="#courses" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Courses</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Career</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Community</a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-16 md:pt-20">
        
        {/* --- Hero Section --- */}
        <Section id="home" className="relative flex items-center mt-4 md:mt-12 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 z-[-1] pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-24 h-24 md:w-48 md:h-48 border rounded-full transition-colors duration-500 ${isDarkMode ? 'border-white/5' : 'border-slate-300/20'}`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, 50, 0],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div className="container mx-auto grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-4 md:space-y-6"
            >
              <div className="w-fit">
                <Badge variant="neon" isDarkMode={isDarkMode}>Enrollment Open — May 15</Badge>
              </div>
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight font-display transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Master the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-purple-600">
                  Future of Tech
                </span>
              </h1>
              <p className={`text-sm md:text-base max-w-md leading-relaxed px-1 transition-colors duration-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Expert-led live courses in AI, Development, and Data Science. Build production-ready projects and launch your high-growth career.
              </p>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-4">
                <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-cyan-500 text-white rounded-lg font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:bg-cyan-400 transition-all">
                  Explore Courses
                </button>
                <button className={`w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border rounded-lg font-bold text-sm transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'}`}>
                  Join Live Demo
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 relative hidden lg:block"
            >
              <div className={`w-full rounded-xl border p-6 shadow-2xl backdrop-blur-xl font-mono text-[11px] leading-relaxed transition-colors duration-500 ${isDarkMode ? 'bg-slate-900/80 border-white/10' : 'bg-white border-slate-200'}`}>
                <div className="flex gap-1.5 mb-4">
                  <div className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-red-500/50' : 'bg-red-400'}`} />
                  <div className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-amber-500/50' : 'bg-amber-400'}`} />
                  <div className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-emerald-500/50' : 'bg-emerald-400'}`} />
                </div>
                <div className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'} italic mb-1`}>// Accelerate your learning</div>
                <div className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>class <span className="text-cyan-500 font-bold">Codesphere</span> {'{'}</div>
                <div className={`pl-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>constructor() {'{'}</div>
                <div className={`pl-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>this.status = <span className="text-amber-500">'Ready'</span>;</div>
                <div className={`pl-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>this.skills = [<span className="text-emerald-500">'AI'</span>, <span className="text-emerald-400">'React'</span>, <span className="text-emerald-500">'Cloud'</span>];</div>
                <div className={`pl-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{'}'}</div>
                <div className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{'}'}</div>
                <span className="animate-pulse bg-cyan-400/50 w-2 h-4 inline-block align-middle ml-1 mt-2" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
            </motion.div>
          </div>
        </Section>

        {/* --- Stats Bar --- */}
        <div className="container mx-auto px-4 md:px-8 py-10 relative z-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white/5 dark:bg-slate-900/40 border border-white/10 dark:border-white/5 p-4 md:p-6 rounded-2xl backdrop-blur-md flex flex-col sm:flex-row items-center gap-3 sm:gap-5 hover:border-cyan-500/30 transition-colors group text-center sm:text-left"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shrink-0">⚡</div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white">5000+</div>
                <div className="text-[9px] md:text-[10px] uppercase text-slate-500 tracking-widest font-bold">Students</div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="bg-white/5 dark:bg-slate-900/40 border border-white/10 dark:border-white/5 p-4 md:p-6 rounded-2xl backdrop-blur-md flex flex-col sm:flex-row items-center gap-3 sm:gap-5 hover:border-purple-500/30 transition-colors group text-center sm:text-left"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shrink-0">📺</div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white">15+</div>
                <div className="text-[9px] md:text-[10px] uppercase text-slate-500 tracking-widest font-bold">Live Courses</div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="bg-white/5 dark:bg-slate-900/40 border border-white/10 dark:border-white/5 p-4 md:p-6 rounded-2xl backdrop-blur-md flex flex-col sm:flex-row items-center gap-3 sm:gap-5 hover:border-emerald-500/30 transition-colors group text-center sm:text-left"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shrink-0">🏆</div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white">98%</div>
                <div className="text-[9px] md:text-[10px] uppercase text-slate-500 tracking-widest font-bold">Satisfaction</div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="bg-white/5 dark:bg-slate-900/40 border border-white/10 dark:border-white/5 p-4 md:p-6 rounded-2xl backdrop-blur-md flex flex-col sm:flex-row items-center gap-3 sm:gap-5 hover:border-amber-500/30 transition-colors group text-center sm:text-left"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shrink-0">💼</div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white">Career</div>
                <div className="text-[9px] md:text-[10px] uppercase text-slate-500 tracking-widest font-bold">Partnerships</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- Courses Section --- */}
        <Section id="courses">
          <div className="text-center mb-16">
            <Badge variant="neon" isDarkMode={isDarkMode}>Learning Paths</Badge>
            <h2 className={`text-3xl md:text-5xl font-bold mt-4 font-display transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Top Tech Courses</h2>
            <p className={`mt-4 max-w-2xl mx-auto text-sm md:text-base transition-colors duration-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Choose from our curated curriculum designed by industry veterans to take you from beginner to expert.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard isDarkMode={isDarkMode} className="h-full flex flex-col group relative">
                  {course.featured && (
                    <div className="absolute top-4 right-4 z-20">
                      <Badge variant="neon" isDarkMode={isDarkMode}>Best Seller</Badge>
                    </div>
                  )}
                  {i % 3 === 0 && (
                     <div className="absolute top-4 left-4 z-20">
                        <Badge isDarkMode={isDarkMode}>Enrollment Open</Badge>
                     </div>
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-gradient-to-br from-cyan-400/20 to-purple-500/20' : 'bg-slate-100'}`}>
                    <course.icon className="text-cyan-500" size={24} />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{course.title}</h3>
                  <p className={`text-sm mb-6 flex-grow ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{course.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {course.techStack.map((tech, idx) => (
                      <span key={idx} className={`text-[10px] font-mono px-2 py-1 rounded transition-colors duration-500 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white/50' : 'bg-slate-100 border border-slate-200 text-slate-500'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={`pt-6 border-t flex justify-between items-center transition-colors duration-500 ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                    <span className="text-[10px] text-cyan-500 font-bold uppercase">Next Batch: {course.nextBatch}</span>
                    <button className={`flex items-center gap-1 text-sm font-semibold hover:text-cyan-500 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
                      Learn More <ChevronRight size={16} />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* --- Why Choose Us --- */}
        <Section id="about" className={`relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-white/5' : 'bg-slate-100/50'}`}>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full" />
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <Badge variant="neon" isDarkMode={isDarkMode}>The Advantage</Badge>
              <h2 className={`text-3xl md:text-5xl font-bold mt-4 font-display ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Why Codesphere?</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassCard isDarkMode={isDarkMode} className="text-center py-10">
                    <div className="inline-flex w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 items-center justify-center mb-6 shadow-lg shadow-cyan-500/20">
                      {feature.icon === 'Live' && <GraduationCap size={24} className="text-white" />}
                      {feature.icon === 'Projects' && <Layout size={24} className="text-white" />}
                      {feature.icon === 'Community' && <Users size={24} className="text-white" />}
                      {feature.icon === 'Career' && <Briefcase size={24} className="text-white" />}
                    </div>
                    <h4 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{feature.title}</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{feature.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* --- Testimonials --- */}
        <Section>
          <div className="text-center mb-16">
            <Badge variant="neon" isDarkMode={isDarkMode}>Alumni Success</Badge>
            <h2 className={`text-3xl md:text-5xl font-bold mt-4 font-display ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Hear from our Students</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard isDarkMode={isDarkMode} className="h-full relative pt-12">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className={`w-16 h-16 rounded-full border-4 overflow-hidden shadow-xl ${isDarkMode ? 'border-slate-950' : 'border-white'}`}>
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <p className={`italic text-center mb-8 relative ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <span className="text-6xl text-cyan-400/20 absolute -top-8 -left-4 font-serif">"</span>
                    {t.content}
                  </p>
                  <div className="text-center">
                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.name}</div>
                    <div className="text-xs text-cyan-500 font-bold mt-1">{t.role}</div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* --- CTA Section --- */}
        <Section className="pb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`rounded-[2.5rem] p-1 transition-colors duration-500 ${isDarkMode ? 'bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600' : 'bg-gradient-to-r from-cyan-500 to-purple-500'}`}
          >
            <div className={`rounded-[2.4rem] p-12 text-center relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#050505]' : 'bg-white'}`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 opacity-10 blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 opacity-10 blur-[100px]" />
              
              <Badge variant="neon" isDarkMode={isDarkMode}>limited seats available</Badge>
              <h2 className={`text-4xl md:text-5xl font-bold mt-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Ready to start your journey?</h2>
              <p className={`mt-6 max-w-xl mx-auto text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Join the next batch of tech pioneers and transform your professional landscape with Codesphere Academy.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="relative group w-full max-w-md">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className={`w-full px-8 py-4 rounded-full border focus:outline-none focus:border-cyan-400 transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} 
                  />
                </div>
                <button className={`whitespace-nowrap px-10 py-4 font-bold rounded-full transition-all flex items-center gap-2 group ${isDarkMode ? 'bg-white text-black hover:bg-cyan-100' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-950/20'}`}>
                  Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </Section>

        {/* --- Contact Form Section --- */}
        <Section id="contact" className={`transition-colors duration-500 ${isDarkMode ? 'bg-white/5' : 'bg-slate-100/50'}`}>
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="space-y-6 md:space-y-8">
                <div>
                  <Badge variant="neon" isDarkMode={isDarkMode}>Get in touch</Badge>
                  <h2 className={`text-3xl md:text-5xl font-bold mt-4 font-display ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Questions? We're here for you.</h2>
                  <p className={`mt-6 leading-relaxed text-sm md:text-base ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Have specific questions about a course or the enrollment process? Drop us a message and our counselor will reach out to you within 24 hours.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0">
                      <Send size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <div className={`text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'text-white/50' : 'text-slate-400'}`}>Email Us</div>
                      <a href="mailto:codesphereacademy@gmail.com" className={`font-semibold text-base md:text-lg hover:text-cyan-500 transition-colors break-all ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>codesphereacademy@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <a href="/" className={`w-10 h-10 rounded-full border flex items-center justify-center hover:bg-cyan-500/20 transition-all font-bold text-xs ${isDarkMode ? 'border-white/10 text-white' : 'border-slate-200 text-slate-700'}`}>FB</a>
                    <a href="/" className={`w-10 h-10 rounded-full border flex items-center justify-center hover:bg-cyan-500/20 transition-all font-bold text-xs ${isDarkMode ? 'border-white/10 text-white' : 'border-slate-200 text-slate-700'}`}>TW</a>
                    <a href="/" className={`w-10 h-10 rounded-full border flex items-center justify-center hover:bg-cyan-500/20 transition-all font-bold text-xs ${isDarkMode ? 'border-white/10 text-white' : 'border-slate-200 text-slate-700'}`}>LN</a>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur opacity-20" />
                <GlassCard isDarkMode={isDarkMode} className="relative">
                  <form onSubmit={handleContactSubmit} className="space-y-4 md:space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`text-[10px] uppercase tracking-widest mb-2 block font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Full Name</label>
                        <input 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          type="text" 
                          placeholder="Jane Doe" 
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-cyan-400 transition-all text-sm ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} 
                        />
                      </div>
                      <div>
                        <label className={`text-[10px] uppercase tracking-widest mb-2 block font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email</label>
                        <input 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          type="email" 
                          placeholder="jane@example.com" 
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-cyan-400 transition-all text-sm ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} 
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`text-[10px] uppercase tracking-widest mb-2 block font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Message</label>
                      <textarea 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={4} 
                        placeholder="How can we help?" 
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-cyan-400 transition-all resize-none text-sm ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} 
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full py-4 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
                    >
                      Send Message
                    </button>
                    {formStatus === 'success' && (
                      <motion.p initial={{opacity: 0}} animate={{opacity: 1}} className="text-green-400 text-xs text-center font-medium">
                        Message sent successfully! Our counselor will contact you soon.
                      </motion.p>
                    )}
                  </form>
                </GlassCard>
              </div>
            </div>
          </div>
        </Section>
      </main>

      {/* --- Footer --- */}
      <footer className={`mt-auto border-t transition-colors duration-500 px-8 py-6 flex flex-col md:flex-row items-center justify-between backdrop-blur-md text-[11px] ${isDarkMode ? 'border-white/5 bg-slate-950/80 text-slate-500' : 'border-slate-200 bg-white/80 text-slate-400'}`}>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>&copy; {new Date().getFullYear()} Codesphere Academy</span>
          <a href="mailto:codesphereacademy@gmail.com" className={`hover:text-cyan-500 transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>codesphereacademy@gmail.com</a>
        </div>
        
        <div className="flex gap-8 my-4 md:my-0 capitalize">
          <a href="/" className="hover:text-cyan-500 transition-colors">Facebook</a>
          <a href="/" className="hover:text-cyan-500 transition-colors">Twitter</a>
          <a href="/" className="hover:text-cyan-500 transition-colors">LinkedIn</a>
        </div>

        <div className="flex items-center gap-3 text-slate-900">
          <input type="text" placeholder="Newsletter" className={`border rounded-lg px-4 py-2 text-[10px] w-48 outline-none focus:border-cyan-500/50 transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
          <button className={`font-bold hover:text-cyan-500 transition-colors uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Join</button>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-cyan-500 text-black rounded-full shadow-lg shadow-cyan-500/20 flex items-center justify-center hover:bg-cyan-400 group relative"
        >
          <MessageCircle size={24} />
          <span className="absolute right-full mr-4 whitespace-nowrap bg-black/80 text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Schedule 1:1 Call</span>
        </motion.button>
      </div>

      <style>{`
        html { scroll-behavior: smooth; }
        ::selection { background-color: rgba(34, 211, 238, 0.3); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}; }
      `}</style>
    </div>
  );
}
