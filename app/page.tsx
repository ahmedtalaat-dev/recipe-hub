'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RecipeGrid } from '@/components/RecipeGrid';
import { Meal } from '@/lib/types';
import { getRandomMeal } from '@/lib/api';
import Link from 'next/link';

export default function Home() {
  const [featuredMeals, setFeaturedMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedMeals = async () => {
      setIsLoading(true);
      try {
        // Load 6 random meals for featured section
        const meals: Meal[] = [];
        for (let i = 0; i < 6; i++) {
          const meal = await getRandomMeal();
          if (meal && !meals.some((m) => m.idMeal === meal.idMeal)) {
            meals.push(meal);
          }
        }
        setFeaturedMeals(meals);
      } catch (error) {
        console.error('Failed to load featured meals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedMeals();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24"
        >
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-4"
            >
              Welcome to RecipeHub
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Discover thousands of delicious recipes from around the world. Save your favorites and explore new culinary adventures.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/search?q=dessert"
                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
              >
                Explore Recipes
              </Link>
              <Link
                href="/favorites"
                className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/10 transition-colors"
              >
                My Favorites
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Recipes Section */}
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

        {/* Quick Browse Section */}
        <section className="py-16 bg-card border-y border-border">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Quick Browse
              </h2>
              <p className="text-muted-foreground text-lg">
                Search by cuisine or ingredient
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {['Dessert', 'Seafood', 'Pasta', 'Vegetarian', 'Asian', 'Mexican', 'Italian', 'Indian'].map(
                (category, index) => (
                  <Link
                    key={category}
                    href={`/search?q=${category.toLowerCase()}`}
                    className="p-6 bg-background border border-border rounded-lg hover:border-primary hover:bg-muted transition-all text-center group"
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                      {['🍰', '🦐', '🍝', '🥗', '🍜', '🌮', '🍝', '🍛'][index]}
                    </div>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {category}
                    </p>
                  </Link>
                )
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
