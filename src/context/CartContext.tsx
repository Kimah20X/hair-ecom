import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number; // USD price
  image: string;
}

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPriceUSD: number;
  totalPriceNGN: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType extends CartState {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  convertToNGN: (amountUSD: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const EXCHANGE_RATE = 1500; // 1 USD = 1500 NGN (fixed rate)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      const updatedItems = existingItem
        ? state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { id: action.payload.id, product: action.payload, quantity: 1 }];
      return calculateTotals({ ...state, items: updatedItems });
    }
    case 'REMOVE_ITEM': {
      return calculateTotals({
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      });
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = action.payload.quantity <= 0
        ? state.items.filter(item => item.id !== action.payload.id)
        : state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          );
      return calculateTotals({ ...state, items: updatedItems });
    }
    case 'CLEAR_CART': {
      return { items: [], totalItems: 0, totalPriceUSD: 0, totalPriceNGN: 0 };
    }
    case 'LOAD_CART': {
      return calculateTotals({ ...state, items: action.payload });
    }
    default: {
      return state;
    }
  }
};

const calculateTotals = (state: CartState): CartState => {
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPriceUSD = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalPriceNGN = totalPriceUSD * EXCHANGE_RATE;

  return { ...state, totalItems, totalPriceUSD, totalPriceNGN };
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalPriceUSD: 0,
    totalPriceNGN: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart) as CartItem[];
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage on items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeFromCart = (productId: string) => dispatch({ type: 'REMOVE_ITEM', payload: productId });
  const updateQuantity = (productId: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const convertToNGN = (amountUSD: number): number => amountUSD * EXCHANGE_RATE;

  const value: CartContextType = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    convertToNGN,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
