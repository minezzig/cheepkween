import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Form from "@/app/components/Form";

interface FormData {
  id: string;
  name: string;
  price: number;
  store: string;
  category: string;
  purchase_date: string;
};

export default async function NewPurchase() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const addPurchase = async (formData: FormData) => {
    "use server";

    const supabase = createClient();
    const { name, price, store, category, purchase_date } = formData;

    const { data, error } = await supabase
      .from("purchases")
      .insert({
        name: name,
        price: price,
        store: store,
        category: category,
        purchase_date: purchase_date,
        user_id: user?.id,
      })
      .select();

    redirect("/dashboard");
  };

  const formData = {
    id: "",
    name: "",
    price: 0,
    store: "",
    category: "",
    purchase_date: "",
  };
  console.log(formData);
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="text-xl m-3">Add new purchase:</div>
        <Form handleSubmit={addPurchase} initialData={formData} />
      </div>
    </>
  );
}
