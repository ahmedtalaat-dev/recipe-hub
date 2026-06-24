"use client";

// Imports
import { useState } from "react";
import { motion } from "framer-motion";
import { Meal } from "@/lib/types";
import Link from "next/link";
import HomeSection from "@/components/home/HomeSection";
import FeaturedRecipes from "@/components/home/FeaturedRecipes";

export default function Home() {
  // States
  const [featuredMeals, setFeaturedMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <HomeSection />

        {/* Featured Recipes Section */}
        <FeaturedRecipes />
        

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
              {[
                "Dessert",
                "Seafood",
                "Pasta",
                "Vegetarian",
                "Asian",
                "Mexican",
                "Italian",
                "Indian",
              ].map((category, index) => (
                <Link
                  key={category}
                  href={`/search?q=${category.toLowerCase()}`}
                  className="p-6 bg-background border border-border rounded-lg hover:border-primary hover:bg-muted transition-all text-center group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {["🍰", "🦐", "🍝", "🥗", "🍜", "🌮", "🍝", "🍛"][index]}
                  </div>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {category}
                  </p>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
