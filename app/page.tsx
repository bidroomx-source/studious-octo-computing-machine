'use client';

import { useState } from 'react';

export default function BidRoom() {
  const [tier, setTier] = useState<'onetime' | 'regular' | null>(null);
  const [roomType, setRoomType] = useState('');

  const roomTypes = [
    "Garage", "Storage Room", "Bedroom", "Kitchen", "Living Room", 
    "Bathroom", "Laundry Room", "Playroom", "Home Office", "Basement", 
    "Attic", "Workshop", "Other"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-[#1e3a5f] text-white py-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-4xl font-black">BidRoom</h1>
          <nav className="flex gap-8">
            <a href="#" className="hover:text-[#c9a227]">Browse Rooms</a>
            <a href="#" className="hover:text-[#c9a227]">Sell</a>
            <a href="#" className="hover:text-[#c9a227]">How it Works</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-5xl font-black text-center mb-4">BidRoom</h2>
        <p className="text-center text-xl text-slate-600 mb-12">Transparent. Nationwide. Real Pickup.</p>

        {/* Tier Selection */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-6">How do you want to sell?</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div onClick={() => setTier('onetime')} className={`cursor-pointer border-2 rounded-3xl p-8 transition-all ${tier === 'onetime' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-emerald-300'}`}>
              <h4 className="font-bold text-xl mb-2">Quick Sell (One-time)</h4>
              <p className="text-sm text-slate-600">Perfect for families clearing one room or house after a life event.</p>
            </div>
            <div onClick={() => setTier('regular')} className={`cursor-pointer border-2 rounded-3xl p-8 transition-all ${tier === 'regular' ? 'border-[#1e3a5f] bg-slate-100' : 'border-slate-200 hover:border-[#1e3a5f]'}`}>
              <h4 className="font-bold text-xl mb-2">Regular Seller</h4>
              <p className="text-sm text-slate-600">Full tools, Penny Jar, Whole House bids, volume discounts.</p>
            </div>
          </div>
        </div>

        {/* Room Type */}
        {tier && (
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium mb-2">What type of room are you selling?</label>
            <select 
              value={roomType} 
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg"
            >
              <option value="">Select room type...</option>
              {roomTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        )}
      </main>
    </div>
  );
}