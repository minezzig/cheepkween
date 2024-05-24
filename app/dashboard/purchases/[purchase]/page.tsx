import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import DeleteButton from "./DeleteButton";


type ParamsType = {
  purchase: string;
};

export default async function Purchase({
  params: { purchase: id },
}: {
  params: ParamsType;
}) {
  // fetch the specified purchase
  const supabase = createClient();

  const { data: purchase, error } = await supabase
    .from("purchases")
    .select()
    .eq("id", +id)
    .single();



  return (
    <div>
      <h1 className="text-2xl">Edit an item</h1>
      <div className="p-8">
        You bought <strong>{purchase.name}</strong> on{" "}
        {purchase.purchase_date.slice(0, 10)} from {purchase.store} for a total
        of ${purchase.price}
        <div className="m-3 flex gap-3 w-full justify-center items-center">
          <Link
            className="py-2 px-3 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            href={`/dashboard/edit/${id}`}
          >
            EDIT
          </Link>
          <DeleteButton id={id} />
        </div>
      </div>
    </div>
  );
}
