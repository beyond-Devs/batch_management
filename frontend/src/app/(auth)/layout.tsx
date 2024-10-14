import type { Metadata } from "next";
import { fonts } from "@/helpers/global/configs/fonts/fonts.config";
import '@/assets/globals/globals.css';

export const metadata: Metadata = {
  title: "Pedromag",
  description: "",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${fonts.geistSans.variable} ${fonts.geistMono.variable} ${fonts.geistSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}