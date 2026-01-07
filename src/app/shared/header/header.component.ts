import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CartService } from 'src/app/core/add-to-cart/cart.service';
import { CurrencyService } from 'src/app/core/currency/currency.service';
import { LanguageService } from 'src/app/core/i18n/language.service';
import { Product, ProductService } from 'src/app/core/product-service/product.service';
import { WishlistService } from 'src/app/core/wishlist/wishlist.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 searchTerm: string = '';             // current text in search bar
  selectedCategory: string = 'All Category'; // currently selected category
  products: Product[] = [];            // all products from service
  filteredProducts: Product[] = [];    // suggestions for dropdown
  cartTotal: number = 0;               // total cart price
  getCount: number = 0;                // total unique items
  // New: category counts for dynamic display
  categoriesWithCount: { category: string; count: number; available: boolean }[] = [];
  //  currencies  concvert
   currencies: string[] = [];
  selectedCurrency: string = 'USD';
  // wishlistcount
  wishlistCount = 0;

   // List of available languages
  languages = ['en', 'tr', 'es', 'it'];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartservice: CartService,
    private currencyService: CurrencyService,
    public languageService: LanguageService, 
    private wishlistService: WishlistService
  ) {}

  ngOnInit() {

     // Subscribe to filtered products from service
    this.productService.products$.subscribe(products => {
      this.products = this.productService.getAllProducts(); 
      this.filteredProducts = products;
      console.log('Filtered Products:', products.map(p => p.name));
      
      this.updateCategoryCounts();      // update categories initially

    });


    // Get all products from service
    this.products = this.productService.getAllProducts();
    

    // Reset search on navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.searchTerm = '';
        this.filteredProducts = [];
      });

    // Subscribe to cart updates
    this.cartservice.cart$.subscribe(() => {
      this.cartTotal = this.cartservice.getTotalPrice();
      this.getCount = this.cartservice.getTotalQuantity();
      console.log('Cart updated:', this.cartTotal, 'Items:', this.getCount);
    });

    // suscribing to currency change

  // Subscribe to currency list
  this.currencyService.currencies$.subscribe((list: string[]) => {
    this.currencies = list;
  });

  // Subscribe to currencies
    this.currencyService.currencies$.subscribe((list: string[]) => {
      this.currencies = list;
    });

    // Subscribe to selected currency
    this.currencyService.selectedCurrency$.subscribe((currency: string) => {
      this.selectedCurrency = currency;
    });

    // suscribing to wishlist
     this.wishlistService.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });

  }

  /**
   * Triggered when user types in search bar
   * Updates the suggestions dropdown in real time
   */
  onSearchChange() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredProducts = [];
      return;
    }

    // Filter products based on search term AND selected category
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(term) &&
      (this.selectedCategory === 'All Category' || p.category.toLowerCase() === this.selectedCategory.toLowerCase())
    );

    console.log('Suggestions updated:', this.filteredProducts.map(p => p.name));
  }

  /**
   * Triggered when user selects a product from dropdown
   * Navigates to shop page with query params
   */
  selectProduct(product: Product) {
    this.searchTerm = product.name;
    this.filteredProducts = [];
    console.log('Product selected from dropdown:', product.name);

    this.router.navigate(['/shop'], {
      queryParams: {
        search: product.name,
        category: this.selectedCategory
      }
    });
  }

  /**
   * Triggered when user clicks search button
   * Navigates to shop page with query params
   */
  onSearch() {
    console.log('Search button clicked:', this.searchTerm, this.selectedCategory);
    this.filteredProducts = [];
    this.router.navigate(['/shop'], {
      queryParams: {
        search: this.searchTerm,
        category: this.selectedCategory
      }
    });
  }

  /**
   * Triggered when user changes category in dropdown
   * Updates suggestions automatically
   */
  onCategoryChange() {
    console.log('Category changed to:', this.selectedCategory);
    this.onSearchChange(); // update dropdown suggestions immediately
  }

  /**
   * Add product to cart
   */
  addToCart(product: Product) {
    this.cartservice.addToCart(product);
    console.log('Added to cart:', product.name);
  }
// currency change
  changeCurrency(currency: string) {
    this.currencyService.setCurrency(currency);
  }
// update category with count
  updateCategoryCounts(): void {
  const allProducts = this.productService.getAllProducts(); // full list, not filtered

  const allCategories = [...new Set(allProducts.map(p => p.category))];

  this.categoriesWithCount = allCategories.map(cat => {
    const count = allProducts.filter(p => p.category === cat).length;
    return {
      category: cat,
      count: count,
      available: count > 0
    };
  });

  console.log('Category counts:', this.categoriesWithCount);
}

navigateToCategory(category: any){
this.router.navigate([`/shop/${category}`])
}

 // Call this when user clicks a language
  changeLanguage(lang: string) {
    this.languageService.switchLanguage(lang);
  }
}

 

