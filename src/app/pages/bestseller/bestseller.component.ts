import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { Product, ProductService } from 'src/app/core/product-service/product.service';
import { WishlistService } from 'src/app/core/wishlist/wishlist.service';

declare var $: any;

@Component({
  selector: 'app-your-component',
  templateUrl: './bestseller.component.html',
})
export class BestsellerComponent implements OnInit, AfterViewInit {

  /* ============================
     CAROUSEL STATE
  ============================ */

  productChunks: Product[][] = [];   // Chunked products for nested carousel

  /* ============================
     CART UI STATE
  ============================ */

  cartTotal: number = 0;
  modalMessage: string = '';
  showMessage: boolean = false;

  /* ============================
     PRODUCT COLLECTIONS
  ============================ */

  allProducts: Product[] = [];
  newArrivals: Product[] = [];
  featuredProducts: Product[] = [];
  topSellingProducts: Product[] = [];

  /* ============================
     WISHLIST STATE
  ============================ */

  wishlistProductsIds: number[] = []; // Track wishlist product IDs
  showWishlistMessage: boolean = false;
  wishlistMessage: string = ''

  /* ============================
     SIDE BANNER PRODUCTS
     (left untouched — naming preserved)
  ============================ */

  $sideBannerProduct!: Product;
  sideBannerProduct$!: Product;
  sidebanner!: Product;
  sideBannerProduct!: Product;

  constructor(
    private productService: ProductService,
    private cartservice: CartService,
    private wishlistService: WishlistService
  ) {}

  /* ============================
     LIFECYCLE
  ============================ */

  ngOnInit(): void {

    console.log('BestsellerComponent initialized');

    /* --------------------------------
       LOAD HOMEPAGE PRODUCTS
    --------------------------------- */
    const homeProducts = this.productService.getHomePageProducts();

    this.newArrivals = homeProducts.newArrivals;
    this.featuredProducts = homeProducts.featured;
    this.topSellingProducts = homeProducts.topSelling;

    console.log('Homepage product groups loaded:', {
      newArrivals: this.newArrivals.length,
      featured: this.featuredProducts.length,
      topSelling: this.topSellingProducts.length
    });

    /* --------------------------------
       MERGE ALL PRODUCTS (NO DUPLICATES)
    --------------------------------- */
    const combined = [
      ...homeProducts.all,
      ...homeProducts.newArrivals,
      ...homeProducts.featured,
      ...homeProducts.topSelling
    ];

    const map = new Map<number, Product>();
    combined.forEach(p => map.set(p.id, p));
    this.allProducts = Array.from(map.values());

    console.log('All products merged:', this.allProducts.map(p => p.name));

    /* --------------------------------
       SIDE BANNER ASSIGNMENTS
    --------------------------------- */
    this.sideBannerProduct = this.featuredProducts[0];
    this.$sideBannerProduct = this.topSellingProducts[0];
    this.sideBannerProduct$ = this.newArrivals[0];
    this.sidebanner = this.topSellingProducts[1];

    console.log('Side banner products assigned');

    /* --------------------------------
       CHUNK FEATURED PRODUCTS
    --------------------------------- */
    this.chunkProducts(this.featuredProducts, 4);
  }

  /* ============================
     PRODUCT CHUNKING
  ============================ */

  chunkProducts(products: Product[], chunkSize: number): void {

    console.log('Chunking products:', products.length);

    this.productChunks = [];

    for (let i = 0; i < products.length; i += chunkSize) {
      this.productChunks.push(products.slice(i, i + chunkSize));
    }

    console.log('Product chunks created:', this.productChunks.length);

    /* --------------------------------
       INIT CAROUSELS AFTER DOM UPDATE
    --------------------------------- */
    setTimeout(() => this.initCarousels(), 100);

    /* --------------------------------
       WISHLIST SUBSCRIPTION
    --------------------------------- */
    this.wishlistService.wishlistCount$.subscribe(() => {
      console.log('Wishlist count updated (bestseller)');
      this.updateWishlistIds();
    });

    this.updateWishlistIds();
  }

  /* ============================
     WISHLIST METHODS
  ============================ */

  updateWishlistIds(): void {
    this.wishlistProductsIds = this.wishlistService
      .getWishlist()
      .map(p => p.id);

    console.log('Wishlist IDs synced (bestseller):', this.wishlistProductsIds);
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

  /* ============================
     CART METHODS
  ============================ */

  addToCart(product: Product): void {
    this.cartservice.addToCart(product);
    this.modalMessage = `${product.name} added to cart successfully`;
    this.showMessage = true;

    console.log(this.modalMessage);

    setTimeout(() => (this.showMessage = false), 2000);
  }

  /* ============================
     CAROUSEL INIT
  ============================ */

  ngAfterViewInit(): void {
    console.log('AfterViewInit → initializing carousels');
    this.initCarousels();
  }

  initCarousels(): void {

    console.log('Initializing Owl Carousels');

    // Outer slider
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
        992: { items: 3 },
      }
    });

    // Inner slider
    $('.productImg-carousel').owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      dots: false,
      autoplay: true,
      smartSpeed: 1000,
      autoplayTimeout: 2500,
      autoplayHoverPause: true,
      items: 1,
    });
  }
}
