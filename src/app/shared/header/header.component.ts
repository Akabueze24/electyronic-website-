import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { Product, ProductService } from 'src/app/core/header-search-bar/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchTerm = '';
  selectedCategory: string = 'All Category';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cartTotal: number = 0;

  constructor(private productService: ProductService, private router: Router, private cartservice: CartService) {}

  ngOnInit() {
    //  Always load full product list, not the filtered one
    this.products = this.productService.getAllProducts();

    //  Reset search bar whenever route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.searchTerm = '';
        this.filteredProducts = [];
      });
        this.cartservice.cart$.subscribe(() => {
      this.cartTotal = this.cartservice.getTotalPrice();
    });
  }

  //  Live search suggestions
  onSearchChange() {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredProducts = [];
      return;
    }

    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
    );
  }

  //  When user clicks a product from the dropdown
  selectProduct(product: Product) {
    this.searchTerm = product.name;
    this.filteredProducts = [];
    this.router.navigate(['/shop'], {
      queryParams: { search: product.name }
    });
  }

  //  When user clicks the main search button
  onSearch() {
    this.filteredProducts = [];
    this.productService.searchProducts(this.searchTerm, this.selectedCategory);
    this.router.navigate(['/shop'], {
      queryParams: {
        search: this.searchTerm,
        category: this.selectedCategory
      }
    });
  }

  
  addToCart(product: any) {
  this.cartservice.addToCart(product);
}
}
