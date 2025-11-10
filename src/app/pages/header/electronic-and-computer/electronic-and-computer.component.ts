import { Component } from '@angular/core';

import { ProductService, Product } from 'src/app/core/header-search-bar/product.service';

import { CartService } from 'src/app/core/add-to-cart/cart.service';


@Component({
  selector: 'app-electronic-and-computer',
  templateUrl: './electronic-and-computer.component.html',
  styleUrls: ['./electronic-and-computer.component.css']
})
export class ElectronicAndComputerComponent {

 products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'All Category';
  cartTotal = 0;

  constructor(private productService: ProductService, private cartservice: CartService) {}

  ngOnInit(): void {
    this.productService.products$.subscribe((products: Product[]) => {
      this.products = products;
      this.filterElectronics();
    });
     this.cartservice.cart$.subscribe(() => {
      this.cartTotal = this.cartservice.getTotalPrice();
    });
  }

  //  This runs every time the user types
  onSearchChange() {
    this.filterElectronics();
  }

  private filterElectronics() {
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredProducts = this.products.filter(p => {
      const isElectro = p.category.toLowerCase() === 'electronics';
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term);

      return isElectro && matchesSearch;
    });
  }
   addToCart(product: any) {
    this.cartservice.addToCart(product);
    alert(`${product.name} added to cart!`);
  }

}

