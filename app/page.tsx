import { createClient } from "@/utils/supabase/server";
import Header from "./components/Header";
import { redirect } from "next/navigation";
import Image from "next/image";
import Footer from "./components/Footer";

export default async function Index() {
  const supabase = createClient();
  const { data: { user }} = await supabase.auth.getUser();
  // redirect to dashboard if user is logged in
  if (user) redirect("/dashboard");

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Header />
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl">cheepkween</h1>
          <div className="flex items-center gap-3">
            <Image src="/assets/images/chick-logo.png" width={200} height={200} alt="chick logo" className="drop-shadow-lg"/>
            <div>
              <p>
                Welcome to cheepkween. are you sick and tired of grocery stores
                raising prices? tired of running around town looking for the best
                price on your favorite items? fear no more. with cheepkween, keep
                track of all your groceries so you know exactly which store has the
                best price. and keep an eye on those tricky places that try to raise
                their prices on you!
              </p>
              <br/>
              <p>
                login to view your account page and start saving those pennies, you
                cheepkween!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
