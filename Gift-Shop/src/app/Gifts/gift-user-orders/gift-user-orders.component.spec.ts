import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftUserOrdersComponent } from './gift-user-orders.component';

describe('GiftUserOrdersComponent', () => {
  let component: GiftUserOrdersComponent;
  let fixture: ComponentFixture<GiftUserOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftUserOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftUserOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
