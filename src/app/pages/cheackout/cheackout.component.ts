import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from 'src/app/core/checkout-service/checkout.service';
import { CheckoutFormDetails } from 'src/app/core/checkoutModel/model/checkoutModel';

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

  constructor(private checkoutService: CheckoutService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // --- Load cart data from CheckoutService ---
    this.cartItems = this.checkoutService.getCart();
    this.subtotal = this.checkoutService.getSubtotal();
    this.shippingCost = this.checkoutService.getShipingCost();
    this.total = this.checkoutService.getTotal();

    console.log("Cart Items:", this.cartItems);
    console.log("Subtotal:", this.subtotal);
    console.log("Shipping Cost:", this.shippingCost);
    console.log("Total:", this.total);

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

      // shipping checkbox
      shipToDifferentAddress: [false],

      // second address group
      differentAddress: this.fb.group({

        address: ['', Validators.required],

      })

    });

    this.checkoutForm.get('shipToDifferentAddress')?.valueChanges.subscribe(checked => {
      const diffAddress = this.checkoutForm.get('differentAddress');

      if (checked) {
        diffAddress?.enable();
        console.log('user checked the box ');

      } else {
        diffAddress?.disable()
        console.log('user unchecked the box');

      }

    })
    // disable second address by default when form loads 
    this.checkoutForm.get('differentAddress')?.disable()



    // --- If user already filled form before, prefill ---
    const savedAddress = this.checkoutService.getAddress();
    if (savedAddress && savedAddress.type === 'different') {
      this.checkoutForm.patchValue({
        shipToDifferentAddress: true,
        differentAddress: {
          address: savedAddress.address
        }
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

    // 1 Build form object
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

    //  Choose address
    let shippingAddress;
    if (this.checkoutForm.get('shipToDifferentAddress')?.value) {
      shippingAddress = this.checkoutForm.get('differentAddress')?.value;
    } else {
      shippingAddress = { address: this.checkoutForm.value.address };
    }

    this.checkoutService.setAddress(shippingAddress);

    //  Combine EVERYTHING into one order
    const fullOrder = {
      customerDetails: checkoutForm,
      cartItems: this.cartItems,
      subtotal: this.subtotal,
      shippingCost: this.shippingCost,
      total: this.total,
      shippingAddress: shippingAddress,
      paymentMethod: this.checkoutService.getPayment(),
      orderDate: new Date().toISOString()
    };
    console.log(`This is the order before sending to firebase: ${fullOrder.customerDetails}`);
    
    //  Send final order to Firebase
    this.checkoutService.sendDetails(fullOrder).subscribe((response) => {
      console.log("Order saved with ID:", response.name);
      console.log(`This is the order sent to firebase: ${response}`);
      
      this.id = response.name.toString();
    });

    // Reset form
    this.checkoutForm.reset();

  } else {
    this.checkoutForm.markAllAsTouched();
  }
}


}
