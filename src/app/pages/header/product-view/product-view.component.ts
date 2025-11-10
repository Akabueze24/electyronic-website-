import { Component, AfterViewInit, OnInit } from '@angular/core';
declare var $: any;
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from 'src/app/core/add-to-cart/cart.service';
import { ProductService, Product } from 'src/app/core/header-search-bar/product.service';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements AfterViewInit, OnInit {
  product?: Product;
  cartTotal = 0;
  cartItems: CartItem[] = [];
  quantity: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    // Get product ID from URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);

    // Subscribe to cart updates
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.cartTotal = this.cartService.getTotalPrice();
    });
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
    this.cartService.addToCart(product);
    alert(`${product.name} added to cart!`);
  }

  // Get product quantity in cart
  getProductQuantity(productId: number): number {
    const item = this.cartItems.find(i => i.id === productId);
    return item ? item.quantity : 0;
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
