"use client";

import { motion } from "framer-motion";
import { Clock, Users, Flame } from "lucide-react";
import { Meal } from "@/lib/types";
import { extractIngredients } from "@/lib/api";
import { useFavorites } from "@/lib/FavoritesContext";
import { useState } from "react";

interface RecipeDetailProps {
  meal: Meal;
}

export function RecipeDetail({ meal }: RecipeDetailProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);

  const favorited = isFavorite(meal.idMeal);
  const ingredients = extractIngredients(meal);

  const handleFavoriteClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (favorited) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden border border-border"
        >
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Info Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {meal.strMeal}
            </h1>
            <div className="flex gap-2">
              <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                {meal.strCategory}
              </span>
              <span className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
                {meal.strArea} Cuisine
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Prep Time</p>
              <p className="font-bold text-foreground">30 min</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Servings</p>
              <p className="font-bold text-foreground">4</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Flame className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Difficulty</p>
              <p className="font-bold text-foreground">Medium</p>
            </div>
          </div>

          {/* Favorite Button */}
          <motion.button
            onClick={handleFavoriteClick}
            className={`w-full py-3 px-4 rounded-lg font-bold transition-colors text-lg ${
              favorited
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-secondary text-secondary-foreground"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {favorited ? "Saved to Favorites" : "Save to Favorites"}
          </motion.button>

          {/* Video Link */}
          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3 px-4 rounded-lg font-bold border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              Watch on YouTube
            </a>
          )}
        </motion.div>
      </div>

      {/* Ingredients and Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ingredients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ingredients
          </h2>
          <ul className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.02 }}
                className="flex items-start gap-3 pb-3 border-b border-border last:border-0"
              >
                <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {ingredient.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {ingredient.measure}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Instructions
          </h2>
          <div className="prose prose-invert max-w-none">
            {meal.strInstructions.split(".").map(
              (instruction, index) =>
                instruction.trim() && (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="text-muted-foreground mb-4 leading-relaxed"
                  >
                    <span className="font-bold text-primary">{index + 1}.</span>{" "}
                    {instruction.trim()}
                  </motion.p>
                ),
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
