import { Link } from "react-router-dom";
import { Search, Menu } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-20">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="bg-blue-600 text-white p-2 rounded-xl text-xl">
              💊
            </div>

            <div>
              <h1 className="text-2xl font-bold text-blue-700">
                AI Medicine Finder
              </h1>

              <p className="text-xs text-gray-500">
                Smart Healthcare System
              </p>
            </div>
          </Link>

          {/* Menu */}

          <div className="hidden lg:flex items-center gap-8">

            <Link
              to="/"
              className="hover:text-blue-600 font-medium"
            >
              Home
            </Link>

            <Link
              to="/search"
              className="hover:text-blue-600 font-medium"
            >
              Medicines
            </Link>

            <Link
              to="/pharmacies"
              className="hover:text-blue-600 font-medium"
            >
              Pharmacies
            </Link>

            <Link
              to="/ai"
              className="hover:text-blue-600 font-medium"
            >
              AI Assistant
            </Link>

            <Link
              to="/about"
              className="hover:text-blue-600 font-medium"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="hover:text-blue-600 font-medium"
            >
              Contact
            </Link>

          </div>

          {/* Right Side */}

          <div className="flex items-center gap-4">

            <button className="hidden md:flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100">

              <Search size={18} />

              Search

            </button>

            <Link
              to="/login"
              className="text-blue-600 font-semibold"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </Link>

            <button className="lg:hidden">
              <Menu size={28} />
            </button>

          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;