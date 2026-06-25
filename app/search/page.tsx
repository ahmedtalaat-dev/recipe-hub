import SearchPageContent from "@/components/search/SearchPageContent";
import { Suspense } from "react";

export default function SearchPage() {
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
