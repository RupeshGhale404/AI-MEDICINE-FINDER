import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";


function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const response = await loginUser({
      email,
      password,
    });

    // Save user and token in AuthContext
    login(response.user, response.token);

    // Redirect according to role
    if (response.user.role.slug === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }

  } catch (err: any) {
    setError(
      err.response?.data?.message ||
      "Invalid email or password."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex">

      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white flex-col justify-center items-center p-12">

        <div className="text-center">

          <h1 className="text-5xl font-bold mb-6">
            💊 AI Medicine Finder
          </h1>

          <p className="text-lg leading-8 max-w-md">
            Search medicines, locate nearby pharmacies,
            manage inventories and receive AI-powered
            medicine recommendations.
          </p>

          <img
            src="https://illustrations.popsy.co/blue/remote-work.svg"
            alt="Medicine"
            className="mt-12 w-96 mx-auto"
          />

        </div>

      </div>

      {/* Right Side */}

      <div className="flex-1 bg-gray-100 flex justify-center items-center p-8">

        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">

          <div className="text-center">

            <div className="text-5xl mb-4">
              🔐
            </div>

            <h2 className="text-3xl font-bold">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Login to your account
            </p>

          </div>

          {error && (

            <div className="bg-red-100 text-red-700 rounded-lg p-3 mt-6">

              {error}

            </div>

          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {/* Email */}

            <div>

              <label className="block mb-2 font-medium">

                Email Address

              </label>

              <div className="flex items-center border rounded-xl px-4">

                <Mail
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full outline-none p-4"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="block mb-2 font-medium">

                Password

              </label>

              <div className="flex items-center border rounded-xl px-4">

                <Lock
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="********"
                  className="w-full outline-none p-4"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >

                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

            </div>

            {/* Remember */}

            <div className="flex justify-between items-center">

              <label className="flex items-center gap-2">

                <input
                  type="checkbox"
                  className="rounded"
                />

                Remember Me

              </label>

              <Link
                to="#"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            {/* Login */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-semibold transition"
            >

              {loading
                ? "Signing In..."
                : "Login"}

            </button>

            <p className="text-center text-gray-600">

              Don't have an account?

              <Link
                to="/register"
                className="text-blue-600 font-semibold ml-2"
              >
                Register
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;