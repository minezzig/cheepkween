import { createClient } from '@/utils/supabase/server';

export default async function Purchases() {
  const supabase = createClient();
  const { data: purchases } = await supabase.from("purchases").select();

  return <pre>{JSON.stringify(purchases, null, 2)}</pre>
}