import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/core/checkout-service/checkout.service';
import { CheckoutFormDetails } from 'src/app/core/checkoutModel/model/checkoutModel';

@Component({
  selector: 'app-admin-checkout',
  templateUrl: './admin-checkout.component.html',
  styleUrls: ['./admin-checkout.component.css']
})
export class AdminCheckoutComponent implements OnInit{
  orders: any[] = [];
  formDetiails: CheckoutFormDetails[] = []
  
  
    constructor(private checkoutService: CheckoutService){}
  
    ngOnInit() {
      this.checkoutService.getForm().subscribe((response)=>{
          this.orders = response
      })
    }

}
