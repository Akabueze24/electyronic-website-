import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from 'src/app/core/add-to-cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotalPrice();
    });
  }

  increaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.id, 1);
    
  }

  decreaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.id, -1);
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.id);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
