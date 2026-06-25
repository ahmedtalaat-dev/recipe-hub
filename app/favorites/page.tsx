import FavoritesPageContent from "@/components/favorites/FavoritesPageContent";
import { Suspense } from "react";
import { Metadata } from "next";

// Metadata
export const metadata: Metadata = {
  title: "My Favorites | RecipeHub",
  description:
    "View and manage your saved favorite recipes in one place.",
};

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
