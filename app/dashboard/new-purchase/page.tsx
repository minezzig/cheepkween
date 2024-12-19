import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Form from "@/app/components/Form";
import { todaysDate } from "@/utils/date";
import { FormData } from "@/types/types";

export default async function NewPurchase() {
  // Authenticate user
  const supabase = createClient();
  const {data: { user }} = await supabase.auth.getUser();

  // blank form data
  const formData = {
    id: "",
    name: "",
    price: 0,
    store: "",
    category: "",
    purchase_date: todaysDate(),
  };

  // function to add purhcase to database
  const addPurchase = async (formData: FormData) => {
    "use server";

    const supabase = createClient();
    const { name, price, store, category, purchase_date } = formData;
    const { data, error } = await supabase
      .from("purchases")
      .insert({
        name: name.toLowerCase(),
        price: price,
        store: String(store[0]).toUpperCase() + String(store).slice(1),
        category: category,
        purchase_date: purchase_date,
        user_id: user?.id,
      })
      .select();

    redirect(`/dashboard/purchases/${data && data[0].id}`);
  };

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="text-xl m-3">Add new purchase:</div>
        <Form handleSubmit={addPurchase} initialData={formData} />
      </div>
    </>
  );
}
