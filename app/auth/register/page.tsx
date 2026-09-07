export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-8 rounded-lg border border-gray-700 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Create Your TFarms Vendor Account</h1>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Business Name"
            className="p-3 rounded bg-gray-800 text-white"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-gray-800 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="p-3 bg-white text-black font-bold rounded"
          >
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
