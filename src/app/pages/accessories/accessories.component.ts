import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'rxjs';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { PaginationService } from 'src/app/core/pagination/pagination.service';
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
    private wishlistService: WishlistService,
    public paginationService: PaginationService,
    private route: ActivatedRoute
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


      // pagination belongs ONLY here
      this.paginationService.calculateTotalPages(filtered.length);

      if (this.paginationService.currentPage > this.paginationService.totalPages) {
        this.paginationService.currentPage = 1;
      }
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
    const alreadyInWishlist = this.isInWishlist(product.id)
    console.log('Toggling wishlist for:', product.name);
    this.wishlistService.toggleWishlist(product);
    this.showWishlistMessage = true

    if (!alreadyInWishlist) {
      this.wishlistMessage = `${product.name} successfully added to wishlist`;
      console.log(this.wishlistMessage);

    } else {
      this.wishlistMessage = `${product.name} removed from wishlist`
    }
    setTimeout(() => (this.showWishlistMessage = false), 2000);

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


  // ----------------------------
  // Pagination helpers
  // ----------------------------
  get paginatedProducts(): Product[] {
    const paginated = this.paginationService.paginate(this.filteredProducts, this.paginationService.currentPage);
    console.log('Paginated products for current page:', this.paginationService.currentPage, paginated.map(p => p.name));
    return paginated;
  }


  get totalPages(): number {
    return this.paginationService.totalPages;
  }

  goToPage(page: number) {
    console.log('Going to page:', page);
    this.paginationService.currentPage = page;
    this.updatePageInUrl(page); // update URL query params
  }

  nextPage() {
    this.paginationService.nextPage();
    console.log('Next page:', this.paginationService.currentPage);
    this.updatePageInUrl(this.paginationService.currentPage);
  }

  prevPage() {
    this.paginationService.prevPage();
    console.log('Previous page:', this.paginationService.currentPage);
    this.updatePageInUrl(this.paginationService.currentPage);
  }

  getVisiblePages(): number[] {
    const total = this.totalPages;
    const current = this.paginationService.currentPage;
    const maxVisible = 5;

    let start = Math.max(current - 2, 1);
    let end = Math.min(start + maxVisible - 1, total);

    if (end - start < maxVisible - 1) {
      start = Math.max(end - maxVisible + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }


  // ----------------------------
  // Update query params in URL (for sharing/bookmarking)
  // ----------------------------
  updatePageInUrl(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page,
        search: this.searchTerm || null,
        category: this.selectedCategory !== 'All Category' ? this.selectedCategory : null,
        sort: this.sortType !== 'default' ? this.sortType : null
      },
      queryParamsHandling: 'merge'
    });
  }


}
