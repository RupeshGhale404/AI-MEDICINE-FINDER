import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";

import {
  getPharmacy,
  updatePharmacy,
} from "../../services/pharmacyService";

function EditPharmacy() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  useEffect(() => {
    if (id) {
      loadPharmacy(Number(id));
    }
  }, [id]);

  const loadPharmacy = async (pharmacyId: number) => {
    try {
      const pharmacy = await getPharmacy(pharmacyId);

      setFormData({
        name: pharmacy.name,
        address: pharmacy.address,
        city: pharmacy.city,
        phone: pharmacy.phone,
        email: pharmacy.email,
        latitude: pharmacy.latitude?.toString() ?? "",
        longitude: pharmacy.longitude?.toString() ?? "",
        opening_time: pharmacy.opening_time,
        closing_time: pharmacy.closing_time,
      });
    } catch (error) {
      console.error(error);
      alert("Unable to load pharmacy.");
    } finally {
      setLoading(false);
    }
  };

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
      setSaving(true);

      await updatePharmacy(Number(id), {
        ...formData,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
      });

      alert("Pharmacy updated successfully.");

      navigate("/pharmacies");
    } catch (error) {
      console.error(error);
      alert("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[70vh] text-xl font-semibold">
          Loading pharmacy...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Edit Pharmacy
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Pharmacy Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
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
            />

            <input
              type="number"
              step="0.000001"
              name="longitude"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="time"
              name="opening_time"
              value={formData.opening_time}
              onChange={handleChange}
              required
              className="border rounded-lg p-3"
            />

            <input
              type="time"
              name="closing_time"
              value={formData.closing_time}
              onChange={handleChange}
              required
              className="border rounded-lg p-3"
            />

          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            {saving ? "Updating..." : "Update Pharmacy"}
          </button>

        </form>

      </div>
    </AdminLayout>
  );
}

export default EditPharmacy;