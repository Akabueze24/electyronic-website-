import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem, CartService } from 'src/app/core/add-to-cart/cart.service';
import { ProductService, Product } from 'src/app/core/product-service/product.service';
import { ReviewService, Review } from 'src/app/core/productReview/review.service';

declare var $: any;

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements AfterViewInit, OnInit {
  
  /* ==================== PRODUCTS ==================== */
  products: Product[] = [];
  filteredProducts: Product[] = [];
  product?: Product;
  allProducts: Product[] = [];
  newArrivals: Product[] = [];
  featuredProducts: Product[] = [];
  topSellingProducts: Product[] = [];
  productChunks: Product[][] = [];

  /* ==================== CART ==================== */
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  quantity: number = 0;
  modalMessage: string = '';
  showMesage: boolean = false;

  /* ==================== CATEGORIES ==================== */
  categoriesWithCount: { category: string; count: number; available: boolean }[] = [];

  /* ==================== COLORS ==================== */
  availableColors: { color: string; available: boolean }[] = [];
  selectedColor?: string;

  /* ==================== REVIEWS ==================== */
  reviewForm!: FormGroup;
  productReviews: Review[] = [];

  constructor(
    private productService: ProductService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  /* ==================== LIFECYCLE ==================== */
  ngOnInit(): void {
    console.log('[ProductView] Component initialized');

    // Reset filters on load
    this.productService.resetFilters();

    // Load product by ID from route
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);

    if (this.product) {
      this.loadAvailableColors();
    }

    // Subscribe to cart changes
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.cartTotal = this.cartService.getTotalPrice();
      console.log('[ProductView] Cart updated:', this.cartTotal);
    });

    // Subscribe to filtered products for category counts
    this.productService.products$.subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = products;
      this.updateCategoryCounts();
    });

    // Initialize review form
    this.reviewForm = this.fb.group({
      user: ['', Validators.required],
      email: ['', Validators.required],
      comment: ['', Validators.required],
      rating: [0, Validators.required]
    });

    // Subscribe to reviews for this product
    this.reviewService.getReviews().subscribe(reviews => {
      if (this.product) {
        this.productReviews = reviews.filter(r => r.productId === this.product!.id);
        console.log('[ProductView] Reviews loaded:', this.productReviews.length);
      }
    });

    // Load homepage products
    const homeProducts = this.productService.getHomePageProducts();
    this.newArrivals = homeProducts.newArrivals;
    this.featuredProducts = homeProducts.featured;
    this.topSellingProducts = homeProducts.topSelling;

    // Merge all products without duplicates
    const combined = [
      ...homeProducts.all,
      ...homeProducts.newArrivals,
      ...homeProducts.featured,
      ...homeProducts.topSelling
    ];
    const map = new Map<number, Product>();
    combined.forEach(p => map.set(p.id, p));
    this.allProducts = Array.from(map.values());
    console.log('[ProductView] All products merged:', this.allProducts.map(p => p.name));

    // Chunk featured products for carousel
    this.chunkProducts(this.featuredProducts, 4);
  }

  /* ==================== PRODUCT CHUNKS ==================== */
  chunkProducts(products: Product[], chunkSize: number) {
    this.productChunks = [];
    for (let i = 0; i < products.length; i += chunkSize) {
      this.productChunks.push(products.slice(i, i + chunkSize));
    }
    console.log('[ProductView] Products chunked:', this.productChunks.length);
  }

  /* ==================== COLORS ==================== */
  loadAvailableColors(): void {
    if (!this.product) return;
    const sameProduct = this.productService.getAllProducts().filter(p => p.name === this.product!.name);
    const allColors = Array.from(new Set(sameProduct.flatMap(p => p.color)));
    this.availableColors = allColors.map(color => ({ color, available: true }));

    console.log('[ProductView] Available colors:', this.availableColors);
  }

  /* ==================== CART ==================== */
  increaseQuantity(product: Product) {
    this.cartService.updateQuantity(product.id, +1);
    this.quantity++;
  }

  decreaseQuantity(product: Product) {
    this.cartService.updateQuantity(product.id, -1);
  }

  addToCart(product: Product) {
    const selectedColor = this.selectedColor || (product.color.length > 0 ? product.color[0] : undefined);
    this.cartService.addToCart({ ...product, selectedColor });

    this.modalMessage = `${product.name} added to cart successfully`;
    this.showMesage = true;
    console.log('[ProductView] Added to cart:', product.name);

    setTimeout(() => { this.showMesage = false; }, 2000);
  }

  getProductQuantity(productId: number): number {
    const item = this.cartItems.find(i => i.id === productId);
    return item ? item.quantity : 0;
  }

  /* ==================== REVIEWS ==================== */
  submitReview() {
    if (!this.product) {
      console.error('[ProductView] Product not found for review');
      return;
    }

    const review: Review = {
      productId: this.product.id,
      user: this.reviewForm.value.user,
      comment: this.reviewForm.value.comment,
      rating: this.reviewForm.value.rating,
      date: new Date().toISOString()
    };

    this.reviewForm.reset();
    this.reviewService.addReview(review);
    console.log('[ProductView] Review submitted:', review);
  }

  /* ==================== CATEGORY COUNTS ==================== */
  updateCategoryCounts(): void {
    const allCategories = [...new Set(this.products.map(p => p.category))];
    this.categoriesWithCount = allCategories.map(cat => {
      const count = this.filteredProducts.filter(p => p.category === cat).length;
      return { category: cat, count, available: count > 0 };
    });
    console.log('[ProductView] Category counts updated:', this.categoriesWithCount);
  }

  navigateToCategory(category: any) {
    console.log('[ProductView] Navigate to category:', category);
    this.router.navigate([`/shop/${category}`]);
  }

  /* ==================== OWL CAROUSEL ==================== */
  ngAfterViewInit(): void {
    // Single product carousel
    $('.single-carousel').owlCarousel({
      items: 1,
      loop: true,
      margin: 10,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      smartSpeed: 1300,
      dotsData: true,
      navText: ['<span class="owl-prev-btn">&lt;</span>', '<span class="owl-next-btn">&gt;</span>']
    });

    // Related products carousel
    $('.related-carousel').owlCarousel({
      autoplay: true,
      smartSpeed: 600,
      loop: true,
      margin: 20,
      dots: false,
      nav: false,
      responsive: {
        0: { items: 1 },
        576: { items: 2 },
        768: { items: 3 },
        992: { items: 4 }
      }
    });

    // Custom next/prev buttons
    $('.custom-owl-next').click(() => { $('.related-carousel').trigger('next.owl.carousel'); });
    $('.custom-owl-prev').click(() => { $('.related-carousel').trigger('prev.owl.carousel'); });
  }
}
