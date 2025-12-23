import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AppCard } from './components/AppCard';
import { InputPanel } from './components/InputPanel';
import { BureaucracyModal } from './components/BureaucracyModal';
import { LockdownTimer } from './components/LockdownTimer';
import { getAppDomain } from './services/geminiService';
import { AppItem, AppStatus, Language } from './types';
import { translations } from './utils/translations';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertOctagon } from 'lucide-react';

// Helper to generate UUID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Constants
const LOCKDOWN_KEY = 'rkn_lockdown_end';
const LOCKDOWN_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const FORBIDDEN_WORDS = ['роскомнадзор', 'roskomnadzor', 'rkn', 'ркн'];

const App: React.FC = () => {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<Language>('ru');
  const [appToDelete, setAppToDelete] = useState<string | null>(null);
  
  // Lockdown State
  const [lockdownEndTime, setLockdownEndTime] = useState<number | null>(null);
  const [showLockdownToast, setShowLockdownToast] = useState(false);

  // Initial Seed Data & Lockdown Check
  useEffect(() => {
    // 1. Check for active lockdown in LocalStorage
    const storedLockdown = localStorage.getItem(LOCKDOWN_KEY);
    if (storedLockdown) {
      const endTime = parseInt(storedLockdown, 10);
      if (endTime > Date.now()) {
        setLockdownEndTime(endTime);
      } else {
        localStorage.removeItem(LOCKDOWN_KEY);
      }
    }

    // 2. Load Initial Apps
    const initialApps: AppItem[] = [
      {
        id: '1',
        name: 'Discord',
        domain: 'discord.com',
        iconUrl: 'https://www.google.com/s2/favicons?domain=discord.com&sz=128',
        status: AppStatus.ACTIVE
      },
      {
        id: '2',
        name: 'Instagram',
        domain: 'instagram.com',
        iconUrl: 'https://www.google.com/s2/favicons?domain=instagram.com&sz=128',
        status: AppStatus.ACTIVE
      }
    ];
    setApps(initialApps);
  }, []);

  // Timer Interval to clear lockdown automatically when time is up
  useEffect(() => {
    if (!lockdownEndTime) return;

    const interval = setInterval(() => {
      if (Date.now() >= lockdownEndTime) {
        setLockdownEndTime(null);
        localStorage.removeItem(LOCKDOWN_KEY);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockdownEndTime]);

  const triggerLockdown = () => {
    const endTime = Date.now() + LOCKDOWN_DURATION_MS;
    setLockdownEndTime(endTime);
    localStorage.setItem(LOCKDOWN_KEY, endTime.toString());
    setShowLockdownToast(true);
    
    // Auto-hide the toast after 5 seconds
    setTimeout(() => setShowLockdownToast(false), 5000);
  };

  const handleAddApp = async (appName: string) => {
    // Check for forbidden words
    const lowerName = appName.toLowerCase().trim();
    if (FORBIDDEN_WORDS.some(word => lowerName.includes(word))) {
      triggerLockdown();
      return;
    }

    setLoading(true);
    try {
      const domain = await getAppDomain(appName);
      const iconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;

      const newApp: AppItem = {
        id: generateId(),
        name: appName,
        domain: domain,
        iconUrl: iconUrl,
        status: AppStatus.ACTIVE,
      };

      setApps(prev => [newApp, ...prev]);
    } catch (error) {
      console.error("Failed to add app", error);
      alert("System Error: Could not resolve protocol.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAppStatus = (id: string) => {
    setApps(prevApps => prevApps.map(app => {
      if (app.id === id) {
        const isCurrentlyBlocked = app.status === AppStatus.BLOCKED;
        
        // LOCKDOWN LOGIC:
        // If lockdown active, we CANNOT change from BLOCKED to ACTIVE.
        if (lockdownEndTime && isCurrentlyBlocked) {
          // Shake effect or alert would happen here in a real app, 
          // but strictly we just return the app unchanged + alert
          alert(translations[language].lockdown.restrict_unblock);
          return app;
        }

        return {
          ...app,
          status: isCurrentlyBlocked ? AppStatus.ACTIVE : AppStatus.BLOCKED
        };
      }
      return app;
    }));
  };

  const initiateDelete = (id: string) => {
    if (lockdownEndTime) return; // Prevent deletion during lockdown
    setAppToDelete(id);
  };

  const confirmDelete = () => {
    if (appToDelete) {
      setApps(prev => prev.filter(app => app.id !== appToDelete));
      setAppToDelete(null);
    }
  };

  const t = translations[language].status;

  return (
    <div className="min-h-screen bg-cyber-black selection:bg-cyan-500/30 selection:text-cyan-100 flex flex-col font-sans relative">
      <Header lang={language} setLang={setLanguage} />

      {/* Lockdown Banner */}
      {lockdownEndTime && (
        <LockdownTimer endTime={lockdownEndTime} lang={language} />
      )}

      {/* Funny Toast Notification for Triggering Lockdown */}
      <AnimatePresence>
        {showLockdownToast && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-xl bg-red-600 text-black p-6 rounded shadow-[0_0_50px_rgba(220,38,38,0.8)] border-2 border-white"
          >
             <div className="flex items-start gap-4">
               <AlertOctagon className="w-12 h-12 shrink-0 animate-bounce" />
               <div>
                 <h2 className="font-bold font-mono text-xl mb-2 uppercase">System Warning</h2>
                 <p className="font-mono font-bold leading-tight">
                   {translations[language].lockdown.alert_trigger}
                 </p>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="mb-8 text-center">
            <h2 className="text-cyan-500/50 font-mono text-sm tracking-[0.5em] mb-4">
              FIREWALL CONFIGURATION
            </h2>
            <InputPanel onAdd={handleAddApp} isLoading={loading} lang={language} />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {apps.map(app => (
              <AppCard 
                key={app.id} 
                app={app} 
                onToggleStatus={toggleAppStatus}
                onDelete={initiateDelete}
                lang={language}
                isLockdown={!!lockdownEndTime}
              />
            ))}
          </div>

          {apps.length === 0 && !loading && (
            <div className="text-center py-20 border border-dashed border-cyan-900/30 rounded-xl bg-slate-900/20">
              <p className="text-cyan-800 font-mono">{t.noProtocols}</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="border-t border-cyan-900/30 bg-black/40 backdrop-blur text-center py-2">
        <div className="flex justify-between max-w-7xl mx-auto px-4 text-[10px] text-cyan-900 font-mono uppercase">
          <span>{t.online}</span>
          <span>{t.secured}</span>
          <span>{t.latency}</span>
        </div>
      </footer>

      {/* Bureaucratic Delete Modal */}
      <BureaucracyModal 
        isOpen={!!appToDelete} 
        onClose={() => setAppToDelete(null)} 
        onConfirm={confirmDelete}
        lang={language}
      />
    </div>
  );
};

export default App;