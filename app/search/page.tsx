import SearchPageContent from "@/components/search/SearchPageContent";
import { Suspense } from "react";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { q: query } = await searchParams;

  return {
    title: query ? `Search Recipes | ${query}` : "Search Recipes",
    description:
      "Search and discover delicious recipes by ingredients, name, or category.",
  };
}

export default async function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <Suspense>
          <SearchPageContent />
        </Suspense>
      </main>
    </div>
  );
}
