import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { ProductService, Product } from 'src/app/core/product-service/product.service';

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
  sortType: string = 'default';
  priceRange = { min: 40, max: 2000 }; // bind this to your range slider
  cartTotal = 0;
  modalMessage = '';
  showMessage: boolean = false;
  noResults: boolean = false;

  availableColors: { count: any; name: string, available: boolean }[] = []; //color selection

  // New: category counts for dynamic display
  categoriesWithCount: { category: string; count: number; available: boolean }[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartservice: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('ShopComponent initialized');

    // Subscribe to all products from the service
    this.productService.products$.subscribe((products: Product[]) => {
      console.log('Products updated from service:', products.length);
      this.products = products;
      this.filteredProducts = products; // initialize filtered products
      this.updateAvailableColors();     // update colors initially
      this.updateCategoryCounts();      // update categories initially
    });

    // Subscribe to filtered products to update UI
    this.productService.products$.subscribe(filtered => {
      console.log('Filtered products updated:', filtered.length);
      this.filteredProducts = filtered;
      this.noResults = filtered.length === 0;
      this.updateAvailableColors();   // update color counts after filtering
      this.updateCategoryCounts();    // update category counts after filtering
    });

    // Subscribe to cart updates
    this.cartservice.cart$.subscribe(() => {
      this.cartTotal = this.cartservice.getTotalPrice();
      console.log('Cart total updated:', this.cartTotal);
    });

    // Listen to header search query params
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.selectedCategory = params['category'] || 'All Category';
      console.log('Header search triggered:', this.searchTerm, this.selectedCategory);
      this.applyFilters();
    });
  }

  /**
   * Apply all filters (search, category, price, sort)
   */
  applyFilters() {
    console.log('--- Applying Filters ---');
    console.log('Search Term:', this.searchTerm);
    console.log('Category:', this.selectedCategory);
    console.log('Price Range:', this.priceRange.min, '-', this.priceRange.max);
    console.log('Sort Type:', this.sortType);

     const term = this.searchTerm.trim().toLowerCase();

  // Reset "no results" when search is empty
  if (term === "") {
    this.noResults = false;
  }

    // Call service method that handles filtering and sorting
    this.productService.applyAllFilters(
      this.searchTerm,
      this.selectedCategory,
      this.priceRange,
      this.sortType
    );

    // Note: noResults and filteredProducts are now updated via subscription

  }

  /**
   * Event: Search input changed
   */
  onSearchChange() {
    console.log('Search input changed:', this.searchTerm);
    this.applyFilters();
  }

  /**
   * Event: Category changed
   */
  onCategoryChange(category: string) {
    console.log('Category changed:', category);
    this.selectedCategory = category;
    this.applyFilters();
  }

  /**
   * Event: Price slider changed
   */
  onPriceChange(min: number, max: number) {
    console.log('Price slider changed:', min, max);
    this.priceRange = { min, max };
    this.applyFilters();
  }

  /**
   * Event: Sort option changed
   */
  onSortChange(sortType: string) {
    console.log('Sort option changed:', sortType);
    this.sortType = sortType;
    this.applyFilters();
  }

  /**
   * Add product to cart
   */
  addToCart(product: Product) {
    this.cartservice.addToCart(product);
    this.modalMessage = `${product.name} added to cart successfully`;
    this.showMessage = true;
    console.log('Product added to cart:', product.name);

    setTimeout(() => {
      this.showMessage = false;
    }, 2000);
  }

  /**
   * Update available colors dynamically based on filtered products
   */
  updateAvailableColors(): void {
    const allColors = Array.from( new Set(this.products.flatMap(p => p.color)));

    this.availableColors = allColors.map(color => {
    // Count filtered products that include this color
    const count = this.filteredProducts.filter(p => p.color.includes(color)).length;
    return { name: color, available: count > 0, count };
  });

    console.log('Available Colors with counts:', this.availableColors);
  }

  /**
   * Update category counts dynamically based on filtered products
   */
  updateCategoryCounts(): void {
    const allCategories = [...new Set(this.products.map(p => p.category))];

    this.categoriesWithCount = allCategories.map(cat => {
      const count = this.filteredProducts.filter(p => p.category === cat).length;
      return { category: cat, count, available: count > 0 };
    });

    console.log('Category counts updated:', this.categoriesWithCount);
  }

  navigateToCategory(category: any){
     this.router.navigate([`/shop/${category}`])
  }

}
