'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RecipeDetail } from '@/components/RecipeDetail';
import { Meal } from '@/lib/types';
import { getMealById } from '@/lib/api';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

function RecipePageContent({ id }: { id: string }) {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadMeal = async () => {
      setIsLoading(true);
      try {
        const result = await getMealById(id);
        setMeal(result);
      } catch (error) {
        console.error('Failed to load meal:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMeal();
  }, [id]);

  if (isLoading) {
    return (
      <>
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="space-y-8 animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-96 bg-muted rounded-lg" />
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-32 bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!meal) {
    return (
      <>
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Recipe Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The recipe you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Recipe Detail Component */}
          <RecipeDetail meal={meal} />
        </div>
      </section>
    </>
  );
}

export default function RecipePage({ params }: RecipePageProps) {
  const [id, setId] = useState<string>('');

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <Suspense>
          <RecipePageContent id={id} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
