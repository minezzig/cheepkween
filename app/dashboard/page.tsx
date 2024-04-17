import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // verify that user has logged in and has authorization
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // select all data from database
  const { data: purchases } = await supabase.from("purchases").select();

  // total amount spent on purchaes
  const total = purchases
    ?.reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  // a list of unique supermarkets shopped at
  const supermarkets: Array<string> = [
    ...new Set((purchases ?? []).map((purchase) => purchase.store)),
  ];

  // a new fetch getting the most expensive purchase
  const { data: expensive } = await supabase
    .from("purchases")
    .select()
    .order("price", { ascending: false })
    .limit(1)
    .single();

    const {data: cheap} = await supabase.from("purchases").select().order("price").limit(1).single();
    
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Dashboard</h2>
          <h1>Total: ${total}</h1>
          <h2>
            supermarkets:{" "}
            {supermarkets.map((sm, i) => (
              <li key={i}>{sm}</li>
            ))}
          </h2>
          <h2>
            Most expensive item: {expensive?.store} spending ${expensive.price}<br/>
            Cheapest item: {cheap?.store} spending only $ {cheap.price}
          </h2>
        </main>
      </div>
    </div>
  );
}
