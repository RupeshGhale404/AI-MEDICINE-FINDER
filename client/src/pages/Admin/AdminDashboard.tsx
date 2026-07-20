import { useEffect, useState } from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import StatCard from "../../components/dashboard/StatCard";
import QuickActions from "../../components/dashboard/QuickActions";
import InventoryChart from "../../components/dashboard/InventoryChart";

import { getDashboardStats } from "../../services/dashboardService";
import type { DashboardStats } from "../../types/Dashboard";

function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[60vh] text-2xl font-semibold">
          Loading Dashboard...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            👑 Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage medicines, pharmacies and users from one place.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          <StatCard
            title="Total Users"
            value={stats?.total_users ?? 0}
            icon="👥"
            color="bg-indigo-100 text-indigo-600"
          />

          <StatCard
            title="Total Medicines"
            value={stats?.total_medicines ?? 0}
            icon="💊"
            color="bg-blue-100 text-blue-600"
          />

          <StatCard
            title="Total Pharmacies"
            value={stats?.total_pharmacies ?? 0}
            icon="🏥"
            color="bg-green-100 text-green-600"
          />

          <StatCard
            title="Inventory Items"
            value={stats?.inventory_items ?? 0}
            icon="📦"
            color="bg-purple-100 text-purple-600"
          />

          <StatCard
            title="Low Stock"
            value={stats?.low_stock ?? 0}
            icon="⚠️"
            color="bg-yellow-100 text-yellow-600"
          />

          <StatCard
            title="Out of Stock"
            value={stats?.out_of_stock ?? 0}
            icon="❌"
            color="bg-red-100 text-red-600"
          />

          <StatCard
            title="Expired Medicines"
            value={stats?.expired_medicines ?? 0}
            icon="⏰"
            color="bg-orange-100 text-orange-600"
          />

        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Inventory Chart */}
        <InventoryChart
          medicines={stats?.recent_medicines ?? []}
        />

      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;