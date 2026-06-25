"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RecipeGrid } from "@/components/RecipeGrid";
import { Pagination } from "@/components/Pagination";
import { useFavorites } from "@/lib/FavoritesContext";
import Link from "next/link";
import { Heart } from "lucide-react";

const ITEMS_PER_PAGE = 9;

export default function FavoritesPageContent() {
  const { favorites } = useFavorites();

  const [isHydrated, setIsHydrated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Reset page when favorites change
  useEffect(() => {
    setCurrentPage(1);
  }, [favorites.length]);

  // Pagination calculations
  const totalPages = Math.ceil(favorites.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;

  // Slice favorites for current page
  const currentFavorites = favorites.slice(startIdx, endIdx);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Show loading state until hydration is complete
  if (!isHydrated) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <main className="flex-1">
          <section className="py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <RecipeGrid meals={[]} isLoading={true} />
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Header Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary/10 to-secondary/10 py-12 md:py-16"
        >
          <div className="max-w-6xl mx-auto px-4">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 mb-2"
            >
              <Heart className="w-8 h-8 text-primary fill-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                My Favorite Recipes
              </h1>
            </motion.div>

            {/* Subtitle with count */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              {favorites.length === 0
                ? "You haven't saved any recipes yet"
                : `You have ${favorites.length} favorite recipe${
                    favorites.length !== 1 ? "s" : ""
                  }`}
            </motion.p>
          </div>
        </motion.section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            {/* Empty state */}
            {favorites.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🍽️</div>

                <h2 className="text-2xl font-bold text-foreground mb-3">
                  No Favorites Yet
                </h2>

                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Start exploring recipes and save your favorites to keep track
                  of dishes you love!
                </p>

                <Link
                  href="/search?q=popular"
                  className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
                >
                  Explore Recipes
                </Link>
              </motion.div>
            ) : (
              <>
                {/* Count info */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6"
                >
                  <p className="text-muted-foreground">
                    Showing{" "}
                    <span className="font-bold text-foreground">
                      {favorites.length}
                    </span>{" "}
                    favorite{favorites.length !== 1 ? "s" : ""}
                  </p>
                </motion.div>

                {/* Favorites Grid */}
                <RecipeGrid meals={currentFavorites} isLoading={false} />

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mt-12"
                >
                  <Link
                    href="/search?q=chicken"
                    className="inline-block px-8 py-3 rounded-lg bg-secondary text-secondary-foreground font-bold hover:opacity-90 transition-opacity"
                  >
                    Discover More Recipes
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
