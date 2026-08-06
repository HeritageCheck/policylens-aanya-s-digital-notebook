import { Search } from "lucide-react";

export function SearchBar({
  value,
  onChange,
  placeholder = "Search writing…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="group flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft transition-all duration-300 focus-within:border-sage/60 focus-within:shadow-lift sm:max-w-sm">
      <Search className="size-4 shrink-0 text-muted-foreground transition-colors group-focus-within:text-sage" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
    </label>
  );
}
