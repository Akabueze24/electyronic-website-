import { Component,  OnInit } from '@angular/core';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { Product } from 'src/app/core/product-service/product.service';
import { ProductService } from 'src/app/core/product-service/product.service';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

productChunks: Product[][] = []

  cartTotal: number = 0;                      // Cart total
  modalMessage: string = '';                  // Modal message
  showMessage: boolean = false;               // Show modal


  allProducts: Product[] = [];
  newArrivals: Product[] = [];
  featuredProducts: Product[] = [];
  topSellingProducts: Product[] = [];

  constructor( private productService: ProductService, private cartservice: CartService){}


  ngOnInit(): void {


   const homeProducts = this.productService.getHomePageProducts();

  // Individual arrays
  this.newArrivals = homeProducts.newArrivals;
  this.featuredProducts = homeProducts.featured;
  this.topSellingProducts = homeProducts.topSelling;

  // Merge into one main array (no duplicates by ID)
  const combined = [
    ...homeProducts.all,
    ...homeProducts.newArrivals,
    ...homeProducts.featured,
    ...homeProducts.topSelling
  ];

  // Remove duplicates by product ID
  const map = new Map<number, Product>();
  combined.forEach(p => map.set(p.id, p));
  this.allProducts = Array.from(map.values());

  console.log('All Products merged:', this.allProducts.map(p => p.name));

  // ✅ Chunk featuredProducts for nested carousel
  this.chunkProducts(this.featuredProducts, 4); // 4 products per inner carousel

  
}

chunkProducts(products: Product[], chunkSize: number) {
  this.productChunks = [];
  for (let i = 0; i < products.length; i += chunkSize) {
    this.productChunks.push(products.slice(i, i + chunkSize));
  }
  




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


  /** Add product to cart */
  addToCart(product: Product): void {
    this.cartservice.addToCart(product);
    this.modalMessage = `${product.name} added to cart successfully`;
    this.showMessage = true;
    console.log(this.modalMessage);

    setTimeout(() => this.showMessage = false, 2000);
  }

}
