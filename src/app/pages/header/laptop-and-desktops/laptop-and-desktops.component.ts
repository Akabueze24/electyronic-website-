import { Component } from '@angular/core';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { ProductService, Product } from 'src/app/core/header-search-bar/product.service';


@Component({
  selector: 'app-smartphone-and-smart-tv',
  templateUrl: './laptop-and-desktops.component.html',
  styleUrls: ['./laptop-and-desktops.component.css']
})
export class LaptopAndDesktopsComponent {
  products: Product[] = [];
    filteredProducts: Product[] = [];
    searchTerm: string = '';
    selectedCategory: string = 'All Category';
    cartTotal = 0;
  
    constructor(private productService: ProductService, private cartservice: CartService) {}

  ngOnInit(): void {
    this.productService.products$.subscribe((products: Product[]) => {
      this.products = products;
      this.filterLaptops();
    });
     this.cartservice.cart$.subscribe(() => {
      this.cartTotal = this.cartservice.getTotalPrice();
    });
  }

  //  This runs every time the user types
  onSearchChange() {
    this.filterLaptops();
  }

  private filterLaptops() {
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredProducts = this.products.filter(p => {
      const islaptop = p.category.toLowerCase() === 'laptops';
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term);

      return islaptop && matchesSearch;
    });
  }
   addToCart(product: any) {
    this.cartservice.addToCart(product);
    alert(`${product.name} added to cart!`);
  }

}
