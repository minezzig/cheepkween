"use client"
import Link from "next/link";
import { useState } from "react";

interface FormData {
  id: string;
  name: string;
  price: number;
  store: string;
  category: string;
  purchase_date: string;
};

interface Props {
  initialData: FormData;
  handleSubmit: (formData: FormData) => Promise<never>;
}


export default function Form({ initialData, handleSubmit }: Props) {
const [formData, setFormData] = useState(initialData);

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

  return (
    <div>
  <form action={() => handleSubmit(formData)}>
        <div className="max-w-2xl flex flex-col gap-5 p-3">
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="store">Store: </label>
            <input
              type="text"
              name="store"
              value={formData.store}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category">Category: </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option defaultValue="" disabled>
                Select
              </option>
              <option value="grocery">grocery</option>
              <option value="clothes">clothes</option>
            </select>
          </div>
          <div>
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              name="purchase_date"
              value={formData.purchase_date}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center gap-3">
            <button
              type="submit"
              className="flex-1 py-2 px-4 rounded-md bg-btn-background hover:bg-btn-background-hover"
            >
              add
            </button>
            <Link href="/dashboard">
              <button
                type="button"
                className="flex-1 py-2 px-4 rounded-md hover:bg-btn-background-hover border border-black"
              >
                cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
