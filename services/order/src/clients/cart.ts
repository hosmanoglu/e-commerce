import { IncomingHttpHeaders } from 'http';
import ApiService from './client';
import { Cart } from '../types/cart';
const CART_SERVICE_URL = process.env.CART_SERVICE_URL as string;

const client = new ApiService(CART_SERVICE_URL);

async function getCart( headers: IncomingHttpHeaders) {
  return client.get<Cart>('/cart', headers);
}

async function clearCart( headers: IncomingHttpHeaders) {
  return client.post<Cart>('/cart/clear',{}, headers);
}

export { getCart ,clearCart};
