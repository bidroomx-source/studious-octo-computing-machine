'use client';

import { useState } from 'react';

export default function BidRoom() {
  const [showSellModal, setShowSellModal] = useState(false);
  const [tier, setTier] = useState<'onetime' | 'regular' | null>(null);

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
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white py-24 border-b">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-6xl font-black mb-6 leading-tight">Everything We Touch,<br />Turns to Gold</h2>
          <p className="text-2xl text-slate-600 mb-10">Transparent room auctions. Nationwide. Real buyers. Real pickup.</p>
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
                <div onClick={() => {setTier('onetime'); alert('Quick Sell flow started (demo)'); setShowSellModal(false);}} className="cursor-pointer border-2 border-emerald-500 hover:bg-emerald-50 rounded-3xl p-8 transition">
                  <div className="font-bold text-2xl mb-2">Quick Sell (One-time)</div>
                  <div className="text-slate-600">Simple process for families clearing one room or house. No full account needed.</div>
                </div>

                <div onClick={() => {setTier('regular'); alert('Permanent seller registration started (demo)'); setShowSellModal(false);}} className="cursor-pointer border-2 border-[#1e3a5f] hover:bg-slate-100 rounded-3xl p-8 transition">
                  <div className="font-bold text-2xl mb-2">Register as Permanent Seller</div>
                  <div className="text-slate-600">Full dashboard, Penny Jar, Whole House bids, volume discounts, and tools.</div>
                </div>
              </div>
            </div>
            <div className="border-t p-4 text-center">
              <button onClick={() => setShowSellModal(false)} className="text-slate-500">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}