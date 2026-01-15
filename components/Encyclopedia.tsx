import React, { useState, useRef, useEffect } from 'react';
import { generateEncyclopediaResponse } from '../services/geminiService';
import { ChatMessage, LoadingState } from '../types';
import { Search, Send, Sparkles, Book, User, Crosshair, Map, ChevronRight } from 'lucide-react';
import { SHOT_GUIDES, SITUATION_GUIDES } from '../constants';

const Encyclopedia: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSearch = async (text: string, displayLabel?: string) => {
    if (!text.trim()) return;

    // displayLabel allows us to show a shorter user message (e.g. "Tell me about Stun Shots") 
    // while sending a detailed prompt to the AI.
    const userMsg: ChatMessage = {
      role: 'user',
      text: displayLabel || text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setLoading(LoadingState.LOADING);

    try {
      const responseText = await generateEncyclopediaResponse(text);
      
      const aiMsg: ChatMessage = {
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, aiMsg]);
      setLoading(LoadingState.SUCCESS);
    } catch (error) {
      setLoading(LoadingState.ERROR);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full h-[calc(100vh-6rem)] flex flex-col p-4 md:p-6">
      
      {/* Header */}
      <div className="mb-6 text-center flex-shrink-0">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Book className="text-gold-500" />
          The Archives
        </h1>
        <p className="text-slate-400">Powered by Gemini AI. Master your technique and strategy.</p>
      </div>

      {/* Suggested Topics (only if no messages) */}
      {messages.length === 0 && (
        <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar">
           <div className="max-w-3xl mx-auto space-y-8">
              
              {/* Shot Guides Section */}
              <div>
                <div className="flex items-center gap-2 mb-4 px-1">
                  <Crosshair className="text-gold-500" size={20} />
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">Shot Technique</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SHOT_GUIDES.map((guide, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(guide.prompt, `Tell me about the ${guide.title}`)}
                      className="flex flex-col text-left p-4 bg-slate-800/50 hover:bg-slate-800 border border-white/5 hover:border-gold-500/30 rounded-xl transition-all duration-300 group"
                    >
                      <div className="flex justify-between items-start w-full mb-1">
                         <span className="text-gold-400 font-bold text-lg group-hover:text-gold-300">{guide.title}</span>
                         <ChevronRight size={16} className="text-slate-500 group-hover:text-gold-500 transition-colors opacity-0 group-hover:opacity-100" />
                      </div>
                      <span className="text-slate-400 text-sm group-hover:text-slate-300">{guide.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Situation Guides Section */}
              <div>
                <div className="flex items-center gap-2 mb-4 px-1">
                  <Map className="text-emerald-500" size={20} />
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">Tactical Situations</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SITUATION_GUIDES.map((guide, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(guide.prompt, `Guide me on: ${guide.title}`)}
                      className="flex flex-col text-left p-4 bg-slate-800/50 hover:bg-slate-800 border border-white/5 hover:border-emerald-500/30 rounded-xl transition-all duration-300 group"
                    >
                      <div className="flex justify-between items-start w-full mb-1">
                         <span className="text-emerald-400 font-bold text-lg group-hover:text-emerald-300">{guide.title}</span>
                         <ChevronRight size={16} className="text-slate-500 group-hover:text-emerald-500 transition-colors opacity-0 group-hover:opacity-100" />
                      </div>
                      <span className="text-slate-400 text-sm group-hover:text-slate-300">{guide.description}</span>
                    </button>
                  ))}
                </div>
              </div>

           </div>
        </div>
      )}

      {/* Chat Area */}
      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto mb-4 space-y-6 pr-2">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-slate-700' : 'bg-felt-800 text-gold-400 border border-gold-500/20'
              }`}>
                {msg.role === 'user' ? <User size={20} /> : <Sparkles size={20} />}
              </div>
              
              <div className={`max-w-[85%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-slate-800 text-white rounded-tr-sm' 
                  : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm'
              }`}>
                <div className="prose prose-invert prose-sm max-w-none whitespace-pre-line">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {loading === LoadingState.LOADING && (
            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-felt-800 flex items-center justify-center animate-pulse">
                 <Sparkles size={20} className="text-gold-500 opacity-50" />
               </div>
               <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-sm">
                 <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Area */}
      <div className="relative flex-shrink-0">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
          placeholder="Ask a custom question..."
          className="w-full bg-slate-900 border border-slate-700 focus:border-gold-500 rounded-xl py-4 pl-12 pr-14 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all shadow-lg"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
        <button
          onClick={() => handleSearch(query)}
          disabled={!query.trim() || loading === LoadingState.LOADING}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:hover:bg-gold-500 text-slate-900 rounded-lg transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Encyclopedia;
