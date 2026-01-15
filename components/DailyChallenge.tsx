import React, { useEffect, useState } from 'react';
import { generateDailyTrivia } from '../services/geminiService';
import { TriviaQuestion, LoadingState } from '../types';
import { Trophy, HelpCircle, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const DailyChallenge: React.FC = () => {
  const [question, setQuestion] = useState<TriviaQuestion | null>(null);
  const [loading, setLoading] = useState<LoadingState>(LoadingState.LOADING);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchTrivia = async () => {
      const data = await generateDailyTrivia();
      if (data) {
        setQuestion(data);
        setLoading(LoadingState.SUCCESS);
      } else {
        // Fallback question if API fails
        setQuestion({
          question: "What is the maximum break possible in a standard frame of Snooker without a free ball?",
          options: ["147", "155", "140", "150"],
          correctAnswer: 0,
          explanation: "147 is the maximum standard break (15 reds, 15 blacks, and all colors)."
        });
        setLoading(LoadingState.SUCCESS);
      }
    };
    fetchTrivia();
  }, []);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null || !question) return;
    setSelectedAnswer(index);
    setIsCorrect(index === question.correctAnswer);
  };

  if (loading === LoadingState.LOADING) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px]">
        <Loader2 className="animate-spin text-gold-500 mb-2" size={24} />
        <p className="text-slate-400 text-sm">Generating Daily Challenge...</p>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-gold-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-gold-500/40 transition-all">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Trophy size={100} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="text-gold-500" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">Daily Trivia</h3>
        </div>

        <h4 className="text-xl font-serif text-white mb-6 pr-8">{question.question}</h4>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let btnClass = "w-full text-left p-3 rounded-lg border border-slate-700 transition-all ";
            
            if (selectedAnswer === null) {
              btnClass += "bg-slate-800/50 hover:bg-slate-800 hover:border-gold-500/50 text-slate-300";
            } else {
              if (idx === question.correctAnswer) {
                btnClass += "bg-green-900/50 border-green-500 text-green-100";
              } else if (idx === selectedAnswer && idx !== question.correctAnswer) {
                btnClass += "bg-red-900/50 border-red-500 text-red-100";
              } else {
                 btnClass += "bg-slate-900 border-slate-800 text-slate-500 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={btnClass}
              >
                <div className="flex justify-between items-center">
                  <span>{option}</span>
                  {selectedAnswer !== null && idx === question.correctAnswer && <CheckCircle size={16} />}
                  {selectedAnswer === idx && idx !== question.correctAnswer && <XCircle size={16} />}
                </div>
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div className={`mt-6 p-4 rounded-xl border ${isCorrect ? 'bg-green-900/20 border-green-900' : 'bg-red-900/20 border-red-900'} animate-in fade-in slide-in-from-top-2`}>
            <p className={`font-bold mb-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'Correct! Well played.' : 'Not quite right.'}
            </p>
            <p className="text-sm text-slate-300">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyChallenge;
