import { Link } from "wouter";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    step: "1",
    title: "Describe your idea",
    body: "Type a rough idea or task. No need to be precise — that's our job.",
  },
  {
    step: "2",
    title: "Tune the details",
    body: "Optionally set use case, tone, format, and target model under Advanced options.",
  },
  {
    step: "3",
    title: "Generate & copy",
    body: "Get a structured, model-ready prompt and copy it with a single click.",
  },
];

export default function HowItWorks() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8 md:py-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground shadow-sm">
              <span>How it works</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              From rough idea to polished prompt.
            </h1>
            <p className="text-lg text-muted-foreground">
              Turn a quick note into a structured, copy-ready AI prompt in three simple steps.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
                data-testid={`card-step-${item.step}`}
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground font-display">
                  {item.step}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button asChild size="lg" className="rounded-full px-8 font-semibold shadow-sm">
              <Link href="/" data-testid="button-how-cta">Start generating</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
