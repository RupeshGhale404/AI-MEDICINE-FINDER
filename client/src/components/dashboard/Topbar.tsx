import { Bell, Menu, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface TopbarProps {
  onMenuClick?: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden">
          <Menu size={24} />
        </button>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Dashboard
          </h2>

          <p className="text-sm text-gray-500">
  {user?.role.name}
</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell size={22} className="text-gray-600" />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
            <User size={20} />
          </div>

          <div className="hidden md:block">
            <p className="font-semibold">
              {user?.name ?? "User"}
            </p>

            <p className="text-sm text-gray-500">
              {user?.role?.name ?? "Employee"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;