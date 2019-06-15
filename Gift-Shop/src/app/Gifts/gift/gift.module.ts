import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGiftComponent } from '../create-gift/create-gift.component';
import { EditGiftComponent } from '../edit-gift/edit-gift.component';
import { GiftDetailsComponent } from '../gift-details/gift-details.component';
import { OrderGiftComponent } from '../order-gift/order-gift.component';
import { GiftCartComponent } from '../gift-cart/gift-cart.component';
import { GiftUserOrdersComponent } from '../gift-user-orders/gift-user-orders.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GiftService } from '../gift.service';
import { RouterModule } from '@angular/router';
import { AuthGuardAdmin } from 'src/app/authentication/guards/auth.guard-admin';
import { HomeComponent } from 'src/app/home/home.component';
import { AuthGuard } from 'src/app/authentication/guards/auth.guard';
import { PendingOrdersComponent } from '../pending-orders/pending-orders.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'create', component: CreateGiftComponent, canActivate: [AuthGuardAdmin] },
      { path: 'details/:id', component: GiftDetailsComponent, canActivate: [AuthGuard] },
      { path: 'order/:id', component: OrderGiftComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: EditGiftComponent , canActivate: [AuthGuardAdmin] },
      { path: 'cart', component: GiftCartComponent , canActivate: [AuthGuard] },
      { path: 'pending', component: PendingOrdersComponent , canActivate: [AuthGuardAdmin] },
      
    ])

  ],
  declarations: [
    HomeComponent,
    CreateGiftComponent,
    EditGiftComponent,
    GiftDetailsComponent,
    OrderGiftComponent,
    GiftCartComponent,
    GiftUserOrdersComponent,
    PendingOrdersComponent
  ],
  providers: [
    GiftService,
  ]
})
export class GiftModule { }
