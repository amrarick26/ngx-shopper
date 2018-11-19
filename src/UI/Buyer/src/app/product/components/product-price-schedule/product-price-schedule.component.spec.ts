import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPriceScheduleComponent } from './product-price-schedule.component';

describe('ProductPriceScheduleComponent', () => {
  let component: ProductPriceScheduleComponent;
  let fixture: ComponentFixture<ProductPriceScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPriceScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPriceScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
