import Header from "./Header";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
        <main className="min-h-screen flex flex-col items-center">
          <Header />
          {children}
        </main>

  );
}
