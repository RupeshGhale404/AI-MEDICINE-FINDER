import { useEffect, useState } from "react";

import UserLayout from "../../components/user/UserLayout";

import StatCard from "../../components/dashboard/StatCard";
import InventoryChart from "../../components/dashboard/InventoryChart";
import QuickActions from "../../components/dashboard/QuickActions";

import { getDashboardStats } from "../../services/dashboardService";
import type { DashboardStats } from "../../types/Dashboard";

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <UserLayout>
        <div className="text-center py-20 text-2xl">
          Loading Dashboard...
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <h1 className="text-4xl font-bold mb-8">
        📊 User Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

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

      <QuickActions />

      <InventoryChart
        medicines={stats?.recent_medicines ?? []}
      />
    </UserLayout>
  );
}

export default Dashboard;