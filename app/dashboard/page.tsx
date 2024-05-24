import { createClient } from "@/utils/supabase/server";

interface Purchases {
  id: string;
  name: string;
  price: number;
  store: string;
  category: string;
  purchase_date: string;
}

export default async function Dashboard() {
  // select all data from database
  const supabase = createClient();
  const { data: purchases, error } = await supabase.from("purchases").select();

  // total amount spent on purchaes this month

  const total = purchases
    ?.filter(
      (purchase) =>
        new Date().getMonth() === new Date(purchase.purchase_date).getMonth()
    )
    .reduce((total, item) => total + item.price, 0)
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

  // a new fetch getting the cheapest purchase

  const { data: cheap } = await supabase
    .from("purchases")
    .select()
    .order("price")
    .limit(1)
    .single();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl">Dashboard - {months[new Date().getMonth()] + " " + new Date().getFullYear()}</h2>
          {purchases && purchases.length > 0 ? (
            <div className="flex gap-10 w-full justify-center items-center">
              <div className="rounded-full bg-btn-background text-neutral-600 w-24 h-24 p-3 flex flex-col justify-center items-center">
                <div className="font-bold">${total}</div>
                <div className="text-xs">Total</div>
              </div>
              <div className="rounded-full bg-btn-background text-neutral-600 w-24 h-24 p-3 flex flex-col justify-center items-center">
                <div className="font-bold">${expensive.price}</div>
                <div className="text-xs">Expensive</div>
                <div className="text-xs">{expensive.store}</div>
              </div>
              <div className="rounded-full bg-btn-background text-neutral-600 w-24 h-24 p-3 flex flex-col justify-center items-center">
                <div className="font-bold">${cheap.price}</div>
                <div className="text-xs">Cheapest</div>
                <div className="text-xs">{cheap.store}</div>
              </div>
            </div>
          ) : (
            <h1>No data yet</h1>
          )}
          <h2>
            Welcome to your dashboard. view your spending here. or navigate to
            another page to view products and add items.
          </h2>
        </main>
      </div>
    </div>
  );
}
