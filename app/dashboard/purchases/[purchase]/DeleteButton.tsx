"use client";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
// import { createBrowserClient } from "@supabase/ssr";

type Id = {
  id: string;
};

export default function DeleteButton({ id }: Id) {
  const router = useRouter();

  // delete function
  const handleDelete = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("purchases")
      .delete()
      .match({ id: id });

    router.push("/dashboard/purchases");
  };
  return (
    <button
      className="py-2 px-3 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      onClick={handleDelete}
    >
      DELETE
    </button>
  );
}
