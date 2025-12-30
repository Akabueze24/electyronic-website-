import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { CheckoutService } from 'src/app/core/checkout-service/checkout.service';
import { CheckoutFormDetails } from 'src/app/core/checkout-service/checkoutModel';

@Component({
  selector: 'app-cheackout',
  templateUrl: './cheackout.component.html',
  styleUrls: ['./cheackout.component.css']
})
export class CheackoutComponent implements OnInit {
  cartItems: any[] = []; // Items from cart
  subtotal = 0;          // Total price of cart items
  shippingCost = 0;      // Current shipping cost
  total = 0;             // subtotal + shippingCost
  id!: string;


  checkoutForm!: FormGroup;

  constructor(private checkoutService: CheckoutService, private fb: FormBuilder, private cartService: CartService) { }

 ngOnInit(): void {
  // --- Freeze cart items ---
  const currentCart = this.checkoutService.getCart();
  this.cartItems = currentCart.map(item => ({ ...item })); // deep copy
  this.subtotal = this.checkoutService.getSubtotal();
  this.shippingCost = this.checkoutService.getShipingCost();
  this.total = this.subtotal + this.shippingCost;

  console.log("Frozen cart snapshot:", this.cartItems);

  // --- Initialize checkout form ---
  this.checkoutForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    companyName: ['', Validators.required],
    address: ['', Validators.required],
    town: ['', Validators.required],
    country: ['', Validators.required],
    postalCode: ['', Validators.required],
    mobile: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    email: ['', [Validators.required, Validators.email]],
    notes: [''],
    shipToDifferentAddress: [false],
    differentAddress: this.fb.group({
      address: ['', Validators.required],
    })
  });

  const diffAddress = this.checkoutForm.get('differentAddress');
  diffAddress?.disable();

  this.checkoutForm.get('shipToDifferentAddress')?.valueChanges.subscribe(checked => {
    if (checked) diffAddress?.enable();
    else diffAddress?.disable();
  });

  // Prefill if saved
  const savedAddress = this.checkoutService.getAddress();
  if (savedAddress && savedAddress.type === 'different') {
    this.checkoutForm.patchValue({
      shipToDifferentAddress: true,
      differentAddress: { address: savedAddress.address }
    });
  }
}


  // --- Update shipping cost when user selects an option ---
  selectShipping(cost: number): void {
    console.log("Selected shipping cost:", cost);
    this.checkoutService.setShippingCost(cost); // save to service
    this.shippingCost = cost;
    this.total = this.checkoutService.getTotal(); // subtotal + shipping
    console.log("Updated total:", this.total);
  }

  // --- Submit checkout form ---
 onSubmit() {
  if (this.checkoutForm.valid) {
    // Build form object
    const checkoutForm: CheckoutFormDetails = {
      firstName: this.checkoutForm.value.firstName,
      lastName: this.checkoutForm.value.lastName,
      companyName: this.checkoutForm.value.companyName,
      address: this.checkoutForm.value.address,
      town: this.checkoutForm.value.town,
      country: this.checkoutForm.value.country,
      postalCode: this.checkoutForm.value.postalCode,
      mobile: this.checkoutForm.value.mobile,
      email: this.checkoutForm.value.email,
      notes: this.checkoutForm.value.notes,
      date: new Date().toISOString()
    };

    // Choose shipping address
    const shippingAddress = this.checkoutForm.get('shipToDifferentAddress')?.value
      ? this.checkoutForm.get('differentAddress')?.value
      : { address: this.checkoutForm.value.address };

    this.checkoutService.setAddress(shippingAddress);

    // Combine everything into one order
    const fullOrder = {
      customerDetails: checkoutForm,
      cartItems: this.cartItems,  // frozen cart snapshot
      subtotal: this.subtotal,
      shippingCost: this.shippingCost,
      total: this.total,
      shippingAddress: shippingAddress,
      paymentMethod: this.checkoutService.getPayment(),
      orderDate: new Date().toISOString()
    };

    // Send order to Firebase
    this.checkoutService.sendDetails(fullOrder).subscribe({
      next: (response) => {
        console.log("Order saved with ID:", response.name);
        this.id = response.name.toString();

        // --- Clear cart and checkout ---
        this.checkoutService.clearCheckout();
        this.cartService.clearCart();

        // Optionally navigate to a success page here
      },
      error: (err) => {
        console.error("Error saving order:", err);
      }
    });

    // Reset form
    this.checkoutForm.reset();

  } else {
    this.checkoutForm.markAllAsTouched();
  }
}


}
