import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { CheckoutService } from 'src/app/core/checkout-service/checkout.service';
import { CheckoutFormDetails } from 'src/app/core/checkout-service/checkoutModel';

@Component({
  selector: 'app-cheackout',
  templateUrl: './cheackout.component.html',
  styleUrls: ['./cheackout.component.css']
})
export class CheackoutComponent implements OnInit {

  /* ============================
     CART SNAPSHOT (FROZEN)
  ============================ */

  cartItems: any[] = [];   // Frozen cart items
  subtotal = 0;            // Cart subtotal
  shippingCost = 0;        // Selected shipping cost
  total = 0;               // subtotal + shipping
  id!: string;             // Order ID returned from backend

  /* ============================
     CHECKOUT FORM
  ============================ */

  checkoutForm!: FormGroup;

  constructor(
    private checkoutService: CheckoutService,
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {}

  /* ============================
     LIFECYCLE
  ============================ */

  ngOnInit(): void {

    console.log('CheckoutComponent initialized');

    /* --------------------------------
       FREEZE CART SNAPSHOT
    --------------------------------- */
    const currentCart = this.checkoutService.getCart();

    this.cartItems = currentCart.map(item => ({ ...item })); // deep copy
    this.subtotal = this.checkoutService.getSubtotal();
    this.shippingCost = this.checkoutService.getShipingCost();
    this.total = this.subtotal + this.shippingCost;

    console.log('Frozen cart snapshot:', this.cartItems);
    console.log('Subtotal:', this.subtotal);
    console.log('Initial shipping:', this.shippingCost);
    console.log('Initial total:', this.total);

    /* --------------------------------
       INITIALIZE CHECKOUT FORM
    --------------------------------- */
    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      town: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      notes: [''],
      shipToDifferentAddress: [false],
      differentAddress: this.fb.group({
        address: ['', Validators.required],
      })
    });

    /* --------------------------------
       TOGGLE DIFFERENT ADDRESS
    --------------------------------- */
    const diffAddress = this.checkoutForm.get('differentAddress');
    diffAddress?.disable();

    this.checkoutForm.get('shipToDifferentAddress')?.valueChanges.subscribe(checked => {
      console.log('Ship to different address:', checked);
      if (checked) diffAddress?.enable();
      else diffAddress?.disable();
    });

    /* --------------------------------
       PREFILL SAVED ADDRESS (IF ANY)
    --------------------------------- */
    const savedAddress = this.checkoutService.getAddress();
    if (savedAddress && savedAddress.type === 'different') {
      console.log('Prefilling saved different address:', savedAddress);
      this.checkoutForm.patchValue({
        shipToDifferentAddress: true,
        differentAddress: { address: savedAddress.address }
      });
    }
  }

  /* ============================
     SHIPPING SELECTION
  ============================ */

  selectShipping(cost: number): void {

    console.log('Selected shipping cost:', cost);

    this.checkoutService.setShippingCost(cost);
    this.shippingCost = cost;
    this.total = this.checkoutService.getTotal();

    console.log('Updated total:', this.total);
  }

  /* ============================
     SUBMIT ORDER
  ============================ */

  onSubmit(): void {

    if (!this.checkoutForm.valid) {
      console.warn('Checkout form invalid');
      this.checkoutForm.markAllAsTouched();
      return;
    }

    console.log('Submitting checkout form');

    /* --------------------------------
       BUILD CUSTOMER DETAILS
    --------------------------------- */
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
      deleted: this.checkoutForm.value.deleted,
      date: new Date().toISOString()
    };

    /* --------------------------------
       SHIPPING ADDRESS SELECTION
    --------------------------------- */
    const shippingAddress =
      this.checkoutForm.get('shipToDifferentAddress')?.value
        ? this.checkoutForm.get('differentAddress')?.value
        : { address: this.checkoutForm.value.address };

    this.checkoutService.setAddress(shippingAddress);

    /* --------------------------------
       FULL ORDER PAYLOAD
    --------------------------------- */
    const fullOrder = {
      customerDetails: {...this.checkoutForm.value,
       invoiceNumber: 'INV-' + Date.now(),
      },
      cartItems: this.cartItems,
      subtotal: this.subtotal,
      shippingCost: this.shippingCost,
      total: this.total,
      shippingAddress: shippingAddress,
      paymentMethod: this.checkoutService.getPayment(),
      orderDate: new Date().toISOString(),
      invoiceNumber: 'INV-' + Date.now(),
      receiptVoucher: 'RCPT-' + Math.floor(100000 + Math.random() * 900000),
      orderStatus: 'pending',
      deleted: false
    };

    console.log('Final order payload:', fullOrder);

    /* --------------------------------
       SEND TO BACKEND
    --------------------------------- */
    this.checkoutService.sendDetails(fullOrder).subscribe({
      next: (response) => {
        console.log('Order saved with ID:', response.name);
        this.id = response.name.toString();
        

        // Save current order for receipt page
    this.checkoutService.setCurrentOrder(fullOrder);

        // Clear checkout + cart
        this.checkoutService.clearCheckout();
        this.cartService.clearCart();

         // Navigate to receipt
    this.router.navigate(['/receipt']);
      },
      error: (err) => {
        console.error('Error saving order:', err);
      }
    });

    /* --------------------------------
       RESET FORM
    --------------------------------- */
    this.checkoutForm.reset();
    this.cartService.clearCart();
  }
}
