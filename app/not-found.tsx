"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        
        {/* Icon / Emoji */}
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground text-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          🍽️
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground mb-2">
          404 - Page Not Found
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">

          <Link href="/">
            <motion.div
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-4 h-4" />
              Home
            </motion.div>
          </Link>

          <Link href="/search">
            <motion.div
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg border border-border bg-card text-foreground font-bold hover:bg-muted transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-4 h-4" />
              Search Recipes
            </motion.div>
          </Link>

        </div>

        {/* Back */}
        <button
          onClick={() => window.history.back()}
          className="mt-6 text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}