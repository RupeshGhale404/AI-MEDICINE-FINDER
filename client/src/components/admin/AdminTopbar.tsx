import { useAuth } from "../../context/AuthContext";

function AdminTopbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b h-20 flex items-center justify-between px-8">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 text-sm">
          Welcome back,
          <span className="font-semibold text-blue-600 ml-1">
            {user?.name ?? "Administrator"}
          </span>
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-gray-800">
            {user?.name}
          </p>

          <p className="text-sm text-gray-500">
            {user?.role?.name}
          </p>
        </div>

        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
          {user?.name?.charAt(0).toUpperCase() ?? "A"}
        </div>
      </div>
    </header>
  );
}

export default AdminTopbar;