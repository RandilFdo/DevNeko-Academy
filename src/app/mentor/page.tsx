'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  Users, CheckCircle2, Search, ArrowLeft, 
  ShieldCheck, ShieldAlert, Cat, Mail, Hash, Trash2,
  CalendarDays, Link2, Save, Plus, X, User, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import LogoLoader from '@/components/ui/LogoLoader';
import Image from 'next/image';

interface StudentProfile {
  id: string;
  display_name: string;
  avatar_url: string;
  student_id: string;
  email: string;
  xp_points: number;
  rank_tier: string;
  completed_count: number;
}

export default function MentorDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const supabase = createClient();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    
    // Artificial delay for premium feel
    setTimeout(() => {
      if (password === 'bug69W8LOL') {
        setIsAuthorized(true);
        fetchStudents();
      } else {
        setError('Verification Failed: Invalid Command Code');
        setVerifying(false);
      }
    }, 1200);
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const { data: profiles, error: pError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (pError) throw pError;

      let progressCounts: Record<string, number> = {};
      try {
        const { data: progress } = await supabase
          .from('progress')
          .select('user_id');
        if (progress) {
          progress.forEach(p => {
            progressCounts[p.user_id] = (progressCounts[p.user_id] || 0) + 1;
          });
        }
      } catch (e) {
        console.warn('Progress fetch issue');
      }

      const studentData = (profiles || []).map(profile => ({
        ...profile,
        completed_count: progressCounts[profile.id] || 0
      }));

      setStudents(studentData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePurgeMessages = async () => {
    if (!confirm('CRITICAL: This will permanently delete all global chat history. Continue?')) return;
    try {
      const { error } = await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (error) throw error;
      alert('Global communications database purged.');
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#c4b5fd]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#86efac]/10 rounded-full blur-[120px]" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-secondary/20 backdrop-blur-3xl border border-border rounded-[3rem] p-10 shadow-2xl relative z-10"
        >
          <div className="flex flex-col items-center mb-10">
            {verifying ? (
              <div className="h-20 flex items-center justify-center">
                <LogoLoader size="md" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-background border border-border rounded-[1.5rem] flex items-center justify-center text-[#c4b5fd] shadow-inner mb-6">
                <ShieldCheck size={40} strokeWidth={1.5} />
              </div>
            )}
            <h1 className="text-3xl font-black tracking-tighter text-center">Mentor <span className="text-[#c4b5fd]">Verification</span></h1>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-2">Restricted Access Zone</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-2">Access Token</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••••••"
                className="w-full bg-background/50 border-2 border-border rounded-2xl px-6 py-4 text-center text-xl tracking-[0.5em] focus:outline-none focus:border-[#c4b5fd] transition-all font-mono"
              />
            </div>
            
            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-[10px] font-black uppercase text-center tracking-widest"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button 
              disabled={verifying}
              className="w-full bg-foreground text-background font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50 uppercase tracking-widest text-sm"
            >
              Initialize Command
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const filteredStudents = students.filter(s => 
    s.display_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.student_id?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-500 relative overflow-hidden">
      <Navbar />

      {/* Floating Background Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <div className="absolute top-40 left-[10%] w-96 h-96 bg-[#c4b5fd]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 right-[10%] w-96 h-96 bg-[#86efac]/20 rounded-full blur-[100px]" />
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 pt-40 pb-20 z-10">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="p-3 bg-[#c4b5fd]/10 text-[#c4b5fd] rounded-2xl border border-[#c4b5fd]/20">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h1 className="text-3xl md:text-6xl font-black tracking-tighter leading-none">COMMAND <span className="text-[#c4b5fd]">CENTER</span></h1>
                <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mt-2">Mentor Operating System v4.0</p>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto">
            <button 
              onClick={handlePurgeMessages} 
              className="w-full sm:w-auto px-8 py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm"
            >
              Purge Database
            </button>
            <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-[#c4b5fd] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="SEARCH INTEL..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-secondary/30 backdrop-blur-xl border-2 border-border rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-[#c4b5fd] transition-all font-black text-xs uppercase tracking-widest placeholder:text-muted-foreground/50"
              />
            </div>
          </div>
        </header>

        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 bg-[#86efac] rounded-full animate-pulse shadow-[0_0_10px_#86efac]" />
             <h2 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground">
               Live Student Feed ({students.length})
             </h2>
          </div>
          <button 
            onClick={fetchStudents}
            disabled={loading}
            className="p-2 hover:bg-secondary rounded-xl transition-colors text-muted-foreground"
          >
             <Save size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredStudents.map((student, index) => (
              <motion.div
                key={student.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05, type: 'spring', bounce: 0.3 }}
                className="group bg-secondary/20 backdrop-blur-xl border border-border rounded-[3rem] p-8 hover:border-[#c4b5fd]/50 transition-all shadow-xl hover:shadow-[#c4b5fd]/5 relative overflow-hidden"
              >
                {/* ID Badge on hover */}
                <div className="absolute top-6 right-8 bg-background border border-border px-4 py-1.5 rounded-full text-[10px] font-black text-[#c4b5fd] uppercase tracking-widest shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {student.student_id}
                </div>

                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-background border-2 border-border p-1 group-hover:border-[#c4b5fd]/30 transition-colors shadow-inner overflow-hidden">
                    {student.avatar_url ? (
                      <Image src={student.avatar_url} alt={student.display_name} width={64} height={64} className="w-full h-full object-cover rounded-[1rem]" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
                        <User size={32} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight group-hover:text-[#c4b5fd] transition-colors">{student.display_name || 'Anonymous Student'}</h3>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{student.rank_tier || 'Spark'}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail size={14} className="shrink-0" />
                    <p className="text-xs font-bold truncate">{student.email}</p>
                  </div>
                  <div className="flex items-center justify-between bg-background/50 rounded-2xl p-4 border border-border/50">
                    <div className="flex items-center gap-2">
                       <Zap size={14} className="text-[#fef08a]" />
                       <span className="text-xs font-black uppercase tracking-widest">XP Balance</span>
                    </div>
                    <span className="text-lg font-black tracking-tighter">{student.xp_points?.toLocaleString() || 0}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-end px-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Mission Progress</p>
                    <p className="text-xs font-black text-[#86efac]">{Math.round((student.completed_count / 20) * 100)}%</p>
                  </div>
                  <div className="h-3 w-full bg-background rounded-full overflow-hidden border border-border shadow-inner p-[2px]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (student.completed_count / 20) * 100)}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#c4b5fd] to-[#86efac] rounded-full shadow-[0_0_10px_rgba(134,239,172,0.3)]" 
                    />
                  </div>
                  <p className="text-[9px] font-black text-muted-foreground/60 uppercase text-right tracking-widest">
                    {student.completed_count} / 20 Missions
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredStudents.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mb-6 border border-border">
              <Search size={40} className="text-muted-foreground opacity-20" />
            </div>
            <h3 className="text-2xl font-black opacity-50 uppercase tracking-tighter">No Intel Found</h3>
            <p className="text-muted-foreground text-sm font-bold mt-2">Try searching with a different student ID or name.</p>
          </div>
        )}
      </div>
    </main>
  );
}
