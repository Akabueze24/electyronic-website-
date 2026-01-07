import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { Product, ProductService } from 'src/app/core/product-service/product.service';
import { WishlistService } from 'src/app/core/wishlist/wishlist.service';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css']
})
export class ComputersComponent implements OnInit {

  /* -------------------- PRODUCTS -------------------- */
  products: Product[] = [];              // All products (unfiltered)
  filteredProducts: Product[] = [];       // Products after filters
  featuredProducts: Product[] = [];       // Homepage featured products

  /* ==================== SIDE BANNERS ==================== */
  sideBannerProduct!: Product;
  $sideBnnerProduct!: Product;

  /* -------------------- FILTER STATE -------------------- */
  searchTerm: string = '';
  selectedCategory: string = 'computer';
  priceRange = { min: 0, max: 2000 };
  sortType: string = 'default';
  noResults: boolean = false;

  /* -------------------- UI STATE -------------------- */
  cartTotal: number = 0;
  modalMessage: string = '';
  showMessage: boolean = false;

  /* -------------------- COLORS -------------------- */
  availableColors: {
    name: string;
    available: boolean;
    count: number;
  }[] = [];

  /* -------------------- CATEGORIES -------------------- */
  categoriesWithCount: {
    category: string;
    count: number;
    available: boolean;
  }[] = [];

  /* -------------------- WISHLIST -------------------- */
  wishlistProductsIds: number[] = []; // IDs of products in wishlist

  constructor(
    private productService: ProductService,
    private cartservice: CartService,
    private router: Router,
    private wishlistService: WishlistService
  ) {}

  /* ==================== LIFECYCLE ==================== */
  ngOnInit(): void {

    /* ---- Products subscription (filters) ---- */
    this.productService.products$.subscribe(products => {
      console.log('[Products$] Filtered products updated:', products.length);

      this.filteredProducts = products;
      this.products = this.productService.getAllProducts();
      this.noResults = products.length === 0;

      this.updateAvailableColors();
      this.updateCategoryCounts();
    });

    /* ---- Homepage featured products ---- */
    const homeProducts = this.productService.getHomePageProducts();
    this.featuredProducts = homeProducts.featured;
    this.sideBannerProduct = this.featuredProducts[1];
    this.$sideBnnerProduct = this.featuredProducts[4];

    /* ---- Cart subscription ---- */
    this.cartservice.cart$.subscribe(() => {
      this.cartTotal = this.cartservice.getTotalPrice();
      console.log('[Cart] Total updated:', this.cartTotal);
    });

    /* ---- Wishlist subscription (header sync) ---- */
    this.wishlistService.wishlistCount$.subscribe(() => {
      console.log('[Wishlist] Count changed');
      this.updateWishlistIds();
    });

    /* ---- Initial load ---- */
    this.applyFilters();
    this.updateWishlistIds();
  }

  /* ==================== WISHLIST ==================== */

  // Sync wishlist IDs for heart icon state
  updateWishlistIds(): void {
    this.wishlistProductsIds = this.wishlistService
      .getWishlist()
      .map(p => p.id);

    console.log('[Wishlist] Current IDs:', this.wishlistProductsIds);
  }

  // Add/remove product from wishlist
  toggleWishlist(product: Product): void {
    console.log('[Wishlist] Toggle product:', product.name);
    this.wishlistService.toggleWishlist(product);
    this.updateWishlistIds();
  }

  // Check if product is already in wishlist
  isInWishlist(productId: number): boolean {
    return this.wishlistProductsIds.includes(productId);
  }

  /* ==================== FILTERS ==================== */

  applyFilters(color?: string): void {
    console.log('[Filters] Applying:', {
      search: this.searchTerm,
      category: this.selectedCategory,
      priceRange: this.priceRange,
      sort: this.sortType,
      color
    });

    if (this.searchTerm.trim() === '') {
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

    console.log('[Colors] Updated:', this.availableColors);
  }

  applyColorFilter(color: string): void {
    console.log('[Colors] Selected:', color);
    this.applyFilters(color);
  }

  /* ==================== CART ==================== */

  addToCart(product: Product): void {
    this.cartservice.addToCart(product);

    this.modalMessage = `${product.name} added to cart successfully`;
    this.showMessage = true;

    console.log('[Cart] Added:', product.name);

    setTimeout(() => (this.showMessage = false), 2000);
  }

  /* ==================== CATEGORIES ==================== */

  updateCategoryCounts(): void {
    const allProducts = this.productService.getAllProducts();
    const allCategories = [...new Set(allProducts.map(p => p.category))];

    this.categoriesWithCount = allCategories.map(category => {
      const count = allProducts.filter(p => p.category === category).length;
      return { category, count, available: count > 0 };
    });

    console.log('[Categories] Counts:', this.categoriesWithCount);
  }

  navigateToCategory(category: string): void {
    console.log('[Navigation] Category:', category);
    this.router.navigate([`/shop/${category}`]);
  }
}
