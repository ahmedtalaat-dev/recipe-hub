'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Meal } from './types';

interface FavoritesContextType {
  favorites: Meal[];
  addFavorite: (meal: Meal) => void;
  removeFavorite: (mealId: string) => void;
  isFavorite: (mealId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('recipe-favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('recipe-favorites', JSON.stringify(favorites));
    }
  }, [favorites, isHydrated]);

  const addFavorite = (meal: Meal) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.idMeal === meal.idMeal)) {
        return prev;
      }
      return [...prev, meal];
    });
  };

  const removeFavorite = (mealId: string) => {
    setFavorites((prev) => prev.filter((m) => m.idMeal !== mealId));
  };

  const isFavorite = (mealId: string) => {
    return favorites.some((m) => m.idMeal === mealId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
