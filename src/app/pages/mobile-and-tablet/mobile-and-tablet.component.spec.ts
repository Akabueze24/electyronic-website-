import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAndTabletComponent } from './mobile-and-tablet.component';

describe('MobileAndTabletComponent', () => {
  let component: MobileAndTabletComponent;
  let fixture: ComponentFixture<MobileAndTabletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileAndTabletComponent]
    });
    fixture = TestBed.createComponent(MobileAndTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
