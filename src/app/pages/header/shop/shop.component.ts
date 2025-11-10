import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { ProductService, Product } from 'src/app/core/header-search-bar/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'All Category';
  cartTotal = 0;
  product: Product | undefined;

  constructor( private productService: ProductService, private route: ActivatedRoute,private cartservice: CartService) { }

  ngOnInit(): void {
    // Subscribe to product updates
    this.productService.products$.subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = products; // start with all products
    });

    // cart
     this.cartservice.cart$.subscribe(() => {
      this.cartTotal = this.cartservice.getTotalPrice();
    });

    // Listen to query params (for when header search triggers navigation)
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.selectedCategory = params['category'] || 'All Category';
      this.productService.searchProducts(this.searchTerm, this.selectedCategory);
    });

   
  }

  // Local shop search bar logic
  onSearch() {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term && this.selectedCategory === 'All Category') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => {
        const matchesName = p.name.toLowerCase().includes(term);
        const matchesCategory = this.selectedCategory === 'All Category' || p.category.toLowerCase().includes(this.selectedCategory.toLowerCase())
        return matchesName && matchesCategory;
      });
    }
  }

   addToCart(product: any){
    this.cartservice.addToCart(product);
    alert(`${product.name} added to cart!`);
  }

  


}
