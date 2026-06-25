import HomeSection from "@/components/home/HomeSection";
import FeaturedRecipes from "@/components/home/FeaturedRecipes";
import QuickBrowse from "@/components/home/QuickBrowse";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <HomeSection />
        <FeaturedRecipes />
        <QuickBrowse />
      </main>
    </div>
  );
}
