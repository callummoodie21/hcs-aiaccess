import Link from "next/link";

export default function TraditionalLogin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-900 flex flex-col">


        <header className="fixed top-4 left-4 right-4 mx-auto max-w-7xl bg-white shadow-lg rounded-lg">
        <div className="px-4 py-8 text-center">
            <h1 className="inline-block text-4xl font-bold bg-gradient-to-r from-green-600 to-green-900 bg-clip-text text-transparent">
                Human-Centred Security (M) - Coursework
          </h1>
        </div>
        </header>

      {/* Login Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome!</h2>
            <p className="text-gray-600 text-lg">You are now logged in</p>
          </div>

            <Link href="/">
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                Log Out
                </button>
            </Link>
        </div>
      </main>
    </div>
  );
}
