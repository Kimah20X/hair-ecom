import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Argan Oil Shampoo',
    brand: 'LuxeHair',
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    rating: 4.8,
    reviewCount: 342,
    image: 'https://images.pexels.com/photos/7755395/pexels-photo-7755395.jpeg',
    images: [
      'https://images.pexels.com/photos/7755395/pexels-photo-7755395.jpeg',
      'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg',
      'https://images.pexels.com/photos/7755396/pexels-photo-7755396.jpeg'
    ],
    category: 'shampoo',
    subCategory: 'moisturizing',
    description: 'Luxurious argan oil-infused shampoo that deeply nourishes and hydrates dry, damaged hair. Formulated with organic argan oil from Morocco, this premium shampoo restores shine and softness while strengthening hair from root to tip.',
    features: [
      'Organic Moroccan Argan Oil',
      'Sulfate-free formula',
      'Color-safe',
      'Suitable for all hair types',
      'Paraben-free',
      'Cruelty-free'
    ],
    specifications: {
      'Volume': '16 fl oz (473ml)',
      'Hair Type': 'All hair types',
      'Key Ingredients': 'Argan Oil, Keratin, Vitamin E',
      'Fragrance': 'Light floral',
      'pH Level': '5.5-6.5'
    },
    inStock: true,
    stockCount: 45,
    tags: ['organic', 'moisturizing', 'damaged-hair', 'color-safe']
  },
  {
    id: '2',
    name: 'Keratin Repair Hair Mask',
    brand: 'RegenHair',
    price: 32.99,
    rating: 4.9,
    reviewCount: 189,
    image: 'https://images.pexels.com/photos/7755397/pexels-photo-7755397.jpeg',
    images: [
      'https://images.pexels.com/photos/7755397/pexels-photo-7755397.jpeg',
      'https://images.pexels.com/photos/4465832/pexels-photo-4465832.jpeg'
    ],
    category: 'treatment',
    subCategory: 'repair',
    description: 'Intensive keratin hair mask designed to repair and strengthen severely damaged hair. This professional-grade treatment penetrates deep into hair fibers to rebuild structure and restore elasticity.',
    features: [
      'Hydrolyzed Keratin Complex',
      'Deep penetrating formula',
      '10-minute treatment',
      'Professional salon results',
      'Strengthens hair fiber',
      'Reduces breakage by 85%'
    ],
    specifications: {
      'Volume': '8 fl oz (236ml)',
      'Hair Type': 'Damaged, chemically treated',
      'Key Ingredients': 'Hydrolyzed Keratin, Collagen, Biotin',
      'Treatment Time': '10-15 minutes',
      'Usage': '2-3 times per week'
    },
    inStock: true,
    stockCount: 23,
    tags: ['keratin', 'repair', 'intensive', 'damaged-hair']
  },
  {
    id: '3',
    name: 'Volumizing Root Lift Spray',
    brand: 'VoluMax',
    price: 18.99,
    originalPrice: 22.99,
    discount: 17,
    rating: 4.6,
    reviewCount: 267,
    image: 'https://images.pexels.com/photos/7755398/pexels-photo-7755398.jpeg',
    images: [
      'https://images.pexels.com/photos/7755398/pexels-photo-7755398.jpeg',
      'https://images.pexels.com/photos/4465833/pexels-photo-4465833.jpeg'
    ],
    category: 'styling',
    subCategory: 'volume',
    description: 'Lightweight volumizing spray that lifts hair at the roots for maximum volume and body. Perfect for fine, limp hair that needs extra lift and texture without weighing it down.',
    features: [
      'Root-lifting technology',
      'Heat protectant up to 450°F',
      'Long-lasting volume',
      'Weightless formula',
      'Anti-humidity protection',
      'Quick-drying'
    ],
    specifications: {
      'Volume': '6 fl oz (177ml)',
      'Hair Type': 'Fine, thin hair',
      'Key Ingredients': 'Rice Protein, Bamboo Extract, Polymers',
      'Hold Level': 'Light to Medium',
      'Heat Protection': 'Up to 450°F'
    },
    inStock: true,
    stockCount: 67,
    tags: ['volume', 'styling', 'heat-protection', 'fine-hair']
  },
  {
    id: '4',
    name: 'Hydrating Leave-In Conditioner',
    brand: 'AquaLux',
    price: 21.99,
    rating: 4.7,
    reviewCount: 412,
    image: 'https://images.pexels.com/photos/7755399/pexels-photo-7755399.jpeg',
    images: [
      'https://images.pexels.com/photos/7755399/pexels-photo-7755399.jpeg',
      'https://images.pexels.com/photos/4465834/pexels-photo-4465834.jpeg'
    ],
    category: 'conditioner',
    subCategory: 'leave-in',
    description: 'Multi-benefit leave-in conditioner that detangles, moisturizes, and protects hair throughout the day. Enriched with natural oils and proteins for healthy, manageable hair.',
    features: [
      '12-in-1 benefits',
      'Detangles instantly',
      'UV protection',
      'Frizz control',
      'Adds shine',
      'Strengthens hair'
    ],
    specifications: {
      'Volume': '10 fl oz (295ml)',
      'Hair Type': 'All hair types',
      'Key Ingredients': 'Coconut Oil, Shea Butter, Quinoa Protein',
      'SPF': '15',
      'Application': 'Damp or dry hair'
    },
    inStock: true,
    stockCount: 89,
    tags: ['leave-in', 'detangling', 'uv-protection', 'multi-benefit']
  },
  {
    id: '5',
    name: 'Color Protection Shampoo',
    brand: 'ChromaGuard',
    price: 26.99,
    rating: 4.8,
    reviewCount: 298,
    image: 'https://images.pexels.com/photos/7755400/pexels-photo-7755400.jpeg',
    images: [
      'https://images.pexels.com/photos/7755400/pexels-photo-7755400.jpeg',
      'https://images.pexels.com/photos/4465835/pexels-photo-4465835.jpeg'
    ],
    category: 'shampoo',
    subCategory: 'color-safe',
    description: 'Advanced color-protecting shampoo specifically formulated for color-treated hair. Extends color vibrancy while gently cleansing and nourishing damaged cuticles.',
    features: [
      'Color-lock technology',
      'Sulfate-free gentle cleansing',
      'UV filters',
      'Antioxidant complex',
      'Extends color life up to 8 weeks',
      'Salon-grade formula'
    ],
    specifications: {
      'Volume': '16 fl oz (473ml)',
      'Hair Type': 'Color-treated hair',
      'Key Ingredients': 'Sunflower Extract, Vitamin C, Ceramides',
      'Color Safe': 'Yes',
      'pH Level': '4.5-5.5'
    },
    inStock: true,
    stockCount: 34,
    tags: ['color-protection', 'sulfate-free', 'uv-protection', 'color-treated']
  },
  {
    id: '6',
    name: 'Curl Defining Cream',
    brand: 'CurlCraft',
    price: 19.99,
    originalPrice: 24.99,
    discount: 20,
    rating: 4.9,
    reviewCount: 156,
    image: 'https://images.pexels.com/photos/7755401/pexels-photo-7755401.jpeg',
    images: [
      'https://images.pexels.com/photos/7755401/pexels-photo-7755401.jpeg',
      'https://images.pexels.com/photos/4465836/pexels-photo-4465836.jpeg'
    ],
    category: 'styling',
    subCategory: 'curls',
    description: 'Rich, nourishing cream that defines and enhances natural curls while eliminating frizz. Perfect for creating bouncy, well-defined curls that last all day.',
    features: [
      'Frizz elimination',
      'Curl definition and bounce',
      'Long-lasting hold',
      'Humidity resistance',
      'Natural ingredients',
      'No crunchy feel'
    ],
    specifications: {
      'Volume': '8 fl oz (236ml)',
      'Hair Type': 'Curly, wavy hair',
      'Key Ingredients': 'Shea Butter, Jojoba Oil, Flaxseed Extract',
      'Hold Level': 'Medium',
      'Finish': 'Natural, soft'
    },
    inStock: true,
    stockCount: 42,
    tags: ['curls', 'frizz-control', 'defining', 'natural-ingredients']
  }
];

export const categories = [
  { id: 'shampoo', name: 'Shampoo', count: 89 },
  { id: 'conditioner', name: 'Conditioner', count: 67 },
  { id: 'treatment', name: 'Hair Treatment', count: 43 },
  { id: 'styling', name: 'Styling Products', count: 124 },
  { id: 'tools', name: 'Hair Tools', count: 32 },
  { id: 'accessories', name: 'Accessories', count: 18 }
];

export const brands = [
  { id: 'luxehair', name: 'LuxeHair', count: 23 },
  { id: 'regenhair', name: 'RegenHair', count: 18 },
  { id: 'volumax', name: 'VoluMax', count: 15 },
  { id: 'aqualux', name: 'AquaLux', count: 21 },
  { id: 'chromaguard', name: 'ChromaGuard', count: 14 },
  { id: 'curlcraft', name: 'CurlCraft', count: 12 }
];