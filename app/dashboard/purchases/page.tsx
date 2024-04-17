import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Purchases() {
    const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: purchases } = await supabase.from("purchases").select();

  return (
    <div className="flex flex-col flex-1">
      <div className="text-xl m-3">Purchase history:</div>
      <ol>
        {purchases?.map((purchase) => (
          <li key={purchase.id}>
            {purchase.name}: ${purchase.price}
          </li>
        ))}
      </ol>
    </div>
  );
}
