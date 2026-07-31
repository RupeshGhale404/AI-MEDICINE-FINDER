import api from "./api";

export interface HomeStats {
  total_users: number;
  total_medicines: number;
  total_pharmacies: number;
  inventory_items: number;
}

export const getHomeStats = async (): Promise<HomeStats> => {
  const response = await api.get("/home/stats");
  return response.data;
};