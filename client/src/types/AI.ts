export type ChatSender = "user" | "assistant";

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface Medicine {
  id?: string | number;
  name: string;
  genericName: string;
  manufacturer: string;
  strength: string;
  form: string;
  price: string;
  stock: string;
  expiry: string;
  prescriptionRequired: boolean;
  image: string;
}

export interface Pharmacy {
  id?: string | number;
  name: string;
  address: string;
  distance: string;
  open: boolean;
  phone: string;
  photo: string;
}

export interface AIResponse {
  answer: string;
  medicines: Medicine[];
  pharmacies: Pharmacy[];
}

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  message: string;
  medicines?: Medicine[];
  pharmacies?: Pharmacy[];
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}