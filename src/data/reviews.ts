import { Review } from '@/types';

export const reviews: Review[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    productId: '1',
    rating: 5,
    title: 'Amazing results for dry hair!',
    comment: 'This shampoo has completely transformed my dry, damaged hair. After just two weeks of use, my hair feels softer, looks shinier, and is much more manageable. The argan oil really makes a difference!',
    createdAt: new Date('2024-01-15'),
    helpful: 23,
    verified: true
  },
  {
    id: '2',
    userId: '2',
    userName: 'Michael Chen',
    userAvatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
    productId: '1',
    rating: 4,
    title: 'Good product, pleasant scent',
    comment: 'Great shampoo with a lovely floral scent that\'s not overwhelming. My wife and I both use it and love how clean our hair feels without being stripped of natural oils.',
    createdAt: new Date('2024-01-10'),
    helpful: 15,
    verified: true
  },
  {
    id: '3',
    userId: '3',
    userName: 'Emma Rodriguez',
    userAvatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg',
    productId: '2',
    rating: 5,
    title: 'Best hair mask I\'ve ever used!',
    comment: 'This keratin mask is incredible! My hair was severely damaged from bleaching, and this mask has brought it back to life. I use it twice a week and the results are amazing.',
    createdAt: new Date('2024-01-08'),
    helpful: 31,
    verified: true
  },
  {
    id: '4',
    userId: '4',
    userName: 'David Park',
    userAvatar: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg',
    productId: '3',
    rating: 4,
    title: 'Great volume without the weight',
    comment: 'Finally found a volumizing spray that doesn\'t make my fine hair feel sticky or heavy. Gives great lift at the roots and lasts most of the day.',
    createdAt: new Date('2024-01-05'),
    helpful: 8,
    verified: true
  },
  {
    id: '5',
    userId: '5',
    userName: 'Lisa Thompson',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    productId: '4',
    rating: 5,
    title: 'Holy grail leave-in conditioner!',
    comment: 'This leave-in conditioner is a game-changer! It detangles my thick, curly hair effortlessly and keeps it moisturized all day. The UV protection is a bonus!',
    createdAt: new Date('2024-01-03'),
    helpful: 19,
    verified: true
  }
];