import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';

interface InputPanelProps {
  onAdd: (name: string) => Promise<void>;
  isLoading: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({ onAdd, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      await onAdd(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-slate-900 ring-1 ring-cyan-900/50 rounded-lg p-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            placeholder="ENTER PROTOCOL NAME (E.G. TELEGRAM)..."
            className="flex-1 bg-transparent border-none outline-none text-cyan-100 placeholder-cyan-800/50 font-mono px-4 py-2 uppercase tracking-wider disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-6 py-2 bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-800 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-mono text-sm"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            INJECT
          </button>
        </div>
        {/* Decorative text below input */}
        <div className="absolute -bottom-6 left-0 text-[10px] text-cyan-900/60 font-mono">
          System: Waiting for input...
        </div>
      </form>
    </div>
  );
};