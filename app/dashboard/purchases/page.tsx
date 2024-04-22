import { createClient } from "@/utils/supabase/server";

export default async function Purchases() {
  const supabase = createClient();
  const { data: purchases } = await supabase.from("purchases").select();

  return (
    <div className="flex flex-col flex-1">
      <div className="text-xl m-3">Purchase history:</div>
      <ol>
        {purchases?.map((purchase) => (
          <li key={purchase.id}>
            <a href={`purchases/${purchase.id}`}>
              {purchase.name}: ${purchase.price}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
