import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCheckoutComponent } from './admin-checkout.component';

describe('AdminCheckoutComponent', () => {
  let component: AdminCheckoutComponent;
  let fixture: ComponentFixture<AdminCheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCheckoutComponent]
    });
    fixture = TestBed.createComponent(AdminCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
