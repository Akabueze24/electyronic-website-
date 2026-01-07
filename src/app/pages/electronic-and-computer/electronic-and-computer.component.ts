import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService, Product } from 'src/app/core/product-service/product.service';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { WishlistService } from 'src/app/core/wishlist/wishlist.service';

@Component({
  selector: 'app-electronic-and-computer',
  templateUrl: './electronic-and-computer.component.html',
  styleUrls: ['./electronic-and-computer.component.css']
})
export class ElectronicAndComputerComponent {

  /* ==================== PRODUCTS ==================== */
  filteredProducts: Product[] = [];   // Products after filters
  products: Product[] = [];           // Full product list

  featuredProducts: Product[] = [];   // Homepage featured products

  /* ==================== FILTER STATE ==================== */
  searchTerm: string = '';                     // Search input
  selectedCategory: string = 'electronics';   // Fixed category for this page
  priceRange = { min: 0, max: 2000 };          // Price slider
  sortType: string = 'default';               // Sorting option
  noResults: boolean = false;                  // Empty-state flag

  /* ==================== UI STATE ==================== */
  cartTotal: number = 0;                       // Cart total amount
  modalMessage: string = '';                   // Add-to-cart message
  showMessage: boolean = false;                // Modal visibility

  /* ==================== FILTER METADATA ==================== */
  availableColors: { name: string; available: boolean; count: number }[] = [];

  categoriesWithCount: {
    category: string;
    count: number;
    available: boolean;
  }[] = [];

  /* ==================== SIDE BANNERS ==================== */
  sideBannerProduct!: Product;
  $sideBnnerProduct!: Product;

  /* ==================== WISHLIST ==================== */
  wishlistProductsIds: number[] = [];          // Track wishlist product IDs

  constructor(
    private productService: ProductService,
    private cartservice: CartService,
    private router: Router,
    private wishlistService: WishlistService
  ) { }

  /* ==================== LIFECYCLE ==================== */
  ngOnInit(): void {
    console.log('[Electronics] Component initialized');

    // Listen for filtered products
    this.productService.products$.subscribe(products => {
      this.products = this.productService.getAllProducts();
      this.filteredProducts = products;

      console.log('[Electronics] Filtered products:', products.map(p => p.name));

      this.updateAvailableColors();
      this.updateCategoryCounts();
    });

    // Listen again to update UI state (kept as-is)
    this.productService.products$.subscribe(filtered => {
      console.log('[Electronics] Filtered count:', filtered.length);

      this.filteredProducts = filtered;
      this.noResults = filtered.length === 0;

      this.updateAvailableColors();
      this.updateCategoryCounts();
    });

    // Load featured products
    const homeProducts = this.productService.getHomePageProducts();
    this.featuredProducts = homeProducts.featured;
    this.sideBannerProduct = this.featuredProducts[3];
    this.$sideBnnerProduct = this.featuredProducts[4];

    
    // Listen for cart updates
    this.cartservice.cart$.subscribe(() => {
      this.cartTotal = this.cartservice.getTotalPrice();
      console.log('[Electronics] Cart total updated:', this.cartTotal);
    });

    // Initial filter call
    this.applyFilters();

    // Listen for wishlist updates
    this.wishlistService.wishlistCount$.subscribe(() => {
      this.updateWishlistIds();
    });

    this.updateWishlistIds();
  }

  /* ==================== WISHLIST ==================== */

  updateWishlistIds(): void {
    this.wishlistProductsIds = this.wishlistService
      .getWishlist()
      .map(p => p.id);

    console.log('[Electronics] Wishlist IDs synced:', this.wishlistProductsIds);
  }

  toggleWishlist(product: Product): void {
    this.wishlistService.toggleWishlist(product);
    this.updateWishlistIds();
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistProductsIds.includes(productId);
  }

  /* ==================== FILTERING ==================== */

  applyFilters(color?: string): void {
    console.log('[Electronics] Applying filters:', {
      searchTerm: this.searchTerm,
      category: this.selectedCategory,
      priceRange: this.priceRange,
      sortType: this.sortType,
      color
    });

    const term = this.searchTerm.trim().toLowerCase();

    if (term === '') {
      this.noResults = false;
    }

    this.productService.applyAllFilters(
      this.searchTerm,
      this.selectedCategory,
      this.priceRange,
      this.sortType,
      color
    );
  }

  updateAvailableColors(): void {
    const allColors = Array.from(
      new Set(this.products.flatMap(p => p.color))
    );

    this.availableColors = allColors.map(color => {
      const count = this.filteredProducts.filter(p =>
        p.color.includes(color)
      ).length;

      return { name: color, available: count > 0, count };
    });

    console.log('[Electronics] Available colors:', this.availableColors);
  }

  applyColorFilter(color: string): void {
    console.log('[Electronics] Color selected:', color);
    this.applyFilters(color);
  }

  /* ==================== CART ==================== */

  addToCart(product: Product): void {
    this.cartservice.addToCart(product);

    this.modalMessage = `${product.name} added to cart successfully`;
    this.showMessage = true;

    console.log('[Electronics] Cart add:', this.modalMessage);

    setTimeout(() => (this.showMessage = false), 2000);
  }

  /* ==================== CATEGORIES ==================== */

  updateCategoryCounts(): void {
    const allProducts = this.productService.getAllProducts();

    const allCategories = [...new Set(allProducts.map(p => p.category))];

    this.categoriesWithCount = allCategories.map(cat => {
      const count = allProducts.filter(p => p.category === cat).length;

      return {
        category: cat,
        count,
        available: count > 0
      };
    });

    console.log('[Electronics] Category counts:', this.categoriesWithCount);
  }

  navigateToCategory(category: any): void {
    console.log('[Electronics] Navigating to category:', category);
    this.router.navigate([`/shop/${category}`]);
  }
}
