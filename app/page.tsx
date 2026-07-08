'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function BidRoom() {
  const [showSellModal, setShowSellModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  const createListing = async () => {
    const { data, error } = await supabase.from('listings').insert({
      seller_id: user?.id,
      title: "Test Room Listing",
      room_type: "Bedroom",
      region: "dothan-wiregrass",
      starting_bid: 100,
      close_style: "soft"
    });

    if (error) alert(error.message);
    else alert('Listing created successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header and Hero same as before */}
      <header className="bg-[#1e3a5f] text-white py-6 sticky top-0 z-50 shadow">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-4xl font-black tracking-tight">BidRoom</h1>
          <nav className="flex gap-8 text-lg">
            <a href="#" className="hover:text-[#c9a227] transition">Browse Rooms</a>
            <button onClick={() => setShowSellModal(true)} className="hover:text-[#c9a227] transition font-medium">Sell a Room</button>
            <a href="#" className="hover:text-[#c9a227] transition">How it Works</a>
          </nav>
        </div>
      </header>

      <section className="bg-white py-24 border-b">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-6xl font-black mb-6 leading-tight">Transparent Room Auctions</h2>
          <p className="text-2xl text-slate-600 mb-10">Nationwide. Real photos. Real buyers. Real pickup.</p>
          <button onClick={() => setShowSellModal(true)} className="bg-[#1e3a5f] hover:bg-black text-white text-xl font-medium px-12 py-5 rounded-2xl transition">Start Selling Today</button>
        </div>
      </section>

      {/* Sell Modal with Create Button */}
      {showSellModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]" onClick={() => setShowSellModal(false)}>
          <div className="bg-white rounded-3xl max-w-lg w-full mx-4 p-8" onClick={e => e.stopPropagation()}>
            <button onClick={createListing} className="w-full bg-green-600 text-white py-4 rounded-2xl mb-4">Create Test Listing (Real Supabase)</button>
            <button onClick={() => setShowSellModal(false)} className="w-full text-slate-500">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}