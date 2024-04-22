import { createClient } from "@/utils/supabase/server";
import Form from "../../new-purchase/page";

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

export default async function Purchase({ params }: { params: ParamsType }) {
  // extract id from params
  const id: number = +params.purchase;

  // fetch the specified purchase
  const supabase = createClient();
  const { data: purchase, error } = await supabase
    .from("purchases")
    .select()
    .eq("id", id)
    .single();

    const item: FormData = purchase;
    
  const editPurchase = async (formData: FormData) => {
    "use server";

  };
  return (
    <div>
      <h1 className="text-2xl">Edit an item</h1>
      <div>
        You would like to edit item: <br /># {id}: {purchase.name}
        {purchase.name && <Form item={item} handleSubmit={editPurchase}/>}
      </div>
    </div>
  );
}
