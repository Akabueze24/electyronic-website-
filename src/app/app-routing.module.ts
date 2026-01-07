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
import { AdminCheckoutComponent } from './pages/admin-checkout/admin-checkout.component';
import { MobileAndTabletComponent } from './pages/mobile-and-tablet/mobile-and-tablet.component';
import { SmartTvComponent } from './pages/smart-tv/smart-tv.component';
import { ComputersComponent } from './pages/computers/computers.component';
import { MobilesComponent } from './pages/mobiles/mobiles.component';
import { HomeComponent } from './pages/home/home.component';
import { WishlistComponent } from './pages/wishlist/wishlist/wishlist.component';

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
  { path: 'admin', component: AdminCheckoutComponent },
  { path: 'bestseller', component: BestsellerComponent},
  { path: 'wishlist', component: WishlistComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
