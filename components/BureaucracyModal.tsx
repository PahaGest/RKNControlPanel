import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { Loader2, AlertTriangle, FileCheck, Server, Lock } from 'lucide-react';

interface BureaucracyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  lang: Language;
}

type Step = 'INITIALIZING' | 'CHECKBOXES' | 'QUEUE' | 'CONFIRMATION';

export const BureaucracyModal: React.FC<BureaucracyModalProps> = ({ isOpen, onClose, onConfirm, lang }) => {
  const [step, setStep] = useState<Step>('INITIALIZING');
  const [progress, setProgress] = useState(0);
  const [checks, setChecks] = useState({ check1: false, check2: false, check3: false });
  const [countdown, setCountdown] = useState(5);
  const t = translations[lang].modal;

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStep('INITIALIZING');
      setProgress(0);
      setChecks({ check1: false, check2: false, check3: false });
      setCountdown(5);
    }
  }, [isOpen]);

  // Step 1: Fake Loading Bar (Tedious)
  useEffect(() => {
    if (isOpen && step === 'INITIALIZING') {
      let currentProgress = 0;
      const interval = setInterval(() => {
        // Logarithmic slowdown to be annoying
        const increment = Math.max(0.5, (100 - currentProgress) / 40);
        currentProgress += increment;
        
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setTimeout(() => setStep('CHECKBOXES'), 500);
        }
        setProgress(currentProgress);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isOpen, step]);

  // Step 3: Fake Queue (Tedious)
  useEffect(() => {
    if (step === 'QUEUE') {
      const duration = 4000; // 4 seconds of waiting
      const timeout = setTimeout(() => {
        setStep('CONFIRMATION');
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  // Step 4: Countdown (Tedious)
  useEffect(() => {
    if (step === 'CONFIRMATION' && countdown > 0) {
      const timer = setInterval(() => setCountdown(c => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, countdown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-slate-900 border border-red-900/50 w-full max-w-lg p-6 rounded-xl shadow-2xl relative overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-red-900/30 pb-4 mb-6">
          <AlertTriangle className="text-red-500 w-6 h-6 animate-pulse" />
          <h2 className="text-red-500 font-mono tracking-widest text-lg font-bold uppercase">{t.title}</h2>
        </div>

        {/* Content based on Step */}
        <div className="min-h-[250px] flex flex-col justify-between">
          
          {/* STEP 1: LOADING */}
          {step === 'INITIALIZING' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-cyan-400 font-mono text-sm tracking-widest">{t.step1_title}</h3>
                <p className="text-slate-400 text-xs font-mono">{t.step1_desc}</p>
              </div>
              
              <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden border border-slate-700">
                <motion.div 
                  className="h-full bg-gradient-to-r from-red-900 to-red-600 stripe-pattern"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-right text-red-500 font-mono text-xs">{Math.floor(progress)}%</p>
            </div>
          )}

          {/* STEP 2: CHECKBOXES */}
          {step === 'CHECKBOXES' && (
            <div className="space-y-4">
              <div className="space-y-1 mb-4">
                <h3 className="text-cyan-400 font-mono text-sm tracking-widest flex items-center gap-2">
                  <FileCheck className="w-4 h-4" /> {t.step2_title}
                </h3>
                <p className="text-slate-400 text-xs font-mono">{t.step2_desc}</p>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'check1', label: t.check1 },
                  { key: 'check2', label: t.check2 },
                  { key: 'check3', label: t.check3 },
                ].map((item) => (
                  <label key={item.key} className="flex items-start gap-3 p-3 border border-slate-800 rounded hover:bg-slate-800/50 cursor-pointer transition-colors">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 rounded bg-slate-900 border-slate-600 text-red-600 focus:ring-red-900"
                      checked={checks[item.key as keyof typeof checks]}
                      onChange={() => setChecks(p => ({ ...p, [item.key]: !p[item.key as keyof typeof checks] }))}
                    />
                    <span className="text-xs text-slate-300 font-mono leading-relaxed select-none">{item.label}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button onClick={onClose} className="px-4 py-2 rounded border border-slate-700 text-slate-400 hover:text-white font-mono text-xs">
                  {t.cancel}
                </button>
                <button 
                  onClick={() => setStep('QUEUE')}
                  disabled={!Object.values(checks).every(Boolean)}
                  className="px-4 py-2 rounded bg-red-900/30 border border-red-800/50 text-red-400 hover:bg-red-900/50 hover:text-red-200 disabled:opacity-30 disabled:cursor-not-allowed font-mono text-xs transition-all"
                >
                  {t.next}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: QUEUE */}
          {step === 'QUEUE' && (
            <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
              <Server className="w-12 h-12 text-cyan-700 animate-pulse" />
              <div className="space-y-2">
                <h3 className="text-cyan-400 font-mono text-sm tracking-widest animate-pulse">{t.step3_title}</h3>
                <p className="text-slate-500 text-xs font-mono max-w-xs mx-auto">{t.step3_desc}</p>
              </div>
              <div className="font-mono text-4xl text-slate-700 font-bold">
                 #{Math.floor(Math.random() * 800) + 100}
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMATION */}
          {step === 'CONFIRMATION' && (
             <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
               <Lock className="w-12 h-12 text-red-600" />
               <div className="space-y-2">
                 <h3 className="text-red-500 font-mono text-lg tracking-widest">{t.step4_title}</h3>
                 <p className="text-slate-400 text-xs font-mono">{t.step4_desc}</p>
               </div>

               <button
                 onClick={onConfirm}
                 disabled={countdown > 0}
                 className="w-full py-4 mt-4 bg-red-600 hover:bg-red-500 text-black font-bold font-mono tracking-widest text-xl rounded shadow-[0_0_20px_rgba(220,38,38,0.5)] disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none transition-all"
               >
                 {countdown > 0 ? `${t.wait} (${countdown}s)` : t.confirm}
               </button>
               
               <button onClick={onClose} className="text-xs text-slate-600 hover:text-slate-400 font-mono underline">
                 {t.cancel}
               </button>
             </div>
          )}
        </div>

        {/* Decorative Grid BG */}
        <div className="absolute inset-0 opacity-5 pointer-events-none z-[-1]" 
             style={{ backgroundImage: 'linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
        </div>
      </motion.div>
    </div>
  );
};