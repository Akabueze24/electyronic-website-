import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../header-search-bar/product.service';


export interface CartItem extends Product{
  quantity: number;
  model?: string;
  handle?: string 
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private cart = new BehaviorSubject <CartItem[]>([]);
  cart$ = this.cart.asObservable();

   constructor() {
      const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
      this.cart.next(this.items);
    }
   }

   private saveCart() {
   
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  addToCart(product: Product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.saveCart()
    this.cart.next(this.items);
    
  }

  removeFromCart(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.saveCart()
    this.cart.next(this.items);
  }

  updateQuantity(id: number, change: number) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(id);
      }
      this.saveCart()
      this.cart.next(this.items);
    }
  }

  getTotalPrice(): number {
    return this.items.reduce((sum, i) => sum + i.currentprice * i.quantity, 0);
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.cart.next(this.items);
  }
 }

 
