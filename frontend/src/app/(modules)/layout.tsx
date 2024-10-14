"use client";

import { fonts } from "@/helpers/global/configs/fonts/fonts.config";
import { Layouts } from "@/helpers/global/layouts";
import '@/assets/globals/globals.css';
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/helpers/global/layouts/themes/theme-provider";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${fonts.geistSans.variable} ${fonts.geistMono.variable} ${fonts.geistSans.className} antialiased`}>
        <NextTopLoader color="#1F4FA2" initialPosition={0.08} crawlSpeed={500} height={3} crawl={true} showSpinner={true} easing="ease" speed={400} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SessionProvider>
            <Layouts.Dashboard>
              
            </Layouts.Dashboard>
           </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}