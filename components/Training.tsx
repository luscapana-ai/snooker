import React, { useState, useEffect, useRef } from 'react';
import { DRILLS } from '../constants';
import { getDrillAdvice } from '../services/geminiService';
import { Clock, Play, Square, Trophy, Target, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

const Training: React.FC = () => {
  const [activeDrill, setActiveDrill] = useState<string | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [advice, setAdvice] = useState<Record<string, string>>({});
  const [adviceLoading, setAdviceLoading] = useState<string | null>(null);
  
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = window.setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning]);

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGetAdvice = async (drillTitle: string, drillId: string) => {
    if (advice[drillId]) return;
    setAdviceLoading(drillId);
    const tip = await getDrillAdvice(drillTitle);
    setAdvice(prev => ({...prev, [drillId]: tip}));
    setAdviceLoading(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Target className="text-gold-500" />
          Training Center
        </h1>
        <p className="text-slate-400">Track your progress and master the drills used by pros.</p>
      </div>

      <div className="grid gap-6">
        {DRILLS.map((drill) => (
          <div 
            key={drill.id} 
            className={`bg-slate-900 border rounded-2xl transition-all duration-300 overflow-hidden ${
              activeDrill === drill.id ? 'border-gold-500 ring-1 ring-gold-500/50' : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            {/* Drill Header */}
            <div 
              className="p-6 cursor-pointer flex justify-between items-center"
              onClick={() => setActiveDrill(activeDrill === drill.id ? null : drill.id)}
            >
              <div className="flex gap-4 items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                   drill.type === 'snooker' ? 'bg-red-900/30 text-red-500' : 'bg-blue-900/30 text-blue-500'
                }`}>
                  {drill.title.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{drill.title}</h3>
                  <div className="flex gap-2 text-sm mt-1">
                     <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                       drill.difficulty === 'Beginner' ? 'bg-green-900/50 text-green-400' :
                       drill.difficulty === 'Intermediate' ? 'bg-yellow-900/50 text-yellow-400' :
                       'bg-red-900/50 text-red-400'
                     }`}>
                       {drill.difficulty}
                     </span>
                     <span className="text-slate-500">• Goal: {drill.goal}</span>
                  </div>
                </div>
              </div>
              {activeDrill === drill.id ? <ChevronUp className="text-slate-500" /> : <ChevronDown className="text-slate-500" />}
            </div>

            {/* Drill Details (Expanded) */}
            {activeDrill === drill.id && (
              <div className="px-6 pb-6 bg-slate-950/30 border-t border-slate-800/50 animate-in slide-in-from-top-2">
                <div className="py-4 text-slate-300 leading-relaxed">
                  {drill.description}
                </div>

                {/* AI Advice Section */}
                <div className="mb-6">
                   {!advice[drill.id] ? (
                     <button 
                       onClick={(e) => {
                         e.stopPropagation();
                         handleGetAdvice(drill.title, drill.id);
                       }}
                       disabled={adviceLoading === drill.id}
                       className="flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors"
                     >
                       <Sparkles size={16} className={adviceLoading === drill.id ? 'animate-spin' : ''} />
                       {adviceLoading === drill.id ? 'Asking Coach...' : 'Get Pro Tip from Coach'}
                     </button>
                   ) : (
                     <div className="bg-gold-500/10 border border-gold-500/20 rounded-lg p-4 flex gap-3">
                       <Sparkles className="text-gold-500 flex-shrink-0 mt-1" size={18} />
                       <div className="text-sm text-gold-100 italic">"{advice[drill.id]}"</div>
                     </div>
                   )}
                </div>

                {/* Timer Controls */}
                <div className="bg-slate-800/50 rounded-xl p-4 flex justify-between items-center">
                   <div className="flex items-center gap-3">
                     <Clock className="text-slate-400" size={20} />
                     <span className="font-mono text-2xl font-bold text-white tracking-wider">
                       {activeDrill === drill.id ? formatTime(time) : '0:00'}
                     </span>
                   </div>
                   
                   <div className="flex gap-2">
                     <button 
                       onClick={(e) => { e.stopPropagation(); toggleTimer(); }}
                       className={`p-2 rounded-lg flex items-center gap-2 font-bold transition-all ${
                         timerRunning 
                           ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                           : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                       }`}
                     >
                       {timerRunning ? <Square size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                       {timerRunning ? 'Stop' : 'Start'}
                     </button>
                     <button 
                       onClick={(e) => { e.stopPropagation(); resetTimer(); }}
                       className="p-2 text-slate-500 hover:text-white transition-colors"
                     >
                       Reset
                     </button>
                   </div>
                </div>

                {/* Log Result Button (Mock) */}
                <button className="w-full mt-4 py-3 border border-slate-700 hover:border-gold-500/50 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2">
                  <Trophy size={18} /> Log Training Result
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Training;
