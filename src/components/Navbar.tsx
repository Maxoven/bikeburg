"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";

const navItems = [
  { href: "/katalog", label: "Каталог велосипедов" },
  { href: "/o-nas", label: "О нас" },
  { href: "/kontakty", label: "Контакты" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 border-b border-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8 min-w-0">
            <Link href="/" className="flex items-center gap-3" aria-label="BikeBurg">
              <Image
                src="/bikeburg-logo.png"
                alt="BikeBurg"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
              <span className="text-xl font-semibold tracking-tight">BikeBurg</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm uppercase tracking-wide transition-colors ${
                      active ? "text-black" : "text-black/60 hover:text-black"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/korzina" className="relative border border-black rounded-full px-3 h-9 inline-flex items-center text-sm uppercase tracking-wide hover:bg-black hover:text-white">
              <span>Корзина</span>
              {count > 0 && (
                <span className="ml-2 inline-flex items-center justify-center text-xs w-6 h-6 rounded-full bg-black text-white">
                  {count}
                </span>
              )}
            </Link>
            
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  const pathname = usePathname();
  return (
    <details className="group relative">
      <summary className="list-none inline-flex items-center justify-center w-10 h-10 border border-black rounded-full text-black cursor-pointer select-none">
        <span className="sr-only">Меню</span>
        <span className="block h-[2px] w-4 bg-black relative before:content-[''] before:block before:absolute before:-top-1.5 before:h-[2px] before:w-4 before:bg-black after:content-[''] after:block after:absolute after:top-1.5 after:h-[2px] after:w-4 after:bg-black"></span>
      </summary>
      <div className="absolute right-0 mt-3 w-64 border border-black bg-white shadow-sm">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 text-sm uppercase tracking-wide border-b border-black/10 last:border-0 ${
                active ? "bg-black text-white" : "hover:bg-black hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </details>
  );
}


