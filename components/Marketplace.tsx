import React, { useState } from 'react';
import { Product, ViewState } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import { generateProductAdvice } from '../services/geminiService';
import { Filter, Star, ShoppingBag, Info, Loader2, PlusCircle } from 'lucide-react';

interface MarketplaceProps {
  addToCart: (product: Product) => void;
  setView: (view: ViewState) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ addToCart, setView }) => {
  const [filter, setFilter] = useState<'all' | 'snooker' | 'pool' | 'accessory'>('all');
  const [adviceLoading, setAdviceLoading] = useState<string | null>(null);
  const [adviceText, setAdviceText] = useState<Record<string, string>>({});

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'accessory') return p.category === 'accessory' || p.category === 'balls';
    return p.sport === filter || p.sport === 'both';
  });

  const getAdvice = async (product: Product) => {
    if (adviceText[product.id]) return; // Already have advice
    
    setAdviceLoading(product.id);
    const advice = await generateProductAdvice(product.name, product.category);
    setAdviceText(prev => ({...prev, [product.id]: advice}));
    setAdviceLoading(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-serif font-bold text-white">Pro Shop</h2>
          <p className="text-slate-400 mt-1">Premium equipment for serious players</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <button 
            onClick={() => setView('sell')}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-lg font-semibold shadow-lg shadow-emerald-900/50 hover:from-emerald-500 hover:to-emerald-700 transition-all active:scale-95 border border-emerald-500/20"
          >
            <PlusCircle size={18} />
            Sell Your Gear
          </button>

          <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800 overflow-x-auto">
             {(['all', 'snooker', 'pool', 'accessory'] as const).map((f) => (
               <button
                 key={f}
                 onClick={() => setFilter(f)}
                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize whitespace-nowrap ${
                   filter === f 
                    ? 'bg-slate-800 text-gold-400 shadow-sm border border-slate-700' 
                    : 'text-slate-400 hover:text-white'
                 }`}
               >
                 {f}
               </button>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="group bg-slate-900/50 border border-slate-800 hover:border-gold-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/50 flex flex-col">
            
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-white/5">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gold-400 border border-white/10">
                ${product.price.toFixed(2)}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wide bg-emerald-500/10 px-2 py-0.5 rounded">
                  {product.sport === 'both' ? 'Universal' : product.sport}
                </span>
                <div className="flex items-center text-amber-400 text-xs">
                  <Star size={12} fill="currentColor" />
                  <span className="ml-1">{product.rating}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2 leading-tight group-hover:text-gold-400 transition-colors">
                {product.name}
              </h3>
              
              <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
                {product.description}
              </p>

              {/* AI Advice Section inside card */}
              <div className="mb-4 min-h-[3rem]">
                 {!adviceText[product.id] ? (
                   <button 
                     onClick={() => getAdvice(product)}
                     disabled={adviceLoading === product.id}
                     className="text-xs flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors"
                   >
                     {adviceLoading === product.id ? (
                        <Loader2 size={12} className="animate-spin" />
                     ) : (
                        <Info size={12} />
                     )}
                     Ask AI Opinion
                   </button>
                 ) : (
                    <div className="text-xs text-sky-200 bg-sky-900/20 p-2 rounded border border-sky-500/20 italic animate-in fade-in">
                       " {adviceText[product.id]} "
                    </div>
                 )}
              </div>

              <button
                onClick={() => addToCart(product)}
                className="w-full bg-slate-800 hover:bg-gold-600 hover:text-white text-slate-200 font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
