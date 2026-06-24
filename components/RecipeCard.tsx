'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Meal } from '@/lib/types';
import { useFavorites } from '@/lib/FavoritesContext';
import { useState } from 'react';

interface RecipeCardProps {
  meal: Meal;
}

export function RecipeCard({ meal }: RecipeCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);

  const favorited = isFavorite(meal.idMeal);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (favorited) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  };

  return (
    <Link href={`/recipe/${meal.idMeal}`}>
      <motion.div
        className="h-full bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-all cursor-pointer group"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted h-48 sm:h-56">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Meal Name */}
          <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-2">{meal.strMeal}</h3>

          {/* Category & Area */}
          <div className="flex gap-2 mb-4 text-xs">
            <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
              {meal.strCategory}
            </span>
            <span className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground">
              {meal.strArea}
            </span>
          </div>

          {/* Favorite Button */}
          <motion.button
            onClick={handleFavoriteClick}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              favorited
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isAnimating ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >

            </motion.div>
            {favorited ? 'Saved' : 'Save Recipe'}
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
}
