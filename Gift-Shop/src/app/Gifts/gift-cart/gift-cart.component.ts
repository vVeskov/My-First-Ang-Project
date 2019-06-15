import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';
import { GiftService } from '../gift.service';
import { UserGifts } from '../../models/userGifts';
import { stringify } from 'querystring';
@Component({
  selector: 'app-gift-cart',
  templateUrl: './gift-cart.component.html',
  styleUrls: ['./gift-cart.component.css']
})
export class GiftCartComponent implements OnInit {
  gifts: Array<UserGifts>;
  totalSum: Number;
  mySub: Subscription;
  hasGifts = false;
  // giftTimesQntSum: Array<number>;

  constructor(public authService: AuthService,
    private giftService: GiftService,
    private router: Router) { }

  ngOnInit() {
    this.mySub = this.giftService.getUserCart().subscribe((data) => {
      let allOrders = data['order'];
      let currentUser = localStorage.getItem('user');
      let currentUserOrders = [];
      allOrders.forEach((element) => {
        if (element.user === currentUser) {
          currentUserOrders.push(element);
        }
      })
      this.gifts = currentUserOrders;
      let currSum = [];
      let allSum = 0;
      let giftQnt = [];
      let singleSum = [];
      let giftTimeQntSum = [];
      currentUserOrders.forEach((order) => {
        giftQnt.push(order.giftQnt);
      })


      currentUserOrders.forEach((order) => {
        currSum.push(order.price);
      })


      currSum.forEach((sum) => {
        sum = sum.slice(0, -3);
        sum = Number(sum);
        singleSum.push(sum);
      })
      for (let index = 0; index < singleSum.length; index++) {
        let s = singleSum[index] * giftQnt[index];
        giftTimeQntSum.push(s);
        allSum += s;
      }
      this.totalSum = allSum;

      for (let i = 0; i < this.gifts.length; i++) {
        this.gifts[i]['price'] = giftTimeQntSum[i];
      }

      if (this.gifts.length !== 0) {
        this.hasGifts = true;
      } else {
        this.hasGifts = false;
      }

    })

  }
  deleteGift(user, giftName) {
    this.giftService.deleteUserGift(user, giftName).subscribe((d) => {
      this.mySub = this.giftService.getUserCart().subscribe((data) => {
        let allOrders = data['order'];
        let currentUser = localStorage.getItem('user');
        let currentUserOrders = [];
        allOrders.forEach((element) => {
          if (element.user === currentUser) {
            currentUserOrders.push(element);
          }
        })
        this.gifts = currentUserOrders;
        let currSum = [];
        let allSum = 0;
        let giftQnt = [];
        let singleSum = [];
        let giftTimeQntSum = [];
        currentUserOrders.forEach((order) => {
          giftQnt.push(order.giftQnt);
        })


        currentUserOrders.forEach((order) => {
          currSum.push(order.price);
        })


        currSum.forEach((sum) => {
          sum = sum.slice(0, -3);
          sum = Number(sum);
          singleSum.push(sum);
        })
        for (let index = 0; index < singleSum.length; index++) {
          let s = singleSum[index] * giftQnt[index];
          giftTimeQntSum.push(s);
          allSum += s;
        }
        this.totalSum = allSum;

        for (let i = 0; i < this.gifts.length; i++) {
          this.gifts[i]['price'] = giftTimeQntSum[i];
        }
        if (this.gifts.length !== 0) {
          this.hasGifts = true;
        } else {
          this.hasGifts = false;
        }

      })
    })


  }

  removeUserOrder(userGifts, totalSum) {
    let dataToSend = {};
    let giftsArr = [];
    userGifts.forEach((order) => {
      let stringQnt = order.giftQnt.toString();
      let productNameAndProductQnt = order.giftName.concat(stringQnt);
      giftsArr.push(productNameAndProductQnt);
    })
    let user = localStorage.getItem('user');
    dataToSend = {
      giftsNameAndQnt: giftsArr,
      totalSum: totalSum,
      user: user,
    }
    this.giftService.addPendingOrders(dataToSend).subscribe((data) => {
   ;
    })

  this.mySub = this.giftService.removeUserOrders(user).subscribe((data) => {
   
      this.router.navigate(['/gift/home']);
    });
  }

  ngOnDestroy() {
    this.mySub.unsubscribe();
  }

}
