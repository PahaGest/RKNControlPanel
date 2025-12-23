import React from 'react';
import { ShieldAlert, Terminal } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="w-full border-b border-cyan-900/50 bg-cyber-dark/80 backdrop-blur-md sticky top-0 z-50">
      {/* Top thin status bar */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-900 via-cyan-500 to-cyan-900 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 border border-cyan-500/30 rounded bg-cyan-950/30">
            <Terminal className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-widest text-cyan-400 uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
              ПАНЕЛЬ УПРАВЛЕНИЯ
            </h1>
            <p className="text-xs text-cyan-700 tracking-[0.2em] font-mono">
              ROSKOMNADZOR // FIREWALL_V.9.0
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 px-4 py-1 border border-red-900/50 bg-red-950/20 rounded-full">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-red-500 text-xs font-mono tracking-wider">NETWORK MONITORING ACTIVE</span>
        </div>
      </div>
    </div>
  );
};