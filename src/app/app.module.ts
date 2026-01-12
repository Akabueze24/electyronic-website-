import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CheackoutComponent } from './pages/cheackout/cheackout.component';
import { CartComponent } from './pages/cart/cart.component';
import { BestsellerComponent } from './pages/bestseller/bestseller.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { AccessoriesComponent } from './pages/accessories/accessories.component';
import { ElectronicAndComputerComponent } from './pages/electronic-and-computer/electronic-and-computer.component';
import { LaptopAndDesktopsComponent } from './pages/laptop-and-desktops/laptop-and-desktops.component';
import { SmartphoneAndSmartTvComponent } from './pages/smartphone-and-smart-tv/smartphone-and-smart-tv.component';
import { ContactComponent } from './pages/contact/contact.component';
import {  HttpClientModule } from '@angular/common/http';
import { MobileAndTabletComponent } from './pages/mobile-and-tablet/mobile-and-tablet.component';
import { SmartTvComponent } from './pages/smart-tv/smart-tv.component';
import { ComputersComponent } from './pages/computers/computers.component';
import { MobilesComponent } from './pages/mobiles/mobiles.component';
import { CurrencyConvertPipe } from './core/currency/currency-convert.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistComponent } from './pages/wishlist/wishlist/wishlist.component';
import { AdminComponent } from './pages/Admin/admin/admin.component';
import { AdminReviewComponent } from './pages/Admin/admin/review/admin-review-and-ratings/admin-review-and-ratings.component';
import { AdminContactComponent } from './pages/Admin/admin/contact/admin-contact/admin-contact.component';
import {  CheckoutAdminComponent } from './pages/Admin/admin/checkout/checkout-admin/checkout-admin.component';
import { FaqComponent } from './pages/faq/faq/faq.component';
import { ReceiptComponent } from './pages/receipt/receipt/receipt.component';
import { TermsAndConditionComponent } from './pages/terms-and-conditon/terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy/privacy-policy.component';
import { RefundComponent } from './pages/refund-and-return/refund/refund.component';
import { WarrantyComponent } from './pages/warranty/warranty/warranty.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ShopComponent,
    ContactComponent,
    CheackoutComponent,
    CartComponent,
    BestsellerComponent,
    ProductViewComponent,
    AccessoriesComponent,
    ElectronicAndComputerComponent,
    LaptopAndDesktopsComponent,
    MobileAndTabletComponent,
    SmartphoneAndSmartTvComponent,
    SmartTvComponent,
    ComputersComponent,
    MobilesComponent,
    CurrencyConvertPipe,
    WishlistComponent,
    AdminComponent,
    AdminReviewComponent,
    AdminContactComponent,
    CheckoutAdminComponent,
    FaqComponent,
    ReceiptComponent,
    TermsAndConditionComponent,
    PrivacyPolicyComponent,
    RefundComponent,
    WarrantyComponent
   
    
    
    
  
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
