import api from "./api";

export interface AIResponse {
  success: boolean;
  answer: string;
  medicines: any[];
}

export const askAI = async (
  message: string
): Promise<AIResponse> => {
  const response = await api.post("/ai/chat", {
    message,
  });

  return response.data;
};