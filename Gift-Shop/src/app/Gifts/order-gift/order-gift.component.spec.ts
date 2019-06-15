import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGiftComponent } from './order-gift.component';

describe('OrderGiftComponent', () => {
  let component: OrderGiftComponent;
  let fixture: ComponentFixture<OrderGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
