'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function BidRoom() {
  const [user, setUser] = useState<any>(null);
  const [showSellModal, setShowSellModal] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-[#1e3a5f] text-white py-6 sticky top-0 z-50 shadow">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-4xl font-black tracking-tight">BidRoom</h1>
          <nav className="flex gap-8 text-lg items-center">
            <a href="#" className="hover:text-[#c9a227]">Browse</a>
            <button onClick={() => setShowSellModal(true)} className="hover:text-[#c9a227] font-medium">Sell</button>
            {user ? (
              <div className="flex items-center gap-4">
                <span>{user.email}</span>
                <button onClick={signOut} className="text-sm underline">Sign Out</button>
              </div>
            ) : (
              <button onClick={() => setShowSellModal(true)} className="hover:text-[#c9a227]">Login / Register</button>
            )}
          </nav>
        </div>
      </header>

      {/* Rest of your hero and content */}
      <section className="bg-white py-24 border-b">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-6xl font-black mb-6">Transparent Room Auctions</h2>
          <p className="text-2xl text-slate-600">Nationwide. Real photos. Real buyers. Real pickup.</p>
        </div>
      </section>

      {/* Sell Modal with Login Option */}
      {showSellModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]" onClick={() => setShowSellModal(false)}>
          <div className="bg-white rounded-3xl max-w-lg w-full mx-4 p-8" onClick={e => e.stopPropagation()}>
            <h3 className="text-3xl font-bold mb-6 text-center">Get Started</h3>
            
            <button onClick={() => alert('Login flow - use Supabase auth UI in production')} className="w-full bg-[#1e3a5f] text-white py-4 rounded-2xl mb-4">Login</button>
            <button onClick={() => alert('Register as Permanent Seller')} className="w-full border border-[#1e3a5f] text-[#1e3a5f] py-4 rounded-2xl">Register as Seller</button>
          </div>
        </div>
      )}
    </div>
  );
}