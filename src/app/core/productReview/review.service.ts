import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
  productId: number;
  user: string;
  comment: string;
  rating: number;
  date: string; // ISO string
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews: Review[] = [];
  private reviews$ = new BehaviorSubject<Review[]>([]);

  private firebaseUrl = 'https://electro-884dc-default-rtdb.firebaseio.com/review.json';

  constructor(private http: HttpClient) {
    this.loadReviews();
  }

  getReviews() {
    return this.reviews$.asObservable();
  }

  getReviewsByProductId(productId: number): Review[] {
    return this.reviews.filter(r => r.productId === productId);
  }

  addReview(review: Review) {
    review.date = new Date().toISOString();
    this.reviews.push(review);
    this.reviews$.next([...this.reviews]);
    this.saveReviewsToFirebase();
    this.saveReviewsToLocalStorage();
  }

  private loadReviews() {
    const local = localStorage.getItem('reviews');
    if (local) {
      this.reviews = JSON.parse(local);
      this.reviews$.next([...this.reviews]);
    }

    this.http.get<{ [key: string]: Review }>(this.firebaseUrl).subscribe(res => {
      if (res) {
        const fetched = Object.values(res);
        const merged = [...this.reviews];
        fetched.forEach(f => {
          if (!merged.find(r => r.productId === f.productId && r.user === f.user && r.date === f.date)) {
            merged.push(f);
          }
        });
        this.reviews = merged;
        this.reviews$.next([...this.reviews]);
        this.saveReviewsToLocalStorage();
      }
    });
  }

  private saveReviewsToFirebase() {
    this.http.put(this.firebaseUrl, this.reviews).subscribe({
      next: () => console.log('Reviews saved to Firebase'),
      error: err => console.error('Error saving reviews to Firebase', err)
    });
  }

  private saveReviewsToLocalStorage() {
    localStorage.setItem('reviews', JSON.stringify(this.reviews));
  }

  softDeleteContact(id: string): Observable<any> {
    const deleteApi = `https://electro-884dc-default-rtdb.firebaseio.com/contact-us.json/${id}.json`;
    return this.http.patch(deleteApi, { deleted: true });
  }
}
