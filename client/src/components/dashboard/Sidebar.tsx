import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const adminMenu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Medicines", path: "/medicines", icon: "💊" },
    { name: "Pharmacies", path: "/pharmacies", icon: "🏥" },
    { name: "Inventory", path: "/inventories", icon: "📦" },
    { name: "Analytics", path: "/analytics", icon: "📈" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  const employeeMenu = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Search Medicine", path: "/search", icon: "🔍" },
    { name: "Medicines", path: "/medicines", icon: "💊" },
    { name: "Pharmacies", path: "/pharmacies", icon: "🏥" },
  ];

  const menuItems =
    user?.role.slug === "admin"
      ? adminMenu
      : employeeMenu;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          💊 AI Medicine Finder
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          {user?.role.slug === "admin"
            ? "Admin Panel"
            : "Employee Panel"}
        </p>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 py-3 rounded-lg"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;