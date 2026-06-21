export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-foreground">RecipeHub</h3>
            <p className="text-muted-foreground text-sm">
              Discover thousands of delicious recipes from around the world. Save your favorites and explore new culinary adventures.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/search?q=dessert" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Recipes
                </a>
              </li>
              <li>
                <a href="/favorites" className="text-muted-foreground hover:text-primary transition-colors">
                  My Favorites
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-foreground">Info</h3>
            <p className="text-muted-foreground text-sm">
              Powered by TheMealDB API. Recipes from around the globe at your fingertips.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} RecipeHub. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Built with ❤️ for food lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
