import api from "./api";


export interface Medicine {

  id: number;

  name: string;

  generic_name: string;

  description: string;

  manufacturer: string | null;

  price: string;

  stock_quantity: number;

  expiry_date: string;

  image: string | null;

}



// =========================
// GET ALL MEDICINES
// =========================

export const getMedicines = async (): Promise<Medicine[]> => {

  const response = await api.get("/medicines");

  return response.data.data;

};



// =========================
// GET SINGLE MEDICINE
// =========================

export const getMedicine = async (
  id: number
): Promise<Medicine> => {

  const response = await api.get(
    `/medicines/${id}`
  );

  return response.data.data;

};



// =========================
// CREATE MEDICINE
// =========================

export const createMedicine = async (
  data: FormData
) => {

  const response = await api.post(
    "/medicines",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );


  return response.data;

};



// =========================
// UPDATE MEDICINE
// =========================

export const updateMedicine = async (
  id: number,
  data: FormData
) => {


  const response = await api.post(
    `/medicines/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },

      params: {
        _method: "PUT",
      },

    }
  );


  return response.data;

};



// =========================
// DELETE MEDICINE
// =========================

export const deleteMedicine = async (
  id: number
) => {


  const response = await api.delete(
    `/medicines/${id}`
  );


  return response.data;

};