'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import HeroAnimation from '@/components/animations/HeroAnimation';
import { ShieldCheck, CreditCard, Zap } from 'lucide-react';

export default function SubscribePage() {
  const handlePayment = async () => {
    // This will call our PayHere checkout API
    window.location.href = '/api/payments/checkout';
  };

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden transition-colors duration-500">
      <HeroAnimation />
      <Navbar />

      <section className="pt-40 pb-20 px-6 flex flex-col items-center justify-center min-h-screen relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-xl w-full p-8 md:p-14 rounded-[4rem] bg-secondary/40 backdrop-blur-3xl border-2 border-border shadow-sm text-center relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#fef08a]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="w-24 h-24 bg-[#fef08a] rounded-[2rem] flex items-center justify-center text-yellow-900 mx-auto mb-10 shadow-lg transform -rotate-6">
            <ShieldCheck size={48} strokeWidth={2.5} />
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">Access <span className="text-[#c4b5fd]">Restricted</span></h1>
          <p className="text-muted-foreground mb-12 font-bold text-sm md:text-base leading-relaxed px-4">
            To access the DEVNEKO ACADEMY courses and mentorship, a monthly subscription to the **Explorer Lab** is required.
          </p>

          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 mb-12 text-left border-2 border-border shadow-inner relative overflow-hidden">
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-border">
              <span className="text-muted-foreground font-black uppercase text-[10px] tracking-widest">Subscription Plan</span>
              <span className="px-4 py-1.5 bg-[#fef08a] text-yellow-900 font-black rounded-full text-[10px] uppercase tracking-widest shadow-sm">Explorer Lab</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-black uppercase text-[10px] tracking-widest">Monthly Investment</span>
              <span className="text-3xl font-black tracking-tighter">1,000 <span className="text-xs font-bold text-muted-foreground ml-1 uppercase">LKR</span></span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full py-6 bg-[#86efac] text-black font-black rounded-[2rem] flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-xl text-xl"
          >
            <Zap size={24} fill="black" />
            Unlock Academy Now
          </button>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-[10px] uppercase tracking-widest font-black">
            <span className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-lg"><CreditCard size={14} /> Secure Checkout</span>
            <span className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-lg"><Zap size={14} /> Instant Access</span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
