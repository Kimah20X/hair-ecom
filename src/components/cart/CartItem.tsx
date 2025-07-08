import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const itemTotal = item.product.price * item.quantity;

  return (
    <div className="flex gap-4 py-4 border-b border-slate-200 last:border-b-0">
      {/* Product image */}
      <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded-md bg-slate-100"
        />
      </Link>

      {/* Product details */}
      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.product.id}`}>
          <h3 className="font-medium text-slate-900 hover:text-blue-600 transition-colors line-clamp-2">
            {item.product.name}
          </h3>
        </Link>
        <p className="text-sm text-slate-600 mt-1">{item.product.brand}</p>
        
        {/* Mobile price */}
        <div className="flex items-center gap-2 mt-2 md:hidden">
          <span className="font-semibold text-slate-900">
            ${item.product.price.toFixed(2)}
          </span>
          {item.product.originalPrice && (
            <span className="text-sm text-slate-500 line-through">
              ${item.product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock status */}
        {!item.product.inStock && (
          <p className="text-sm text-red-600 mt-1">Out of stock</p>
        )}
        {item.product.inStock && item.product.stockCount <= 10 && (
          <p className="text-sm text-orange-600 mt-1">
            Only {item.product.stockCount} left in stock
          </p>
        )}
      </div>

      {/* Desktop price */}
      <div className="hidden md:flex flex-col items-end justify-start min-w-0 w-24">
        <span className="font-semibold text-slate-900">
          ${item.product.price.toFixed(2)}
        </span>
        {item.product.originalPrice && (
          <span className="text-sm text-slate-500 line-through">
            ${item.product.originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* Quantity controls */}
      <div className="flex flex-col items-center justify-start gap-2 min-w-0 w-24">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="px-3 py-1 min-w-[2rem] text-center text-sm">
            {item.quantity}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={item.quantity >= item.product.stockCount}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeFromCart(item.id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Total */}
      <div className="hidden md:flex flex-col items-end justify-start min-w-0 w-24">
        <span className="font-semibold text-slate-900">
          ${itemTotal.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;