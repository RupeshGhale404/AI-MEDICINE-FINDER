import AdminLayout from "../../components/admin/AdminLayout";

function Inventory() {
  return (
    <AdminLayout>
      <div className="rounded-2xl bg-white p-8 shadow">

        <h1 className="text-3xl font-bold">
          📦 Inventory Management
        </h1>

        <p className="mt-4 text-gray-600">
          Manage medicine inventory, stock levels and expiry dates.
        </p>

      </div>
    </AdminLayout>
  );
}

export default Inventory;