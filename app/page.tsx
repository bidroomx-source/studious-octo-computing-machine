'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function BidRoom() {
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showCreateListing, setShowCreateListing] = useState(false);

  const [listingForm, setListingForm] = useState({
    title: '',
    room_type: '',
    region: '',
    starting_bid: 100
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleAuth = async () => {
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else setShowAuthModal(false);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else alert('Check your email!');
    }
  };

  const createListing = async () => {
    if (!user) return alert('Please login first');

    const { error } = await supabase.from('listings').insert({
      seller_id: user.id,
      title: listingForm.title,
      room_type: listingForm.room_type,
      region: listingForm.region,
      starting_bid: listingForm.starting_bid
    });

    if (error) alert(error.message);
    else alert('Listing created successfully!');
  };

  const signOut = async () => await supabase.auth.signOut();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-[#1e3a5f] text-white py-6 sticky top-0 z-50 shadow">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-4xl font-black tracking-tight">BidRoom</h1>
          <nav className="flex gap-8 text-lg items-center">
            <a href="#" className="hover:text-[#c9a227]">Browse</a>
            <button onClick={() => user ? setShowCreateListing(true) : setShowAuthModal(true)} className="hover:text-[#c9a227] font-medium">Sell</button>
            {user && <button onClick={signOut} className="text-sm underline">Sign Out ({user.email})</button>}
          </nav>
        </div>
      </header>

      <section className="bg-white py-24 border-b">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-6xl font-black mb-6">Transparent Room Auctions</h2>
          <p className="text-2xl text-slate-600">Nationwide. Real photos. Real buyers. Real pickup.</p>
        </div>
      </section>

      {/* Create Listing Modal */}
      {showCreateListing && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]" onClick={() => setShowCreateListing(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full mx-4 p-8" onClick={e => e.stopPropagation()}>
            <h3 className="text-3xl font-bold mb-6">Create Listing</h3>
            
            <input type="text" placeholder="Title" value={listingForm.title} onChange={(e) => setListingForm({...listingForm, title: e.target.value})} className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4" />
            <select value={listingForm.room_type} onChange={(e) => setListingForm({...listingForm, room_type: e.target.value})} className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4">
              <option value="">Room Type</option>
              {["Garage", "Bedroom", "Kitchen", "Living Room", "Storage", "Other"].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input type="text" placeholder="Region (e.g. dothan-wiregrass)" value={listingForm.region} onChange={(e) => setListingForm({...listingForm, region: e.target.value})} className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-6" />

            <button onClick={createListing} className="w-full bg-green-600 text-white py-4 rounded-2xl">Create Listing</button>
          </div>
        </div>
      )}

      {/* Auth Modal (same as before) */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]" onClick={() => setShowAuthModal(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full mx-4 p-8" onClick={e => e.stopPropagation()}>
            <h3 className="text-3xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Register'}</h3>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-6" />
            <button onClick={handleAuth} className="w-full bg-[#1e3a5f] text-white py-4 rounded-2xl mb-4">{isLogin ? 'Login' : 'Register'}</button>
            <button onClick={() => setIsLogin(!isLogin)} className="text-[#1e3a5f] underline block w-full text-center">{isLogin ? 'Need account? Register' : 'Have account? Login'}</button>
          </div>
        </div>
      )}
    </div>
  );
}