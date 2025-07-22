import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CartItem from '@/components/cart/CartItem';
import { useCart } from '@/context/CartContext';

const Cart: React.FC = () => {
  const { items, totalItems, totalPriceNGN, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-24 w-24 text-slate-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-slate-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/products">
            <Button>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const subtotalUSD = totalPriceNGN / 1500; // Reverse-engineer USD from NGN using fixed rate of 1500
  const shippingUSD = subtotalUSD >= 50 ? 0 : 5.99;
  const taxUSD = subtotalUSD * 0.08; // 8% tax
  const totalUSD = subtotalUSD + shippingUSD + taxUSD;

  const shippingNGN = shippingUSD * 1500;
  const taxNGN = taxUSD * 1500;
  const totalNGN = totalUSD * 1500;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/products" className="inline-flex items-center text-blue-600 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Cart Items ({totalItems})</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Clear Cart
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-0">
                {items.map((item) => (
                  <CartItem key={item.id} item={item as import('@/types').CartItem} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>${subtotalUSD.toFixed(2)} USD / ₦{totalPriceNGN.toLocaleString()} NGN</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingUSD === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `$${shippingUSD.toFixed(2)} USD / ₦${shippingNGN.toLocaleString()} NGN`
                  )}
                </span>
              </div>
              
              {shippingUSD === 0 && (
                <p className="text-sm text-green-600">
                  ✓ You qualify for free shipping!
                </p>
              )}
              
              {shippingUSD > 0 && (
                <p className="text-sm text-slate-600">
                  Add ${(50 - subtotalUSD).toFixed(2)} more for free shipping
                </p>
              )}
              
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${taxUSD.toFixed(2)} USD / ₦{taxNGN.toLocaleString()} NGN</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${totalUSD.toFixed(2)} USD / ₦{totalNGN.toLocaleString()} NGN</span>
              </div>
              
              <Link to="/checkout" className="w-full">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>
              
              <p className="text-xs text-slate-500 text-center">
                Secure checkout powered by Paystack
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;