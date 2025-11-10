import { Component } from '@angular/core';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { ProductService, Product } from 'src/app/core/header-search-bar/product.service';


@Component({
  selector: 'app-smartphone-and-smart-tv',
  templateUrl: './mobile-and-tablet.component.html',
  styleUrls: ['./mobile-and-tablet.component.css']
})
export class MobileAndTabletComponent{
  products: Product[] = [];
    filteredProducts: Product[] = [];
    searchTerm: string = '';
    selectedCategory: string = 'All Category';
    cartTotal = 0;
  
    constructor(private productService: ProductService, private cartservice: CartService) {}

  ngOnInit(): void {
    this.productService.products$.subscribe((products: Product[]) => {
      this.products = products;
      this.filterTablet();
    });
     this.cartservice.cart$.subscribe(() => {
      this.cartTotal = this.cartservice.getTotalPrice();
    });
  }

  // This runs every time the user types
  onSearchChange() {
    this.filterTablet();
  }

  private filterTablet() {
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredProducts = this.products.filter(p => {
      const isTablet = p.category.toLowerCase() === 'tablets';
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term);

      return isTablet && matchesSearch;
    });
  }
  addToCart(product: any){
    this.cartservice.addToCart(product);
    alert(`${product.name} added to cart!`);
  }
}
