import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import { GuestSessionProvider } from "@/providers/GuestSessionContext";
import LayoutClient from "./LayoutClient";

export const metadata: Metadata = {
  title: "Cine Rosa :3",
  description: "Holiwis profesiuski :3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <GuestSessionProvider>
          <Header />
          <LayoutClient>{children}</LayoutClient>
        </GuestSessionProvider>
      </body>
    </html>
  );
}
