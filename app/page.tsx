'use client';

import { useState } from 'react';

export default function BidRoom() {
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState<'onetime' | 'regular' | null>(null);
  const [roomType, setRoomType] = useState('');
  const [region, setRegion] = useState('');
  const [title, setTitle] = useState('');
  const [startingBid, setStartingBid] = useState(100);
  const [closeStyle, setCloseStyle] = useState<'sudden' | 'soft'>('soft');
  const [softMinutes, setSoftMinutes] = useState(3);
  const [isWholeHouse, setIsWholeHouse] = useState(false);

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

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-5xl font-black text-center mb-8">Create Your Listing</h2>

        {/* Progress */}
        <div className="flex justify-center gap-4 mb-12">
          {[1,2,3].map(s => (
            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center ${step === s ? 'bg-[#1e3a5f] text-white' : 'bg-slate-200'}`}>{s}</div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-8">
            <div>
              <label className="block font-medium mb-2">Selling Path</label>
              <div className="grid md:grid-cols-2 gap-4">
                <div onClick={() => {setTier('onetime'); setStep(2);}} className="cursor-pointer border-2 border-emerald-500 rounded-3xl p-6 hover:bg-emerald-50">Quick Sell (One-time)</div>
                <div onClick={() => {setTier('regular'); setStep(2);}} className="cursor-pointer border-2 border-[#1e3a5f] rounded-3xl p-6 hover:bg-slate-100">Regular Seller Account</div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div>
              <label className="block font-medium mb-2">Room Type</label>
              <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="w-full border border-slate-300 rounded-xl px-4 py-3">
                <option value="">Select...</option>
                {roomTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">Region (Craigslist-style)</label>
              <input type="text" placeholder="e.g. dothan-wiregrass, atlanta, houston" className="w-full border border-slate-300 rounded-xl px-4 py-3" value={region} onChange={(e) => setRegion(e.target.value)} />
            </div>

            <div>
              <label className="block font-medium mb-2">Listing Title</label>
              <input type="text" placeholder="Beautiful bedroom full of vintage furniture" className="w-full border border-slate-300 rounded-xl px-4 py-3" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <button onClick={() => setStep(3)} className="w-full bg-[#1e3a5f] text-white py-4 rounded-2xl font-medium">Continue to Auction Settings</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div>
              <label className="block font-medium mb-2">Starting Bid ($)</label>
              <input type="number" value={startingBid} onChange={(e) => setStartingBid(Number(e.target.value))} className="w-full border border-slate-300 rounded-xl px-4 py-3 text-3xl font-bold" />
            </div>

            <div>
              <label className="block font-medium mb-2">Auction Close Style</label>
              <div className="flex gap-4">
                <button onClick={() => setCloseStyle('sudden')} className={`flex-1 py-4 rounded-2xl border ${closeStyle === 'sudden' ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}>Sudden Death</button>
                <button onClick={() => setCloseStyle('soft')} className={`flex-1 py-4 rounded-2xl border ${closeStyle === 'soft' ? 'border-amber-500 bg-amber-50' : 'border-slate-300'}`}>Soft Close</button>
              </div>
              {closeStyle === 'soft' && (
                <select value={softMinutes} onChange={(e) => setSoftMinutes(Number(e.target.value))} className="mt-4 w-full border border-slate-300 rounded-xl px-4 py-3">
                  <option value={1}>1 min extension</option>
                  <option value={3}>3 min extension</option>
                  <option value={5}>5 min extension</option>
                </select>
              )}
            </div>

            <button onClick={() => alert('Listing Created! (Demo)')} className="w-full bg-green-600 text-white py-4 rounded-2xl font-medium text-lg">Create Listing — $10</button>
          </div>
        )}
      </main>
    </div>
  );
}