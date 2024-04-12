import AuthButton from "@/app/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/app/protected/components/FetchDataSteps";
import Header from "@/app/components/Header";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const { data: purchases } = await supabase.from("purchases").select();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">

        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Purchases</h2>
          <ol>{purchases?.map(purchase => <li key={purchase.id}>{purchase.name}: ${purchase.price}</li>)}</ol>
          <FetchDataSteps />
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>footer</p>
      </footer>
    </div>
  );
}
