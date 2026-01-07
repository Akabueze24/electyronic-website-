import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { ProductService, Product } from 'src/app/core/product-service/product.service';
import { WishlistService } from 'src/app/core/wishlist/wishlist.service';

@Component({
  selector: 'app-smartphone-and-smart-tv',
  templateUrl: './laptop-and-desktops.component.html',
  styleUrls: ['./laptop-and-desktops.component.css']
})
export class LaptopAndDesktopsComponent {

  /* ==================== PRODUCTS ==================== */
  filteredProducts: Product[] = [];   // Products after filters
  products: Product[] = [];           // Full product list

  /* ==================== FILTER UI ==================== */
  searchTerm: string = '';             // Search input
  selectedCategory: string = 'laptops';// Fixed category for this page
  priceRange = { min: 0, max: 2000 };  // Price range slider
  sortType: string = 'default';        // Sort dropdown
  noResults: boolean = false;          // Show "no results" state

  /* ==================== CART UI ==================== */
  cartTotal: number = 0;               // Cart total
  modalMessage: string = '';           // Add-to-cart message
  showMessage: boolean = false;        // Show cart modal

  /* ==================== FEATURED ==================== */
  featuredProducts: Product[] = [];

  /* ==================== COLORS ==================== */
  availableColors: { name: string; available: boolean; count: number }[] = [];

  /* ==================== CATEGORIES ==================== */
  categoriesWithCount: { category: string; count: number; available: boolean }[] = [];

  /* ==================== SIDE BANNERS ==================== */
  sideBannerProduct!: Product;
  $sideBnnerProduct!: Product;

  /* ==================== WISHLIST ==================== */
  wishlistProductsIds: number[] = [];  // Wishlist product IDs

  constructor(
    private productService: ProductService,
    private cartservice: CartService,
    private router: Router,
    private wishlistService: WishlistService
  ) { }

  /* ==================== LIFECYCLE ==================== */
  ngOnInit(): void {
    console.log('[Laptops] Component initialized');

    // --- Subscribe to filtered products ---
    this.productService.products$.subscribe(products => {
      this.products = this.productService.getAllProducts();
      this.filteredProducts = products;

      console.log('[Laptops] Filtered products:', products.map(p => p.name));

      this.updateAvailableColors();
      this.updateCategoryCounts();
    });

    // --- UI updates after filtering ---
    this.productService.products$.subscribe(filtered => {
      console.log('[Laptops] Filtered count:', filtered.length);

      this.filteredProducts = filtered;
      this.noResults = filtered.length === 0;

      this.updateAvailableColors();
      this.updateCategoryCounts();
    });

    // --- Load featured products ---
    const homeProducts = this.productService.getHomePageProducts();
    this.featuredProducts = homeProducts.featured;
    this.sideBannerProduct = this.featuredProducts[4];
    this.$sideBnnerProduct = this.featuredProducts[3];


    // --- Subscribe to cart updates ---
    this.cartservice.cart$.subscribe(() => {
      this.cartTotal = this.cartservice.getTotalPrice();
      console.log('[Laptops] Cart total updated:', this.cartTotal);
    });

    // --- Initial filtering ---
    this.applyFilters();

    // --- Subscribe to wishlist updates ---
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

    console.log('[Laptops] Wishlist synced:', this.wishlistProductsIds);
  }

  toggleWishlist(product: Product): void {
    this.wishlistService.toggleWishlist(product);
    this.updateWishlistIds(); // Sync heart icons
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistProductsIds.includes(productId);
  }

  /* ==================== FILTERING ==================== */

  applyFilters(color?: string): void {
    console.log('[Laptops] Applying filters:', {
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

  applyColorFilter(color: string): void {
    console.log('[Laptops] Color filter:', color);
    this.applyFilters(color);
  }

  /* ==================== COLORS ==================== */

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

    console.log('[Laptops] Available colors:', this.availableColors);
  }

  /* ==================== CART ==================== */

  addToCart(product: Product): void {
    this.cartservice.addToCart(product);

    this.modalMessage = `${product.name} added to cart successfully`;
    this.showMessage = true;

    console.log('[Laptops] Cart add:', this.modalMessage);

    setTimeout(() => (this.showMessage = false), 2000);
  }

  /* ==================== CATEGORIES ==================== */

  updateCategoryCounts(): void {
    const allProducts = this.productService.getAllProducts();
    const allCategories = [...new Set(allProducts.map(p => p.category))];

    this.categoriesWithCount = allCategories.map(cat => {
      const count = allProducts.filter(p => p.category === cat).length;
      return { category: cat, count, available: count > 0 };
    });

    console.log('[Laptops] Category counts:', this.categoriesWithCount);
  }

  navigateToCategory(category: any): void {
    console.log('[Laptops] Navigate to category:', category);
    this.router.navigate([`/shop/${category}`]);
  }
}
