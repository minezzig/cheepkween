"use client";
import Link from "next/link";
import { useState } from "react";

interface FormData {
  id: string;
  name: string;
  price: number;
  store: string;
  category: string;
  purchase_date: string;
}

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
        <div className="max-w-2xl flex flex-col gap-5 relative">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder=""
              className="peer h-10 w-full border px-3 border-black placeholder-transparent focus:outline-none focus:border-btn-background"
            />
            <label
              htmlFor="name"
              className="
              pointer-events-none 
              absolute 
              left-3
              transition-all
              duration-500
              peer-placeholder-shown:text-gray-400 
              peer-placeholder-shown:bg-white
              peer-placeholder-shown:text-lg
              peer-placeholder-shown:top-1
              peer-placeholder-shown:border-white
              -top-2
              text-xs
              px-2
              text-black
              border
              border-black
              bg-btn-background 
              peer-focus:text-black
              peer-focus:-top-2
              peer-focus:text-xs
              peer-focus:px-2
              peer-focus:border-black
              peer-focus:bg-btn-background 
              valid:border-black

              "
            >
              Name
            </label>
          </div>

          <div>
                <label htmlFor="price">Price: </label>
                <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder=""
            />
        
          </div>
          <div className="relative">
            
            <input
              type="text"
              name="store"
              value={formData.store}
              onChange={handleChange}
              required
              placeholder=""
              className="peer h-10 w-full border px-3 border-black placeholder-transparent focus:outline-none focus:border-btn-background"
            />
            <label htmlFor="store" className="
              pointer-events-none 
              absolute 
              left-3
              transition-all
              duration-500
              peer-placeholder-shown:text-gray-400 
              peer-placeholder-shown:bg-white
              peer-placeholder-shown:text-lg
              peer-placeholder-shown:top-1
              peer-placeholder-shown:border-white
              -top-2
              text-xs
              px-2
              text-black
              border
              border-black
              bg-btn-background 
              peer-focus:text-black
              peer-focus:-top-2
              peer-focus:text-xs
              peer-focus:px-2
              peer-focus:border-black
              peer-focus:bg-btn-background 
              valid:border-black

              ">Store</label>
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
