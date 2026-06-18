export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground md:flex-row md:px-8">
        <span>
          <span className="font-display font-bold text-foreground">prompt</span>
          <span className="font-display font-bold text-primary">forge</span>
        </span>
        <span>Polished AI prompts, generated in seconds.</span>
      </div>
    </footer>
  );
}
