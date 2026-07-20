import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function QuickActions() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const adminActions = [
    {
      title: "Add Medicine",
      icon: "💊",
      color: "bg-blue-600",
      path: "/medicines/add",
    },
    {
      title: "Add Pharmacy",
      icon: "🏥",
      color: "bg-green-600",
      path: "/pharmacies/add",
    },
    {
      title: "Manage Medicines",
      icon: "📦",
      color: "bg-purple-600",
      path: "/medicines",
    },
    {
      title: "Search Medicine",
      icon: "🔍",
      color: "bg-orange-600",
      path: "/search",
    },
  ];

  const userActions = [
    {
      title: "Search Medicine",
      icon: "🔍",
      color: "bg-orange-600",
      path: "/search",
    },
    {
      title: "View Medicines",
      icon: "💊",
      color: "bg-blue-600",
      path: "/medicines",
    },
    {
      title: "View Pharmacies",
      icon: "🏥",
      color: "bg-green-600",
      path: "/pharmacies",
    },
  ];

  const actions =
    user?.role.slug === "admin"
      ? adminActions
      : userActions;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">
        ⚡ Quick Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={() => navigate(action.path)}
            className={`${action.color} text-white rounded-xl p-6 hover:scale-105 transition duration-300 shadow-lg`}
          >
            <div className="text-4xl mb-3">
              {action.icon}
            </div>

            <div className="text-lg font-semibold">
              {action.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;