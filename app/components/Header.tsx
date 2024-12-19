import Link from "next/link";
import AuthButton from "./AuthButton";

export default async function Header() {
  return (
    <nav className="flex w-full flex-col-reverse items-center justify-between border-b border-b-foreground/10 bg-background px-3 md:flex-row">
      <div className="flex gap-3">
        <Link
          href="/dashboard"
          className="rounded-tl-md rounded-tr-md bg-black px-3 text-btn-background transition-all hover:scale-105"
        >
          Home
        </Link>
        <Link
          href="/dashboard/purchases"
          className="rounded-tl-md rounded-tr-md bg-black px-3 text-btn-background transition-all hover:scale-105"
        >
          Purchases
        </Link>
        <Link
          href="/dashboard/new-purchase"
          className="rounded-tl-md rounded-tr-md bg-black px-3 text-btn-background transition hover:scale-105"
        >
          Add
        </Link>
      </div>
      <div className="flex w-full max-w-4xl items-center justify-end p-1 text-sm">
        <AuthButton />
      </div>
    </nav>
  );
}
