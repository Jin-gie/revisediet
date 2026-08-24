import type { Metadata } from "next";
import { DM_Serif_Display, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PreferencesProvider } from "@/components/preferences/PreferencesContext";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "RéviseDiet",
  description: "Révise la diététique autrement",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={cn(
        "light",
        dmSerif.variable,
        geist.variable,
        "font-sans"
      )}
    >
      <body className="bg-white text-stone-900 antialiased">
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  );
}