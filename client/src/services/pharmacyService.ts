import api from "./api";
import type { Pharmacy } from "../types/Pharmacy";

// ==============================
// GET ALL PHARMACIES
// ==============================
export const getPharmacies = async (): Promise<Pharmacy[]> => {
  const response = await api.get("/pharmacies");
  return response.data.data;
};

// ==============================
// GET SINGLE PHARMACY
// ==============================
export const getPharmacy = async (id: number): Promise<Pharmacy> => {
  const response = await api.get(`/pharmacies/${id}`);
  return response.data.data;
};

// ==============================
// CREATE PHARMACY
// ==============================
export const createPharmacy = async (
  pharmacy: Partial<Pharmacy>
): Promise<Pharmacy> => {
  const response = await api.post("/pharmacies", pharmacy);
  return response.data.data;
};

// ==============================
// UPDATE PHARMACY
// ==============================
export const updatePharmacy = async (
  id: number,
  pharmacy: Partial<Pharmacy>
): Promise<Pharmacy> => {
  const response = await api.put(`/pharmacies/${id}`, pharmacy);
  return response.data.data;
};

// ==============================
// DELETE PHARMACY
// ==============================
export const deletePharmacy = async (id: number): Promise<void> => {
  await api.delete(`/pharmacies/${id}`);
};

// ==============================
// GET NEARBY PHARMACIES (GPS)
// ==============================
export const getNearbyPharmacies = async (
  latitude: number,
  longitude: number,
  radius = 10
): Promise<Pharmacy[]> => {
  const response = await api.get("/pharmacies/nearby", {
    params: {
      latitude,
      longitude,
      radius,
    },
  });

  return response.data.data;
};

// ==============================
// GET PHARMACIES HAVING A MEDICINE
// ==============================
export const getMedicinePharmacies = async (medicineId: number) => {
  const response = await api.get(`/medicines/${medicineId}/pharmacies`);
  return response.data;
};

// ==============================
// APPROVE PHARMACY (ADMIN)
// ==============================
export const approvePharmacy = async (
  id: number
): Promise<Pharmacy> => {
  const response = await api.patch(`/pharmacies/${id}/approve`);
  return response.data.data;
};