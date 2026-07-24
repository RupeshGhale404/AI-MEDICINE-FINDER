import api from "./api";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    role_id: number;
    name: string;
    email: string;
    phone?: string | null;
    status?: string;
    role: {
      id: number;
      name: string;
      slug: string;
      description: string;
    };
  };
}

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("/register", data);
  return response.data;
};

export const loginUser = async (
  data: LoginData
): Promise<LoginResponse> => {
  const response = await api.post("/login", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/logout");
  return response.data;
};