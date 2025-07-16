import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useUserStore } from "../stores/useUserStore";
import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";
import HeroSlider from "../components/HeroSlider";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ShoppingBag, Sparkles, TrendingUp } from "lucide-react";

const categories = [
  { name: "Jeans", imageUrl: "/jeans.jpg" },
  { name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { name: "Shoes", imageUrl: "/shoes.jpg" },
  { name: "Glasses", imageUrl: "/glasses.png" },
  { name: "Jackets", imageUrl: "/jackets.jpg" },
  { name: "Suits", imageUrl: "/suits.jpg" },
  { name: "Bags", imageUrl: "/bags.jpg" },
  { name: "Phones", imageUrl: "/phones.jpeg" },
  { name: "Shishas", imageUrl: "/shisha.jpeg" },
  { name: "PC", imageUrl: "/pc.jpeg" },
  { name: "Laptops", imageUrl: "/laptop.jpeg" },
  { name: "Screens", imageUrl: "/screens.jpeg" },
  { name: "Tabacco", imageUrl: "/tabacco.jpeg" },
  { name: "Vibes", imageUrl: "/vibe.jpeg" },
  { name: "Iqoss", imageUrl: "/iqos.jpeg" },
];

const HomePage = () => {
  const { products, fetchFeaturedProducts, loading } = useProductStore();
  const { user } = useUserStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <HeroSlider />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-muted-foreground">
                  Handpicked products from the best brands worldwide
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exclusive Deals</h3>
                <p className="text-muted-foreground">
                  Get the best prices with our exclusive offers and discounts
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Quick and reliable shipping to your doorstep
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
              Explore Categories
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover the joy of shopping with our diverse collection of premium products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryItem key={category.name} category={category} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="px-8 py-3">
              View All Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {!loading && products && products.length > 0 && (
        <FeaturedProducts featuredProducts={products} />
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their shopping needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="px-8 py-3">
              Browse Products
            </Button>
            {!user && (
              <Button variant="outline" size="lg" className="px-8 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20">
                Sign Up Now
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;