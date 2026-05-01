'use client';

import { login, signup, signInWithGoogle } from './actions';
import Navbar from '@/components/layout/Navbar';
import { LogIn, UserPlus, ArrowRight } from 'lucide-react';
import { useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const resolvedSearchParams = use(searchParams);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-hidden">
      <Navbar />
      
      <div className="flex-1 flex flex-col md:flex-row pt-28 pb-10 px-6 gap-6 max-w-[1600px] mx-auto w-full">
        
        {/* Left Side: Aesthetic Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, type: 'spring' }}
          className="hidden md:flex flex-1 bg-secondary rounded-[3rem] p-12 flex-col justify-between relative overflow-hidden group"
        >
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 dark:bg-purple-400/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lime-400/20 dark:bg-lime-400/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-pink-400/30 rounded-full mix-blend-multiply blur-2xl group-hover:scale-150 transition-transform duration-1000" />
          
          <div className="relative z-10">
            <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-6">
              Start your <br/>
              <span className="font-playfair italic font-normal text-primary">Creative</span> <br/>
              Journey
            </h1>
            <p className="text-muted-foreground text-lg max-w-md font-medium">
              Join thousands of kids learning to build robots, code magical scripts, and design stunning digital art.
            </p>
          </div>

          <div className="relative z-10">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">New Enrollment Opening Soon</p>
          </div>
        </motion.div>

        {/* Right Side: Form Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, type: 'spring', delay: 0.2 }}
          className="flex-1 flex items-center justify-center p-4 lg:p-12 relative"
        >
          <div className="w-full max-w-md relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                  {isLogin ? 'Welcome Back!' : 'Join the Intake waitlist'}
                </h2>
                <p className="text-muted-foreground font-medium mb-10">
                  {isLogin ? 'Enter your details to access your dashboard.' : 'Register now to secure your spot in our next robotics intake.'}
                </p>

                {resolvedSearchParams?.error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-sm font-bold mb-8 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> {resolvedSearchParams.error}
                  </div>
                )}

                <form className="space-y-6">
                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Display Name</label>
                      <input 
                        id="display_name" name="display_name" 
                        placeholder="How should we call you?"
                        className="w-full bg-secondary border border-border rounded-[2rem] px-6 py-4 text-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all font-medium placeholder:text-muted-foreground/50"
                        required={!isLogin}
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Email Address</label>
                    <input 
                      id="email" name="email" type="email" required 
                      placeholder="you@example.com"
                      className="w-full bg-secondary border border-border rounded-[2rem] px-6 py-4 text-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all font-medium placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Password</label>
                    <input 
                      id="password" name="password" type="password" required 
                      placeholder="••••••••"
                      className="w-full bg-secondary border border-border rounded-[2rem] px-6 py-4 text-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all font-medium placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <div className="pt-6 space-y-4">
                    <button 
                      formAction={isLogin ? login : signup} 
                      className="w-full py-4 bg-primary text-black font-black rounded-[2rem] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 text-lg"
                    >
                      {isLogin ? (
                        <><LogIn size={20} /> Log In Securely</>
                      ) : (
                        <><UserPlus size={20} /> Create My Account</>
                      )}
                    </button>
                    
                    <div className="flex items-center gap-4 py-2">
                      <div className="flex-1 h-px bg-border"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">OR</span>
                      <div className="flex-1 h-px bg-border"></div>
                    </div>

                    <button 
                      type="button"
                      onClick={() => signInWithGoogle()} 
                      className="w-full py-4 bg-secondary text-foreground font-bold rounded-[2rem] hover:bg-secondary/80 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 border border-border text-lg"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        <path d="M1 1h22v22H1z" fill="none"/>
                      </svg>
                      Continue with Google
                    </button>
                  </div>
                </form>

                <div className="mt-8 text-center">
                  <button 
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 group"
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
