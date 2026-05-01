'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import { Clock, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function PaymentPendingPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const supabase = createClient();

  const handleCheckAccess = async () => {
    setChecking(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('has_course_access')
        .eq('id', user.id)
        .single();

      if (profile?.has_course_access) {
        router.push('/dashboard');
      } else {
        // Still pending
        setChecking(false);
      }
    } catch {
      setChecking(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-hidden">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="max-w-lg w-full text-center"
        >
          {/* Animated Clock Icon */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 bg-[#fde047]/20 rounded-[2rem] flex items-center justify-center mx-auto mb-10"
          >
            <Clock size={48} className="text-[#fde047]" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            Access <span className="text-[#c4b5fd]">Pending</span>
          </h1>

          <p className="text-muted-foreground text-lg font-medium mb-12 max-w-md mx-auto leading-relaxed">
            Your account has been created successfully! Once your payment is verified, 
            you&apos;ll get instant access to the full DevNeko Academy experience.
          </p>

          {/* Steps */}
          <div className="text-left space-y-4 mb-12 max-w-sm mx-auto">
            {[
              { text: 'Create your account', done: true },
              { text: 'Complete bank transfer', done: false },
              { text: 'Admin verifies payment', done: false },
              { text: 'Access granted!', done: false },
            ].map((step, i) => (
              <motion.div
                key={step.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4"
              >
                {step.done ? (
                  <CheckCircle size={20} className="text-green-500 shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                )}
                <span className={`text-sm font-bold ${step.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCheckAccess}
              disabled={checking}
              className="px-8 py-4 bg-foreground text-background rounded-[2rem] font-black text-sm 
                         hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3
                         disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
            >
              <RefreshCw size={18} className={checking ? 'animate-spin' : ''} />
              {checking ? 'Checking...' : 'Check Access Status'}
            </button>

            <Link
              href="/"
              className="px-8 py-4 bg-secondary text-foreground rounded-[2rem] font-black text-sm 
                         hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              Back to Home <ArrowRight size={18} />
            </Link>
          </div>

          <p className="text-muted-foreground text-xs mt-10 opacity-60">
            Need help? Contact us at <span className="font-bold text-[#c4b5fd]">support@devneko.lk</span>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
