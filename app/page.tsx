import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex flex-col">
      {/* Floating Header */}
      <header className="fixed top-4 left-4 right-4 mx-auto max-w-7xl bg-white shadow-lg rounded-lg">
        <div className="px-4 py-8 text-center">
          <h1 className="inline-block text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
            Human-Centred Security (M) - Coursework
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 pt-32">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-white text-xl mb-2">Welcome to our team's landing page</p>
            <p className="text-blue-100 text-lg">Choose your login method</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Login Option */}
            <Link href="/login/ai">
              <div className="bg-white rounded-lg shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col justify-between">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Login</h2>
                  <p className="text-gray-600">
                    Experience intelligent authentication powered by AI technology
                  </p>
                </div>
                <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                  Continue with AI
                </button>
              </div>
            </Link>

            {/* Traditional Login Option */}
            <Link href="/login/traditional">
              <div className="bg-white rounded-lg shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 cursor-pointer h-full flex flex-col justify-between">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Traditional Login</h2>
                  <p className="text-gray-600">
                    Sign in with your email and password the traditional way
                  </p>
                </div>
                <button className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                  Continue Traditionally
                </button>
              </div>
            </Link>
          </div>
          <div className="mt-12 text-center">
            <p className="text-blue-100 text-lg mb-4">
              Don’t have an account?
            </p>

            <Link
              href="/sign_up"
              className="inline-block px-8 py-3 text-lg font-semibold
               text-white border-2 border-white rounded-lg
               hover:bg-white hover:text-blue-900
               transition-all duration-200 ease-in-out"
            >
              Register
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
