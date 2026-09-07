export default function VendorDashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Vendor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gray-700 p-6 rounded-lg bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2">Your Listings</h2>
          <p className="text-gray-400 mb-4">
            Manage and update your active TFarms marketplace listings.
          </p>
          <button className="p-2 bg-white text-black font-bold rounded">
            View Listings
          </button>
        </div>

        <div className="border border-gray-700 p-6 rounded-lg bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2">Orders</h2>
          <p className="text-gray-400 mb-4">
            Track incoming orders and fulfillment status.
          </p>
          <button className="p-2 bg-white text-black font-bold rounded">
            View Orders
          </button>
        </div>

        <div className="border border-gray-700 p-6 rounded-lg bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2">Payouts</h2>
          <p className="text-gray-400 mb-4">
            Review payout history and upcoming disbursements.
          </p>
          <button className="p-2 bg-white text-black font-bold rounded">
            View Payouts
          </button>
        </div>
      </div>
    </main>
  );
}
