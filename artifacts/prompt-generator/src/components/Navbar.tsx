import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Generator", testId: "link-nav-generator" },
  { href: "/how-it-works", label: "How it works", testId: "link-nav-how" },
];

export default function Navbar() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-end gap-2 px-4 md:px-8">
        <nav className="flex flex-1 items-center justify-center gap-4 sm:absolute sm:left-1/2 sm:flex-none sm:-translate-x-1/2 sm:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-foreground",
                location === link.href ? "text-foreground" : "text-muted-foreground",
              )}
              data-testid={link.testId}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          asChild
          className="shrink-0 rounded-full px-4 font-semibold shadow-sm sm:px-5"
          data-testid="button-nav-cta"
        >
          <Link href="/">Try it free</Link>
        </Button>
      </div>
    </header>
  );
}
