export interface MedicineRecommendation {
  id: number;
  name: string;
  generic_name: string;
  price: string;
  stock_quantity: number;
  strength?: string;
  form?: string;
}

export interface PharmacyRecommendation {
  id: number;
  name: string;
  address?: string;
  phone?: string;
}

export interface ChatMessage {
  id: number;
  sender: "user" | "assistant";
  message: string;
  medicines?: MedicineRecommendation[];
  pharmacies?: PharmacyRecommendation[];
}