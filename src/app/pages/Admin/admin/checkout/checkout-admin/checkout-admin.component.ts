import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CheckoutService } from 'src/app/core/checkout-service/checkout.service';
import { CheckoutFormDetails } from 'src/app/core/checkout-service/checkoutModel';

@Component({
  selector: 'app-checkout-admin',
  templateUrl: './checkout-admin.component.html',
  styleUrls: ['./checkout-admin.component.css']
})
export class CheckoutAdminComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  orders: any[] = [];
  formDetiails: CheckoutFormDetails[] = []

  // Confirmation dialog state
  showConfirmDialog = false;
  orderToDeleteId: string | null = null;

  // Clear All Orders dialog
  showClearAllDialog = false;

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit() {
    console.log('CheckoutAdminComponent initialized'); // Log component init

    this.subscription = this.checkoutService.getForm().subscribe((response) => {
      console.log('Raw orders from Firebase:', response); // Log raw Firebase data

      // Only show orders that are not deleted
      this.orders = response.filter(order => !order.deleted);
      console.log('Filtered orders (deleted=false):', this.orders); // Log filtered orders
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Subscription unsubscribed'); // Log when subscription is cleaned up
    }
  }

  // Open confirm dialog
  openDeleteDialog(id: string) {
    this.orderToDeleteId = id;
    this.showConfirmDialog = true;
    console.log('Open delete dialog for order ID:', id); // Log which order is selected
  }

  // Cancel deletion
  cancelDialog() {
    console.log('Cancel deletion'); // Log cancel action
    this.showConfirmDialog = false;
    this.orderToDeleteId = null;
  }

  // Confirm deletion
  confirmDelete() {
    if (this.orderToDeleteId) {
      console.log('Confirm deletion for order ID:', this.orderToDeleteId); // Log confirmation

      this.checkoutService.softDeleteOrder(this.orderToDeleteId).subscribe(() => {
        console.log('Order soft-deleted in Firebase:', this.orderToDeleteId); // Log Firebase update

        // Remove from UI immediately
        this.orders = this.orders.filter(o => o.id !== this.orderToDeleteId);
        console.log('Updated orders in UI after deletion:', this.orders); // Log UI update

        this.cancelDialog(); // Close dialog
      });
    }
  }

  /* -----------------------------
      CLEAR ALL ORDERS DIALOG
   ----------------------------- */

  openClearAllDialog() {
    this.showClearAllDialog = true;
    console.log('Open Clear All Orders dialog'); // Log dialog open
  }

  cancelClearAll() {
    this.showClearAllDialog = false;
    console.log('Cancel Clear All Orders'); // Log cancel action
  }

  confirmClearAll() {
    console.log('Confirm Clear All Orders'); // Log confirmation

    this.orders.forEach(order => {
      if (order.id) {
        console.log('Soft deleting order ID:', order.id); // Log each order being deleted
        this.checkoutService.softDeleteOrder(order.id).subscribe(() => {
          console.log('Order soft-deleted in Firebase:', order.id); // Log Firebase update
        });
      }
    });

    // Clear orders in UI
    this.orders = [];
    console.log('All orders removed from UI'); // Log UI update

    this.showClearAllDialog = false;
  }
}
