import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReviewService, Review } from 'src/app/core/productReview/review.service';
import { ProductService, Product } from 'src/app/core/product-service/product.service';

@Component({
  selector: 'app-admin-review-and-ratings',
  templateUrl: './admin-review-and-ratings.component.html',
  styleUrls: ['./admin-review-and-ratings.component.css']
})
export class AdminReviewComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  reviews: (Review & { productName?: string })[] = [];

  // Confirmation dialog state
  showConfirmDialog = false;
  reviewToDeleteIndex: number | null = null;

  // Clear All Reviews dialog
  showClearAllDialog = false;

  constructor(
    private reviewService: ReviewService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    console.log('AdminReviewComponent initialized');

    this.subscription = this.reviewService.getReviews().subscribe(res => {
      // Map reviews to include product names
      this.reviews = res.map(r => ({
        ...r,
        productName: this.productService.getProductById(r.productId)?.name || 'Unknown'
      }));
      console.log('Loaded reviews:', this.reviews);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Subscription unsubscribed');
    }
  }

  // Open delete dialog for one review
  openDeleteDialog(index: number) {
    this.reviewToDeleteIndex = index;
    this.showConfirmDialog = true;
    console.log('Open delete dialog for review index:', index);
  }

  cancelDialog() {
    this.showConfirmDialog = false;
    this.reviewToDeleteIndex = null;
    console.log('Cancel deletion');
  }

  confirmDelete() {
    if (this.reviewToDeleteIndex !== null) {
      const review = this.reviews[this.reviewToDeleteIndex];
      console.log('Deleting review:', review);

      // Remove review from service
      this.reviews.splice(this.reviewToDeleteIndex, 1);
      this.reviewService['reviews$'].next([...this.reviews]); // Update BehaviorSubject
      this.reviewService['saveReviewsToFirebase']();
      this.reviewService['saveReviewsToLocalStorage']();

      this.cancelDialog();
    }
  }

  // Clear all reviews
  openClearAllDialog() {
    this.showClearAllDialog = true;
  }

  cancelClearAll() {
    this.showClearAllDialog = false;
  }

  confirmClearAll() {
    console.log('Clearing all reviews');
    this.reviews = [];
    this.reviewService['reviews$'].next([...this.reviews]);
    this.reviewService['saveReviewsToFirebase']();
    this.reviewService['saveReviewsToLocalStorage']();
    this.showClearAllDialog = false;
  }

}
