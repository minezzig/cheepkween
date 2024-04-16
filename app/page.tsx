import AuthButton from "./components/AuthButton";
import Footer from "./components/Footer";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center border">
      <nav className="w-full flex justify-center items-end border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
          <AuthButton />
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl">cheepkween</h1>
          <p>Please login to begin tracking your products</p>
        </main>
      </div>
      <Footer />
    </div>
  );
}
