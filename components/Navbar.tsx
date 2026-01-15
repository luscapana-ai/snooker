import React from 'react';
import { ViewState } from '../types';
import { ShoppingCart, BookOpen, Store, Home, DollarSign, User, Target } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, cartCount }) => {
  const navItemClass = (view: ViewState) =>
    `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
      currentView === view
        ? 'bg-gold-500 text-slate-900 font-semibold shadow-[0_0_15px_rgba(245,158,11,0.5)]'
        : 'text-slate-300 hover:text-white hover:bg-white/10'
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center gap-2"
            onClick={() => setView('home')}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-900 border border-gold-500 shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white shadow-sm"></div>
            </div>
            <span className="font-serif text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-amber-600">
              CueMaster
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            <button onClick={() => setView('home')} className={navItemClass('home')}>
              <Home size={18} />
              <span>Home</span>
            </button>
            <button onClick={() => setView('encyclopedia')} className={navItemClass('encyclopedia')}>
              <BookOpen size={18} />
              <span>Encyclopedia</span>
            </button>
            <button onClick={() => setView('training')} className={navItemClass('training')}>
              <Target size={18} />
              <span>Training</span>
            </button>
            <button onClick={() => setView('marketplace')} className={navItemClass('marketplace')}>
              <Store size={18} />
              <span>Marketplace</span>
            </button>
            <button onClick={() => setView('sell')} className={navItemClass('sell')}>
              <DollarSign size={18} />
              <span>Sell</span>
            </button>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3">
             <button 
                onClick={() => setView('cart')} 
                className="relative p-2 text-gold-400 hover:text-gold-300 transition-colors"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-slate-900 transform translate-x-1/4 -translate-y-1/4 bg-gold-500 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setView('profile')}
                className={`p-2 rounded-full transition-colors ${currentView === 'profile' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <User size={24} />
              </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav Bar (Bottom) */}
      <div className="lg:hidden flex justify-around py-3 bg-slate-900 border-t border-white/5 fixed bottom-0 left-0 right-0 pb-safe z-50 text-xs">
         <button onClick={() => setView('home')} className={`flex flex-col items-center gap-1 ${currentView === 'home' ? 'text-gold-500' : 'text-slate-400'}`}>
           <Home size={20} />
           <span>Home</span>
         </button>
         <button onClick={() => setView('encyclopedia')} className={`flex flex-col items-center gap-1 ${currentView === 'encyclopedia' ? 'text-gold-500' : 'text-slate-400'}`}>
           <BookOpen size={20} />
           <span>Learn</span>
         </button>
         <button onClick={() => setView('training')} className={`flex flex-col items-center gap-1 ${currentView === 'training' ? 'text-gold-500' : 'text-slate-400'}`}>
           <Target size={20} />
           <span>Train</span>
         </button>
         <button onClick={() => setView('marketplace')} className={`flex flex-col items-center gap-1 ${currentView === 'marketplace' ? 'text-gold-500' : 'text-slate-400'}`}>
           <Store size={20} />
           <span>Shop</span>
         </button>
         <button onClick={() => setView('profile')} className={`flex flex-col items-center gap-1 ${currentView === 'profile' ? 'text-gold-500' : 'text-slate-400'}`}>
           <User size={20} />
           <span>Profile</span>
         </button>
      </div>
    </nav>
  );
};

export default Navbar;
