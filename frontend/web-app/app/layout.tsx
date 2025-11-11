import type { Metadata } from "next";
import NavBar from "./components/nav/NavBar";
import ToasterProvider from "./providers/ToasterProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auction Application",
  description: "Auction Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToasterProvider />
        <NavBar />
        <main className="container mx-auto px-5 pt-10">{children}</main>
      </body>
    </html>
  );
}
