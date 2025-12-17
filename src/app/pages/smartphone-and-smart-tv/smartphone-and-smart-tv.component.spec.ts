import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartphoneAndSmartTvComponent } from './smartphone-and-smart-tv.component';

describe('SmartphoneAndSmartTvComponent', () => {
  let component: SmartphoneAndSmartTvComponent;
  let fixture: ComponentFixture<SmartphoneAndSmartTvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartphoneAndSmartTvComponent]
    });
    fixture = TestBed.createComponent(SmartphoneAndSmartTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
