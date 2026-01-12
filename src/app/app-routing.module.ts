import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BestsellerComponent } from './pages/bestseller/bestseller.component';
import { CartComponent } from './pages/cart/cart.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CheackoutComponent } from './pages/cheackout/cheackout.component';
import { LaptopAndDesktopsComponent } from './pages/laptop-and-desktops/laptop-and-desktops.component';
import { ElectronicAndComputerComponent } from './pages/electronic-and-computer/electronic-and-computer.component';
import { AccessoriesComponent } from './pages/accessories/accessories.component';
import { SmartphoneAndSmartTvComponent } from './pages/smartphone-and-smart-tv/smartphone-and-smart-tv.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MobileAndTabletComponent } from './pages/mobile-and-tablet/mobile-and-tablet.component';
import { SmartTvComponent } from './pages/smart-tv/smart-tv.component';
import { ComputersComponent } from './pages/computers/computers.component';
import { MobilesComponent } from './pages/mobiles/mobiles.component';
import { HomeComponent } from './pages/home/home.component';
import { WishlistComponent } from './pages/wishlist/wishlist/wishlist.component';
import { AdminComponent } from './pages/Admin/admin/admin.component';
import { AdminReviewComponent } from './pages/Admin/admin/review/admin-review-and-ratings/admin-review-and-ratings.component';
import { AdminContactComponent } from './pages/Admin/admin/contact/admin-contact/admin-contact.component';
import { CheckoutAdminComponent } from './pages/Admin/admin/checkout/checkout-admin/checkout-admin.component';
import { FaqComponent } from './pages/faq/faq/faq.component';
import { ReceiptComponent } from './pages/receipt/receipt/receipt.component';
import { TermsAndConditionComponent } from './pages/terms-and-conditon/terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy/privacy-policy.component';
import { RefundComponent } from './pages/refund-and-return/refund/refund.component';
import { WarrantyComponent } from './pages/warranty/warranty/warranty.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  // Each category uses its OWN component
  { path: 'shop/accessories', component: AccessoriesComponent },
  { path: 'shop/laptops', component: LaptopAndDesktopsComponent },
  { path: 'shop/smartphones', component: SmartphoneAndSmartTvComponent },
  { path: 'shop/smart-tv', component: SmartTvComponent },
  
  { path: 'shop/electronics', component: ElectronicAndComputerComponent },
  { path: 'shop/mobileAndTablet', component: MobileAndTabletComponent },
  { path: 'shop/tablets', component: MobileAndTabletComponent},
  { path: 'shop/computer', component: ComputersComponent},
  { path: 'shop/mobile',  component: MobilesComponent},

  // General shop
  { path: 'shop', component: ShopComponent },

  // Others
  { path: 'productView/:id', component: ProductViewComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cheackout', component: CheackoutComponent },
  { path: 'bestseller', component: BestsellerComponent},
  { path: 'wishlist', component: WishlistComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'receipt', component: ReceiptComponent },
  { path: 'terms', component: TermsAndConditionComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'returnandrefundpolicy', component: RefundComponent },
  { path: 'warranty', component: WarrantyComponent},



  { 
    path: 'admin-dashboard', 
    component: AdminComponent,
    children: [
      { path: 'admin-checkout', component: CheckoutAdminComponent},
      { path: 'admin-contact', component: AdminContactComponent },
      { path: 'admin-reviews', component: AdminReviewComponent },
      
      { path: '', redirectTo: 'admin-checkout', pathMatch: 'full' } // default tab
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
