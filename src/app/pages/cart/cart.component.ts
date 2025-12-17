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
  cartItems: CartItem[] = [];  // Items in cart
  total = 0;                   // Total price of items
  shippingCost = 0;            // Shipping cost
  address: any;                // Shipping address (if already entered)

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to cart updates
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;                         // Update cart items
      this.total = this.cartService.getTotalPrice();  // Update subtotal
      this.shippingCost = this.checkoutService.getShipingCost(); // Get shipping cost from service

      this.address = this.checkoutService.getAddress(); // Load saved address if exists

      // Logs for debugging
      console.log("Cart items updated:", this.cartItems);
      console.log("Subtotal:", this.total);
      console.log("Shipping Cost:", this.shippingCost);
      console.log("Saved Address:", this.address);
    });
  }

  // Increase quantity of an item
  increaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.id, 1);
    console.log(`Increased quantity for item ${item.id}`);
  }

  // Decrease quantity of an item
  decreaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.id, -1);
    console.log(`Decreased quantity for item ${item.id}`);
  }

  // Remove an item from cart
  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.id);
    console.log(`Removed item ${item.id} from cart`);
  }

  // Clear entire cart
  clearCart() {
    this.cartService.clearCart();
    console.log("Cart cleared");
  }

  // Proceed to checkout page
  proceedCheckout() {
    this.checkoutService.setCart(this.cartItems, this.total); // Save cart in checkout service
    console.log("Proceeding to checkout with cart:", this.cartItems);
    this.router.navigate(['/cheackout']);
  }
}
