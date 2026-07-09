'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Browse() {
  const [listings, setListings] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    supabase.from('listings').select('*').then(({ data }) => setListings(data || []));
  }, []);

  const placeBid = async (listingId: string, amount: number) => {
    if (!user) return alert('Please login to bid');

    const { error } = await supabase.from('listings').update({ current_bid: amount }).eq('id', listingId);

    if (error) alert(error.message);
    else alert('Bid placed!');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-8">Browse Rooms</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-3xl p-6 shadow hover:shadow-xl transition">
              <h3 className="font-bold text-xl mb-2">{listing.title}</h3>
              <p className="text-slate-600 mb-4">{listing.room_type} • {listing.region}</p>
              <p className="text-2xl font-medium mb-6">Current Bid: ${listing.current_bid || listing.starting_bid}</p>
              <button onClick={() => placeBid(listing.id, (listing.current_bid || listing.starting_bid) + 50)} className="w-full bg-[#1e3a5f] text-white py-3 rounded-2xl">Place Bid (+$50)</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}