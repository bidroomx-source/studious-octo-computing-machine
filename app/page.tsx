'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function BidRoom() {
  const [showSellModal, setShowSellModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleRegister = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Check your email for confirmation!');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-[#1e3a5f] text-white py-6 sticky top-0 z-50 shadow">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-4xl font-black tracking-tight">BidRoom</h1>
          <nav className="flex gap-8 text-lg">
            <a href="#" className="hover:text-[#c9a227] transition">Browse Rooms</a>
            <button onClick={() => setShowSellModal(true)} className="hover:text-[#c9a227] transition font-medium">Sell a Room</button>
            <a href="#" className="hover:text-[#c9a227] transition">How it Works</a>
            {user && <span className="text-[#c9a227]">Hi, {user.email}</span>}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white py-24 border-b">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-6xl font-black mb-6 leading-tight">Transparent Room Auctions</h2>
          <p className="text-2xl text-slate-600 mb-10">Nationwide. Real photos. Real buyers. Real pickup.</p>
          <button onClick={() => setShowSellModal(true)} className="bg-[#1e3a5f] hover:bg-black text-white text-xl font-medium px-12 py-5 rounded-2xl transition">Start Selling Today</button>
        </div>
      </section>

      {/* Sell Modal */}
      {showSellModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]" onClick={() => setShowSellModal(false)}>
          <div className="bg-white rounded-3xl max-w-lg w-full mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-8">
              <h3 className="text-3xl font-bold mb-8 text-center">How do you want to sell?</h3>

              <div className="space-y-4">
                <div onClick={() => {alert('Quick Sell flow started (demo)'); setShowSellModal(false);}} className="cursor-pointer border-2 border-emerald-500 hover:bg-emerald-50 rounded-3xl p-8 transition">
                  <div className="font-bold text-2xl mb-2">Quick Sell (One-time)</div>
                  <div className="text-slate-600">Simple process — no account needed.</div>
                </div>

                <div onClick={() => {setShowSellModal(false); setShowRegisterModal(true);}} className="cursor-pointer border-2 border-[#1e3a5f] hover:bg-slate-100 rounded-3xl p-8 transition">
                  <div className="font-bold text-2xl mb-2">Register as Permanent Seller</div>
                  <div className="text-slate-600">Full dashboard and tools.</div>
                </div>
              </div>
            </div>
            <div className="border-t p-4 text-center">
              <button onClick={() => setShowSellModal(false)} className="text-slate-500">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]" onClick={() => setShowRegisterModal(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full mx-4 p-8" onClick={e => e.stopPropagation()}>
            <h3 className="text-3xl font-bold mb-6 text-center">Create Seller Account</h3>
            
            <input id="reg-email" type="email" placeholder="Email Address" className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4" />
            <input id="reg-password" type="password" placeholder="Password" className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-6" />

            <button onClick={() => {
              const email = (document.getElementById('reg-email') as HTMLInputElement).value;
              const password = (document.getElementById('reg-password') as HTMLInputElement).value;
              if (email && password) handleRegister(email, password);
            }} className="w-full bg-[#1e3a5f] text-white py-4 rounded-2xl font-medium text-lg">Create Account</button>

            <div className="text-center mt-6">
              <button onClick={() => setShowRegisterModal(false)} className="text-slate-500">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}