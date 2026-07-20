export interface Pharmacy {
  id: number;

  name: string;

  address: string;

  city: string;

  phone: string;

  email: string;

  latitude: number | null;

  longitude: number | null;

  opening_time: string;

  closing_time: string;

  is_open?: boolean;

  created_at?: string;

  updated_at?: string;
}