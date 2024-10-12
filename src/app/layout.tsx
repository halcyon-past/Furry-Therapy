import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import ClientLayout from "./components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Furry Therapy",
  description: "Your Therapy Dating App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout> {/* Wrapping the entire app in SessionProvider */}
          <Navbar />
          <main className="w-full pt-20 md:pt-28">{children}</main>
        </ClientLayout>
      </body>
    </html>
  );
}
