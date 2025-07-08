import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilters from '@/components/product/ProductFilters';
import { products } from '@/data/products';
import { FilterState, SortOption } from '@/types';

const sortOptions: SortOption[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'relevance', label: 'Relevance' },
];

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    brand: [],
    priceRange: [0, 100],
    rating: 0,
    inStock: false,
  });
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Initialize filters from URL parameters
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        category: [categoryParam]
      }));
    }

    if (searchQuery) {
      setSortBy('relevance');
    }
  }, [searchParams]);

  const filteredAndSortedProducts = useMemo(() => {
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';
    
    let filtered = products.filter(product => {
      // Search filter
      if (searchQuery) {
        const searchableText = `${product.name} ${product.brand} ${product.description} ${product.features.join(' ')} ${product.tags.join(' ')}`.toLowerCase();
        if (!searchableText.includes(searchQuery)) {
          return false;
        }
      }

      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(product.category)) {
        return false;
      }

      // Brand filter
      if (filters.brand.length > 0 && !filters.brand.some(brandId => 
        product.brand.toLowerCase().replace(/\s+/g, '').includes(brandId))) {
        return false;
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      // Stock filter
      if (filters.inStock && !product.inStock) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        filtered.reverse();
        break;
      case 'relevance':
        if (searchQuery) {
          // Sort by relevance based on search query matches
          filtered.sort((a, b) => {
            const aRelevance = calculateRelevance(a, searchQuery);
            const bRelevance = calculateRelevance(b, searchQuery);
            return bRelevance - aRelevance;
          });
        }
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [filters, sortBy, searchParams]);

  const calculateRelevance = (product: any, query: string): number => {
    let score = 0;
    const lowerQuery = query.toLowerCase();
    
    // Name matches get highest score
    if (product.name.toLowerCase().includes(lowerQuery)) score += 10;
    
    // Brand matches
    if (product.brand.toLowerCase().includes(lowerQuery)) score += 8;
    
    // Category matches
    if (product.category.toLowerCase().includes(lowerQuery)) score += 6;
    
    // Description matches
    if (product.description.toLowerCase().includes(lowerQuery)) score += 4;
    
    // Features matches
    product.features.forEach((feature: string) => {
      if (feature.toLowerCase().includes(lowerQuery)) score += 2;
    });
    
    // Tags matches
    product.tags.forEach((tag: string) => {
      if (tag.toLowerCase().includes(lowerQuery)) score += 1;
    });
    
    return score;
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      brand: [],
      priceRange: [0, 100],
      rating: 0,
      inStock: false,
    });
    setSearchParams({});
  };

  const searchQuery = searchParams.get('search');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-slate-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Hair Care Products'}
          </h1>
          <p className="text-slate-600">
            {searchQuery 
              ? `Found ${filteredAndSortedProducts.length} products matching your search`
              : 'Discover our complete collection of premium hair care products for every hair type and concern.'
            }
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6 gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            {/* Mobile filter trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <ProductFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    onClearFilters={clearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <span className="text-sm text-slate-600 font-medium">
              {filteredAndSortedProducts.length} products found
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View mode */}
            <div className="hidden md:flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white p-6 rounded-lg shadow-sm">
              <ProductFilters
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* Products */}
          <main className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ProductGrid products={filteredAndSortedProducts} />
              
              {filteredAndSortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-slate-400 text-lg mb-4">No products found</div>
                  <p className="text-slate-600 mb-6">
                    {searchQuery 
                      ? `No products match your search for "${searchQuery}". Try different keywords or adjust your filters.`
                      : 'Try adjusting your filters to find what you\'re looking for.'
                    }
                  </p>
                  <Button 
                    onClick={clearFilters} 
                    variant="outline"
                    className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;