import { Layers } from "lucide-react";
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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Layers className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold font-display tracking-tight text-foreground">
            prompt<span className="text-primary">forge</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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
          className="rounded-full px-5 font-semibold shadow-sm"
          data-testid="button-nav-cta"
        >
          <Link href="/">Try it free</Link>
        </Button>
      </div>
    </header>
  );
}
