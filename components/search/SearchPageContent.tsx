"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { RecipeGrid } from "@/components/RecipeGrid";
import { Pagination } from "@/components/Pagination";
import { Meal } from "@/lib/types";
import { searchMeals } from "@/lib/api";

const ITEMS_PER_PAGE = 9;

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadMeals = async () => {
      setIsLoading(true);
      setCurrentPage(1);

      try {
        if (query.trim()) {
          const results = await searchMeals(query);
          setMeals(results);
        } else {
          setMeals([]);
        }
      } catch (error) {
        console.error("Failed to search meals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMeals();
  }, [query]);

  const totalPages = Math.ceil(meals.length / ITEMS_PER_PAGE);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;

  const currentMeals = meals.slice(startIdx, endIdx);

  return (
    <>
      {/* Search Header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-primary/10 to-secondary/10 py-12 md:py-16"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-2"
          >
            Search Results
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            {query
              ? `Results for "${query}"`
              : "Enter a search term to find recipes"}
          </motion.p>
        </div>
      </motion.section>

      {/* Results Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          {!query ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center py-16"
            >
              <p className="text-lg text-muted-foreground">
                Enter a search term to discover recipes
              </p>
            </motion.div>
          ) : isLoading ? (
            <RecipeGrid meals={[]} isLoading />
          ) : meals.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center py-16"
            >
              <p className="text-lg text-muted-foreground mb-4">
                No recipes found for &quot;{query}&quot;
              </p>

              <p className="text-sm text-muted-foreground">
                Try searching for different ingredients or dishes
              </p>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <p className="text-muted-foreground">
                  Found{" "}
                  <span className="font-bold text-foreground">
                    {meals.length}
                  </span>{" "}
                  recipes
                </p>
              </motion.div>

              <RecipeGrid meals={currentMeals} isLoading={false} />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
