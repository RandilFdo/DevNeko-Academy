'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { ArrowUpRight, Play, Star, BookOpen, Hexagon, Plus, Circle, Cpu, Code2, Gamepad2, Smartphone, Globe, Award, Users, Rocket, Palette, Zap, Target } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function Home() {
  const { t, language } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground relative transition-colors duration-500 font-sans overflow-x-hidden">
      <Navbar />

      {/* Decorative Wavy Lines (SVG) - Stay as background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20 dark:opacity-10">
        <svg className="absolute w-[150%] h-[150%] -top-[25%] -left-[25%] text-primary" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0,500 C200,300 300,700 500,500 C700,300 800,700 1000,500" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d="M0,700 C250,900 350,500 600,700 C850,900 950,500 1000,700" fill="none" stroke="var(--color-chart-2)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Huge Smooth Pastel Shapes */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 0.8 }} transition={{ duration: 2, ease: "easeOut" }} className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-cyan-200 dark:bg-cyan-900/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 0.8 }} transition={{ duration: 2, ease: "easeOut", delay: 0.2 }} className="absolute top-[20%] right-[-10%] w-[700px] h-[700px] bg-pink-200 dark:bg-pink-900/20 rounded-full blur-[140px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 pt-20 z-10">
        <div className="max-w-6xl mx-auto w-full text-center relative">
          
          {/* Floating Pill Tags - Reduced to 4 total */}
          <motion.div 
            initial={{ opacity: 0, x: -50, rotate: -5 }} animate={{ opacity: 1, x: 0, rotate: -10 }} transition={{ delay: 0.8, type: 'spring' }}
            className="absolute top-[-30%] left-0 md:top-[-10%] md:left-10 flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-[#fbcfe8] text-pink-900 border border-white/50 rounded-full font-black text-xs md:text-base shadow-xl hover:scale-110 cursor-pointer transition-transform z-20"
          >
            #Robotics
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 10 }} animate={{ opacity: 1, x: 0, rotate: 15 }} transition={{ delay: 0.9, type: 'spring' }}
            className="absolute top-[-20%] right-0 md:top-0 md:right-10 flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-[#c4b5fd] text-purple-900 border border-white/50 rounded-full font-black text-xs md:text-base shadow-xl hover:scale-110 cursor-pointer transition-transform z-20"
          >
            #Coding
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.0, type: 'spring' }}
            className="absolute bottom-[-40%] left-[5%] md:bottom-[-20%] md:left-10 flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-[#fde047] text-yellow-950 border border-white/50 rounded-full font-black text-xs md:text-sm shadow-xl hover:scale-110 cursor-pointer transition-transform z-20 -rotate-12"
          >
            #CriticalThinking
          </motion.div>
 
          <motion.div 
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1, type: 'spring' }}
            className="absolute bottom-[-30%] right-[5%] md:bottom-[-15%] md:right-10 flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-[#a5f3fc] text-cyan-900 border border-white/50 rounded-full font-black text-xs md:text-sm shadow-xl hover:scale-110 cursor-pointer transition-transform z-20 rotate-6"
          >
            #Buildathons
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="tracking-tighter leading-[1.1] mb-8"
          >
            <span className="font-royal text-8xl md:text-[11rem] lg:text-[13rem] text-foreground inline-block mb-4">Creative</span> <br />
            <span className="font-bold text-5xl md:text-9xl lg:text-[10rem] bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text pr-2 pb-2">Kids Academy</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 font-medium"
          >
            DevNeko Academy is the premier robotics and AI academy where young minds flourish, build real hardware projects, and master the digital skills of tomorrow.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href={user ? "/dashboard" : "/login"}
              className="w-full sm:w-auto px-10 py-6 bg-foreground text-background dark:bg-primary dark:text-black rounded-full font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {user ? "Go to Dashboard" : "Get Started"} <ArrowUpRight size={28} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why DevNeko Section */}
      <section className="relative w-full py-20 md:py-32 px-6 z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8"
            >
              Why <span className="text-[#c4b5fd]">DevNeko?</span>
            </motion.h2>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
              We're building the next generation of innovators through a blend of technical mastery and industry exposure.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-24">
            {[
              { label: 'Robotics', color: 'bg-[#c4b5fd]', icon: <Cpu size={28} /> },
              { label: 'Coding', color: 'bg-[#86efac]', icon: <Code2 size={28} /> },
              { label: 'Design', color: 'bg-[#fbcfe8]', icon: <Palette size={28} /> },
              { label: 'Game Dev', color: 'bg-[#fde047]', icon: <Gamepad2 size={28} /> },
              { label: 'Mobile Dev', color: 'bg-[#a5f3fc]', icon: <Smartphone size={28} /> },
              { label: 'Web Dev', color: 'bg-[#fed7aa]', icon: <Globe size={28} /> },
            ].map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, scale: 0.8, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`${skill.color} p-8 rounded-[2.5rem] flex flex-col items-center gap-6 text-black font-black text-base shadow-lg hover:scale-110 transition-transform cursor-default`}
              >
                <div className="w-16 h-16 bg-white/40 rounded-[1.5rem] flex items-center justify-center shadow-inner">
                  {skill.icon}
                </div>
                {skill.label}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Industry Exposure', desc: 'Real-world visits to tech giants, allowing kids to see how the software they build impacts millions.', icon: <Rocket className="text-[#86efac]" size={40} />, glow: 'bg-[#86efac]/10' },
              { title: 'Hackathons', desc: 'Exciting Buildathons where students team up to solve problems and compete for prestigious awards.', icon: <Award className="text-[#fbcfe8]" size={40} />, glow: 'bg-[#fbcfe8]/10' },
              { title: 'Live Guest Lectures', desc: 'Surprise lectures from top industry experts from around the globe directly in our classrooms.', icon: <Users className="text-[#c4b5fd]" size={40} />, glow: 'bg-[#c4b5fd]/10' }
            ].map((card, i) => (
              <motion.div 
                key={card.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                className="bg-secondary/60 backdrop-blur-3xl border-2 border-border p-12 rounded-[3.5rem] shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
              >
                <div className={`absolute -top-10 -right-10 w-40 h-40 ${card.glow} rounded-full group-hover:scale-150 transition-transform duration-700`} />
                <div className="mb-8">{card.icon}</div>
                <h4 className="text-3xl font-black mb-6 tracking-tight leading-tight">{card.title}</h4>
                <p className="text-muted-foreground text-base font-bold leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Robotics Spotlight - Overhauled */}
      <section className="relative py-20 md:py-32 px-6 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#c4b5fd] rounded-full blur-[100px] opacity-20 -z-10" />
              <span className="px-8 py-3 bg-[#c4b5fd] text-purple-900 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-10 inline-block shadow-lg shadow-purple-500/20">Spotlight: Robotics</span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-[0.85] text-foreground">
                Building <br /> The <span className="font-playfair italic font-normal text-[#fbcfe8] dark:text-[#fbcfe8]">Future</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-12 max-w-xl leading-relaxed">
                Master the physical world of robotics—a field where human ingenuity remains king and AI only enhances your creativity.
              </p>
              
              <div className="flex flex-wrap gap-6">
                <div className="bg-secondary/40 backdrop-blur-xl p-8 rounded-[3rem] border border-border flex-1 min-w-[280px] hover:scale-105 transition-transform group">
                   <h4 className="text-2xl font-black mb-2 tracking-tight group-hover:text-[#c4b5fd] transition-colors">Critical Thinking</h4>
                   <p className="text-muted-foreground text-sm font-bold">Develop deep problem-solving skills that last a lifetime.</p>
                </div>
                <div className="bg-secondary/40 backdrop-blur-xl p-8 rounded-[3rem] border border-border flex-1 min-w-[280px] hover:scale-105 transition-transform group">
                   <h4 className="text-2xl font-black mb-2 tracking-tight group-hover:text-[#86efac] transition-colors">Career Prestige</h4>
                   <p className="text-muted-foreground text-sm font-bold">Highly sought-after engineering roles globally.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="relative grid grid-cols-2 gap-6"
            >
              {[
                { title: 'Foundation', color: 'bg-[#c4b5fd]', icon: <Hexagon size={32} /> },
                { title: 'Invention', color: 'bg-[#86efac]', icon: <Rocket size={32} /> },
                { title: 'Precision', color: 'bg-[#fbcfe8]', icon: <Star size={32} /> },
                { title: 'AI-Ready', color: 'bg-[#fde047]', icon: <Cpu size={32} /> },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
                  className={`${card.color} aspect-square rounded-[3.5rem] p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-bl-[4rem] group-hover:scale-150 transition-transform duration-700" />
                  <div className="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center text-black">
                    {card.icon}
                  </div>
                  <h5 className="text-xl md:text-3xl font-black text-black leading-tight">{card.title}</h5>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Faculty Section - Overhauled to Premium Cards */}
          <div className="mt-20 md:mt-32">
            <div className="text-center mb-16">
              <span className="px-6 py-2 bg-[#c4b5fd]/10 text-[#c4b5fd] rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4 inline-block border border-[#c4b5fd]/20">Faculty Excellence</span>
              <h3 className="text-4xl md:text-6xl font-black tracking-tight mt-6">Learn from the <br/><span className="text-[#c4b5fd]">Top 1% Talent.</span></h3>
              <p className="text-muted-foreground text-sm font-bold mt-4 uppercase tracking-widest opacity-60">Undergraduates from Premier Universities</p>
            </div>
            
            {/* Infinite Logo Marquee */}
            <div className="relative flex overflow-hidden py-10 group">
              <div className="flex gap-12 md:gap-24 animate-marquee whitespace-nowrap">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-12 md:gap-24 items-center">
                    {[
                      { name: "UOM", full: "University of Moratuwa", logo: "/Images/UOM.png", color: "shadow-purple-500/20" },
                      { name: "UOP", full: "University of Peradeniya", logo: "/Images/UOP.png", color: "shadow-emerald-500/20" },
                      { name: "IIT", full: "Informatics Institute", logo: "/Images/IIT.png", color: "shadow-pink-500/20" },
                      { name: "USJP", full: "Sri Jayawardenepura", logo: "/Images/USJP.png", color: "shadow-yellow-500/20" },
                      { name: "KDU", full: "General Sir John", logo: "/Images/KDU.png", color: "shadow-cyan-500/20" },
                      { name: "SLIIT", full: "SLIIT Academy", logo: "/Images/SLIIT.png", color: "shadow-orange-500/20" }
                    ].map((uni) => (
                      <div key={uni.name} className="flex flex-col items-center gap-6 group/logo">
                        <div className={`relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transition-all duration-500 group-hover/logo:scale-110`}>
                          <div className={`absolute inset-0 bg-white/5 dark:bg-white/10 rounded-full blur-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500`} />
                          <Image 
                            src={uni.logo} 
                            alt={uni.name} 
                            width={120} 
                            height={120} 
                            className="relative z-10 object-contain w-full h-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] filter brightness-110 saturate-110 transition-all duration-500 group-hover/logo:brightness-125"
                          />
                        </div>
                        <div className="flex flex-col items-center gap-1 opacity-0 group-hover/logo:opacity-100 transition-all duration-500 -translate-y-4 group-hover/logo:translate-y-0">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c4b5fd]">{uni.name}</span>
                          <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">{uni.full}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Edge Gradient Fades */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
            </div>


          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-20 md:py-32 px-6 z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto w-full text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black mb-20 tracking-tighter"
          >
            Choose <span className="font-extrabold pr-2 pb-2 text-[#c4b5fd] dark:text-[#fbcfe8]">Your Path</span>
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-12">
            {[
              { type: 'Monthly Plan', price: '2,500', unit: 'mo', desc: 'Access to a single premium course of your choice.', button: 'Start Learning', color: 'bg-[#f8fafc] dark:bg-[#121212]', text: 'text-black dark:text-white', btnStyle: 'bg-[#c4b5fd] text-black' },
              { type: 'Yearly Plan', price: '25,000', unit: 'yr', desc: 'Save 5,000 LKR instantly! Access all future updates.', button: 'Get Annual Pass', color: 'bg-gradient-to-br from-pink-300 to-rose-300', text: 'text-black', btnStyle: 'bg-white text-pink-900', badge: 'Best Value' }
            ].map((plan, i) => (
              <motion.div 
                key={plan.type}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                className={`${plan.color} border-2 border-border/50 rounded-[2.5rem] md:rounded-[4.5rem] p-6 md:p-16 flex flex-col items-center relative group hover:-translate-y-6 hover:shadow-[0_60px_100px_rgba(0,0,0,0.15)] transition-all duration-700 shadow-xl overflow-hidden`}
              >
                {/* Subtle Inner Glow on Hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-700 pointer-events-none" />
                
                {plan.badge && <div className="absolute top-4 right-4 bg-black text-white text-[8px] md:text-[10px] font-black uppercase px-3 py-1 md:px-6 md:py-2 rounded-full tracking-widest rotate-6 shadow-2xl z-20">{plan.badge}</div>}
                
                <span className={`px-4 py-2 md:px-10 md:py-4 ${plan.text} bg-white/30 dark:bg-black/30 border border-current/10 rounded-full text-[8px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.4em] mb-4 md:mb-12 inline-block shadow-sm transition-all group-hover:tracking-[0.6em]`}>
                  {plan.type}
                </span>

                <div className={`mb-8 md:mb-12 flex flex-col items-center justify-center tracking-tighter ${plan.text}`}>
                  <span className="text-5xl md:text-7xl xl:text-8xl font-black leading-none">{plan.price}</span>
                  <span className="text-[10px] md:text-xl opacity-40 font-bold uppercase tracking-[0.3em] mt-2">LKR / {plan.unit}</span>
                </div>

                <p className={`text-[10px] md:text-lg font-bold mb-6 md:mb-16 flex-1 flex items-center text-center max-w-xs ${plan.text} opacity-70 leading-relaxed line-clamp-2 md:line-clamp-none`}>
                  {plan.desc}
                </p>

                <Link 
                  href="/login" 
                  className={`w-full py-4 md:py-8 text-xs md:text-2xl ${plan.btnStyle} font-black rounded-2xl md:rounded-[2.5rem] shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3`}
                >
                  {plan.button}
                </Link>
              </motion.div>
            ))}
          </div>

          <footer className="mt-20 md:mt-32 py-20 text-center border-t border-border bg-secondary/10">
            <div className="flex items-center justify-center gap-3 mb-10 group cursor-pointer">
              <div className="grid grid-cols-2 gap-[2px] w-10 h-10 grayscale group-hover:grayscale-0 transition-all">
                <div className="bg-[#c4b5fd] rounded-[4px]" />
                <div className="bg-[#86efac] rounded-[4px]" />
                <div className="bg-[#fbcfe8] rounded-[4px]" />
                <div className="bg-[#fef08a] rounded-[4px]" />
              </div>
              <h2 className="text-4xl font-bold tracking-tighter uppercase text-muted-foreground transition-colors">
                <span className="group-hover:text-foreground transition-colors">DEVNEKO</span> <span className="group-hover:text-[#c4b5fd] transition-colors">ACADEMY</span>
              </h2>
            </div>
            <div className="flex justify-center gap-12 mb-12 text-xs font-black uppercase tracking-[0.2em]">
               <Link href="/courses" className="text-muted-foreground hover:text-[#c4b5fd] transition-colors">Courses</Link>
               <Link href="/mentor" className="text-muted-foreground hover:text-[#86efac] transition-colors">Mentors</Link>
               <Link href="/login" className="text-muted-foreground hover:text-[#fbcfe8] transition-colors">Login</Link>
            </div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground/50">
              © 2026 Devneko Academy. Built with passion for the next generation.
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}
