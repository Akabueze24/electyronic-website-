import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { PaginationService } from 'src/app/core/pagination/pagination.service';
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
  showWishlistMessage: boolean = false;
  wishlistMessage: string = ''

  constructor(
    private productService: ProductService,
    private cartservice: CartService,
    private router: Router,
    private wishlistService: WishlistService,
    public paginationService: PaginationService,
    private route: ActivatedRoute
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

       // After getting products, calculate total pages
      this.paginationService.calculateTotalPages(this.filteredProducts.length);


       // pagination belongs ONLY here
  this.paginationService.calculateTotalPages(this.filteredProducts.length);

  if (this.paginationService.currentPage > this.paginationService.totalPages) {
    this.paginationService.currentPage = 1;
  }
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
