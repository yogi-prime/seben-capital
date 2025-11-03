'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Layers, Calculator, Info } from "lucide-react";

const Header = () => {
  const pathname = usePathname();

  const mobileNav = [
    { name: "Home", href: "/", icon: Home, isActive: pathname === "/" },
    { name: "Educaton", href: "/education", icon: BookOpen, isActive: pathname.startsWith("/courses") },
    { name: "Services", href: "/services", icon: Layers, isActive: pathname === "/services", isCenter: true },
    { name: "Tools", href: "/tools", icon: Calculator, isActive: pathname.startsWith("/tools") },
    { name: "About", href: "/about", icon: Info, isActive: pathname === "/about" },
  ];

  const desktopNav = [
    { name: "Education", href: "/education" },
    { name: "Services", href: "/services" },
    { name: "Tools", href: "/tools" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <header className="fixed lg:sticky top-0 inset-x-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 lg:h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" aria-label="Seben Capital home">
            <Image
              src="/seben-c.png"
              alt="Seben Capital"
              width={120}
              height={36}
              className="h-8 w-auto sm:h-9 object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Primary">
            {desktopNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:text-copper-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="https://wa.me/919737965552"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Talk to Us
            </a>
            <Link
              href="/education"
              className="rounded-md px-4 py-2 bg-gradient-copper hover:scale-105 transition-transform text-white text-sm font-medium"
            >
              Explore Utkarsh
            </Link>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="lg:hidden" style={{ height: "calc(56px + env(safe-area-inset-top, 0px))" }} />

      {/* Bottom Nav (Mobile/Tablet) */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0E0F12] border-t border-border/20 rounded-t-2xl shadow-2xl shadow-copper-primary/10"
        aria-label="Mobile"
      >
        <div className="flex items-center justify-around px-4 py-2 relative">
          {mobileNav.map((item) => {
            const Icon = item.icon;

            if (item.isCenter) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex flex-col items-center justify-center relative group"
                  aria-label={item.name}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center -mt-6 shadow-lg transition-all duration-300 ${
                      item.isActive
                        ? "bg-gradient-copper shadow-copper-primary/30 animate-pulse"
                        : "bg-gradient-copper hover:shadow-copper-primary/40 hover:scale-105"
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`text-xs mt-1 transition-colors duration-200 font-medium ${
                      item.isActive ? "text-copper-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </span>
                  <div className="absolute -top-6 w-16 h-16 rounded-full border-2 border-copper-primary/30 animate-ping opacity-20" />
                </Link>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center py-2 px-1 min-w-[60px] group relative transition-all duration-200 hover:scale-105"
                aria-label={item.name}
              >
                <div className="relative">
                  <Icon
                    className={`w-6 h-6 transition-all duration-200 ${
                      item.isActive ? "text-copper-primary" : "text-muted-foreground group-hover:text-copper-secondary"
                    }`}
                    strokeWidth={item.isActive ? 2 : 1.5}
                  />
                  {item.isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-copper-primary animate-pulse" />
                  )}
                </div>
                <span
                  className={`text-xs mt-1 transition-all duration-200 font-medium ${
                    item.isActive ? "text-copper-primary font-semibold" : "text-muted-foreground group-hover:text-copper-secondary"
                  }`}
                >
                  {item.name}
                </span>
                <div className="absolute inset-0 rounded-lg bg-copper-primary/10 opacity-0 group-active:opacity-100 transition-opacity duration-150" />
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="h-16 lg:h-0" />
    </>
  );
};

export default Header;
