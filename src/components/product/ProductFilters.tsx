import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { FilterState } from '@/types';
import { categories, brands } from '@/data/products';

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const [openSections, setOpenSections] = React.useState({
    category: true,
    brand: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.category, categoryId]
      : filters.category.filter(id => id !== categoryId);
    
    onFiltersChange({
      ...filters,
      category: newCategories,
    });
  };

  const handleBrandChange = (brandId: string, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brand, brandId]
      : filters.brand.filter(id => id !== brandId);
    
    onFiltersChange({
      ...filters,
      brand: newBrands,
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [values[0], values[1]],
    });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      rating: filters.rating === rating ? 0 : rating,
    });
  };

  const handleInStockChange = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      inStock: checked,
    });
  };

  const hasActiveFilters = 
    filters.category.length > 0 ||
    filters.brand.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 100 ||
    filters.rating > 0 ||
    filters.inStock;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-slate-600 hover:text-slate-900"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active filters */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">Active Filters:</p>
          <div className="flex flex-wrap gap-1">
            {filters.category.map(categoryId => {
              const category = categories.find(c => c.id === categoryId);
              return category ? (
                <Badge
                  key={categoryId}
                  variant="secondary"
                  className="text-xs cursor-pointer hover:bg-slate-200"
                  onClick={() => handleCategoryChange(categoryId, false)}
                >
                  {category.name}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ) : null;
            })}
            {filters.brand.map(brandId => {
              const brand = brands.find(b => b.id === brandId);
              return brand ? (
                <Badge
                  key={brandId}
                  variant="secondary"
                  className="text-xs cursor-pointer hover:bg-slate-200"
                  onClick={() => handleBrandChange(brandId, false)}
                >
                  {brand.name}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ) : null;
            })}
            {filters.rating > 0 && (
              <Badge
                variant="secondary"
                className="text-xs cursor-pointer hover:bg-slate-200"
                onClick={() => handleRatingChange(0)}
              >
                {filters.rating}+ Stars
                <X className="h-3 w-3 ml-1" />
              </Badge>
            )}
            {filters.inStock && (
              <Badge
                variant="secondary"
                className="text-xs cursor-pointer hover:bg-slate-200"
                onClick={() => handleInStockChange(false)}
              >
                In Stock
                <X className="h-3 w-3 ml-1" />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Category filter */}
      <Collapsible
        open={openSections.category}
        onOpenChange={() => toggleSection('category')}
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-0 font-medium text-left">
          Category
          <span className="text-slate-400">
            {openSections.category ? '−' : '+'}
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.category.includes(category.id)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category.id, checked as boolean)
                }
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm text-slate-700 cursor-pointer flex-1"
              >
                {category.name}
              </label>
              <span className="text-xs text-slate-500">
                ({category.count})
              </span>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Brand filter */}
      <Collapsible
        open={openSections.brand}
        onOpenChange={() => toggleSection('brand')}
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-0 font-medium text-left">
          Brand
          <span className="text-slate-400">
            {openSections.brand ? '−' : '+'}
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={filters.brand.includes(brand.id)}
                onCheckedChange={(checked) =>
                  handleBrandChange(brand.id, checked as boolean)
                }
              />
              <label
                htmlFor={`brand-${brand.id}`}
                className="text-sm text-slate-700 cursor-pointer flex-1"
              >
                {brand.name}
              </label>
              <span className="text-xs text-slate-500">
                ({brand.count})
              </span>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Price range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium">Price Range</span>
          <span className="text-sm text-slate-600">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </span>
        </div>
        <Slider
          value={filters.priceRange}
          onValueChange={handlePriceRangeChange}
          max={100}
          min={0}
          step={5}
          className="w-full"
        />
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <span className="font-medium">Customer Rating</span>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div
              key={rating}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleRatingChange(rating)}
            >
              <Checkbox
                checked={filters.rating === rating}
                readOnly
              />
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-sm text-slate-600 ml-1">& Up</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-3">
        <span className="font-medium">Availability</span>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={filters.inStock}
            onCheckedChange={handleInStockChange}
          />
          <label htmlFor="in-stock" className="text-sm text-slate-700 cursor-pointer">
            In Stock Only
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;