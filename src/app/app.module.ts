import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/header/shop/shop.component';
import { ContactComponent } from './pages/header/contact/contact.component';
import { CheackoutComponent } from './pages/header/cheackout/cheackout.component';
import { CartComponent } from './pages/header/cart/cart.component';
import { BestsellerComponent } from './pages/header/bestseller/bestseller.component';
import { ProductViewComponent } from './pages/header/product-view/product-view.component';
import { AccessoriesComponent } from './pages/header/accessories/accessories.component';
import { ElectronicAndComputerComponent } from './pages/header/electronic-and-computer/electronic-and-computer.component';
import { LaptopAndDesktopsComponent } from './pages/header/laptop-and-desktops/laptop-and-desktops.component';
import { MobileAndTabletComponent } from './pages/header/mobile-and-tablet/mobile-and-tablet.component';
import { SmartphoneAndSmartTvComponent } from './pages/header/smartphone-and-smart-tv/smartphone-and-smart-tv.component';

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
    SmartphoneAndSmartTvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
