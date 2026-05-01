'use client';

import { useState, useRef, useEffect, use, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, PlayCircle, Settings, ChevronDown, ChevronRight, 
  Cat, MonitorPlay, FileText, ChevronLeft, Send, CheckCircle2, Circle, Archive,
  User as UserIcon, LogOut, LayoutDashboard, Menu, MessageSquare, Plus, Link2, ShieldAlert,
  Sun, Moon, Zap, Rocket, Hexagon, X
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import LogoLoader from '@/components/ui/LogoLoader';
import Navbar from '@/components/layout/Navbar';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type?: 'lesson' | 'project';
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

const courseData: Module[] = [
  {
    id: 'overview',
    title: 'Getting Started',
    lessons: [
      { id: 'course-intro', title: 'Course Roadmap & Vision', duration: '05:00', type: 'lesson' }
    ]
  },
  {
    id: 'kid-1',
    title: 'Robot World Intro',
    lessons: [
      { id: 'm1-l', title: 'Meet robots everywhere; identify kit parts.', duration: '10:00', type: 'lesson' }
    ]
  },
  {
    id: 'kid-2',
    title: 'Light-Up Bots',
    lessons: [
      { id: 'm2-l', title: 'Basic circuits; electricity flow.', duration: '12:00', type: 'lesson' },
      { id: 'm2-p', title: 'PROJECT: Blinking LED.', duration: '20:00', type: 'project' }
    ]
  },
  {
    id: 'kid-3',
    title: 'Shake & Wiggle',
    lessons: [
      { id: 'm3-l', title: 'How motors spin; friction basics.', duration: '10:00', type: 'lesson' },
      { id: 'm3-p', title: 'PROJECT: Bristlebot from toothbrush heads.', duration: '25:00', type: 'project' }
    ]
  },
  {
    id: 'kid-4',
    title: 'Block Coding Basics',
    lessons: [
      { id: 'm4-l', title: 'Sequences, loops explained visually.', duration: '15:00', type: 'lesson' },
      { id: 'm4-p', title: 'PROJECT: Program robot to dance moves in Scratch', duration: '30:00', type: 'project' }
    ]
  },
  {
    id: 'kid-5',
    title: 'Basics of C++',
    lessons: [
      { id: 'm5-l', title: 'Learning a real programming language.', duration: '20:00', type: 'lesson' },
      { id: 'm5-p', title: 'PROJECT: Printing hello world and loops.', duration: '20:00', type: 'project' }
    ]
  },
  {
    id: 'kid-6',
    title: 'Bot Race Challenge',
    lessons: [
      { id: 'm6-l', title: 'Design iteration; problem diagnosis.', duration: '10:00', type: 'lesson' },
      { id: 'm6-p', title: 'PROJECT: Track-ready race rover.', duration: '40:00', type: 'project' }
    ]
  },
  {
    id: 'kid-7',
    title: 'Introduction to Sensors',
    lessons: [
      { id: 'm7-l', title: 'Sensor capabilities and daily life use.', duration: '15:00', type: 'lesson' },
      { id: 'm7-p', title: 'PROJECT: Radar using ultrasonic sensor.', duration: '35:00', type: 'project' }
    ]
  },
  {
    id: 'kid-8',
    title: 'Line Follower',
    lessons: [
      { id: 'm8-l', title: 'Light reflection; sensor thresholds.', duration: '15:00', type: 'lesson' },
      { id: 'm8-p', title: 'PROJECT: Tape-line following bot.', duration: '30:00', type: 'project' }
    ]
  },
  {
    id: 'kid-9',
    title: 'Bump & Back',
    lessons: [
      { id: 'm9-l', title: 'Digital vs analog inputs.', duration: '15:00', type: 'lesson' },
      { id: 'm9-p', title: 'PROJECT: Collision-avoiding bumper bot.', duration: '30:00', type: 'project' }
    ]
  },
  {
    id: 'kid-10',
    title: 'Distance Eyes',
    lessons: [
      { id: 'm10-l', title: 'Sound waves, echo timing.', duration: '15:00', type: 'lesson' },
      { id: 'm10-p', title: 'PROJECT: Wall-stopping explorer bot.', duration: '30:00', type: 'project' }
    ]
  },
  {
    id: 'kid-11',
    title: 'Sound Beeps',
    lessons: [
      { id: 'm11-l', title: 'Frequency, pitch science.', duration: '15:00', type: 'lesson' },
      { id: 'm11-p', title: 'PROJECT: Pattern-buzzing alert bot.', duration: '25:00', type: 'project' }
    ]
  },
  {
    id: 'kid-12',
    title: 'Color Hunter',
    lessons: [
      { id: 'm12-l', title: 'RGB color theory.', duration: '15:00', type: 'lesson' },
      { id: 'm12-p', title: 'PROJECT: Shape/color chasing bot.', duration: '30:00', type: 'project' }
    ]
  },
  {
    id: 'kid-13',
    title: 'Maze Runner Challenge',
    lessons: [
      { id: 'm13-l', title: 'Sensor fusion concepts.', duration: '15:00', type: 'lesson' },
      { id: 'm13-p', title: 'PROJECT: Cardboard maze solving bot.', duration: '40:00', type: 'project' }
    ]
  },
  {
    id: 'kid-14',
    title: 'Grabber Arm',
    lessons: [
      { id: 'm14-l', title: 'Angles, servo limits.', duration: '15:00', type: 'lesson' },
      { id: 'm14-p', title: 'PROJECT: Object-picking claw bot.', duration: '35:00', type: 'project' }
    ]
  },
  {
    id: 'kid-15',
    title: 'Drawing Bot',
    lessons: [
      { id: 'm15-l', title: 'Motor vibration patterns.', duration: '15:00', type: 'lesson' },
      { id: 'm15-p', title: 'PROJECT: Paper pattern drawing bot.', duration: '35:00', type: 'project' }
    ]
  },
  {
    id: 'kid-16',
    title: 'Dance Party',
    lessons: [
      { id: 'm16-l', title: 'Timing synchronization.', duration: '15:00', type: 'lesson' },
      { id: 'm16-p', title: 'PROJECT: Music-responsive light show bot.', duration: '35:00', type: 'project' }
    ]
  },
  {
    id: 'kid-17',
    title: 'Follow-Me Pal',
    lessons: [
      { id: 'm17-l', title: 'Infrared light principles.', duration: '15:00', type: 'lesson' },
      { id: 'm17-p', title: 'PROJECT: Person-following companion bot.', duration: '35:00', type: 'project' }
    ]
  },
  {
    id: 'kid-18',
    title: 'LCD Messages',
    lessons: [
      { id: 'm18-l', title: 'Character display protocols.', duration: '15:00', type: 'lesson' },
      { id: 'm18-p', title: 'PROJECT: Status-reporting dashboard bot.', duration: '35:00', type: 'project' }
    ]
  },
  {
    id: 'kid-19',
    title: 'App Remote',
    lessons: [
      { id: 'm19-l', title: 'Wireless communication basics.', duration: '15:00', type: 'lesson' },
      { id: 'm19-p', title: 'PROJECT: App-driven remote control rover.', duration: '40:00', type: 'project' }
    ]
  },
  {
    id: 'kid-20',
    title: 'Grand Showcase',
    lessons: [
      { id: 'm20-l', title: 'Engineering design process.', duration: '15:00', type: 'lesson' },
      { id: 'm20-p', title: 'PROJECT: Custom problem-solving bot (cleaner/sorter).', duration: '60:00', type: 'project' }
    ]
  }
];

const COURSE_ID_MAP: Record<string, string> = {
  'robotics-101': 'R101',
  'python-prog': 'PY101',
  'java-prog': 'JV101',
  'web-dev': 'WB101',
  'mobile-dev': 'MB101',
  'personality-dev': 'PD101',
  'game-dev': 'GD101'
};

interface ChatMessage {
  id: string;
  user_id: string;
  text: string;
  sender_type: 'user' | 'mentor';
  created_at: string;
  profiles?: { display_name: string }; // Joined from profiles table
}

const supabase = createClient();

export default function CourseViewer({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const courseId = resolvedParams.id;

  const [openModules, setOpenModules] = useState<Record<string, boolean>>({ 'kid-1': true });
  const [activeLesson, setActiveLesson] = useState<Lesson>(courseData[0].lessons[0]);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Core state (Identity, Chat, Progress)
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const { language } = useLanguage();

  const [xp, setXp] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const chatScrollRef = useRef<HTMLDivElement>(null);
  
  const getRankConfig = (xp: number) => {
    if (xp >= 25000) return { name: 'Elite', color: '#FFFFFF', glow: 'shadow-[0_0_30px_rgba(255,255,255,0.4)]', border: 'border-white/40' };
    if (xp >= 10000) return { name: 'Architect', color: '#FFD700', glow: 'shadow-[0_0_25px_rgba(255,215,0,0.3)]', border: 'border-[#FFD700]/30' };
    if (xp >= 2000) return { name: 'Maker', color: '#0047AB', glow: 'shadow-[0_0_20px_rgba(0,71,171,0.3)]', border: 'border-[#0047AB]/30' };
    return { name: 'Spark', color: '#A1A1AA', glow: '', border: 'border-zinc-800' };
  };

  const rankConfig = useMemo(() => getRankConfig(xp), [xp]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (data) setProfile(data);
    };



    const generateStudentId = () => {
      const digits = Math.floor(10000 + Math.random() * 90000); // Ensures exactly 5 digits (10000-99999)
      return `DVNK${digits}`;
    };

    const initializeData = async (currentUser: User) => {
      const { data: pData } = await supabase.from('profiles').select('*').eq('id', currentUser.id).single();
      if (pData) {
        let currentProfile = pData;
        if (!pData.student_id) {
          const digits = Math.floor(10000 + Math.random() * 90000);
          const newId = `DVNK${digits}`;
          const { data: updatedProfile } = await supabase
            .from('profiles')
            .update({ student_id: newId })
            .eq('id', currentUser.id)
            .select()
            .single();
          if (updatedProfile) currentProfile = updatedProfile;
        }
        setProfile(currentProfile);
        setXp(currentProfile.xp_points || 0);
        if (currentProfile.access_expires_at && new Date(currentProfile.access_expires_at) < new Date()) setIsExpired(true);
      }

      const savedState = localStorage.getItem(`devneko_state_${courseId}`);
      if (savedState) {
        const { lessonId } = JSON.parse(savedState);
        for (const module of courseData) {
          const found = module.lessons.find(l => l.id === lessonId);
          if (found) {
            setActiveLesson(found);
            break;
          }
        }
      }

      const { data: progressData } = await supabase.from('progress').select('lesson_id').eq('user_id', currentUser.id);
      if (progressData) {
        setCompletedLessonIds(progressData.map(p => p.lesson_id));
      }

      // Load Chat
      const { data: msgData } = await supabase.from('messages').select('*, profiles(display_name)').eq('course_id', courseId).order('created_at', { ascending: true });
      if (msgData) setMessages(msgData as any);

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadTime - elapsed);
      
      setTimeout(() => {
        setLoading(false);
      }, remaining);
    };

    const startTime = Date.now();
    const minLoadTime = 800;
    let isInitialLoad = true;
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        // Only run full initialization on first load or if user actually changes
        if (isInitialLoad) {
          isInitialLoad = false;
          fetchProfile(currentUser.id);
          await initializeData(currentUser);
        }
      } else {
        setProfile(null);
        router.push('/login');
      }
    });

    // 4. Subscribe to real-time messages
    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `course_id=eq.${courseId}` },
        async (payload) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('display_name')
            .eq('id', payload.new.user_id)
            .single();

          const newMsg = {
            ...payload.new,
            profiles: profileData
          } as ChatMessage;

          setMessages(prev => [...prev, newMsg]);
        }
      )
      .subscribe();

    return () => {
      authSubscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [courseId, router]);

  // Real-time chat sync
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

  const toggleModule = (moduleId: string) => {
    setOpenModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleLessonClick = async (lesson: Lesson) => {
    setActiveLesson(lesson);
    setSidebarOpen(false);
    localStorage.setItem(`devneko_state_${courseId}`, JSON.stringify({ lessonId: lesson.id }));
    
    if (user) {
      try {
        await supabase.from('enrollments').upsert({
          user_id: user.id,
          course_id: courseId,
          last_lesson_id: lesson.id,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id,course_id' });
      } catch (e) {
        console.warn('Enrollment sync failed (Table might be missing):', e);
      }
    }
  };

  const markLessonComplete = async (lesson: Lesson) => {
    if (!user || completedLessonIds.includes(lesson.id)) return;

    try {
      // Note: removing module_id for now as it's causing schema mismatch (400)
      const { error } = await supabase.from('progress').upsert({
        user_id: user.id,
        lesson_id: lesson.id,
        completed: true,
        completed_at: new Date().toISOString()
      }, { onConflict: 'user_id,lesson_id' });

      if (error) {
        console.error('Supabase Progress Error:', error.message, error.details);
        return;
      }
      
      setCompletedLessonIds(prev => Array.from(new Set([...prev, lesson.id])));

      // Award Lesson Completion XP
      const newXp = xp + (lesson.type === 'project' ? 1000 : 500);
      const newRank = getRankConfig(newXp).name;
      
      await supabase.from('profiles').update({ 
        xp_points: newXp,
        rank_tier: newRank 
      }).eq('id', user.id);
      
      setXp(newXp);
    } catch (e: any) {
      console.error('Failed to mark completed:', e.message || e);
    }
  };

  const handleNextTopic = async () => {
    // Mark current as completed
    await markLessonComplete(activeLesson);

    let foundCurrent = false;
    for (const module of courseData) {
      for (const lesson of module.lessons) {
        if (foundCurrent) {
          handleLessonClick(lesson);
          if (!openModules[module.id]) toggleModule(module.id);
          return;
        }
        if (lesson.id === activeLesson.id) {
          foundCurrent = true;
        }
      }
    }
    alert('You have completed the last topic in this course!');
  };


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !user) return;

    const userMessage = {
      id: Math.random().toString(),
      text: inputMessage,
      user_id: user.id,
      sender_type: 'user' as const,
      created_at: new Date().toISOString(),
      profiles: { display_name: user.user_metadata?.full_name || 'You' }
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      const response = await fetch('/api/ai/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.text,
          history: messages.map(m => ({
            role: m.sender_type === 'user' ? 'user' : 'model',
            content: m.text
          })),
          courseId: courseId
        })
      });

      const data = await response.json();
      
      if (data.text) {
        const aiMessage = {
          id: Math.random().toString(),
          text: data.text,
          user_id: 'neko-ai',
          sender_type: 'mentor' as const,
          created_at: new Date().toISOString(),
          profiles: { display_name: 'NEKO AI Mentor' }
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Chat Error:', error);
    }
  };

  const toggleLessonCompletion = async (lessonId: string) => {
    if (!user) return;
    
    // Optimistic UI Update: Toggle state immediately
    const isCurrentlyCompleted = completedLessonIds.includes(lessonId);
    if (isCurrentlyCompleted) {
      setCompletedLessonIds(prev => prev.filter(id => id !== lessonId));
    } else {
      setCompletedLessonIds(prev => [...prev, lessonId]);
    }

    try {
      if (isCurrentlyCompleted) {
        // Remove from DB
        const { error } = await supabase
          .from('progress')
          .delete()
          .eq('user_id', user.id)
          .eq('lesson_id', lessonId);
        
        if (error) throw error;
      } else {
        // Add/Update in DB (using upsert to avoid 409 conflicts)
        const { error } = await supabase
          .from('progress')
          .upsert({
            user_id: user.id,
            module_id: 'any',
            lesson_id: lessonId,
            completed: true,
            completed_at: new Date().toISOString()
          }, { onConflict: 'user_id,lesson_id' });
          
        if (error) throw error;
      }
    } catch (e) {
      console.error('Progress Sync Error:', e);
      // Revert state if DB call fails
      if (isCurrentlyCompleted) {
        setCompletedLessonIds(prev => [...prev, lessonId]);
      } else {
        setCompletedLessonIds(prev => prev.filter(id => id !== lessonId));
      }
    }
  };

  // Calculate progress
  const totalLessons = courseData.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedCount = completedLessonIds.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans h-screen overflow-hidden transition-colors duration-500 relative">
      {/* Decorative Wavy Blur */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-10">
         <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-pink-400/30 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-400/30 rounded-full blur-[120px]" />
      </div>

      <Navbar 
        leftContent={
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-zinc-400 hover:text-foreground lg:hidden"
          >
            <Menu size={20} />
          </button>
        }
      />

      <div className="flex flex-1 overflow-hidden relative px-4 pb-4 gap-4 pt-32 lg:pt-36">
        {isExpired && (
          <div className="absolute inset-0 z-[100] backdrop-blur-xl bg-black/80 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
              <ShieldAlert size={48} className="text-red-500" />
            </div>
            <h2 className="text-4xl font-black mb-4 tracking-tighter">Access Expired</h2>
            <p className="text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">
              Your access to this course has expired. Please contact Devneko Support to renew your access and continue your learning journey.
            </p>
            <a href="mailto:support@devneko.com" className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-all">
              Contact Support
            </a>
          </div>
        )}

        <AnimatePresence>
          {sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className={`
          absolute lg:static inset-y-0 left-0 lg:left-4 w-full sm:w-80 md:w-[350px] bg-secondary/95 backdrop-blur-3xl border-r lg:border border-border flex flex-col shrink-0 z-[60] transition-transform duration-500 ease-in-out lg:rounded-[2rem] rounded-r-2xl overflow-hidden shadow-2xl h-full lg:h-full lg:my-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-black text-white dark:bg-white dark:text-black shadow-2xl hover:scale-110 active:scale-95 rounded-full flex items-center justify-center transition-all z-[70] lg:hidden"
          >
            <X size={24} strokeWidth={3} />
          </button>
          <div className="p-4 border-b border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MonitorPlay size={18} className="text-[#a78bfa] dark:text-[#c4b5fd]" />
                <h2 className="font-bold text-sm tracking-tight">DevNeko Hub</h2>
              </div>
            </div>
            <div className="relative mb-4">
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search modules..."
                className="w-full bg-black/5 dark:bg-black/20 border-none rounded-xl py-2.5 pl-10 pr-4 text-xs focus:ring-1 focus:ring-[#c4b5fd] transition-all"
              />
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
            <div className="space-y-1">
              {courseData.map((module, idx) => {
                const filteredLessons = module.lessons.filter(l => 
                  l.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
                
                if (searchQuery && filteredLessons.length === 0) return null;

                return (
                  <div key={module.id} className="text-sm">
                    <button 
                      onClick={() => toggleModule(module.id)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-foreground transition-colors"
                    >
                      <div className="flex flex-col items-start gap-0.5 truncate">
                        <span className="text-[9px] font-bold text-[#a78bfa] dark:text-[#c4b5fd] uppercase tracking-widest opacity-80">
                          {module.id === 'overview' ? 'Introduction' : `Module ${String(idx).padStart(2, '0')}`}
                        </span>
                        <div className="flex items-center gap-2 truncate w-full">
                           {openModules[module.id] ? <ChevronDown size={14} className="shrink-0 text-foreground" /> : <ChevronRight size={14} className="shrink-0 text-foreground" />}
                          <span className="truncate font-bold text-foreground">{module.title}</span>
                        </div>
                      </div>
                    </button>
                    {openModules[module.id] && (
                      <div className="pl-8 pr-2 py-1 space-y-1 border-l border-white/5 ml-4">
                        {filteredLessons.map(lesson => {
                          const isActive = activeLesson.id === lesson.id;
                          const isProject = lesson.type === 'project';
                          return (
                            <button 
                              key={lesson.id}
                              onClick={() => handleLessonClick(lesson)}
                              className={`w-full flex justify-between items-center px-4 py-3 rounded-2xl text-xs transition-all group active:scale-95 ${
                                isActive 
                                  ? isProject ? 'text-black bg-[#86efac] font-bold shadow-md scale-[1.02]' : 'text-black bg-[#a78bfa] dark:bg-[#c4b5fd] font-bold shadow-md scale-[1.02]' 
                                  : isProject ? 'text-foreground/80 hover:bg-[#86efac]/20' : 'text-foreground/80 hover:bg-[#a78bfa]/20 dark:hover:bg-[#c4b5fd]/20'
                              } shadow-sm border border-border/50`}
                            >
                              <div className="flex items-center gap-3 truncate pr-2">
                                {completedLessonIds.includes(lesson.id) ? (
                                  <CheckCircle2 size={16} className={isActive ? 'text-black/60' : isProject ? 'text-[#86efac]' : 'text-[#a78bfa] dark:text-[#c4b5fd]'} />
                                ) : (
                                  isProject ? <Archive size={16} className={isActive ? 'text-black/40' : 'text-[#86efac] group-hover:scale-110 transition-transform'} /> : <Circle size={16} className={isActive ? 'text-black/40' : 'text-[#a78bfa] dark:text-[#c4b5fd] group-hover:scale-110 transition-transform'} />
                                )}
                                <span className={`truncate text-left text-sm ${isProject && !isActive ? 'font-bold' : ''}`}>
                                  {lesson.id === 'course-intro' ? 'Introduction' : isProject ? 'Project Build' : 'Lecture'}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-secondary/30 backdrop-blur-xl border border-border rounded-[2.5rem] relative custom-scrollbar scroll-smooth shadow-inner h-full mb-4 lg:mb-0">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <LogoLoader size="lg" />
            </div>
          ) : (
            <div className="p-4 md:p-8 max-w-5xl mx-auto pb-32">
               <div className="mb-8 space-y-2 mt-4 lg:mt-10">
                   <div className="flex flex-col items-start gap-4">
                     <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${activeLesson.type === 'project' ? 'bg-[#86efac] text-black shadow-lg' : 'bg-[#a78bfa] dark:bg-[#c4b5fd] text-black shadow-lg'}`}>
                        {activeLesson.type === 'project' ? 'Project Build' : 'Theory Lesson'}
                     </span>
                     <h1 className="text-3xl md:text-6xl font-black tracking-tighter leading-tight text-foreground">
                        {activeLesson.title}
                     </h1>
                  </div>
               </div>

               <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeLesson.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8"
                  >
                    {activeLesson.id === 'course-intro' ? (
                      <div className="space-y-12 pb-20">
                        {/* Course Hero Banner */}
                        <div className="relative aspect-square md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-2xl border border-black/5 dark:border-white/5 bg-secondary/5 dark:bg-secondary/10">
                           <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-500/20 mix-blend-overlay z-10" />
                           <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-8 z-20">
                             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }}>
                                <span className="px-4 py-1.5 bg-black/10 dark:bg-white/20 backdrop-blur-md rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-4 md:mb-8 inline-block text-foreground">Welcome to the Future</span>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 md:mb-10 leading-[0.9] text-foreground">The Robotics <br/><span className="text-[#8b5cf6] dark:text-[#c4b5fd]">Masterclass</span></h2>
                                <p className="text-muted-foreground text-xs md:text-lg font-bold uppercase tracking-widest max-w-2xl mx-auto opacity-80">A 15-module journey from circuit basics to advanced autonomous rovers.</p>
                             </motion.div>
                           </div>
                           <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
                           <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
                        </div>

                        {/* Why This Course? */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                           {[
                             { title: 'Project-Based', desc: 'Build 15+ real-world robots from scratch, including race rovers and sonar explorers.', icon: <Rocket size={32} className="text-[#86efac]" />, color: 'bg-[#86efac]/10' },
                             { title: 'Hardware Kit', desc: 'Fully compatible with our signature Robotics Kit. No extra parts needed.', icon: <Zap size={32} className="text-[#fbcfe8]" />, color: 'bg-[#fbcfe8]/10' },
                             { title: 'Career Paths', desc: 'Learn foundation of mechatronics, electronics, and logic used by actual engineers.', icon: <Hexagon size={32} className="text-[#c4b5fd]" />, color: 'bg-[#c4b5fd]/10' }
                           ].map((item, i) => (
                             <motion.div 
                               key={item.title}
                               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                               className={`p-10 rounded-[2.5rem] border border-white/5 bg-secondary/20 backdrop-blur-xl group hover:border-white/20 transition-all cursor-default shadow-lg`}
                             >
                               <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                 {item.icon}
                               </div>
                               <h4 className="text-2xl font-black mb-3 tracking-tight">{item.title}</h4>
                               <p className="text-muted-foreground text-xs font-bold leading-relaxed opacity-70">{item.desc}</p>
                             </motion.div>
                           ))}
                        </div>

                        {/* Course Roadmap Preview */}
                        <div className="bg-[#fef08a] p-12 md:p-16 rounded-[4rem] text-yellow-950 relative overflow-hidden group shadow-2xl">
                           <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/40 rounded-full mix-blend-overlay group-hover:scale-150 transition-transform duration-1000 ease-out" />
                           <div className="relative z-10 max-w-3xl">
                             <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">What's Inside?</h3>
                             <div className="space-y-4">
                                {[
                                  'Module 01-05: Foundational Circuits & Logic',
                                  'Module 06-10: Advanced Sensor Integration',
                                  'Module 11-15: Autonomous Navigation & Precision Control'
                                ].map((step, i) => (
                                  <div key={i} className="flex items-center gap-6 group/item">
                                    <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-black text-xs shadow-xl">{i+1}</div>
                                    <span className="text-lg md:text-xl font-bold tracking-tight opacity-80 group-hover/item:opacity-100 transition-opacity">{step}</span>
                                  </div>
                                ))}
                             </div>
                             <button 
                               onClick={() => handleNextTopic()}
                               className="mt-12 px-10 py-5 bg-black text-white rounded-full font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                             >
                               Start Your Journey <ChevronRight size={24} />
                             </button>
                           </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {/* Simplified Video Section */}
                        <div className="aspect-video bg-[#2dd4bf] p-1 md:p-2 rounded-[2rem] md:rounded-[2.5rem] relative group shadow-2xl">
                           <div className="w-full h-full bg-zinc-900 rounded-[1.75rem] md:rounded-[2rem] relative overflow-hidden flex items-center justify-center border border-white/10">
                              <div className="w-20 h-20 md:w-32 md:h-32 bg-[#fbcfe8] text-pink-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl cursor-pointer">
                                 <PlayCircle className="w-10 h-10 md:w-16 md:h-16 opacity-80" strokeWidth={1.5} />
                              </div>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                           <div className="md:col-span-2 space-y-6">
                               <div className="p-8 md:p-10 bg-[#fef08a] text-yellow-950 rounded-[3rem] space-y-4 shadow-sm">
                                 <h2 className="text-3xl font-black tracking-tight">Session Summary</h2>
                                 <p className="text-yellow-900/80 leading-relaxed font-bold">
                                    {activeLesson.type === 'project' 
                                      ? 'Follow this hands-on guide to assemble your hardware kit. Pause the video at each step to match your build.' 
                                      : 'In this session, we dive deep into the fundamental principles. Watch carefully and take notes for your build guide.'}
                                 </p>
                              </div>

                              {activeLesson.type === 'project' && (
                                 <div className="p-8 bg-[#fbcfe8] text-black rounded-[3rem] space-y-6 shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/40 rounded-full mix-blend-overlay group-hover:scale-150 transition-transform duration-700" />
                                     <div className="flex items-center justify-between relative z-10">
                                       <h2 className="text-2xl font-extrabold tracking-tight">Engineering Schematic</h2>
                                       <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center"><Archive size={20} /></div>
                                     </div>
                                    <div className="aspect-video bg-black/5 rounded-[2rem] border border-black/10 flex items-center justify-center relative z-10">
                                       <p className="text-black/50 text-[10px] font-black uppercase tracking-widest">Interactive Circuit Loading...</p>
                                    </div>
                                 </div>
                              )}
                           </div>

                           <div className="space-y-6">
                               <div className="p-8 md:p-10 bg-[#d9f99d] text-green-950 rounded-[3rem] text-center shadow-sm">
                                 <div className={`w-20 h-20 rounded-[1.5rem] mx-auto mb-6 flex items-center justify-center shadow-md bg-white text-black`}>
                                    {activeLesson.type === 'project' ? <Archive size={36} /> : <MonitorPlay size={36} />}
                                 </div>
                                 <h3 className="font-black text-2xl mb-2">Completion Reward</h3>
                                 <p className="text-green-900/60 font-bold text-xs mb-6">Complete this session to earn points and level up your rank.</p>
                                 <button 
                                   onClick={() => markLessonComplete(activeLesson)}
                                   className={`w-full py-4 rounded-xl font-black text-xs transition-all ${activeLesson.type === 'project' ? 'bg-cyan-400 text-black shadow-cyan-400/20' : 'bg-pink-400 text-black shadow-pink-400/20'} hover:scale-105 active:scale-95`}
                                 >
                                   MARK AS COMPLETE (+{activeLesson.type === 'project' ? '1000' : '500'} XP)
                                 </button>
                              </div>
                           </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
               </AnimatePresence>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
