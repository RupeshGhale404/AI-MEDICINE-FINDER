export interface RecentMedicine {
  id: number;
  name: string;
  generic_name?: string | null;
  description?: string | null;
  price: string;
  stock_quantity: number;
  expiry_date?: string | null;
  image?: string | null;
}

export interface RecentPharmacy {
  id: number;
  name: string;
  address?: string | null;
  city?: string | null;
}

export interface DashboardStats {
  total_users: number;

  total_medicines: number;
  total_pharmacies: number;
  inventory_items: number;

  low_stock: number;
  out_of_stock: number;
  expired_medicines: number;

  recent_medicines: RecentMedicine[];
  recent_pharmacies: RecentPharmacy[];
}