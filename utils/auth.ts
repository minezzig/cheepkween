import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// checks to see if user is logged in.  redirect to dashboard if so
export async function checkAuth() {
  const supabase = createClient();
  const {data: { user }} = await supabase.auth.getUser();
  // redirect to dashboard if user is logged in
  if (user) {
    redirect("/dashboard");
  } 
  return false;
}
