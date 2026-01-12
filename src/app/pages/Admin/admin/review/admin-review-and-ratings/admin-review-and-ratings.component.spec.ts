import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReviewAndRatingsComponent } from './admin-review-and-ratings.component';

describe('AdminReviewAndRatingsComponent', () => {
  let component: AdminReviewAndRatingsComponent;
  let fixture: ComponentFixture<AdminReviewAndRatingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReviewAndRatingsComponent]
    });
    fixture = TestBed.createComponent(AdminReviewAndRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
