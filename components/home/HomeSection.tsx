"use client";

// Imports
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomeSection() {
  // Hooks
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Handle search form submit
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24 min-h-screen"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-foreground mb-4"
          >
            Welcome to RecipeHub
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Discover thousands of delicious recipes from around the world. Save
            your favorites and explore new culinary adventures.
          </motion.p>

          {/* Search Form */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              {/* Search Icon */}
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-muted-foreground"
              />

              {/* Search Input */}
              <input
                type="text"
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value)
                }
                placeholder="Search for recipes..."
                className="w-full h-14 rounded-full border border-border bg-background/90 backdrop-blur-sm pl-12 pr-4 text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </motion.form>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Explore Recipes Button */}
            <Link
              href="/search?q=dessert"
              className="px-8 py-3 rounded-lg bg-primary text-white font-bold"
            >
              Explore Recipes
            </Link>

            {/* Favorites Button */}
            <Link
              href="/favorites"
              className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors"
            >
              My Favorites
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
