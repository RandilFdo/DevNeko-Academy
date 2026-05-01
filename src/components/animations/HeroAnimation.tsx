'use client';

import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroAnimation() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth out the mouse movement
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const maskImage = useMotionTemplate`radial-gradient(circle 400px at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base Grid (Extremely Subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #FFCC00 1px, transparent 1px), linear-gradient(to bottom, #FFCC00 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} 
      />

      {/* Interactive Highlighted Grid */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #FFCC00 1px, transparent 1px), linear-gradient(to bottom, #FFCC00 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
      />
      
      {/* Slow-moving ambient scan beam */}
      <motion.div 
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFCC00]/5 to-transparent"
      />
      
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#FFCC0003_0%,transparent_80%)]" />
    </div>
  );
}
