'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import LogoLoader from '@/components/ui/LogoLoader';
import { Clock, ArrowRight, Star, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const COURSES = [
  {
    id: 'robotics-101',
    code: 'R101',
    title: 'Creative Robotics',
    category: 'Engineering',
    description: 'Master the fundamentals of robotics with a hands-on, playful approach.',
    color: 'bg-[#86efac]', // Pastel Green
    status: 'active',
    duration: '12 weeks',
    level: 'Beginner',
    href: '/courses/robotics-101'
  },
  {
    id: 'python-prog',
    code: 'PY101',
    title: 'Python Magic',
    category: 'Software',
    description: 'Learn the language of AI by building cool scripts and games.',
    color: 'bg-[#c4b5fd]', // Pastel Purple
    status: 'locked',
    duration: '8 weeks',
    level: 'Beginner',
    href: '#'
  },
  {
    id: 'web-dev',
    code: 'WB101',
    title: 'Web Design',
    category: 'Artistry',
    description: 'Build your own website from scratch with code and creativity.',
    color: 'bg-[#fbcfe8]', // Pastel Pink
    status: 'locked',
    duration: '14 weeks',
    level: 'Beginner',
    href: '#'
  },
  {
    id: 'game-dev',
    code: 'GD101',
    title: 'Game Development',
    category: 'Software',
    description: 'Build immersive 2D and 3D games using Unity and C#.',
    color: 'bg-[#fde047]', // Pastel Yellow
    status: 'locked',
    duration: '16 weeks',
    level: 'Advanced',
    href: '#'
  }
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All Programs');
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    const startTime = Date.now();
    const minLoadTime = 800; // Minimum time to show loader

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login');
        return;
      }
      
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadTime - elapsed);
      
      setTimeout(() => {
        setLoading(false);
      }, remaining);
    });
  }, [router]);

  if (loading) {
    return (
       <div className="min-h-screen bg-background flex items-center justify-center">
         <LogoLoader size="lg" />
       </div>
    );
  }

  const filteredCourses = activeFilter === 'All Programs' 
    ? COURSES 
    : COURSES.filter(c => c.category === activeFilter);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-500 font-sans relative overflow-hidden">
      <Navbar />

      {/* Floating Wavy Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
        <svg className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] text-primary" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0,300 C200,100 300,500 500,300 C700,100 800,500 1000,300" fill="none" stroke="currentColor" strokeWidth="4" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div className="flex-1 max-w-[1600px] mx-auto w-full px-6 pt-40 pb-20 z-10">
        
        {/* Welcome Header */}
        <section className="mb-20 text-center relative max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: 'spring' }}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-[0.9]">
              Your <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text pr-2">Learning</span> <br className="hidden lg:block"/>
              Hub
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl lg:text-lg font-medium max-w-2xl mx-auto">
              Pick a course and start building incredible projects today.
            </p>
          </motion.div>
        </section>

        {/* Categories / Tabs Filter */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {['All Programs', 'Robotics', 'Software', 'Artistry'].map((cat, i) => (
            <button 
              key={cat} 
              onClick={() => setActiveFilter(cat)}
              className={`px-8 py-4 lg:px-6 lg:py-2.5 rounded-[2rem] text-base lg:text-xs font-black transition-transform hover:scale-105 active:scale-95 whitespace-nowrap shadow-sm ${
                cat === activeFilter ? 'bg-foreground text-background shadow-lg' : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetrical Masonry Course Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-32">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, type: 'spring', bounce: 0.4 }}
              className={`group relative ${course.color} text-black p-10 md:p-12 lg:p-8 rounded-[3rem] md:rounded-[4rem] lg:rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all border border-black/5 flex flex-col justify-between min-h-[380px] md:min-h-[480px] lg:min-h-[400px]`}
            >
              {/* Abstract decorative shapes inside card */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/40 rounded-full mix-blend-overlay group-hover:scale-[2] transition-transform duration-1000 ease-out" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/5 rounded-[2rem] rotate-12 mix-blend-overlay group-hover:-rotate-45 transition-transform duration-1000 ease-out" />

              <div className={`relative z-10 flex flex-col h-full ${course.status === 'locked' ? 'opacity-50 grayscale' : ''}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 md:mb-8">
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest px-2 py-1 md:px-4 md:py-2 rounded-full bg-black/10">
                      {course.code}
                    </span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest px-2 py-1 md:px-4 md:py-2 rounded-full bg-white/40">
                      {course.category}
                    </span>
                  </div>
                  {course.status === 'locked' && (
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest px-2 py-1 md:px-4 md:py-2 rounded-full bg-black text-white shadow-xl self-start sm:self-auto">
                      Coming Soon
                    </span>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-center my-2 md:my-6">
                  <h3 className="font-extrabold mb-4 md:mb-6 lg:mb-4 leading-[1] tracking-tighter group-hover:scale-105 origin-left transition-transform duration-500 text-4xl md:text-6xl lg:text-3xl">
                    {course.title.split(' ').map((word, i) => (
                      <span key={i}>{word} </span>
                    ))}
                  </h3>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                   <div className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-2 text-black/60 font-black text-sm md:text-xl lg:text-[10px] uppercase tracking-widest">
                     <span className="flex items-center gap-2 bg-white/30 px-6 py-3 md:px-8 md:py-4 lg:px-4 lg:py-2 rounded-full w-fit"><Clock size={20} className="md:w-6 md:h-6 lg:w-4 lg:h-4" /> {course.duration}</span>
                     <span className="flex items-center gap-2 bg-white/30 px-6 py-3 md:px-8 md:py-4 lg:px-4 lg:py-2 rounded-full w-fit"><Star size={20} className="md:w-6 md:h-6 lg:w-4 lg:h-4" /> {course.level}</span>
                   </div>

                   <Link 
                     href={course.href}
                     className={`w-16 h-16 md:w-32 lg:w-16 lg:h-16 shrink-0 rounded-[2rem] md:rounded-[3rem] lg:rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-45 active:scale-95 self-end sm:self-auto ${
                       course.status === 'active' 
                         ? 'bg-black text-white shadow-2xl hover:scale-110' 
                         : 'bg-black/10 text-black/40 cursor-not-allowed'
                     }`}
                   >
                     {course.status === 'active' ? (
                       <ArrowUpRight className="w-8 h-8 md:w-16 lg:w-8 lg:h-8" strokeWidth={3} />
                     ) : (
                       <ArrowRight className="w-8 h-8 md:w-16 lg:w-8 lg:h-8" strokeWidth={3} />
                     )}
                   </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

      </div>
    </main>
  );
}
