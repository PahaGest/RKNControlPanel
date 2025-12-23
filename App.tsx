import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AppCard } from './components/AppCard';
import { InputPanel } from './components/InputPanel';
import { getAppDomain } from './services/geminiService';
import { AppItem, AppStatus } from './types';
import { v4 as uuidv4 } from 'uuid';

// Helper to generate UUID since we can't use 'uuid' library directly without installing types sometimes in these environments
// Actually, simple random ID is enough for this demo if uuid fails, but let's implement a simple one.
const generateId = () => Math.random().toString(36).substring(2, 15);

const App: React.FC = () => {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Initial Seed Data
  useEffect(() => {
    // Simulating pre-loaded apps
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

  const handleAddApp = async (appName: string) => {
    setLoading(true);
    try {
      // 1. Get Domain from Gemini
      const domain = await getAppDomain(appName);
      
      // 2. Construct Icon URL (using Google's favicon service for reliability)
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
        return {
          ...app,
          status: app.status === AppStatus.ACTIVE ? AppStatus.BLOCKED : AppStatus.ACTIVE
        };
      }
      return app;
    }));
  };

  return (
    <div className="min-h-screen bg-cyber-black selection:bg-cyan-500/30 selection:text-cyan-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="mb-8 text-center">
            <h2 className="text-cyan-500/50 font-mono text-sm tracking-[0.5em] mb-4">
              FIREWALL CONFIGURATION
            </h2>
            <InputPanel onAdd={handleAddApp} isLoading={loading} />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {apps.map(app => (
              <AppCard 
                key={app.id} 
                app={app} 
                onToggleStatus={toggleAppStatus} 
              />
            ))}
          </div>

          {apps.length === 0 && !loading && (
            <div className="text-center py-20 border border-dashed border-cyan-900/30 rounded-xl bg-slate-900/20">
              <p className="text-cyan-800 font-mono">NO PROTOCOLS DETECTED</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="border-t border-cyan-900/30 bg-black/40 backdrop-blur text-center py-2">
        <div className="flex justify-between max-w-7xl mx-auto px-4 text-[10px] text-cyan-900 font-mono uppercase">
          <span>System Status: ONLINE</span>
          <span>Secured by RKN-CORE</span>
          <span>Latency: 12ms</span>
        </div>
      </footer>
    </div>
  );
};

export default App;