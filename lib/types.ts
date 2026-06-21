export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  [key: string]: string;
}

export interface MealSearchResult {
  meals: Meal[] | null;
}

export interface Ingredient {
  name: string;
  measure: string;
}
