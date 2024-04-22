"use client"
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className=" w-full h-full flex-1 flex flex-col justify-center items-center">
      <div>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <button className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover" onClick={() => router.back()}>GO BACK</button>
      </div>
    </div>
  );
}
