import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import AdminLayout from "../../components/admin/AdminLayout";

import { createPharmacy } from "../../services/pharmacyService";

const AddPharmacy = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    latitude: "",
    longitude: "",
    opening_time: "",
    closing_time: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createPharmacy({
        ...formData,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
      });

      alert("Pharmacy added successfully.");

      navigate("/pharmacies");
    } catch (error) {
      console.error(error);
      alert("Failed to add pharmacy.");
    } finally {
      setLoading(false);
    }
  };

  if (user?.role.slug !== "admin") {
    return (
      <div className="text-center mt-20 text-2xl text-red-600">
        Access Denied
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Add Pharmacy
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 space-y-5"
        >
          <input
            name="name"
            placeholder="Pharmacy Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="number"
              step="0.000001"
              name="latitude"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              type="number"
              step="0.000001"
              name="longitude"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="time"
              name="opening_time"
              value={formData.opening_time}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              type="time"
              name="closing_time"
              value={formData.closing_time}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Add Pharmacy"}
          </button>

        </form>

      </div>
    </AdminLayout>
  );
};

export default AddPharmacy;