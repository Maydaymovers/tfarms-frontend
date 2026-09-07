export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">TFarms Marketplace</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placeholder listings */}
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="border border-gray-700 p-6 rounded-lg bg-gray-900"
          >
            <h2 className="text-2xl font-semibold mb-2">Sample Listing #{item}</h2>
            <p className="text-gray-400 mb-4">
              This is a placeholder listing. Real data will load here once the API
              is connected.
            </p>
            <button className="p-2 bg-white text-black font-bold rounded">
              View Details
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
