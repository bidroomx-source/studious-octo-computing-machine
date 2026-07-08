'use client';

import { useState } from 'react';

export default function BidRoom() {
  const [tier, setTier] = useState<'onetime' | 'regular' | null>(null);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#1e3a5f] text-white py-6">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-4xl font-black">BidRoom</h1>
          <nav className="flex gap-8 text-lg">
            <a href="#" className="hover:text-[#c9a227]">Browse</a>
            <a href="#" className="hover:text-[#c9a227]">Sell</a>
            <a href="#" className="hover:text-[#c9a227]">How it Works</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-5xl font-black text-center mb-8">Transparent Room Auctions</h2>
        <p className="text-center text-xl text-slate-600 mb-12">Nationwide. Real photos. Real buyers. Real pickup.</p>

        {/* Tier Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div onClick={() => setTier('onetime')} className="cursor-pointer border-2 border-emerald-500 rounded-3xl p-8 hover:bg-emerald-50">
            <h3 className="text-2xl font-bold mb-2">Quick Sell (One-time)</h3>
            <p className="text-emerald-600">Perfect for families clearing one room or house. Simple & fast.</p>
          </div>

          <div onClick={() => setTier('regular')} className="cursor-pointer border-2 border-[#1e3a5f] rounded-3xl p-8 hover:bg-slate-100">
            <h3 className="text-2xl font-bold mb-2">Regular Seller Account</h3>
            <p className="text-[#1e3a5f]">Full dashboard, Penny Jar, Whole House bids, volume discounts.</p>
          </div>
        </div>

        {/* Placeholder for full prototype features */}
        <div className="mt-16 text-center text-slate-500">
          Room types, Whole House bidding, Soft Close, Buyer Protection, and more coming next...
        </div>
      </main>
    </div>
  );
}