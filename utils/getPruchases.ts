import { createClient } from "@/utils/supabase/server";

export async function getPurchases() {
  const supabase = createClient();
  const { data } = await supabase
    .from("purchases")
    .select()
    .order("purchase_date", { ascending: false });
  return data ?? [];
}
