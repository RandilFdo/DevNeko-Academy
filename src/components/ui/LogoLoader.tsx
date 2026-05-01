'use client';

import { motion } from 'framer-motion';

interface LogoLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function LogoLoader({ size = 'md', className = '' }: LogoLoaderProps) {
  const sizeMap = {
    sm: { box: 'w-6 h-6', gap: 'gap-[0.5px]', rounded: 'rounded-[2px]' },
    md: { box: 'w-12 h-12', gap: 'gap-[1px]', rounded: 'rounded-[4px]' },
    lg: { box: 'w-24 h-24', gap: 'gap-[1.5px]', rounded: 'rounded-[8px]' },
    xl: { box: 'w-32 h-32', gap: 'gap-[2px]', rounded: 'rounded-[12px]' },
  };

  const config = sizeMap[size];

  const squares = [
    { color: 'bg-[#c4b5fd]', delay: 0 },
    { color: 'bg-[#86efac]', delay: 0.1 },
    { color: 'bg-[#fbcfe8]', delay: 0.2 },
    { color: 'bg-[#fef08a]', delay: 0.3 }
  ];

  return (
    <motion.div
      animate={{ 
        rotate: [0, 90, 90, 180, 180, 270, 270, 360],
      }}
      transition={{ 
        duration: 2.5, 
        times: [0, 0.2, 0.3, 0.5, 0.6, 0.8, 0.9, 1],
        ease: "easeInOut",
        repeat: Infinity
      }}
      className={`grid grid-cols-2 ${config.gap} ${config.box} ${className}`}
    >
      {squares.map((sq, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: sq.delay, duration: 0.4 }}
          className={`${sq.color} w-full h-full ${config.rounded}`}
        />
      ))}
    </motion.div>
  );
}
