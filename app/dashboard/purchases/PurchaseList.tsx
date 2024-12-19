"use client";
import { useEffect, useState } from "react";
import { PurchaseType } from "@/types/types";

interface SearchProps {
  purchases: PurchaseType[]
}

export default function PurchaseList({ purchases }: SearchProps) {
  const [filtered, setFiltered] = useState(purchases);

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const result = purchases.filter((purchase) =>
      purchase.name.includes(search)
    );
    setFiltered(result);
  };

  const formatDate = (date: string) => {
    const fullDate = String(new Date(date))
    const newDate = fullDate.slice(4,10) + ", " + fullDate.slice(11,15)
    return newDate
  }

  const sort = (col: string) => {
    const sorted = filtered.sort((a,b) => a[col] < b[col] ? -1 : 1);
    console.log(sorted)
    setFiltered(sorted);
  }
  
  return (
    <div>
      <label htmlFor="search" className="ml-3"></label>
      <input className="outline my-5 px-3" onInput={search} placeholder="search product name"/>
      <div className="outline mx-3">
        <div className="flex bg-black text-white p-3 outline-black">
          <div className="flex-1 font-bold cursor-pointer" onClick={() => sort("date")}>Date</div>
          <div className="flex-1 font-bold cursor-pointer" onClick={() => sort("name")}>Name</div>
          <div className="flex-1 font-bold cursor-pointer" onClick={() => sort("store")}>Store</div>
          <div className="flex-1 font-bold cursor-pointer" onClick={() => sort("price")}>Price</div>
        </div>
        <div className="outline">
          {filtered?.map((purchase) => (
            <div
              key={purchase.id}
              className="border border-black flex odd:bg-yellow-100 hover:bg-yellow-300"
            >
              <a href={`purchases/${purchase.id}`} className="flex w-full">
                <div className="border-black border-r-2 p-2 flex-1 text-xs md:text-base">
                  {formatDate(purchase.purchase_date)}
                </div>

                <div className=" border-black border-r-2 p-2 flex-1 text-sm md:text-base">
                  {purchase.name}
                </div>
                <div className="border-black border-r-2 p-2 flex-1 text-sm md:text-base">
                  {purchase.store}
                </div>
                <div className="p-2 flex-1 text-sm md:text-base font-bold text-right">
                  ${purchase.price.toFixed(2)}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
