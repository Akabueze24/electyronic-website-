import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from 'src/app/core/checkout-service/checkout.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  order: any;

  constructor(private checkoutService: CheckoutService, private router: Router) {}

  ngOnInit(): void {
    this.order = this.checkoutService.getCurrentOrder();

    if (!this.order) {
      // No order found, redirect to shop
      this.router.navigate(['/shop']);
    }
  }
}
