import { createClient } from "@/utils/supabase/server";
import Header from "../components/Header";
import { redirect } from "next/navigation";
import Footer from "../components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}
export default async function Layout({children}: LayoutProps) {
  // check to see if user is authorized to enter Dashboard layout
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
