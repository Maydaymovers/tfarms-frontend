export default function VendorOrdersPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Vendor Orders</h1>

      <div className="space-y-6">
        {[1, 2, 3].map((order) => (
          <div
            key={order}
            className="border border-gray-700 p-6 rounded-lg bg-gray-900"
          >
            <h2 className="text-2xl font-semibold mb-2">Order #{order}</h2>
            <p className="text-gray-400 mb-2">
              Status: <span className="text-white">Pending</span>
            </p>
            <p className="text-gray-400 mb-4">
              Customer: John Doe (placeholder)
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
