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
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold">
          💊 AI Medicine Finder
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          User Panel
        </p>

      </div>

      <nav className="flex-1 p-4">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span>{item.name}</span>

          </NavLink>
        ))}

      </nav>

      <div className="p-4 border-t border-slate-700">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 rounded-lg py-3"
        >
          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default UserSidebar;