<header className="bg-[#1e3a5f] text-white py-6 sticky top-0 z-50 shadow">
  <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
    <h1 className="text-4xl font-black tracking-tight">BidRoom</h1>
    <nav className="flex gap-8 text-lg items-center">
      <a href="#" className="hover:text-[#c9a227]">Browse</a>
      <button onClick={() => {
        if (user) {
          alert('Go to create listing form (next step)');
        } else {
          setShowAuthModal(true);
        }
      }} className="hover:text-[#c9a227] font-medium">Sell</button>
      {user && <button onClick={signOut} className="text-sm underline">Sign Out</button>}
    </nav>
  </div>
</header>