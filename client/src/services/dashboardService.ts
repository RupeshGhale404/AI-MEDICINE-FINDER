import api from "./api";

export interface DashboardStats {
  total_users: number;
  total_medicines: number;
  total_pharmacies: number;
  inventory_items: number;
  low_stock: number;
  out_of_stock: number;
  expired_medicines: number;
  recent_medicines: any[];
  recent_pharmacies: any[];
}


export const getDashboardStats = async () => {
  const response = await api.get("/dashboard");
  return response.data.data;
};