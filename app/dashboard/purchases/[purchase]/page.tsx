import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

interface PurchaseProps {
  params: {purchase: string}
}

export default async function Purchase({params: { purchase: id }}: PurchaseProps) {
  // fetch the specified purchase
  const supabase = createClient();
  const { data: purchase, error } = await supabase
    .from("purchases")
    .select()
    .eq("id", +id)
    .single();

  // image fetcher
  const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;
  let imageUrl,photographer,photographerLink;
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${purchase.name}&client_id=${accessKey}`
    );
    const data = await response.json();
    imageUrl = data.results[0].urls.thumb; // URL of the first image
    photographer = data.results[0].user.name;
    photographerLink = data.results[0].user.links.html;
  } catch (error) {
    console.error("Error fetching image:", error);
  }

  return (
    <div className="flex-1">
      <h1 className="text-2xl">Edit an item</h1>
      <div className="p-8 flex flex-col items-center">
        <p>
          You bought <strong>{purchase.name}</strong> on{" "}
          {purchase.purchase_date.slice(0, 10)} from {purchase.store} for a total
          of ${purchase.price}
        </p>
        {imageUrl ? (
        <div className="border border-gray-950 p-3 shadow-lg m-5"><a href={photographerLink}><img src={imageUrl} alt={purchase.name}/><p className="text-xs pt-2">Credit: {photographer}</p></a></div>
      ) : (
        <p className="text-xs">No image available</p>
      )}

        <div className="m-3 flex gap-3 w-full justify-center items-center">
          <Link
            className="py-2 px-3 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            href={`/dashboard/purchases/edit/${id}`}
          >
            EDIT
          </Link>
          <DeleteButton id={id} />
        </div>
      </div>
    </div>
  );
}
