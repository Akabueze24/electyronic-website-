import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopAndDesktopsComponent } from './laptop-and-desktops.component';

describe('LaptopAndDesktopsComponent', () => {
  let component: LaptopAndDesktopsComponent;
  let fixture: ComponentFixture<LaptopAndDesktopsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaptopAndDesktopsComponent]
    });
    fixture = TestBed.createComponent(LaptopAndDesktopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
