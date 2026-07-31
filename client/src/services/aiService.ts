import api from "./api";

export interface AIRequest {
  message: string;
}

export interface AIResponse {
  answer: string;
  medicines?: any[];
  pharmacies?: any[];
}

export const askAI = async (
  message: string
): Promise<AIResponse> => {

  const response = await api.post("/ai/chat", {
    message,
  });

  return response.data.data;
};