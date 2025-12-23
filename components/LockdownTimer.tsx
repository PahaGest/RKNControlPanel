import React from 'react';
import { ShieldBan, AlertOctagon } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { motion } from 'framer-motion';

interface LockdownTimerProps {
  endTime: number;
  lang: Language;
}

export const LockdownTimer: React.FC<LockdownTimerProps> = ({ endTime, lang }) => {
  const [timeLeft, setTimeLeft] = React.useState<string>('15:00');
  const t = translations[lang].lockdown;

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        window.location.reload(); // Hard refresh to clear state visually
        return;
      }

      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="w-full bg-red-950/80 border-b-2 border-red-600 sticky top-[73px] z-40 backdrop-blur overflow-hidden"
    >
      <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-900/50 rounded-full animate-pulse-fast">
            <ShieldBan className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <h3 className="text-red-500 font-bold font-mono text-lg tracking-widest uppercase">
              {t.banner_title}
            </h3>
            <p className="text-red-400/70 text-xs font-mono max-w-md">
              {t.banner_desc}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <span className="text-red-500/80 text-[10px] font-mono tracking-widest uppercase mb-1">
            {t.timer}
          </span>
          <div className="text-3xl font-mono font-bold text-red-500 tracking-wider bg-black/40 px-4 py-1 rounded border border-red-900/50">
            {timeLeft}
          </div>
        </div>
      </div>
      
      {/* Striped Background */}
      <div className="absolute inset-0 z-[-1] opacity-10" 
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 10px, #ef4444 10px, #ef4444 20px)' }}>
      </div>
    </motion.div>
  );
};