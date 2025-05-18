"use client";

import { usePathname } from "next/navigation";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFullscreen = pathname?.startsWith("/movie") || pathname === "/";
  const hasGradient =
    pathname === "/popular" ||
    pathname === "/now-playing" ||
    pathname === "/top-rated" ||
    pathname === "/my-favorites"; 
  return (
    <main
      className={isFullscreen ? "p-0 min-h-screen" : "px-6 pt-32 pb-6 min-h-screen"}
      style={
        hasGradient
          ? {
              background:
                "linear-gradient(to bottom right, #9031FF, #21C5FE, #001B96)",
            }
          : {}
      }
    >
      {children}
    </main>
  );
}
