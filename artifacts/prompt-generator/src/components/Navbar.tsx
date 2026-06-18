import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <a href="#top" className="flex items-center gap-2" data-testid="link-logo">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Layers className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold font-display tracking-tight text-foreground">
            prompt<span className="text-primary">forge</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#generator"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            data-testid="link-nav-generator"
          >
            Generator
          </a>
          <a
            href="#how"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            data-testid="link-nav-how"
          >
            How it works
          </a>
        </nav>

        <Button
          asChild
          className="rounded-full px-5 font-semibold shadow-sm"
          data-testid="button-nav-cta"
        >
          <a href="#generator">Try it free</a>
        </Button>
      </div>
    </header>
  );
}
