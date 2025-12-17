import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem, CartService } from 'src/app/core/add-to-cart/cart.service';
import { ProductService, Product } from 'src/app/core/product-service/product.service';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements AfterViewInit, OnInit {
  products: Product[] = [];
  product?: Product;
  cartTotal = 0;
  cartItems: CartItem[] = [];
  quantity: number = 0;
  modalMessage = '';
  showMesage: boolean = false;
   // New: category counts for dynamic display
  categoriesWithCount: { category: string; count: number; available: boolean }[] = [];

  // New: track colors available for this product
availableColors: { color: string; available: boolean }[] = [];

// Track the selected color
selectedColor?: string;

filteredProducts: Product[] = [];

reviewForm!: FormGroup

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router

  ) { }

  ngOnInit(): void {
    // Get product ID from URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);

    if(this.product){
      this.colorService();
    }

    // Subscribe to cart updates
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.cartTotal = this.cartService.getTotalPrice();
      
    });


    // Subscribe to filtered products to update category counts live
this.productService.products$.subscribe((products: Product[]) => {
  this.products = products;
  this.filteredProducts = products;
  this.updateCategoryCounts(); // initial update
});




   
    

    // review from in product view

    this.reviewForm = this.fb.group({
  user: ['', Validators.required],
  email: ['', Validators.required],
  comment: ['', Validators.required],
  rating: [0, Validators.required]
});

  }
// Pull colors dynamically from the service
 colorService(): void {
  if (!this.product) return;

  // Get all variants of this product by name
  const sameProduct = this.productService.getAllProducts().filter(p =>
    p.name === this.product!.name
  );

  // Flatten colors and get unique list
  const allColors = Array.from(new Set(sameProduct.flatMap(p => p.color)));

  this.availableColors = allColors.map(color => ({
    color,
    available: true
  }));

  console.log('Available colors for this product:', this.availableColors);
}


  

  // Quantity controls
  increaseQuantity(product: Product) {
    this.cartService.updateQuantity(product.id, +1);
    this.quantity++;
  }

  decreaseQuantity(product: Product) {
    this.cartService.updateQuantity(product.id, -1);
  }

  // Add product to cart
  addToCart(product: Product) {
    this.cartService.addToCart({
      ...product,
    selectedColor: this.selectedColor || (product.color.length > 0 ? product.color[0]: undefined)
  });
    this.modalMessage = `${product.name} added to cart successfully`
    this.showMesage = true;

   setTimeout(() => {
    this.showMesage = false
   }, 2000);
  }

  // Get product quantity in cart
  getProductQuantity(productId: number): number {
    const item = this.cartItems.find(i => i.id === productId);
    return item ? item.quantity : 0;
  }

submitReview() {
  if (!this.product) {
    console.error("Product not found!");
    return;
  }

  const review = {
    user: this.reviewForm.value.user,
    rating: this.reviewForm.value.rating,
    comment: this.reviewForm.value.comment,
    date: new Date()
  };
this.reviewForm.reset()


  this.productService.addReview(this.product.id, review);
}

// categories with count
updateCategoryCounts(): void {
    const allCategories = [...new Set(this.products.map(p => p.category))];

    this.categoriesWithCount = allCategories.map(cat => {
      const count = this.filteredProducts.filter(p => p.category === cat).length;
      return { category: cat, count, available: count > 0 };
    });

    console.log('Category counts updated:', this.categoriesWithCount);
  }

  navigateToCatogory(category: any){
    this.router.navigate([`/shop/${category}`])
  }


  
  

  // Owl carousel setup
  ngAfterViewInit(): void {
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
      navText: [
        '<span class="owl-prev-btn">&lt;</span>',
        '<span class="owl-next-btn">&gt;</span>'
      ],
    });

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

    $('.custom-owl-next').click(() => {
      $('.related-carousel').trigger('next.owl.carousel');
    });

    $('.custom-owl-prev').click(() => {
      $('.related-carousel').trigger('prev.owl.carousel');
    });
  }
}
