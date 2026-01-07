import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { Product, ProductService } from 'src/app/core/product-service/product.service';
import { WishlistService } from 'src/app/core/wishlist/wishlist.service';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  /* ==================== CAROUSEL ==================== */
  productChunks: Product[][] = [];   // Chunked products for nested carousel

  /* ==================== CART UI ==================== */
  cartTotal: number = 0;              // Cart total
  modalMessage: string = '';          // Cart modal message
  showMessage: boolean = false;       // Show cart modal

  /* ==================== PRODUCTS ==================== */
  allProducts: Product[] = [];
  newArrivals: Product[] = [];
  featuredProducts: Product[] = [];
  topSellingProducts: Product[] = [];

  /* ==================== SIDE BANNERS ==================== */
  sideBannerProduct!: Product;
  $sideBannerProduct!: Product;
  sideBannerProduct$!: Product;
  sidebanner!: Product;

  /* ==================== WISHLIST ==================== */
  wishlistProductsIds: number[] = []; // Track wishlist product IDs

  constructor(
    private productService: ProductService,
    private cartservice: CartService,
    private route: ActivatedRoute,
    private wishlistService: WishlistService
  ) {}

  /* ==================== LIFECYCLE ==================== */
  ngOnInit(): void {
    console.log('[Home] Component initialized');

    // --- Filter products by category if query param exists ---
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        const category = params['category'];

        this.allProducts = this.allProducts.filter(
          p => p.category.toLowerCase() === category.toLowerCase()
        );

        console.log(
          '[Home] Filtered by category:',
          category,
          this.allProducts.map(p => p.name)
        );
      }
    });

    // --- Load homepage product groups ---
    const homeProducts = this.productService.getHomePageProducts();

    this.newArrivals = homeProducts.newArrivals;
    this.featuredProducts = homeProducts.featured;
    this.topSellingProducts = homeProducts.topSelling;

    // --- Merge all product sources (remove duplicates by ID) ---
    const combined = [
      ...homeProducts.all,
      ...homeProducts.newArrivals,
      ...homeProducts.featured,
      ...homeProducts.topSelling
    ];

    const map = new Map<number, Product>();
    combined.forEach(p => map.set(p.id, p));
    this.allProducts = Array.from(map.values());

    console.log('[Home] All products merged:', this.allProducts.map(p => p.name));

    // --- Side banner assignments ---
    this.sideBannerProduct = this.featuredProducts[0];
    this.$sideBannerProduct = this.topSellingProducts[0];
    this.sideBannerProduct$ = this.newArrivals[0];
    this.sidebanner = this.topSellingProducts[1];

    // --- Prepare carousel chunks ---
    this.chunkProducts(this.featuredProducts, 4);

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

    console.log('[Home] Wishlist synced:', this.wishlistProductsIds);
  }

  toggleWishlist(product: Product): void {
    this.wishlistService.toggleWishlist(product);
    this.updateWishlistIds();
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistProductsIds.includes(productId);
  }

  /* ==================== CAROUSEL HELPERS ==================== */

  chunkProducts(products: Product[], chunkSize: number): void {
    this.productChunks = [];

    for (let i = 0; i < products.length; i += chunkSize) {
      this.productChunks.push(products.slice(i, i + chunkSize));
    }

    console.log('[Home] Products chunked:', this.productChunks.length);

    // Re-init carousel after DOM update
    setTimeout(() => this.initCarousels(), 100);
  }

  /* ==================== CART ==================== */

  addToCart(product: Product): void {
    this.cartservice.addToCart(product);

    this.modalMessage = `${product.name} added to cart successfully`;
    this.showMessage = true;

    console.log('[Home] Cart add:', this.modalMessage);

    setTimeout(() => (this.showMessage = false), 2000);
  }

  /* ==================== CAROUSEL INIT ==================== */

  ngAfterViewInit(): void {
    this.initCarousels();
  }

  initCarousels(): void {
    console.log('[Home] Initializing carousels');

    // Outer carousel
    $('.productList-carousel').owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      dots: false,
      autoplay: true,
      smartSpeed: 1500,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 1 },
        576: { items: 1 },
        768: { items: 2 },
        992: { items: 3 }
      }
    });

    // Inner carousel
    $('.productImg-carousel').owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      dots: false,
      autoplay: true,
      smartSpeed: 1000,
      autoplayTimeout: 2500,
      autoplayHoverPause: true,
      items: 1
    });
  }
}
