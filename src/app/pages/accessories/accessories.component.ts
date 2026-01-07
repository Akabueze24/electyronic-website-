import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { ProductService, Product } from 'src/app/core/product-service/product.service';
import { WishlistService } from 'src/app/core/wishlist/wishlist.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {

  /* ============================
     PRODUCT STATE
  ============================ */

  products: Product[] = [];                 // Full product list
  filteredProducts: Product[] = [];         // Filtered product list (UI)
  featuredProducts: Product[] = [];         // Homepage featured products

  /* ============================
     FILTER STATE
  ============================ */

  searchTerm: string = '';
  selectedCategory: string = 'accessories';
  priceRange = { min: 0, max: 2000 };
  sortType: string = 'default';
  noResults: boolean = false;

  /* ============================
     UI STATE
  ============================ */

  cartTotal: number = 0;
  modalMessage: string = '';
  showMessage: boolean = false;
  showWishlistMessage: boolean = false;
  wishlistMessage: string = '';

  /* ============================
     COLORS & CATEGORIES
  ============================ */

  // Color array with availability and count
  availableColors: { name: string; available: boolean; count: number }[] = [];

  // Category counts (sidebar)
  categoriesWithCount: { category: string; count: number; available: boolean }[] = [];

  /* ============================
     WISHLIST STATE
  ============================ */

  wishlistProductsIds: number[] = []; // Track product IDs in wishlist

   /* ==================== SIDE BANNERS ==================== */
  sideBannerProduct!: Product;
  $sideBnnerProduct!: Product;

  constructor(
    private productService: ProductService,
    private cartservice: CartService,
    private router: Router,
    private wishlistService: WishlistService
  ) { }

  /* ============================
     LIFECYCLE
  ============================ */

  ngOnInit(): void {

    console.log('AccessoriesComponent initialized');

    /* --------------------------------
       PRODUCTS SUBSCRIPTION (RAW)
       NOTE: This listens to ProductService filtered stream
    --------------------------------- */
    this.productService.products$.subscribe(products => {
      console.log('Products stream update (raw):', products.length);

      this.filteredProducts = products;
      this.products = this.productService.getAllProducts();

      this.updateAvailableColors();
      this.updateCategoryCounts();
    });

    /* --------------------------------
       PRODUCTS SUBSCRIPTION (UI STATE)
       NOTE: Duplicate subscription kept intentionally
    --------------------------------- */
    this.productService.products$.subscribe(filtered => {
      console.log('Filtered products updated (UI):', filtered.length);

      this.filteredProducts = filtered;
      this.noResults = filtered.length === 0;

      this.updateAvailableColors();
      this.updateCategoryCounts();
    });

    /* --------------------------------
       FEATURED PRODUCTS
    --------------------------------- */
    const homeProducts = this.productService.getHomePageProducts();
    this.featuredProducts = homeProducts.featured;
    this.sideBannerProduct = this.featuredProducts[2];
    this.$sideBnnerProduct = this.featuredProducts[1]

    console.log('Featured products loaded:', this.featuredProducts.length);

    /* --------------------------------
       CART SUBSCRIPTION
    --------------------------------- */
    this.cartservice.cart$.subscribe(() => {
      this.cartTotal = this.cartservice.getTotalPrice();
      console.log('Cart total updated:', this.cartTotal);
    });

    /* --------------------------------
       INITIAL FILTER APPLY
    --------------------------------- */
    this.applyFilters();

    /* --------------------------------
       WISHLIST SUBSCRIPTION
    --------------------------------- */
    this.wishlistService.wishlistCount$.subscribe(() => {
      console.log('Wishlist count changed');
      this.updateWishlistIds();
    });

    // Initial wishlist sync
    this.updateWishlistIds();
  }

  /* ============================
     WISHLIST METHODS
  ============================ */

  // Sync wishlist product IDs
  updateWishlistIds(): void {
    this.wishlistProductsIds = this.wishlistService.getWishlist().map(p => p.id);
    console.log('Wishlist IDs synced:', this.wishlistProductsIds);

  }

  // Toggle wishlist state
  toggleWishlist(product: Product): void {
    console.log('Toggling wishlist for:', product.name);
    this.wishlistService.toggleWishlist(product);
    this.modalMessage = `${product.name} successfully added to wishlist`;
    this.showMessage = true;
    console.log(this.wishlistMessage);
    
    this.updateWishlistIds();
  }

  // Check wishlist state for UI
  isInWishlist(productId: number): boolean {
    return this.wishlistProductsIds.includes(productId);
  }

  /* ============================
     FILTER METHODS
  ============================ */

  applyFilters(color?: string): void {
    console.log('Applying filters:', {
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
    console.log('Color filter selected:', color);
    this.applyFilters(color);
  }

  /* ============================
     COLOR & CATEGORY HELPERS
  ============================ */

  updateAvailableColors(): void {
    const allColors = Array.from(
      new Set(this.products.flatMap(p => p.color))
    );

    this.availableColors = allColors.map(color => {
      const count = this.filteredProducts.filter(p => p.color.includes(color)).length;
      return { name: color, available: count > 0, count };
    });

    console.log('Available colors updated:', this.availableColors);
  }

  updateCategoryCounts(): void {
    const allProducts = this.productService.getAllProducts();

    const allCategories = [...new Set(allProducts.map(p => p.category))];

    this.categoriesWithCount = allCategories.map(cat => {
      const count = allProducts.filter(p => p.category === cat).length;
      return { category: cat, count, available: count > 0 };
    });

    console.log('Category counts updated:', this.categoriesWithCount);
  }

  /* ============================
     CART & NAVIGATION
  ============================ */

  addToCart(product: Product): void {
    this.cartservice.addToCart(product);
    this.modalMessage = `${product.name} added to cart successfully`;
    this.showMessage = true;

    console.log(this.modalMessage);

    setTimeout(() => (this.showMessage = false), 2000);
  }

  navigateToCategory(category: any): void {
    console.log('Navigating to category:', category);
    this.router.navigate([`/shop/${category}`]);
  }
}
