import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService, Product } from 'src/app/core/product-service/product.service';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { WishlistService } from 'src/app/core/wishlist/wishlist.service';
import { PaginationService } from 'src/app/core/pagination/pagination.service';

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
  showWishlistMessage: boolean = false;
  wishlistMessage: string = ''


  constructor(
    private productService: ProductService,
    private cartservice: CartService,
    private router: Router,
    private wishlistService: WishlistService,
    public paginationService: PaginationService,
    private route: ActivatedRoute
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

           // pagination belongs ONLY here
  this.paginationService.calculateTotalPages(filtered.length);

  if (this.paginationService.currentPage > this.paginationService.totalPages) {
    this.paginationService.currentPage = 1;
  }
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
    const alreadyInWishlist = this.isInWishlist(product.id)
    console.log('Toggling wishlist for:', product.name);
    this.wishlistService.toggleWishlist(product);
    this.showWishlistMessage = true

    if (!alreadyInWishlist) {
      this.wishlistMessage = `${product.name} successfully added to wishlist`;
      console.log(this.wishlistMessage);
      
    }else{
      this.wishlistMessage = `${product.name} removed from wishlist`
    }
    setTimeout(() => (this.showWishlistMessage = false), 2000);
    
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
