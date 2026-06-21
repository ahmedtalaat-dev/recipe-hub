'use client';

import { motion } from 'framer-motion';
import { Meal } from '@/lib/types';
import { RecipeCard } from './RecipeCard';

interface RecipeGridProps {
  meals: Meal[];
  isLoading?: boolean;
}

export function RecipeGrid({ meals, isLoading = false }: RecipeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-card rounded-lg overflow-hidden border border-border"
          >
            <div className="h-56 bg-muted animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-10 bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-lg text-muted-foreground mb-2">No recipes found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or exploring our featured recipes
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal, index) => (
        <motion.div
          key={meal.idMeal}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <RecipeCard meal={meal} />
        </motion.div>
      ))}
    </div>
  );
}
