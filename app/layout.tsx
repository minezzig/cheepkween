import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Cheepkween",
  description: "keep track of your grocery prices so you can save money!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={robotoMono.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
