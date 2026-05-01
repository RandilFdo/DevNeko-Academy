'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '../providers/LanguageProvider';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState, useRef } from 'react';
import { User } from '@supabase/supabase-js';
import { logout } from '@/app/login/actions';
import { LogOut, User as UserIcon, LayoutDashboard, ChevronDown, Zap, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTheme } from '../providers/ThemeProvider';

interface NavbarProps {
  leftContent?: React.ReactNode;
}

export default function Navbar({ leftContent }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    
    const fetchProfile = async (user: User) => {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) {
        setProfile(data);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) fetchProfile(currentUser);
    });

    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser);
      } else {
        setProfile(null);
      }
    });

    // Real-time profile updates
    const profileChannel = supabase
      .channel('navbar-profile-sync')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profiles' },
        (payload) => {
          // Compare with local user state to avoid unnecessary updates
          if (payload.new.id === user?.id) {
            setProfile(payload.new);
          }
        }
      )
      .subscribe();

    // Handle click away for dropdown
    const handleClickAway = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickAway);
    }

    return () => {
      authSubscription.unsubscribe();
      supabase.removeChannel(profileChannel);
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, [user?.id, dropdownOpen]);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 w-[92%] max-w-7xl z-50 flex items-center justify-between px-4 md:px-8 py-3 md:py-4 backdrop-blur-3xl border border-white/50 dark:border-white/10 bg-gradient-to-r from-pink-400/20 via-cyan-400/20 to-purple-400/20 rounded-[2.5rem] [background-clip:padding-box]"
    >
      <div className="flex items-center gap-2 md:gap-12">
        {leftContent}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="grid grid-cols-2 gap-[1px] w-7 h-7 group-hover:rotate-90 transition-transform duration-500">
            <div className="bg-[#c4b5fd] rounded-[3px]" />
            <div className="bg-[#86efac] rounded-[3px]" />
            <div className="bg-[#fbcfe8] rounded-[3px]" />
            <div className="bg-[#fef08a] rounded-[3px]" />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tighter uppercase whitespace-nowrap">
            <span className="text-foreground">DEVNEKO</span> <span className="text-[#c4b5fd] hidden sm:inline">ACADEMY</span>
          </span>
        </Link>
      </div>
      
      <div className="flex items-center gap-6">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full bg-black/10 dark:bg-white/10 text-foreground hover:scale-110 transition-transform"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {user ? (

          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-1 pr-3 py-1 hover:bg-white/10 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-white/10 overflow-hidden flex items-center justify-center relative">
                {profile?.avatar_url || user?.user_metadata?.avatar_url ? (
                  <Image 
                    src={profile?.avatar_url || user?.user_metadata?.avatar_url} 
                    alt="Profile" 
                    fill
                    className="object-cover" 
                  />
                ) : (
                  <UserIcon size={16} className="text-zinc-500" />
                )}
              </div>
              <ChevronDown size={14} className={`text-zinc-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full right-0 mt-4 w-64 bg-background/95 backdrop-blur-3xl border border-border rounded-3xl shadow-2xl p-2 overflow-hidden z-[60]"
              >
                <div className="px-4 py-3 border-b border-border mb-2">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Account</p>
                  <p className="text-sm font-bold text-foreground truncate">{profile?.display_name || user.email}</p>
                </div>
                
                <div className="px-4 py-3 bg-secondary/50 rounded-2xl mb-2 flex flex-col items-start gap-1">
                  <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest leading-none">Your Student ID</p>
                  <p className="text-sm font-black text-[#c4b5fd] leading-none">{profile?.student_id || 'Generating...'}</p>
                </div>
                
                <div className="mt-2 pt-2 border-t border-border">
                  <button 
                    onClick={() => logout()}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all text-left"
                  >
                    <LogOut size={18} /> Log Out
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium hover:text-foreground text-muted-foreground transition-colors"
            >
              {t('login')}
            </Link>
            <Link 
              href="/login"
              className="hidden md:flex items-center justify-center h-9 px-4 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/80 transition-colors"
            >
              {t('hero.cta')}
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
