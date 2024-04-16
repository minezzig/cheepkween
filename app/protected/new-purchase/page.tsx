import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function NewPurchase() {
  const supabase = createClient();

const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const addPurchase = async (formData: FormData) => {
    "use server";
    const supabase = createClient();
    const name = formData.get("name");
    const price = formData.get("price");
    const store = formData.get("store");
    const category = formData.get("category");
    const purchase_date = formData.get("date");

    const {data, error} = await supabase.from("purchases").insert({
      name: name,
      price: price,
      store: store,
      category: category,
      purchase_date: purchase_date,
      user_id: user?.id,
    }).select()

    redirect("/protected");
  };
  return (
    <>
      <h1>Add a new purchase to your database</h1>
      <form action={addPurchase}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" />
        <br />
        <label htmlFor="price">Price: </label>
        <input type="text" name="price" />
        <br />
        <label htmlFor="store">Store: </label>
        <input type="text" name="store" />
        <br />
        <label htmlFor="category">Category: </label>
        <select name="category">
          <option>grocery</option>
          <option>clothes</option>
        </select>
        <br />
        <input type="date" name="date" /> <br />
        <button type="submit">ADD</button>
        <button type="reset">reset</button>
      </form>
    </>
  );
}
