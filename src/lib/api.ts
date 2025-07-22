import axios, { AxiosInstance } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// product API
// create product
export const createProduct = async (data: {
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  stock: number;
}) => {
  return await api.post('/products', data);
};

// get all products
export const fetchProducts = async (): Promise<any[]> => {
  const response = await api.get('/products');
  return response.data;
};

// get product by ID
export const fetchProductById = async (id: string): Promise<any> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};


// user API
// register user
export const registerUser = async (data: { name: string; email: string; password: string }): Promise<any> => {
  const response = await api.post('/users/register', data);
  return response.data;
};

// login user
export const loginUser = async (data: { email: string; password: string }): Promise<any> => {
  const response = await api.post('/users/login', data);
  return response.data;
};
// get user by ID
export const getUser = async (id: string): Promise<any> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
// get all users
export const getUsers = async () => {
  return await api.get('/users');
};


// order API
// create order
export const createOrder = async (data: {
  user: string;
  products: { product: string; quantity: number }[];
  totalPrice: number;
  shippingAddress: string;
  paymentMethod: string;
}): Promise<any> => {
  const response = await api.post('/orders', data);
  return response.data;
};

// get all orders
export const getOrders = async () => {
  return await api.get('/orders');
};

// get order by ID
export const getOrderById = async (id: string): Promise<any> => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// cart API
// add item to cart
export const addToCart = async (data: { productId: string; quantity: number }) => {
  return await api.post('/cart', data);
};

//get cart
export const getCart = async () => {
  return await api.get('/cart');
};

// update cart item
export const updateCartItem = async (data: { productId: string; quantity: number }) => {
  return await api.patch('/cart/item', data);
};

// remove item from cart
export const removeFromCart = async (productId: string) => {
  return await api.delete(`/cart/item/${productId}`);
}

// // clear cart
// export const clearCart = async () => {
//   return await api.delete('/cart/clear');
// };


// payment API
// get currency rate
export const getCurrencyRate = async () => {
  return await api.get('/currency-rate');
};

// initialize and verify payment
export const initializePayment = async (email: string, amount: number) => {
  return await api.post('/api/initialize-payment', { email, amount });
};

export const verifyPayment = async (reference: string) => {
  return await api.post('/verify-payment', { reference });
};

export default api;