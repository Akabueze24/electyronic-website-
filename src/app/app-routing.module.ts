import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BestsellerComponent } from './pages/header/bestseller/bestseller.component';
import { CartComponent } from './pages/header/cart/cart.component';
import { ContactComponent } from './pages/header/contact/contact.component';
import { ShopComponent } from './pages/header/shop/shop.component';
import { CheackoutComponent } from './pages/header/cheackout/cheackout.component';
import { MobileAndTabletComponent } from './pages/header/mobile-and-tablet/mobile-and-tablet.component';
import { LaptopAndDesktopsComponent } from './pages/header/laptop-and-desktops/laptop-and-desktops.component';
import { ElectronicAndComputerComponent } from './pages/header/electronic-and-computer/electronic-and-computer.component';
import { AccessoriesComponent } from './pages/header/accessories/accessories.component';
import { SmartphoneAndSmartTvComponent } from './pages/header/smartphone-and-smart-tv/smartphone-and-smart-tv.component';
import { ProductViewComponent } from './pages/header/product-view/product-view.component';

const routes: Routes = [
  {path: '', redirectTo: 'shop', pathMatch: 'full' },
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'bestseller', component: BestsellerComponent},
  {path: 'cart', component: CartComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'cheackout', component: CheackoutComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'productView/:id', component: ProductViewComponent },
  {path: 'shop/mobileAndTablet', component: MobileAndTabletComponent},
  {path: 'shop/laptopAndDesktop', component: LaptopAndDesktopsComponent},
  {path: 'shop/phonesAndtv', component: SmartphoneAndSmartTvComponent},
  {path: 'shop/electronicsAndComputer', component: ElectronicAndComputerComponent},
  {path: 'shop/accessories', component: AccessoriesComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
