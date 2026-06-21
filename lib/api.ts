import { Meal, MealSearchResult, Ingredient } from './types';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function searchMeals(query: string): Promise<Meal[]> {
  const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  const data: MealSearchResult = await response.json();
  return data.meals || [];
}

export async function getMealById(id: string): Promise<Meal | null> {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data: MealSearchResult = await response.json();
  return data.meals?.[0] || null;
}

export async function getRandomMeal(): Promise<Meal | null> {
  const response = await fetch(`${BASE_URL}/random.php`);
  const data: MealSearchResult = await response.json();
  return data.meals?.[0] || null;
}

export async function getMealsByCategory(category: string): Promise<Meal[]> {
  const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  const data = await response.json();
  return data.meals || [];
}

export function extractIngredients(meal: Meal): Ingredient[] {
  const ingredients: Ingredient[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    
    const ingredient = meal[ingredientKey];
    const measure = meal[measureKey];
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || '',
      });
    }
  }
  
  return ingredients;
}
