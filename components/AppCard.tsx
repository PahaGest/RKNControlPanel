import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppItem, AppStatus, Language } from '../types';
import { translations } from '../utils/translations';
import { Trash2, Lock } from 'lucide-react';

interface AppCardProps {
  app: AppItem;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  lang: Language;
  isLockdown?: boolean;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onToggleStatus, onDelete, lang, isLockdown = false }) => {
  const isBlocked = app.status === AppStatus.BLOCKED;
  const t = translations[lang].card;

  // Determine if interaction is disabled (Can't unblock if locked down)
  const isInteractionDisabled = isBlocked && isLockdown;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        relative group overflow-hidden rounded-xl border-2 transition-all duration-300
        ${isInteractionDisabled 
          ? 'cursor-not-allowed opacity-80' // Locked state style
          : 'cursor-pointer'
        }
        ${isBlocked 
          ? 'border-red-600/60 bg-red-950/20 shadow-glow-red' 
          : 'border-cyan-800/40 bg-slate-900/40 hover:border-cyan-400/60 hover:shadow-glow-blue hover:bg-cyan-950/30'
        }
      `}
    >
      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* Delete Button - Top Right - Hidden during Lockdown */}
      {!isLockdown && (
        <div className="absolute top-2 right-2 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(app.id);
            }}
            className="p-2 rounded-full hover:bg-red-500/20 text-slate-600 hover:text-red-500 transition-colors duration-300 opacity-0 group-hover:opacity-100"
            title={t.delete}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      <div 
        className="relative z-10 p-6 flex flex-col items-center justify-center h-48 md:h-56"
        onClick={() => onToggleStatus(app.id)}
      >
        
        {/* Icon Container */}
        <div className="relative mb-6">
          <motion.img 
            src={app.iconUrl} 
            alt={app.name} 
            className={`w-20 h-20 md:w-24 md:h-24 object-contain transition-all duration-500 ${isBlocked ? 'grayscale opacity-40 blur-[2px]' : 'drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]'}`}
          />
          
          {/* THE BIG RED X - Animated Overlay */}
          <AnimatePresence>
            {isBlocked && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                 <svg viewBox="0 0 24 24" className="w-24 h-24 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                   <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                 </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Lockdown Lock Icon Overlay */}
          {isInteractionDisabled && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Lock className="w-8 h-8 text-white drop-shadow-md" />
            </div>
          )}
        </div>

        {/* Text Details */}
        <div className="text-center space-y-1">
          <h3 className={`font-bold text-lg tracking-wider uppercase transition-colors duration-300 ${isBlocked ? 'text-red-500 line-through decoration-red-500 decoration-2' : 'text-cyan-100'}`}>
            {app.name}
          </h3>
          
          <div className="h-6 flex items-center justify-center">
             {isBlocked ? (
               <motion.span 
                 initial={{ opacity: 0, y: 5 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-red-500 font-mono text-xs tracking-[0.2em] font-bold glow-text-red"
               >
                 {t.blocked}
               </motion.span>
             ) : (
               <span className="text-cyan-600/70 font-mono text-[10px] tracking-widest">
                 {t.active} // {app.domain.toUpperCase()}
               </span>
             )}
          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${isBlocked ? 'border-red-500' : 'border-cyan-500'}`}></div>
      <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${isBlocked ? 'border-red-500' : 'border-cyan-500'}`}></div>
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${isBlocked ? 'border-red-500' : 'border-cyan-500'}`}></div>
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${isBlocked ? 'border-red-500' : 'border-cyan-500'}`}></div>

    </motion.div>
  );
};