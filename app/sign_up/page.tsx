'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    animal: "",
    humour: "",
    annoyance: "",
    dream: "",
    exercise: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});


  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateField = (name: string, value: string | boolean) => {
    let error = "";

    switch (name) {
      case "firstName":
      case "surname":
        if (typeof value === "string" && value.trim().length < 2) {
          error = "Must be at least 2 characters";
        }
        break;

      case "email":
        if (typeof value === "string" && !validateEmail(value)) {
          error = "Invalid email address";
        }
        break;

      case "password":
        if (typeof value === "string" && !validatePassword(value)) {
          error = "Password must be 8+ characters with uppercase, lowercase, and number";
        }
        break;

      case "confirmPassword":
        if (value !== form.password) {
          error = "Passwords do not match";
        }
        break;

      case "animal":
      case "humour":
      case "annoyance":
      case "explanation":
      case "sentence":
        if (typeof value === "string" && value.trim().length < 2) {
          error = "Please provide at least 2 characters";
        }
        break;

      case "consent":
        if (!value) {
          error = "You must accept to continue";
        }
        break;
    }

    return error;
  };

  const handleChange = (name: string, value: string | boolean) => {
    setForm({ ...form, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBlur = (name: string, value: string | boolean) => {
    const error = validateField(name, value);
    if (error) {
      setErrors({ ...errors, [name]: error });
    }
  };

  const isFormValid = () => {
    const allFilled = Object.entries(form).every(([key, value]) =>
      typeof value === "boolean" ? value : value.trim() !== ""
    );

    const noErrors = Object.values(errors).every(error => error === "");

    const passwordsMatch = form.password === form.confirmPassword;

    const allValid = Object.entries(form).every(([key, value]) => 
      validateField(key, value) === ""
    );

    return allFilled && noErrors && passwordsMatch && allValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    Object.entries(form).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const signupData = {
      ...form,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        console.log("Signup JSON saved:", signupData);
        router.push("/");
      } else {
        console.error("Failed to save signup data");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-500">
            Set up your account before choosing how you sign in
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Left Column */}
            <div className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  onBlur={(e) => handleBlur("firstName", e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 placeholder:text-gray-500 ${
                    errors.firstName ? "border-red-500 focus:ring-red-600" : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {errors.firstName && <p className="!text-red-600 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Surname"
                  value={form.surname}
                  onChange={(e) => handleChange("surname", e.target.value)}
                  onBlur={(e) => handleBlur("surname", e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 placeholder:text-gray-500 ${
                    errors.surname ? "border-red-500 focus:ring-red-600" : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {errors.surname && <p className="text-red-500 text-xs mt-1">{errors.surname}</p>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={(e) => handleBlur("email", e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 placeholder:text-gray-500 ${
                    errors.email ? "border-red-500 focus:ring-red-600" : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onBlur={(e) => handleBlur("password", e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 placeholder:text-gray-500 ${
                    errors.password ? "border-red-500 focus:ring-red-600" : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  onBlur={(e) => handleBlur("confirmPassword", e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 placeholder:text-gray-500 ${
                    errors.confirmPassword ? "border-red-500 focus:ring-red-600" : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="What is your favourite animal?"
                  value={form.animal}
                  onChange={(e) => handleChange("animal", e.target.value)}
                  onBlur={(e) => handleBlur("animal", e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 placeholder:text-gray-500 ${
                    errors.animal ? "border-red-500 focus:ring-red-600" : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {errors.animal && <p className="text-red-500 text-xs mt-1">{errors.animal}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="What is your humour type?"
                  value={form.humour}
                  onChange={(e) => handleChange("humour", e.target.value)}
                  onBlur={(e) => handleBlur("humour", e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 placeholder:text-gray-500 ${
                    errors.humour ? "border-red-500 focus:ring-red-600" : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {errors.humour && <p className="text-red-500 text-xs mt-1">{errors.humour}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="What annoys you the most?"
                  value={form.annoyance}
                  onChange={(e) => handleChange("annoyance", e.target.value)}
                  onBlur={(e) => handleBlur("annoyance", e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 placeholder:text-gray-500 ${
                    errors.annoyance ? "border-red-500 focus:ring-red-600" : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {errors.annoyance && <p className="text-red-500 text-xs mt-1">{errors.annoyance}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="What do you daydream about?"
                  value={form.dream}
                  onChange={(e) => handleChange("dream", e.target.value)}
                  onBlur={(e) => handleBlur("explanation", e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 placeholder:text-gray-500 ${
                    errors.explanation ? "border-red-500 focus:ring-red-600" : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {errors.explanation && <p className="text-red-500 text-xs mt-1">{errors.explanation}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Do you have a favourite type of exercise?"
                  value={form.exercise}
                  onChange={(e) => handleChange("exercise", e.target.value)}
                  onBlur={(e) => handleBlur("sentence", e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 placeholder:text-gray-500 ${
                    errors.sentence ? "border-red-500 focus:ring-red-600" : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {errors.sentence && <p className="text-red-500 text-xs mt-1">{errors.sentence}</p>}
              </div>
            </div>

          </div>

          {/* Consent */}
          <div>
            <label className="flex items-center gap-3 text-gray-600 text-sm">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => handleChange("consent", e.target.checked)}
                className="h-4 w-4"
              />
              I understand this system may use AI-based authentication
            </label>
            {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full mt-4 font-semibold py-3 rounded-lg transition
              ${isFormValid()
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => router.back()}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}