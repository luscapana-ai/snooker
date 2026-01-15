import React from 'react';
import { User, Package, CreditCard, Settings, Clock, CheckCircle2 } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Profile Card */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-500 to-amber-700 p-1">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
             <User size={48} className="text-slate-400" />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-serif font-bold text-white mb-1">Alex Higgins</h1>
          <p className="text-slate-400 text-sm mb-4">Member since 2023 • Pro Player</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
              <span className="block text-xs text-slate-500 uppercase">Orders</span>
              <span className="text-xl font-bold text-white">12</span>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
              <span className="block text-xs text-slate-500 uppercase">Listings</span>
              <span className="text-xl font-bold text-gold-500">3</span>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
              <span className="block text-xs text-slate-500 uppercase">Rating</span>
              <span className="text-xl font-bold text-emerald-400">4.9</span>
            </div>
          </div>
        </div>
        <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors">
          <Settings size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Active Listings */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Package className="text-gold-500" /> My Active Listings
          </h2>
          
          {/* Mock Listing 1 */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex gap-4 items-center group hover:border-gold-500/30 transition-all">
            <div className="w-20 h-20 bg-slate-800 rounded-lg flex-shrink-0 overflow-hidden">
               <img src="https://picsum.photos/200/200?random=10" alt="Cue" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-white text-lg">Vintage 1-Piece Ash Cue</h3>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full font-bold border border-green-500/20">Active</span>
              </div>
              <p className="text-slate-400 text-sm mb-2">Listed 2 days ago</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gold-400 font-mono font-bold">$120.00</span>
                <span className="text-slate-500">0 bids</span>
              </div>
            </div>
          </div>

          {/* Mock Listing 2 */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex gap-4 items-center group hover:border-gold-500/30 transition-all">
            <div className="w-20 h-20 bg-slate-800 rounded-lg flex-shrink-0 overflow-hidden">
               <img src="https://picsum.photos/200/200?random=11" alt="Case" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-white text-lg">Aluminium Flight Case</h3>
                <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full font-bold border border-blue-500/20">In Escrow</span>
              </div>
              <p className="text-slate-400 text-sm mb-2">Sold to User_882</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gold-400 font-mono font-bold">$85.00</span>
                <span className="text-slate-500 flex items-center gap-1"><Clock size={12} /> Awaiting delivery</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Recent Activity */}
        <div className="space-y-6">
           <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CreditCard className="text-emerald-500" /> Recent Purchases
          </h2>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
             <div className="border-l-2 border-emerald-500 pl-4 py-1 mb-4">
                <h4 className="text-white font-medium">Triangle Chalk (Green)</h4>
                <p className="text-xs text-slate-500">Delivered on Oct 12</p>
             </div>
             <div className="border-l-2 border-emerald-500 pl-4 py-1 mb-4">
                <h4 className="text-white font-medium">Aramith Pro Cup Ball</h4>
                <p className="text-xs text-slate-500">Delivered on Sep 28</p>
             </div>
             <div className="border-l-2 border-slate-700 pl-4 py-1">
                <h4 className="text-slate-400 font-medium">Tip Shaper Tool</h4>
                <p className="text-xs text-slate-600">Refunded</p>
             </div>
          </div>

          <div className="bg-gradient-to-br from-gold-600/10 to-transparent border border-gold-500/20 rounded-xl p-4">
            <h3 className="font-bold text-gold-400 mb-2 flex items-center gap-2">
              <CheckCircle2 size={16} /> Identity Verified
            </h3>
            <p className="text-xs text-slate-400">
              Your account is fully verified for high-value escrow transactions.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
