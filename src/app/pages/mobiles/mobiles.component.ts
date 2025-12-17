import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { Product, ProductService } from 'src/app/core/product-service/product.service';

@Component({
  selector: 'app-mobiles',
  templateUrl: './mobiles.component.html',
  styleUrls: ['./mobiles.component.css']
})
export class MobilesComponent {
  filteredProducts: Product[] = [];
  products: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'mobile';
  priceRange = { min: 0, max: 2000 };
  sortType: string = 'default';
  cartTotal: number = 0;
  modalMessage: string = '';
  showMessage: boolean = false;

  // Color array with availability and count
  availableColors: { name: string; available: boolean; count: number }[] = [];

  // New: category counts for dynamic display
  categoriesWithCount: { category: string; count: number; available: boolean }[] = [];


  constructor(
    private productService: ProductService,
    private cartservice: CartService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to filtered products from service
    this.productService.products$.subscribe(products => {
      this.filteredProducts = products;
      this.products = this.productService.getAllProducts(); 
      console.log('Filtered Products:', products.map(p => p.name));
      this.updateAvailableColors();
      this.updateCategoryCounts();      // update categories initially

    });

    // Subscribe to cart changes
    this.cartservice.cart$.subscribe(() => {
      this.cartTotal = this.cartservice.getTotalPrice();
      console.log('Cart total updated:', this.cartTotal);
    });

    // Initial filter
    this.applyFilters();
  }

  /** Apply all filters using service */
  applyFilters(color?: string): void {
    console.log('Applying Filters:', {
      searchTerm: this.searchTerm,
      category: this.selectedCategory,
      priceRange: this.priceRange,
      sortType: this.sortType,
      color: color
    });

    this.productService.applyAllFilters(
      this.searchTerm,
      this.selectedCategory,
      this.priceRange,
      this.sortType,
      color
    );
  }

  /** Update available colors with counts after filtering */
  updateAvailableColors(): void {
    const allColors = Array.from( new Set(this.products.flatMap(p => p.color)));

    this.availableColors = allColors.map(color => {
    // Count filtered products that include this color
    const count = this.filteredProducts.filter(p => p.color.includes(color)).length;
    return { name: color, available: count > 0, count };
  });

    console.log('Available Colors with counts:', this.availableColors);
  }

  /** Called when a color circle is clicked */
  applyColorFilter(color: string) {
    console.log('Filtering by color:', color);
    this.applyFilters(color);
  }

  /** Add product to cart */
  addToCart(product: Product): void {
    this.cartservice.addToCart(product);
    this.modalMessage = `${product.name} added to cart successfully`;
    this.showMessage = true;
    console.log(this.modalMessage);

    setTimeout(() => this.showMessage = false, 2000);
  }

   /**
   * Update category counts dynamically based on filtered products
   */
updateCategoryCounts(): void {
  const allProducts = this.productService.getAllProducts(); // full list, not filtered

  const allCategories = [...new Set(allProducts.map(p => p.category))];

  this.categoriesWithCount = allCategories.map(cat => {
    const count = allProducts.filter(p => p.category === cat).length;
    return {
      category: cat,
      count: count,
      available: count > 0
    };
  });

  console.log('Category counts:', this.categoriesWithCount);
}


navigateToCategory(category: any){
  this.router.navigate([`/shop/${category}`]);
}
}
