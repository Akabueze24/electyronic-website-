import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutAdminComponent } from './checkout-admin.component';

describe('CheckoutAdminComponent', () => {
  let component: CheckoutAdminComponent;
  let fixture: ComponentFixture<CheckoutAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutAdminComponent]
    });
    fixture = TestBed.createComponent(CheckoutAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
