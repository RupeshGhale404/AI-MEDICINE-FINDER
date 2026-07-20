import { useState } from "react";
import type { Medicine } from "../../services/medicineService";

interface MedicineFormProps {
  initialData?: Medicine;
  onSubmit: (data: FormData) => void;
  loading?: boolean;
}


export default function MedicineForm({
  initialData,
  onSubmit,
  loading = false
}: MedicineFormProps) {


  const [form, setForm] = useState({
    name: initialData?.name || "",
    generic_name: initialData?.generic_name || "",
    description: initialData?.description || "",
    manufacturer: initialData?.manufacturer || "",
    price: initialData?.price || "",
    stock_quantity: initialData?.stock_quantity || "",
    expiry_date: initialData?.expiry_date || "",
    image: null as File | null,
  });


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if(e.target.files){

      setForm({
        ...form,
        image:e.target.files[0]
      });

    }

  };


  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    const data = new FormData();


    data.append("name", form.name);
    data.append(
      "generic_name",
      form.generic_name
    );

    data.append(
      "description",
      form.description
    );

    data.append(
      "manufacturer",
      form.manufacturer
    );

    data.append(
      "price",
      form.price.toString()
    );

    data.append(
      "stock_quantity",
      form.stock_quantity.toString()
    );

    data.append(
      "expiry_date",
      form.expiry_date
    );


    if(form.image){

      data.append(
        "image",
        form.image
      );

    }


    onSubmit(data);

  };


  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-6 rounded-lg shadow"
    >


      <div>
        <label className="block mb-1">
          Medicine Name
        </label>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border rounded w-full p-2"
          required
        />
      </div>



      <div>
        <label className="block mb-1">
          Generic Name
        </label>

        <input
          name="generic_name"
          value={form.generic_name}
          onChange={handleChange}
          className="border rounded w-full p-2"
          required
        />
      </div>



      <div>
        <label className="block mb-1">
          Description
        </label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
      </div>



      <div>
        <label className="block mb-1">
          Manufacturer
        </label>

        <input
          name="manufacturer"
          value={form.manufacturer}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
      </div>



      <div className="grid grid-cols-2 gap-4">

        <div>
          <label>
            Price
          </label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />

        </div>



        <div>

          <label>
            Stock Quantity
          </label>

          <input
            type="number"
            name="stock_quantity"
            value={form.stock_quantity}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />

        </div>


      </div>



      <div>

        <label>
          Expiry Date
        </label>

        <input
          type="date"
          name="expiry_date"
          value={form.expiry_date}
          onChange={handleChange}
          className="border rounded w-full p-2"
          required
        />

      </div>



      <div>

        <label>
          Medicine Image
        </label>

        <input
          type="file"
          onChange={handleImage}
          className="border rounded w-full p-2"
        />

      </div>



      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >

        {
          loading
          ? "Saving..."
          : "Save Medicine"
        }

      </button>


    </form>

  );
}