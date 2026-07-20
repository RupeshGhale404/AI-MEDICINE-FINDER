import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/authService";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    }

    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold text-white"
        >
          💊 AI Medicine Finder
        </Link>

        <div className="flex items-center gap-6 text-white font-medium">

          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>

          <Link to="/search" className="hover:text-gray-200">
            Search
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-gray-200"
              >
                Dashboard
              </Link>

              <span className="text-gray-200">
                Hi, {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-gray-200"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-gray-200"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;