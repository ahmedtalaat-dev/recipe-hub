import { Suspense } from 'react';
import { Metadata } from 'next';
import { getMealById } from '@/lib/api';
import { RecipePageContent } from '@/components/search/RecipePageContent';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const meal = await getMealById(id);

  const title = meal ? `${meal.strMeal} | RecipeHub` : 'Recipe Not Found';
  const description = meal
    ? `Learn how to make ${meal.strMeal}. A delicious ${meal.strCategory} recipe from ${meal.strArea} cuisine.`
    : 'The recipe you are looking for does not exist or has been removed.';
  const image = meal?.strMealThumb ?? '/og-default.jpg';

  return {
    title,
    description,

    icons: {
      icon: image,
      apple: image,
    },

    // OG data
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: meal?.strMeal ?? 'Recipe',
        },
      ],
      type: 'article',
    },

    // Twitter card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function RecipePage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <Suspense>
          <RecipePageContent id={id} />
        </Suspense>
      </main>
    </div>
  );
}