import "./globals.css";
import type { ReactNode } from "react";
import SiteHeader from "./components/site-header";

export const metadata = {
  title: "TFarms | Good food starts with good connections",
  description:
    "Discover fresh products from independent farms or bring your harvest to more buyers with TFarms.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#080d09] text-stone-100 antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}