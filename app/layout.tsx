import { Roboto_Mono } from "next/font/google";
import "./globals.css";

// set up base font, and data url
const robotoMono = Roboto_Mono({ subsets: ["latin"] });
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Cheepkween",
  description: "keep track of your grocery prices so you can save money!",
};

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en" className={`${robotoMono.className} antialiased`}>
      <body className=" bg-yellow-50 text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
