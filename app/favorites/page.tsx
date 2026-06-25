import FavoritesPageContent from "@/components/favorites/FavoritesPageContent";
import { Suspense } from "react";

export default function FavoritesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <Suspense>
          <FavoritesPageContent />
        </Suspense>
      </main>
    </div>
  );
}
