// Imports
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RecipeGrid } from "@/components/RecipeGrid";
import { Meal } from "@/lib/types";
import { getAllMeals } from "@/lib/api";
import Link from "next/link";

export default function FeaturedRecipes() {
  // States
  const [featuredMeals, setFeaturedMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedMeals = async () => {
      setIsLoading(true);

      try {
        const meals = await getAllMeals();
        setFeaturedMeals(meals.slice(0, 6));
      } catch (error) {
        console.error("Failed to load featured meals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedMeals();
  }, []);

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Featured Recipes
            </h2>
            <p className="text-muted-foreground text-lg">
              Handpicked culinary gems to inspire your next meal
            </p>
          </motion.div>

          <RecipeGrid meals={featuredMeals} isLoading={isLoading} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="/search?q=chicken"
              className="inline-block px-8 py-3 rounded-lg bg-secondary text-secondary-foreground font-bold hover:opacity-90 transition-opacity"
            >
              Explore More Recipes
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
