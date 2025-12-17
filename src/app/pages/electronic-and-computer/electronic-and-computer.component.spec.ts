import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicAndComputerComponent } from './electronic-and-computer.component';

describe('ElectronicAndComputerComponent', () => {
  let component: ElectronicAndComputerComponent;
  let fixture: ComponentFixture<ElectronicAndComputerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectronicAndComputerComponent]
    });
    fixture = TestBed.createComponent(ElectronicAndComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
