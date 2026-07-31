import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { isAuthenticated } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg py-3"
            : "bg-white/90 backdrop-blur-md py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          <Logo />

          <div className="hidden lg:flex items-center gap-8">
            <NavLinks />
          </div>

          <div className="hidden lg:flex items-center gap-3">

            <button className="border rounded-lg px-4 py-2 hover:bg-gray-100 transition flex items-center gap-2">
              <Search size={18} />
              Search
            </button>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                Dashboard
              </Link>
            ) : (
              <>
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
              </>
            )}
          </div>

          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}

export default Navbar;