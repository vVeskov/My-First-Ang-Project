import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { Gift } from '../models/gift';
import { GiftService } from '../Gifts/gift.service';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mySub: Subscription;
  username: string;
  gifts: Array<Gift>;
  constructor(public authService: AuthService,
    private giftService: GiftService,
    private router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem('user');
    this.mySub = this.giftService.getAllGifts().subscribe((data) => {
      this.gifts = data['gifts'];
    });
  }

  deleteGift(id) {
    this.giftService.deleteGift(id).subscribe((data) => {
      this.mySub = this.giftService.getAllGifts().subscribe((data) => {
        this.gifts = data['gifts'];
      });
    });
  }

  ngOnDestroy() {
    this.mySub.unsubscribe();
  }
}
