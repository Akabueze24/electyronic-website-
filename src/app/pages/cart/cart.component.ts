import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from 'src/app/core/add-to-cart/cart.service';
import { CheckoutService } from 'src/app/core/checkout-service/checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  /* ============================
     CART STATE
  ============================ */

  cartItems: CartItem[] = [];     // Items currently in cart
  total = 0;                      // Subtotal (products only)
  shippingCost = 0;               // Shipping cost
  address: any;                   // Saved shipping address (if any)

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  /* ============================
     LIFECYCLE
  ============================ */

  ngOnInit(): void {

    console.log('CartComponent initialized');

    /* --------------------------------
       SUBSCRIBE TO CART CHANGES
    --------------------------------- */
    this.cartService.cart$.subscribe(items => {

      // Update local cart state
      this.cartItems = items;
      this.total = this.cartService.getTotalPrice();
      this.shippingCost = this.checkoutService.getShipingCost();
      this.address = this.checkoutService.getAddress();

      // Debug logs
      console.log('Cart items updated:', this.cartItems);
      console.log('Subtotal:', this.total);
      console.log('Shipping cost:', this.shippingCost);
      console.log('Saved address:', this.address);
    });
  }

  /* ============================
     CART QUANTITY CONTROLS
  ============================ */

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.id, 1);
    console.log('Increased quantity for item:', item.id);
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.id, -1);
    console.log('Decreased quantity for item:', item.id);
  }

  /* ============================
     CART MANAGEMENT
  ============================ */

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.id);
    console.log('Removed item from cart:', item.id);
  }

  clearCart(): void {
    this.cartService.clearCart();
    console.log('Cart cleared');
  }

  /* ============================
     CHECKOUT FLOW
  ============================ */

  proceedCheckout(): void {

    // Persist cart data for checkout page
    this.checkoutService.setCart(this.cartItems, this.total);

    console.log('Proceeding to checkout with cart:', {
      items: this.cartItems,
      total: this.total
    });

    this.router.navigate(['/cheackout']);
  }
}
