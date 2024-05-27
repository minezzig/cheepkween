"use client";

import { useState } from "react";

type Purchase = {
  id: string;
  name: string;
  price: number;
  store: string;
  category: string;
  purchase_date: string;
};

export default function Search({ purchases }: { purchases: Purchase[] }) {
  const [filtered, setFiltered] = useState(purchases);

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const result = purchases.filter((purchase) =>
      purchase.name.includes(search)
    );
    setFiltered(result);
  };
  return (
    <div>
      <label htmlFor="search" className="ml-3">Search Name: </label>
      <input className="outline my-5" onInput={search} />
      <div className="w- outline mx-3">
        <div className="flex bg-black text-white p-3 outline-black">
          <div className="flex-1 font-bold">Date</div>
          <div className="flex-1 font-bold ">Name</div>
          <div className="flex-1 font-bold ">Store</div>
          <div className="flex-1 font-bold ">Price</div>
        </div>
        <div className="outline">
          {filtered?.map((purchase) => (
            <div
              key={purchase.id}
              className="border border-black flex odd:bg-yellow-100 hover:bg-yellow-300"
            >
              <a href={`purchases/${purchase.id}`} className="flex w-full">
                <div className="border-black border-r-2 p-2 flex-1 text-sm md:text-base">
                  {purchase.purchase_date}
                </div>

                <div className=" border-black border-r-2 p-2 flex-1 text-sm md:text-base">
                  {purchase.name}
                </div>
                <div className="border-black border-r-2 p-2 flex-1 text-sm md:text-base">
                  {purchase.store}
                </div>
                <div className="p-2 flex-1 text-sm md:text-base">
                  ${purchase.price}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
