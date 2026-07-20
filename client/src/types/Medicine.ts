export interface Medicine {
  id: number;
  barcode?: string | null;
  medicine_code?: string | null;
  category_id?: number | null;
  manufacturer_id?: number | null;
  name: string;
  generic_name?: string | null;
  dosage?: string | null;
  strength?: string | null;
  form?: string | null;
  description?: string | null;
  indications?: string | null;
  symptoms?: string | null;
  manufacturer?: { id: number; name: string; slug?: string } | string | null;
  category?: { id: number; name: string } | null;
  price: string | number;
  stock_quantity: number;
  expiry_date?: string | null;
  image?: string | null;
  prescription_required?: boolean;
}