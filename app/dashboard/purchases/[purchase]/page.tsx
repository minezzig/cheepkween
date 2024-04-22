import { createClient } from "@/utils/supabase/server";
import Form from "../../new-purchase/page";
import Link from "next/link";

type ParamsType = {
  purchase: string;
};
type FormData = {
  name: string;
  price: number;
  store: string;
  category: string;
  purchase_date: string;
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

  console.log("SINGLE ITEM RUNNING");

  return (
    <div>
      <h1 className="text-2xl">Edit an item</h1>
      <div className="p-3">
        You bought <strong>{purchase.name}</strong> on{" "}
        {purchase.purchase_date.slice(0, 10)} for a total of ${purchase.price}
        <br />
        {/* {purchase.name && <Form handleSubmit={editPurchase}/>} */}
        {/* {purchase && (
          <Form initialData={purchase} handleSubmit={editPurchase} />
        )} */}
        <Link href={`/dashboard/edit/${id}`}>EDIT</Link>
      </div>
    </div>
  );
}
