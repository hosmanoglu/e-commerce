import { IncomingHttpHeaders } from 'http';
import ApiService from './client';
import { CartItem } from '../types/cart';
const CATALOG_SERVICE_URL = process.env.CATALOG_SERVICE_URL as string;

const client = new ApiService(CATALOG_SERVICE_URL);

async function checkStocks(products: object, headers: IncomingHttpHeaders) {
  return client.post<[CartItem]>('/stocks/check', products, headers);
}

export { checkStocks };
