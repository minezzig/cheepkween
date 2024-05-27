import Link from "next/link";
import AuthButton from "./AuthButton";

export default async function Header() {
  return (
    <nav className="w-full flex md:flex-row flex-col-reverse justify-between items-center px-3 border-b border-b-foreground/10">
      <div className="flex gap-3">
        <Link
          href="/dashboard"
          className="bg-black hover:scale-[1.1] transition rounded-tl-md rounded-tr-md px-3 text-btn-background"
        >
          Home{" "}
        </Link>
        <Link
          href="/dashboard/purchases"
          className="bg-black hover:scale-[1.1] transition rounded-tl-md rounded-tr-md  px-3 text-btn-background"
        >
          Purchases{" "}
        </Link>
        <Link
          href="/dashboard/new-purchase"
          className="bg-black hover:scale-[1.1] transition  rounded-tl-md rounded-tr-md  px-3 text-btn-background"
        >
          Add
        </Link>
      </div>{" "}
      <div className="w-full max-w-4xl flex justify-end items-center p-1 text-sm">
        <AuthButton />
      </div>
    </nav>
  );
}
