import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { brands } from '@/data/products';

const Brands: React.FC = () => {
  const featuredBrands = [
    {
      id: 'luxehair',
      name: 'LuxeHair',
      description: 'Premium argan oil-infused hair care products from Morocco. Known for their luxurious formulations and exceptional quality.',
      image: 'https://images.pexels.com/photos/7755395/pexels-photo-7755395.jpeg',
      rating: 4.8,
      productCount: 23,
      specialties: ['Argan Oil', 'Moisturizing', 'Color-Safe'],
      founded: '2015',
      origin: 'Morocco'
    },
    {
      id: 'regenhair',
      name: 'RegenHair',
      description: 'Professional-grade keratin treatments and repair solutions. Trusted by salons worldwide for damaged hair restoration.',
      image: 'https://images.pexels.com/photos/7755397/pexels-photo-7755397.jpeg',
      rating: 4.9,
      productCount: 18,
      specialties: ['Keratin', 'Repair', 'Professional'],
      founded: '2012',
      origin: 'USA'
    },
    {
      id: 'volumax',
      name: 'VoluMax',
      description: 'Innovative volumizing solutions for fine and thin hair. Lightweight formulas that deliver maximum lift and body.',
      image: 'https://images.pexels.com/photos/7755398/pexels-photo-7755398.jpeg',
      rating: 4.6,
      productCount: 15,
      specialties: ['Volume', 'Fine Hair', 'Heat Protection'],
      founded: '2018',
      origin: 'France'
    },
    {
      id: 'aqualux',
      name: 'AquaLux',
      description: 'Hydrating hair care with natural ingredients. Multi-benefit formulas that nourish and protect all hair types.',
      image: 'https://images.pexels.com/photos/7755399/pexels-photo-7755399.jpeg',
      rating: 4.7,
      productCount: 21,
      specialties: ['Hydration', 'Natural', 'Multi-Benefit'],
      founded: '2016',
      origin: 'Australia'
    },
    {
      id: 'chromaguard',
      name: 'ChromaGuard',
      description: 'Advanced color protection technology. Extends color vibrancy and protects against UV damage and fading.',
      image: 'https://images.pexels.com/photos/7755400/pexels-photo-7755400.jpeg',
      rating: 4.8,
      productCount: 14,
      specialties: ['Color Protection', 'UV Filters', 'Salon-Grade'],
      founded: '2014',
      origin: 'Italy'
    },
    {
      id: 'curlcraft',
      name: 'CurlCraft',
      description: 'Specialized curl care and definition products. Natural ingredients that enhance and define curls without crunch.',
      image: 'https://images.pexels.com/photos/7755401/pexels-photo-7755401.jpeg',
      rating: 4.9,
      productCount: 12,
      specialties: ['Curls', 'Natural', 'Frizz Control'],
      founded: '2019',
      origin: 'Brazil'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Discover Premium Hair Care Brands
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Explore our curated collection of world-class hair care brands, each with their own unique expertise and heritage.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  6 Premium Brands
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  100+ Products
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Professional Quality
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Brands */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">Featured Brands</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Each brand in our collection has been carefully selected for their commitment to quality, innovation, and results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBrands.map((brand) => (
                <Card key={brand.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <div className="relative">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-slate-900">
                        <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                        {brand.rating}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-slate-900">{brand.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {brand.productCount} Products
                      </Badge>
                    </div>

                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                      {brand.description}
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex flex-wrap gap-1">
                        {brand.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Founded: {brand.founded}</span>
                        <span>Origin: {brand.origin}</span>
                      </div>
                    </div>

                    <Link to={`/products?brand=${brand.id}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Shop {brand.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Stats */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">6</h3>
                <p className="text-slate-600">Premium Brands</p>
              </div>

              <div className="space-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">4.8</h3>
                <p className="text-slate-600">Average Rating</p>
              </div>

              <div className="space-y-2">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">100+</h3>
                <p className="text-slate-600">Products Available</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Browse our complete product collection or contact our hair care experts for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Browse All Products
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                  Contact Experts
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Brands;