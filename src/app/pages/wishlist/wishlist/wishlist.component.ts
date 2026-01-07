import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/core/wishlist/wishlist.service';
import { Product } from 'src/app/core/product-service/product.service';
import { CartService } from 'src/app/core/add-to-cart/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  // Array to hold products currently in wishlist
  wishlistProducts: Product[] = [];

  // whishlist add to cart modal message 
  modalMessage: boolean = false;
  showMessage: string = ''

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    console.log('WishlistComponent initialized');
    this.loadWishlist(); // Load wishlist on init
  }

  // Load products from wishlist service
  loadWishlist() {
    this.wishlistProducts = this.wishlistService.getWishlist();
    console.log('Wishlist loaded:', this.wishlistProducts.map(p => p.name));
  }

  // Remove a product from the wishlist
  removeFromWishlist(item: Product) {
    console.log('Removing from wishlist:', item.name);
    this.wishlistService.removeFromWishlist(item);
    this.loadWishlist(); // Reload wishlist after removal
  }

  // Add product to cart and remove from wishlist
  addToCart(item: Product) {
    console.log('Adding to cart from wishlist:', item.name);
    this.cartService.addToCart(item);
    this.modalMessage = true;
    this.showMessage = `${item.name} successfully added to cart`
    this.removeFromWishlist(item); // Remove from wishlist after adding to cart
  }
}
