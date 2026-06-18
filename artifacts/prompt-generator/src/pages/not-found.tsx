import { Link } from "wouter";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="mx-auto max-w-md text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">404</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Page not found
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            The page you're looking for doesn't exist or may have moved.
          </p>
          <Button asChild size="lg" className="rounded-full px-8 font-semibold shadow-sm">
            <Link href="/" data-testid="button-notfound-home">Back to generator</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
