import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { ProductService, Product } from 'src/app/core/header-search-bar/product.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'accessories';
  cartTotal: number = 0;

  constructor(private productService: ProductService, private cartservice: CartService) { }

  ngOnInit(): void {
    this.productService.products$.subscribe((products: Product[]) => {
      this.products = products;
      this.filterAccessories();
    });
    this.cartservice.cart$.subscribe(() => {
      this.cartTotal = this.cartservice.getTotalPrice();
    });
  }

  // 🔍 This runs every time the user types
  onSearchChange() {
    this.filterAccessories();
  }

  private filterAccessories() {
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredProducts = this.products.filter(p => {
      const isAccessory = p.category.toLowerCase() === 'accessories';
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term);

      return isAccessory && matchesSearch;
    });
  }

  addToCart(product: any) {
    this.cartservice.addToCart(product);
    alert(`${product.name} added to cart!`);
  }
}
