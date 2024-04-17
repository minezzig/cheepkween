import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

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
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="text-xl m-3">Add new purchase:</div>
        <form action={addPurchase}>
          <div className="max-w-2xl flex flex-col gap-5 p-3">
            <div>
              <label htmlFor="name">Name: </label>
              <input type="text" name="name" required />
            </div>
            <div>
              <label htmlFor="price">Price: </label>
              <input type="text" name="price" required />
            </div>
            <div>
              <label htmlFor="store">Store: </label>
              <input type="text" name="store" required />
            </div>
            <div>
              <label htmlFor="category">Category: </label>
              <select name="category">
                <option>grocery</option>
                <option>clothes</option>
              </select>
            </div>
            <div>
              <label htmlFor="date">Date: </label>
              <input type="date" name="date" />
            </div>
            <div className="w-full flex justify-center gap-3">
              <button
                type="submit"
                className="flex-1 py-2 px-4 rounded-md bg-btn-background hover:bg-btn-background-hover"
              >
                add
              </button>
              <Link href="/dashboard">
                <button
                  type="button"
                  className="flex-1 py-2 px-4 rounded-md hover:bg-btn-background-hover border border-black"
                >
                  cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
