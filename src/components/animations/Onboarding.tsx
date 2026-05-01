'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../providers/ThemeProvider';

export default function Onboarding() {
  const [stage, setStage] = useState<'initial' | 'stretch' | 'navbar' | 'done'>('initial');
  const [isVisible, setIsVisible] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    // Stage 1: Comically stretch horizontally
    const stretchTimer = setTimeout(() => {
      setStage('stretch');
    }, 400);

    // Stage 2: Move up and become the navbar
    const navbarTimer = setTimeout(() => {
      setStage('navbar');
    }, 1000);

    // Stage 3: Fade out overlay completely
    const doneTimer = setTimeout(() => {
      setStage('done');
    }, 1800);

    const unmountTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);

    return () => {
      clearTimeout(stretchTimer);
      clearTimeout(navbarTimer);
      clearTimeout(doneTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="onboarding-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col pointer-events-none"
        >
          {/* Morphing Object */}
          <motion.div
            initial={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              position: 'absolute',
              backgroundColor: '#ffffff',
              borderColor: 'transparent',
              borderWidth: 1,
              backdropFilter: 'blur(0px)'
            }}
            animate={
              stage === 'stretch'
                ? { 
                    width: '80vw', 
                    height: 40, 
                    borderRadius: '2rem',
                    top: '50%',
                    left: '50%',
                    x: '-50%',
                    y: '-50%',
                    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.8)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(24px)'
                  }
                : stage === 'navbar' || stage === 'done'
                ? { 
                    width: '92%', 
                    maxWidth: '1280px',
                    height: 72, 
                    borderRadius: '2.5rem',
                    top: 24, // top-6
                    left: '50%',
                    x: '-50%',
                    y: 0,
                    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(24px)'
                  }
                : {}
            }
            transition={{
              type: "spring",
              stiffness: stage === 'stretch' ? 400 : 200,
              damping: stage === 'stretch' ? 15 : 20,
              mass: 1
            }}
            className="flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.05)] border-solid"
          >
             {/* Inner UI fade in as it becomes navbar */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: stage === 'navbar' ? 1 : 0 }}
               transition={{ delay: 0.2 }}
               className="w-full h-full flex items-center justify-between px-6 md:px-8"
             >
                <div className="flex items-center gap-12">
                   <div className="w-32 h-6 bg-foreground/20 rounded-full" />
                   <div className="hidden md:flex gap-4">
                     <div className="w-16 h-4 bg-foreground/10 rounded-full" />
                     <div className="w-16 h-4 bg-foreground/10 rounded-full" />
                     <div className="w-16 h-4 bg-foreground/10 rounded-full" />
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-foreground/20" />
                   <div className="w-16 h-8 rounded-full bg-foreground/20" />
                </div>
             </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
