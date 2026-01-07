import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { ProductService, Product } from 'src/app/core/product-service/product.service';
import { WishlistService } from 'src/app/core/wishlist/wishlist.service';

@Component({
  selector: 'app-smart-tv',
  templateUrl: './smart-tv.component.html',
  styleUrls: ['./smart-tv.component.css']
})
export class SmartTvComponent {

  // All products filtered via the service
  filteredProducts: Product[] = [];
  products: Product[] = [];

  // Local UI variables
  searchTerm: string = '';
  selectedCategory: string = 'smart-tv';
  priceRange = { min: 0, max: 2000 };
  sortType: string = 'default';
  cartTotal: number = 0;
  modalMessage: string = '';
  showMessage: boolean = false;
  noResults: boolean = false;

  // Color array with availability and count
  availableColors: { name: string; available: boolean; count: number }[] = [];

  featuredProducts: Product[] = [];

  // Category counts for dynamic display
  categoriesWithCount: { category: string; count: number; available: boolean }[] = [];

   /* ==================== SIDE BANNERS ==================== */
  sideBannerProduct!: Product;
  $sideBnnerProduct!: Product;

  // Wishlist product IDs
  wishlistProductsIds: number[] = [];

  constructor(
    private productService: ProductService,
    private cartservice: CartService,
    private router: Router,
    private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {

    // Subscribe to all products from service
    this.productService.products$.subscribe(products => {
      this.products = this.productService.getAllProducts();
      this.filteredProducts = products;
      console.log('Filtered Products:', products.map(p => p.name));
      this.updateAvailableColors();
      this.updateCategoryCounts();
    });

    // Subscribe to filtered products to update UI dynamically
    this.productService.products$.subscribe(filtered => {
      console.log('Filtered products updated:', filtered.length);
      this.filteredProducts = filtered;
      this.noResults = filtered.length === 0;
      this.updateAvailableColors();
      this.updateCategoryCounts();
    });

    // Get featured products from homepage
    const homeProducts = this.productService.getHomePageProducts();
    this.featuredProducts = homeProducts.featured;
    this.sideBannerProduct = this.featuredProducts[4];
    this.$sideBnnerProduct = this.featuredProducts[3];

    // Subscribe to cart changes
    this.cartservice.cart$.subscribe(() => {
      this.cartTotal = this.cartservice.getTotalPrice();
      console.log('Cart total updated:', this.cartTotal);
    });

    // Apply initial filter
    this.applyFilters();

    // Subscribe to wishlist updates
    this.wishlistService.wishlistCount$.subscribe(() => {
      this.updateWishlistIds();
    });

    this.updateWishlistIds();
  }

  // Update wishlist IDs
  updateWishlistIds() {
    this.wishlistProductsIds = this.wishlistService.getWishlist().map(p => p.id);
    console.log('Wishlist IDs updated:', this.wishlistProductsIds);
  }

  // Toggle wishlist for a product
  toggleWishlist(product: Product) {
    this.wishlistService.toggleWishlist(product);
    this.updateWishlistIds();
  }

  // Check if a product is in wishlist
  isInWishlist(productId: number): boolean {
    return this.wishlistProductsIds.includes(productId);
  }

  // Apply all filters using service
  applyFilters(color?: string): void {
    console.log('Applying Filters:', {
      searchTerm: this.searchTerm,
      category: this.selectedCategory,
      priceRange: this.priceRange,
      sortType: this.sortType,
      color: color
    });

    const term = this.searchTerm.trim().toLowerCase();

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

  // Update available colors based on filtered products
  updateAvailableColors(): void {
    const allColors = Array.from(new Set(this.products.flatMap(p => p.color)));

    this.availableColors = allColors.map(color => {
      const count = this.filteredProducts.filter(p => p.color.includes(color)).length;
      return { name: color, available: count > 0, count };
    });

    console.log('Available Colors with counts:', this.availableColors);
  }

  // Apply color filter when clicked
  applyColorFilter(color: string) {
    console.log('Filtering by color:', color);
    this.applyFilters(color);
  }

  // Add product to cart
  addToCart(product: Product): void {
    this.cartservice.addToCart(product);
    this.modalMessage = `${product.name} added to cart successfully`;
    this.showMessage = true;
    console.log(this.modalMessage);

    setTimeout(() => this.showMessage = false, 2000);
  }

  // Update category counts dynamically
  updateCategoryCounts(): void {
    const allProducts = this.productService.getAllProducts();

    const allCategories = [...new Set(allProducts.map(p => p.category))];

    this.categoriesWithCount = allCategories.map(cat => {
      const count = allProducts.filter(p => p.category === cat).length;
      return { category: cat, count: count, available: count > 0 };
    });

    console.log('Category counts:', this.categoriesWithCount);
  }

  // Navigate to a category page
  navigateToCategory(category: any) {
    console.log('Navigating to category:', category);
    this.router.navigate([`/shop/${category}`]);
  }
}
