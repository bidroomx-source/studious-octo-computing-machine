{/* Sell Modal */}
{showSellModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]" onClick={() => setShowSellModal(false)}>
    <div className="bg-white rounded-3xl max-w-lg w-full mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
      <div className="p-8">
        <h3 className="text-3xl font-bold mb-8 text-center">How do you want to sell?</h3>

        <div className="space-y-4">
          <div onClick={() => alert('Quick Sell started')} className="cursor-pointer border-2 border-emerald-500 hover:bg-emerald-50 rounded-3xl p-8 transition">
            <div className="font-bold text-2xl mb-2">Quick Sell (One-time)</div>
            <div className="text-slate-600">Simple process for families clearing one room or house.</div>
          </div>

          <div onClick={() => alert('Permanent seller registration')} className="cursor-pointer border-2 border-[#1e3a5f] hover:bg-slate-100 rounded-3xl p-8 transition">
            <div className="font-bold text-2xl mb-2">Register as Permanent Seller</div>
            <div className="text-slate-600">Full dashboard, Penny Jar, Whole House bids, volume discounts.</div>
          </div>
        </div>

        {/* Square Payment Demo */}
        <div className="mt-8 pt-6 border-t">
          <button className="w-full bg-green-600 text-white py-4 rounded-2xl font-medium">Pay $10 Listing Fee with Square</button>
        </div>
      </div>
      <div className="border-t p-4 text-center">
        <button onClick={() => setShowSellModal(false)} className="text-slate-500">Cancel</button>
      </div>
    </div>
  </div>
)}