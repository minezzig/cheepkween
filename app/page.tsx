import { createClient } from "@/utils/supabase/server";
import Header from "./components/Header"
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createClient();

  const {data: { user }} = await supabase.auth.getUser();
  if(user) redirect("/dashboard")

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center border">
<Header />

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl">cheepkween</h1>
          <p>Welcome to cheepkween.  are you sick and tired of grocery stores raising prices?  tired of running around town looking for the best price on your favorite items?  fear no more.  with cheepkween, kep track of all your groceries so you know exactly which store has the best price.  and keey an eye on those tricky places that try to raise their prices on you!</p>
          <p>login to view your account page and start saving those pennies, you cheepkween!</p>
        </main>
      </div>

    </div>
  );
}
