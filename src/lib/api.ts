import axios, { AxiosInstance } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

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