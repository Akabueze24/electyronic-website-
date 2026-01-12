import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { PaginationService } from 'src/app/core/pagination/pagination.service';
import { ProductService, Product } from 'src/app/core/product-service/product.service';
import { WishlistService } from 'src/app/core/wishlist/wishlist.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  // 🛒 Products & Filters
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

  //  Colors
  availableColors: { count: any; name: string, available: boolean }[] = [];

  //  Categories for dynamic display
  categoriesWithCount: { category: string; count: number; available: boolean }[] = [];

  //  Wishlist
  wishlistProductsIds: number[] = [];
  showWishlistMessage: boolean = false;
  wishlistMessage: string = ''

  
  /* ==================== SIDE BANNERS ==================== */
  sideBannerProduct!: Product;
  $sideBnnerProduct!: Product;



  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartservice: CartService,
    private router: Router,
    private wishlistService: WishlistService,
    public paginationService: PaginationService
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

    // Subscribe to filtered products to update UI dynamically
    this.productService.products$.subscribe(filtered => {
      console.log('Filtered products updated:', filtered.length);
      this.filteredProducts = filtered;
      this.noResults = filtered.length === 0;
      this.updateAvailableColors();   // update color counts after filtering
      this.updateCategoryCounts();    // update category counts after filtering
      // After getting products, calculate total pages
      this.paginationService.calculateTotalPages(this.filteredProducts.length);

      //  pagination belongs here
      this.paginationService.calculateTotalPages(filtered.length);

      //  make sure current page is valid
      if (this.paginationService.currentPage > this.paginationService.totalPages) {
        this.paginationService.currentPage = 1;
      }
    });

     // Get featured products from home page
    const homeProducts = this.productService.getHomePageProducts();
    this.filteredProducts = homeProducts.featured;
    this.sideBannerProduct = this.filteredProducts[4];
    this.$sideBnnerProduct = this.filteredProducts[3];


    //  Cart subscription
    this.cartservice.cart$.subscribe(() => {
      this.cartTotal = this.cartservice.getTotalPrice();
      console.log('Cart total updated:', this.cartTotal);
    });

    //  Header search query params
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.selectedCategory = params['category'] || 'All Category';
      console.log('Header search triggered:', this.searchTerm, this.selectedCategory);
      this.applyFilters();
    });

    //  Wishlist subscription
    this.wishlistService.wishlistCount$.subscribe(() => {
      this.updateWishlistIds();
    });

    this.updateWishlistIds();

  }

  // Helper to sync product IDs with wishlist
  updateWishlistIds() {
    this.wishlistProductsIds = this.wishlistService.getWishlist().map(p => p.id);
    console.log('Wishlist IDs updated:', this.wishlistProductsIds);
  }

  // Toggle wishlist when button clicked
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

  isInWishlist(productId: number): boolean {
    return this.wishlistProductsIds.includes(productId);
  }

  /** Apply all filters (search, category, price, sort) */
  applyFilters(color?: string): void {
    console.log('Applying Filters:', {
      searchTerm: this.searchTerm,
      category: this.selectedCategory,
      priceRange: this.priceRange,
      sortType: this.sortType,
      color: color
    });

    const term = this.searchTerm.trim().toLowerCase();

    // Reset "no results" when search is empty
    if (term === "") {
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

  /** Event: Search input changed */
  onSearchChange() {
    console.log('Search input changed:', this.searchTerm);
    this.applyFilters();
  }

  /** Event: Category changed */
  onCategoryChange(category: string) {
    console.log('Category changed:', category);
    this.selectedCategory = category;
    this.applyFilters();
  }

  /** Event: Price slider changed */
  onPriceChange(min: number, max: number) {
    console.log('Price slider changed:', min, max);
    this.priceRange = { min, max };
    this.applyFilters();
  }

  /** Event: Sort option changed */
  onSortChange(sortType: string) {
    console.log('Sort option changed:', sortType);
    this.sortType = sortType;
    this.applyFilters();
  }

  /** Add product to cart */
  addToCart(product: Product) {
    this.cartservice.addToCart(product);
    this.modalMessage = `${product.name} added to cart successfully`;
    this.showMessage = true;
    console.log('Product added to cart:', product.name);

    setTimeout(() => {
      this.showMessage = false;
    }, 2000);
  }

  /** Update available colors dynamically based on filtered products */
  updateAvailableColors(): void {
    const allColors = Array.from(new Set(this.products.flatMap(p => p.color)));

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

  /** Update category counts dynamically based on filtered products */
  updateCategoryCounts(): void {
    const allCategories = [...new Set(this.products.map(p => p.category))];

    this.categoriesWithCount = allCategories.map(cat => {
      const count = this.filteredProducts.filter(p => p.category === cat).length;
      return { category: cat, count, available: count > 0 };
    });

    console.log('Category counts updated:', this.categoriesWithCount);
  }

  /** Navigate to category page */
  navigateToCategory(category: any) {
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
