import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductGrid from '@/components/product/ProductGrid';
import { fetchProducts } from '@/lib/api';
// import { products } from '@/data/products';
const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.filter(p => p.reviewCount > 200).slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden w-full">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your Hair with Premium Care
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Discover professional-grade hair products for every hair type.
                From nourishing shampoos to styling essentials, find everything you need for beautiful, healthy hair.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
                  >
                    Shop All Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/hair-care-guide">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 text-lg"
                  >
                    Hair Care Guide
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg"
                  alt="Beautiful hair transformation"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-700/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-700/30 to-transparent"></div>
      </section>

      {/* Features */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2 text-slate-900">Free Shipping</h3>
                <p className="text-sm text-slate-600">Free delivery on orders over $50</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2 text-slate-900">Secure Payment</h3>
                <p className="text-sm text-slate-600">100% secure payment processing</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2 text-slate-900">30-Day Returns</h3>
                <p className="text-sm text-slate-600">Easy returns within 30 days</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2 text-slate-900">Premium Quality</h3>
                <p className="text-sm text-slate-600">Professional salon-grade products</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">Featured Products</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Discover our handpicked selection of premium hair care products that deliver exceptional results.
            </p>
          </div>
          {loading ? (
            <p className="text-center text-slate-600">Loading products...</p>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
          <div className="text-center mt-8">
            <Link to="/products">
              <Button
                variant="outline"
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600 font-semibold px-8"
              >
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-slate-50 py-16 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">Best Sellers</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Our most popular products loved by thousands of customers worldwide.
            </p>
          </div>
          {loading ? (
            <p className="text-center text-slate-600">Loading products...</p>
          ) : (
            <ProductGrid products={bestSellers} />
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Stay Beautiful</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
            Subscribe to our newsletter for exclusive offers, hair care tips, and early access to new products.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-slate-900 border-0 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 px-6 font-semibold">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-slate-400 mt-4">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
