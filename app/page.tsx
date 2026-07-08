'use client';

import { useState } from 'react';

export default function BidRoom() {
  const [tier, setTier] = useState<'onetime' | 'regular' | null>(null);
  const [roomType, setRoomType] = useState('');
  const [closeStyle, setCloseStyle] = useState<'sudden' | 'soft' | null>(null);
  const [softMinutes, setSoftMinutes] = useState(3);

  const roomTypes = ["Garage", "Storage Room", "Bedroom", "Kitchen", "Living Room", "Bathroom", "Laundry Room", "Playroom", "Home Office", "Basement", "Attic", "Workshop", "Other"];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-[#1e3a5f] text-white py-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-4xl font-black">BidRoom</h1>
          <nav className="flex gap-8">
            <a href="#" className="hover:text-[#c9a227]">Browse</a>
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
              <p className="text-sm text-slate-600">Perfect for families clearing one room or house.</p>
            </div>
            <div onClick={() => setTier('regular')} className={`cursor-pointer border-2 rounded-3xl p-8 transition-all ${tier === 'regular' ? 'border-[#1e3a5f] bg-slate-100' : 'border-slate-200 hover:border-[#1e3a5f]'}`}>
              <h4 className="font-bold text-xl mb-2">Regular Seller</h4>
              <p className="text-sm text-slate-600">Full tools, Penny Jar, Whole House bids, volume discounts.</p>
            </div>
          </div>
        </div>

        {/* Room Type + Close Style */}
        {tier && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div>
              <label className="block text-sm font-medium mb-2">Room Type</label>
              <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg">
                <option value="">Select room type...</option>
                {roomTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Auction Close Style</label>
              <div className="flex gap-4">
                <button onClick={() => setCloseStyle('sudden')} className={`flex-1 py-4 rounded-2xl border ${closeStyle === 'sudden' ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}>Sudden Death</button>
                <button onClick={() => setCloseStyle('soft')} className={`flex-1 py-4 rounded-2xl border ${closeStyle === 'soft' ? 'border-amber-500 bg-amber-50' : 'border-slate-300'}`}>Soft Close</button>
              </div>
              {closeStyle === 'soft' && (
                <select value={softMinutes} onChange={(e) => setSoftMinutes(Number(e.target.value))} className="mt-4 w-full border border-slate-300 rounded-xl px-4 py-3">
                  <option value={1}>1 minute extension</option>
                  <option value={3}>3 minutes extension (recommended)</option>
                  <option value={5}>5 minutes extension</option>
                </select>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}