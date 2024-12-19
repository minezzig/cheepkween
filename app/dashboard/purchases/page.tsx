import { createClient } from "@/utils/supabase/server";
import PurchaseList from "@/app/dashboard/purchases/PurchaseList";
import { PurchaseType } from "@/types/types";
import { getPurchases } from "@/utils/getPruchases";

export default async function Purchases() {
  // fetch purchses from database
  const purchases: PurchaseType[] = await getPurchases();

  return (
    <div className="w-full md:w-3/5 flex flex-1 flex-col mb-10">
      <div className="text-xl m-3">Purchase History</div>
      <PurchaseList purchases={purchases} />
    </div>
  );
}
