import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

// Search
import SearchPage from "../pages/Search/Search";

// Dashboards
import Dashboard from "../pages/Dashboard/Dashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";

// Medicines
import Medicines from "../pages/Medicine/Medicines";
import AddMedicine from "../pages/Medicine/AddMedicine";
import EditMedicine from "../pages/Medicine/EditMedicine";
import MedicineDetails from "../pages/Medicine/MedicineDetails";

// Pharmacies
import Pharmacies from "../pages/Pharmacy/Pharmacies";
import AddPharmacy from "../pages/Pharmacy/AddPharmacy";
import EditPharmacy from "../pages/Pharmacy/EditPharmacy";
import PharmacyDetails from "../pages/Pharmacy/PharmacyDetails";
import NearbyPharmacies from "../pages/Pharmacy/NearbyPharmacies";

// Others
import NotFound from "../pages/NotFound/NotFound";

// Route Guards
import ProtectedRoute from "../components/layout/ProtectedRoute";
import AdminRoute from "../components/layout/AdminRoute";
import AIAssistant from "../pages/AIAssistant/AIAssistant";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= USER DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/ai-assistant"
  element={
    <ProtectedRoute>
      <AIAssistant />
    </ProtectedRoute>
  }
/>

        {/* ================= ADMIN DASHBOARD ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* ================= SEARCH ================= */}

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />

        {/* ================= MEDICINES ================= */}

        {/* View All */}
        <Route
          path="/medicines"
          element={
            <ProtectedRoute>
              <Medicines />
            </ProtectedRoute>
          }
        />

        {/* Details */}
        <Route
          path="/medicines/:id"
          element={
            <ProtectedRoute>
              <MedicineDetails />
            </ProtectedRoute>
          }
        />

        {/* Nearby Pharmacies */}
        <Route
          path="/medicines/:id/pharmacies"
          element={
            <ProtectedRoute>
              <NearbyPharmacies />
            </ProtectedRoute>
          }
        />

        {/* Admin Only */}

        <Route
          path="/medicines/add"
          element={
            <AdminRoute>
              <AddMedicine />
            </AdminRoute>
          }
        />

        <Route
          path="/medicines/edit/:id"
          element={
            <AdminRoute>
              <EditMedicine />
            </AdminRoute>
          }
        />

        {/* ================= PHARMACIES ================= */}

        {/* View All */}

        <Route
          path="/pharmacies"
          element={
            <ProtectedRoute>
              <Pharmacies />
            </ProtectedRoute>
          }
        />

        {/* Details */}

        <Route
          path="/pharmacies/:id"
          element={
            <ProtectedRoute>
              <PharmacyDetails />
            </ProtectedRoute>
          }
        />

        {/* Admin Only */}

        <Route
          path="/pharmacies/add"
          element={
            <AdminRoute>
              <AddPharmacy />
            </AdminRoute>
          }
        />

        <Route
          path="/pharmacies/edit/:id"
          element={
            <AdminRoute>
              <EditPharmacy />
            </AdminRoute>
          }
        />

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;