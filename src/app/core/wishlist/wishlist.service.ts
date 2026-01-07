import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product-service/product.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Product[] = [];

  private wishlistCount = new BehaviorSubject<number>(0);
  wishlistCount$ = this.wishlistCount.asObservable();

  constructor() {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      this.wishlist = JSON.parse(stored);
      this.wishlistCount.next(this.wishlist.length);
    }
  }

  getWishlist(): Product[] {
    return [...this.wishlist];
  }

  addToWishlist(product: Product) {
    if (!this.wishlist.find(p => p.id === product.id)) {
      this.wishlist.push(product);
      this.save();
    }
  }

  removeFromWishlist(product: Product) {
    this.wishlist = this.wishlist.filter(p => p.id !== product.id);
    this.save();
  }

  clearWishlist() {
    this.wishlist = [];
    this.save();
  }

  isInWishlist(productId: number): boolean {
    return this.wishlist.some(p => p.id === productId);
  }

  toggleWishlist(product: Product) {
    if (this.isInWishlist(product.id)) {
      this.removeFromWishlist(product);
    } else {
      this.addToWishlist(product);
    }
  }


  private save() {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    this.wishlistCount.next(this.wishlist.length);
  }

}
