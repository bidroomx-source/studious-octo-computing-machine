'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SellerDashboard() {
  const [listings, setListings] = useState([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const fetchListings = async () => {
      const { data } = await supabase.from('listings').select('*');
      setListings(data || []);
    };

    fetchListings();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-8">Seller Dashboard</h1>
        <p className="mb-8">Welcome, {user?.email}</p>

        <div className="bg-white rounded-3xl p-8 shadow">
          <h2 className="text-2xl font-bold mb-6">Your Active Listings</h2>
          {listings.length === 0 ? (
            <p>No listings yet. Create your first one!</p>
          ) : (
            <div className="grid gap-4">
              {listings.map((listing: any) => (
                <div key={listing.id} className="border rounded-2xl p-6">
                  <h3 className="font-bold">{listing.title}</h3>
                  <p>Current Bid: ${listing.current_bid}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={() => window.location.href = '/'} className="mt-8 bg-[#1e3a5f] text-white px-8 py-3 rounded-2xl">Create New Listing</button>
      </div>
    </div>
  );
}