export interface CartItem {
  productId: string;
  quantity: number;
  price:number  
}

export interface Cart{
  currentCart:CartItem[]
}