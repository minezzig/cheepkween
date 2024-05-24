import { createClient } from "@/utils/supabase/server";
import Search from "@/app/components/Search";

interface Purchases {
  id: string;
  name: string;
  price: number;
  store: string;
  category: string;
  purchase_date: string;
}

export default async function Purchases() {
  const supabase = createClient();
  const { data } = await supabase
    .from("purchases")
    .select()
    .order("purchase_date", { ascending: false });
  const purchases: Purchases[] = data ?? [];


  return (
    <div className="w-full md:w-3/5">
      <div className="text-xl m-3">Purchase history:</div>
      <Search purchases={purchases} />
    </div>
  );
}
