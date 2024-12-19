import Form from "@/app/components/Form";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FormData } from "@/types/types";

interface EditPurchaseProps {
  params: {id: string}
}

export default async function editPurchase({params: { id }}: EditPurchaseProps) {
  const supabase = createClient();
  const { data: purchase, error } = await supabase
    .from("purchases")
    .select()
    .eq("id", +id)
    .single();

  const handleEdit = async (formData: FormData) => {
    "use server";

    const supabase = createClient();
    const { data, error } = await supabase
      .from("purchases")
      .update(formData)
      .eq("id", formData.id)
      .select();

    redirect(`/dashboard/purchases/${id}`);
  };

  return (
    <div className="flex-1">
      <h2 className="m-5 text-xl font-bold">Edit purchase #{id}</h2>
      <Form initialData={purchase} handleSubmit={handleEdit} />
    </div>
  );
}
