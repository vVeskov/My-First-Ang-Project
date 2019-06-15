import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCartComponent } from './gift-cart.component';

describe('GiftCartComponent', () => {
  let component: GiftCartComponent;
  let fixture: ComponentFixture<GiftCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
