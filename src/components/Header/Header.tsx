"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";

const links = [
  { href: "/popular", label: "Popular" },
  { href: "/now-playing", label: "Now Playing" },
  { href: "/top-rated", label: "Top Rated" },
  { href: "/my-favorites", label: "My Favorites" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full absolute top-0 left-0 z-50 bg-transparent">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-cine-rosa.png"
            alt="CineRosaLogo"
            width={75}
            height={75}
            priority
          />
        </Link>
        <nav className="flex  gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "text-[22px] font-bold transition-colors hover:text-[#4316AC]",
                pathname === href ? "text-[#4316AC] underline" : "text-white"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
