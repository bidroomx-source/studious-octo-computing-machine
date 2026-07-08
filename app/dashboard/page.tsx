'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SellerDashboard() {
  const [listings, setListings] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        supabase.from('listings').select('*').eq('seller_id', data.user.id).then(({ data }) => setListings(data || []));
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-8">Seller Dashboard</h1>
        <p className="mb-8">Welcome, {user?.email}</p>

        <div className="bg-white rounded-3xl p-8 shadow">
          <h2 className="text-2xl font-bold mb-6">Your Listings ({listings.length})</h2>
          {listings.length === 0 ? (
            <p>No listings yet.</p>
          ) : (
            <div className="space-y-4">
              {listings.map((l: any) => (
                <div key={l.id} className="border rounded-2xl p-6 flex justify-between">
                  <div>
                    <h3 className="font-bold">{l.title}</h3>
                    <p className="text-sm text-slate-500">{l.room_type} • {l.region}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${l.current_bid || l.starting_bid}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <a href="/" className="mt-8 inline-block bg-[#1e3a5f] text-white px-8 py-3 rounded-2xl">Create New Listing</a>
      </div>
    </div>
  );
}