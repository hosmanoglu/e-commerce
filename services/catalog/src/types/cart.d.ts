export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart{
  currentCart:[CartItem]
}