import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Encyclopedia from './components/Encyclopedia';
import Marketplace from './components/Marketplace';
import SellItem from './components/SellItem';
import Profile from './components/Profile';
import Training from './components/Training';
import DailyChallenge from './components/DailyChallenge';
import { ViewState, Product, CartItem } from './types';
import { ArrowRight, Trophy, Target, ShieldCheck, Trash2, Lock } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'escrow'>('cart');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const buyerFee = 1.00;
  const total = subtotal > 0 ? subtotal + buyerFee : 0;

  const handleCheckout = () => {
    setCheckoutStep('escrow');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'encyclopedia':
        return <Encyclopedia />;
      case 'marketplace':
        return <Marketplace addToCart={addToCart} setView={setCurrentView} />;
      case 'sell':
        return <SellItem />;
      case 'profile':
        return <Profile />;
      case 'training':
        return <Training />;
      case 'cart':
        if (checkoutStep === 'escrow') {
          return (
            <div className="max-w-md mx-auto mt-20 p-8 bg-slate-900 border border-gold-500/30 rounded-2xl text-center animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <ShieldCheck className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-white mb-2">Payment Secured</h2>
              <p className="text-slate-300 mb-6">
                Your payment of <span className="text-gold-400 font-bold">${total.toFixed(2)}</span> has been securely transferred to the CueMaster Escrow Vault.
              </p>
              <div className="bg-slate-950 p-4 rounded-lg mb-6 text-sm text-slate-400 text-left space-y-2">
                <p>1. Funds held in escrow.</p>
                <p>2. Seller notified to ship.</p>
                <p>3. Funds released upon delivery.</p>
              </div>
              <button 
                onClick={() => {
                  setCart([]);
                  setCheckoutStep('cart');
                  setCurrentView('home');
                }} 
                className="w-full py-3 bg-gold-500 text-slate-900 font-bold rounded-lg hover:bg-gold-400"
              >
                Return Home
              </button>
            </div>
          );
        }

        return (
          <div className="max-w-4xl mx-auto p-8 text-white">
             <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3">
               Your Cart <span className="text-base font-sans font-normal text-slate-400">({cart.length} items)</span>
             </h2>
             
             {cart.length === 0 ? (
               <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-white/5">
                 <p className="text-slate-400 mb-4">Your cart is empty.</p>
                 <button onClick={() => setCurrentView('marketplace')} className="text-gold-500 hover:text-gold-400 font-semibold">
                   Browse the Shop
                 </button>
               </div>
             ) : (
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 space-y-4">
                   {cart.map(item => (
                     <div key={item.id} className="flex gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800 items-center">
                       <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-slate-800" />
                       <div className="flex-1">
                         <h3 className="font-bold text-lg">{item.name}</h3>
                         <p className="text-slate-400">${item.price.toFixed(2)} x {item.quantity}</p>
                       </div>
                       <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                         <Trash2 size={20} />
                       </button>
                     </div>
                   ))}
                   
                   <div className="bg-green-900/20 border border-green-900/50 p-4 rounded-xl flex gap-3 items-start">
                      <ShieldCheck className="text-green-500 flex-shrink-0" size={20} />
                      <p className="text-sm text-green-100">
                        <strong>Escrow Protection:</strong> Your payment is held securely by CueMaster until you confirm you have received your items in the described condition.
                      </p>
                   </div>
                 </div>

                 <div className="h-fit p-6 bg-slate-900 rounded-xl border border-gold-500/20 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                    <h3 className="text-xl font-bold mb-4">Summary</h3>
                    <div className="flex justify-between mb-2 text-slate-400">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2 text-slate-400">
                      <span>Service Fee (Buyer)</span>
                      <span>${buyerFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-6 text-slate-400">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-white/10 pt-4 mb-6 flex justify-between items-center">
                      <span className="text-lg font-bold text-white">Total</span>
                      <span className="text-2xl font-serif text-gold-400">${total.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={handleCheckout}
                      className="w-full py-3 bg-gradient-to-r from-gold-500 to-amber-600 text-slate-900 font-bold rounded-lg hover:from-gold-400 hover:to-amber-500 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Lock size={18} />
                      Secure Checkout
                    </button>
                 </div>
               </div>
             )}
          </div>
        );
      case 'home':
      default:
        return (
          <div className="relative">
            {/* Hero Section */}
            <div className="relative h-[600px] flex items-center overflow-hidden">
               <div className="absolute inset-0 bg-felt-900 z-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-felt-800/50 via-transparent to-transparent opacity-50"></div>
                  {/* Abstract shapes/glows */}
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
               </div>
               
               <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="max-w-3xl">
                      <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                        Master the <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-600">Green Baize</span>
                      </h1>
                      <p className="text-xl text-slate-300 mb-8 max-w-xl">
                        Whether you're breaking 147s or sinking the 8-ball, elevate your game with AI-driven knowledge and championship-grade equipment.
                      </p>
                      <div className="flex gap-4">
                        <button onClick={() => setCurrentView('marketplace')} className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-slate-900 font-bold rounded-lg transition-colors flex items-center gap-2">
                          Shop Gear <ArrowRight size={20} />
                        </button>
                        <button onClick={() => setCurrentView('encyclopedia')} className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold rounded-lg transition-colors backdrop-blur-sm">
                          Learn Rules
                        </button>
                      </div>
                    </div>
                    
                    {/* Daily Challenge Card embedded in Hero */}
                    <div className="hidden md:block">
                      <DailyChallenge />
                    </div>
                 </div>
               </div>
            </div>

            {/* Mobile Daily Challenge (visible only on small screens) */}
            <div className="md:hidden px-4 -mt-10 relative z-20 mb-10">
              <DailyChallenge />
            </div>

            {/* Features Grid */}
            <div className="py-20 bg-slate-950">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div 
                        onClick={() => setCurrentView('marketplace')}
                        className="p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-colors group cursor-pointer"
                      >
                        <div className="w-14 h-14 bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                          <Trophy size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Professional Standards</h3>
                        <p className="text-slate-400">Our marketplace features only equipment approved for regulation play. From Aramith balls to Strachan cloth.</p>
                     </div>
                     
                     <div 
                        onClick={() => setCurrentView('training')}
                        className="p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-gold-500/30 transition-colors group cursor-pointer"
                      >
                        <div className="w-14 h-14 bg-amber-900/30 rounded-xl flex items-center justify-center text-gold-500 mb-6 group-hover:scale-110 transition-transform">
                          <Target size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Training Center</h3>
                        <p className="text-slate-400">Sharpen your skills with curated drills, progress tracking, and AI-powered coaching tips.</p>
                     </div>

                     <div 
                        onClick={() => setCurrentView('sell')}
                        className="p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-colors group cursor-pointer"
                      >
                        <div className="w-14 h-14 bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                          <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Secure Escrow</h3>
                        <p className="text-slate-400">Buy and sell with confidence. Our escrow system protects your funds until the item is successfully delivered.</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-gold-500/30 selection:text-gold-200">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
      />
      <main className="animate-in fade-in duration-500">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
