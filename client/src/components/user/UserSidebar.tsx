import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function UserSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },
    {
      name: "Search",
      path: "/search",
      icon: "🔍",
    },
    {
      name: "Medicines",
      path: "/medicines",
      icon: "💊",
    },
    {
      name: "Pharmacies",
      path: "/pharmacies",
      icon: "🏥",
    },
    {
      name: "Inventory",
      path: "/inventories",
      icon: "📦",
    },
    {
      name: "AI Assistant",
      path: "/ai-assistant",
      icon: "🤖",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          💊 AI Medicine Finder
        </h1>

        <p className="text-slate-400 mt-2">
          User Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-2xl">{item.icon}</span>

            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 rounded-xl bg-red-600 hover:bg-red-700 py-3 font-semibold transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default UserSidebar;