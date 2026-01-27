export default function SignUp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-10">

        {/* Header */}
        <div className="text-center mb-8">


          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Set up your account before choosing how you sign in
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">

          {/* 1 */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* 2 */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* 3 */}
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* 4 */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* 5 */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* 6 */}
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option>Preferred Language</option>
            <option>English</option>
            <option>Other</option>
          </select>

          {/* 7 */}
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option>Response Style</option>
            <option>Short & Direct</option>
            <option>Balanced</option>
            <option>Long & Expressive</option>
          </select>

          {/* 8 */}
          <label className="flex items-center gap-3 text-gray-600 text-sm">
            <input type="checkbox" className="h-4 w-4" />
            I understand this system may use AI-based authentication
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-[1.02]"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login/traditional" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
