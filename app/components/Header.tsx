import Link from "next/link";
import AuthButton from "./AuthButton";

export default async function Header() {
  return (
    <nav className="w-dvw flex justify-between items-center px-3 border-b border-b-foreground/10 border border-black">
      <div className="flex gap-3">
        <Link href="/dashboard">Home </Link>
        <Link href="/dashboard/purchases">Purchases </Link>
        <Link href="/dashboard/new-purchase">Add</Link>
      </div>{" "}
      <div className="w-full max-w-4xl flex justify-end items-center p-1 text-sm">
        <AuthButton />
      </div>
    </nav>
  );
}
