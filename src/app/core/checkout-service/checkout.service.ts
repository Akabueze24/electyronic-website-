import {inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CheckoutFormDetails } from './checkoutModel';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private cartItems: any[] = [];
  private shippingInfo: any = {};
  private shippingAddress: any = null;
  private paymentMethod = '';
  private subtotal = 0;
  private shippingCost = 0;


  // firebase

  private api = "https://electro-884dc-default-rtdb.firebaseio.com/checkout.json";

  private http = inject(HttpClient)


  

// sending form to fire base
getForm(): Observable <CheckoutFormDetails []>{
  const headers = new HttpHeaders ({headers: "checkoutForm"})
  return this.http.get <{[key: string]: CheckoutFormDetails }>( this.api, {headers: headers}).pipe(
   map((response: { [key: string]: CheckoutFormDetails}) => {
  const forms: CheckoutFormDetails[] = [];

  for (const key in response) {
    if (response.hasOwnProperty(key)) {
      const entry = response[key];
      const withId = { ...entry, id: key } as CheckoutFormDetails;
      forms.push(withId);
    }
  }

  return forms;
})

  )
} 


  sendDetails(data:any ): Observable <any>{
    return this.http.post(this.api, data);
  } 
  // ending


  constructor() {
    // Load saved checkout data from localStorage
    const savedCheckout = localStorage.getItem('checkoutData');
    if (savedCheckout) {
      const parsed = JSON.parse(savedCheckout);
      this.cartItems = parsed.cartItems || [];
      this.subtotal = parsed.subtotal || 0;
      this.shippingInfo = parsed.shippingInfo || {};
      this.shippingAddress = parsed.shippingAddress || {};
      this.paymentMethod = parsed.paymentMethod || '';
      this.shippingCost = parsed.shippingCost || 0;

      console.log("Loaded checkout from localStorage:", parsed);
    }
  }

  // ----------------- Cart -----------------
  setCart(items: any[], subtotal: number): void {
    this.cartItems = items;
    this.subtotal = subtotal;
    this.saveToLocalStorage();
    console.log("Cart saved in checkout service:", items, "Subtotal:", subtotal);
  }

  getCart(): any[] {
    return this.cartItems;
  }

  getSubtotal(): number {
    return this.subtotal || this.cartItems.reduce((sum, item) => sum + item.currentprice * item.quantity, 0);
  }

  getTotal(): number {
    return this.subtotal + this.shippingCost;
  }

  // ----------------- Shipping -----------------
  setShipping(info: any): void {
    this.shippingInfo = info;
    this.saveToLocalStorage();
    console.log("Shipping info set:", info);
  }

  getShipping(): any {
    return this.shippingInfo;
  }

  setShippingCost(cost: number) {
    this.shippingCost = cost;
    this.saveToLocalStorage();
    console.log("Shipping cost updated:", cost);
  }

  getShipingCost() {
    return this.shippingCost;
  }

  // ----------------- Address -----------------
  setAddress(address: any) {
    this.shippingAddress = address;
    this.saveToLocalStorage();
    console.log("Shipping address saved:", address);
  }

  getAddress() {
    return this.shippingAddress;
  }

  // ----------------- Payment -----------------
  setPayment(method: string) {
    this.paymentMethod = method;
    this.saveToLocalStorage();
    console.log("Payment method saved:", method);
  }

  getPayment(): string {
    return this.paymentMethod;
  }

  // ----------------- Clear -----------------
  clearCheckout() {
    this.cartItems = [];
    this.shippingInfo = {};
    this.shippingAddress = null;
    this.paymentMethod = '';
    this.subtotal = 0;
    this.shippingCost = 0;
    localStorage.removeItem('checkoutData');
    console.log("Checkout cleared");
  }

  // ----------------- LocalStorage -----------------
  private saveToLocalStorage(): void {
    const data = {
      cartItems: this.cartItems,
      subtotal: this.subtotal,
      shippingInfo: this.shippingInfo,
      shippingAddress: this.shippingAddress,
      paymentMethod: this.paymentMethod,
      shippingCost: this.shippingCost,
      
    };
    localStorage.setItem('checkoutData', JSON.stringify(data));
    console.log("Checkout data saved to localStorage:", data);
  }
}
