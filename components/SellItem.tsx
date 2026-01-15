import React, { useState } from 'react';
import { DollarSign, ShieldCheck, Camera, Info, CheckCircle2 } from 'lucide-react';

const SellItem: React.FC = () => {
  const [price, setPrice] = useState<string>('');
  const [listingStatus, setListingStatus] = useState<'idle' | 'success'>('idle');

  const numPrice = parseFloat(price) || 0;
  const sellerFeePercent = 0.05; // 5% fee
  const sellerFee = numPrice * sellerFeePercent;
  const payout = numPrice - sellerFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setListingStatus('success');
    // In a real app, this would submit data to backend
  };

  if (listingStatus === 'success') {
    return (
      <div className="max-w-2xl mx-auto p-8 pt-20 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-white mb-4">Listing Created!</h2>
        <p className="text-slate-400 mb-8">
          Your item is now listed on the marketplace. We've initiated the escrow setup for your future transaction.
        </p>
        <button 
          onClick={() => {
            setPrice('');
            setListingStatus('idle');
          }}
          className="bg-gold-500 text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-gold-400 transition-colors"
        >
          List Another Item
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Side: Form */}
        <div>
          <h2 className="text-3xl font-serif font-bold text-white mb-2">Sell Your Gear</h2>
          <p className="text-slate-400 mb-8">List your cue, case, or table. Funds held in escrow until delivery.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Item Name</label>
              <input 
                required
                type="text" 
                placeholder="e.g., Parris Special Cue" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <select className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none">
                  <option>Snooker Cue</option>
                  <option>Pool Cue</option>
                  <option>Case</option>
                  <option>Table</option>
                  <option>Accessory</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Condition</label>
                <select className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none">
                  <option>New</option>
                  <option>Like New</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-slate-300 mb-2">Listing Price ($)</label>
               <div className="relative">
                 <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                 <input 
                   required
                   type="number" 
                   min="0"
                   step="0.01"
                   value={price}
                   onChange={(e) => setPrice(e.target.value)}
                   placeholder="0.00" 
                   className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none font-mono"
                 />
               </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg border border-dashed border-slate-700 p-8 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-800 hover:border-gold-500/50 transition-all">
               <Camera size={32} className="mb-2" />
               <span className="text-sm">Upload Photos</span>
            </div>

            <button type="submit" className="w-full bg-gold-500 hover:bg-gold-400 text-slate-900 font-bold py-4 rounded-lg transition-colors shadow-lg active:scale-95">
              List Item
            </button>
          </form>
        </div>

        {/* Right Side: Preview & Calculation */}
        <div className="space-y-6">
           {/* Fee Breakdown Card */}
           <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <DollarSign className="text-gold-500" /> 
                Payout Estimator
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-slate-400">
                  <span>Listing Price</span>
                  <span>${numPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-400">
                  <span className="flex items-center gap-1">
                    Marketplace Fee (5%) 
                    <div className="group relative">
                      <Info size={14} className="cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-800 text-xs text-slate-300 p-2 rounded shadow-lg hidden group-hover:block">
                        This fee covers escrow security and platform maintenance.
                      </div>
                    </div>
                  </span>
                  <span>-${sellerFee.toFixed(2)}</span>
                </div>
                <div className="h-px bg-slate-800 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Estimated Payout</span>
                  <span className="text-2xl font-bold text-emerald-400 font-mono">${Math.max(0, payout).toFixed(2)}</span>
                </div>
              </div>
           </div>

           {/* Escrow Badge */}
           <div className="bg-felt-900/30 border border-felt-800/50 rounded-xl p-6 flex gap-4">
              <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="text-green-500" size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Protected by Escrow</h4>
                <p className="text-sm text-slate-400">
                  When your item sells, funds are held securely in escrow. You ship the item, and once the buyer confirms receipt, funds are released to you immediately.
                </p>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default SellItem;
