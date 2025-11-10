import { Component } from '@angular/core';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { ProductService, Product } from 'src/app/core/header-search-bar/product.service';


@Component({
  selector: 'app-smartphone-and-smart-tv',
  templateUrl: './smartphone-and-smart-tv.component.html',
  styleUrls: ['./smartphone-and-smart-tv.component.css']
})
export class SmartphoneAndSmartTvComponent {
  products: Product[] = [];
    filteredProducts: Product[] = [];
    searchTerm: string = '';
    selectedCategory: string = 'All Category';
    cartTotal = 0;
  
    constructor(private productService: ProductService, private cartservice: CartService) {}

  ngOnInit(): void {
    this.productService.products$.subscribe((products: Product[]) => {
      this.products = products;
      this.filterSmartphones();
    });
    this.cartservice.cart$.subscribe(() => {
      this.cartTotal = this.cartservice.getTotalPrice();
    });
  }

  //  This runs every time the user types
  onSearchChange() {
    this.filterSmartphones();
  }

  private filterSmartphones() {
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredProducts = this.products.filter(p => {
      const isSmart = p.category.toLowerCase() === 'smartphones';
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term);

      return isSmart && matchesSearch;
    });
  }
   addToCart(product: any){
    this.cartservice.addToCart(product);
    alert(`${product.name} added to cart!`);
  }

}
