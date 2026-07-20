import api from "./api";
import type { DashboardStats } from "../types/Dashboard";

// ======================================
// GET DASHBOARD DATA
// ======================================

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get("/dashboard");

  return response.data.data;
};