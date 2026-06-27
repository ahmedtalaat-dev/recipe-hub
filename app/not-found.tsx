import Link from "next/link";
import { Home, Compass } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Page Not Found",
  description:
    "The page you are looking for could not be found. It may have been moved, removed, or never existed.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-primary tracking-tight mb-2">
        404
      </h1>

      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Page Not Found
      </h2>

      <p className="text-lg text-muted-foreground max-w-2xl">
        Looks like this recipe is no longer on the menu. The page may have been
        moved, removed, or the link you followed isn't quite right.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Home className="h-5 w-5" />
          Home
        </Link>

        <Link
          href="/search?q=chicken"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Compass className="h-5 w-5" />
          Explore Recipes
        </Link>
      </div>
    </main>
  );
}