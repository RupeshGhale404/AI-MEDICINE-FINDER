import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              💊 AI Medicine Finder
            </h2>

            <p className="mt-4 leading-7">
              Smart Healthcare Management System powered by
              Artificial Intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/search"
                  className="hover:text-white"
                >
                  Medicines
                </Link>
              </li>

              <li>
                <Link
                  to="/pharmacies"
                  className="hover:text-white"
                >
                  Pharmacies
                </Link>
              </li>

              <li>
                <Link
                  to="/ai"
                  className="hover:text-white"
                >
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-5">
              Services
            </h3>

            <ul className="space-y-3">
              <li>Medicine Search</li>
              <li>Inventory Management</li>
              <li>AI Recommendation</li>
              <li>Nearby Pharmacy</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold mb-5">
              Follow Us
            </h3>

            <div className="flex gap-5 text-2xl">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition"
              >
                <FaFacebook />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:support@aimedicinefinder.com"
                className="hover:text-red-400 transition"
              >
                <Mail size={24} />
              </a>

            </div>
          </div>

        </div>

        <hr className="my-10 border-slate-700" />

        <p className="text-center text-gray-500">
          © 2026 AI Medicine Finder. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;