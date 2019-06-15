import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Orders } from 'src/app/models/order';
import { GiftService } from '../gift.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent implements OnInit {
  mySub: Subscription;
  orders: Array<Orders>;
  constructor(private giftService: GiftService,
    private router: Router) { }

  ngOnInit() {
    this.mySub = this.giftService.getUserOrders().subscribe((data) => {
      let allData = data['orders'];
      if (allData) {
        for (let i = 0; i < allData.length; i++) {
          for (let j = 0; j < allData[i].giftsName.length; j++) {

            let giftQnt = allData[i].giftsName[j].slice(-1);
            allData[i].giftsName[j] = allData[i].giftsName[j].substr(0, allData[i].giftsName[j].length - 1);
            allData[i].giftsName[j] = allData[i].giftsName[j] + " - " + "Quantity: " + giftQnt;
          }
        }
      }
      this.orders = allData;
      console.log(this.orders);
    })

  }

  deleteUserOrder(id) {
    this.giftService.deleteSinglePendingOrder(id).subscribe((d) => {
      this.mySub = this.giftService.getUserOrders().subscribe((data) => {
        let allData = data['orders'];
        if (allData) {
          for (let i = 0; i < allData.length; i++) {
            for (let j = 0; j < allData[i].giftsName.length; j++) {

              let giftQnt = allData[i].giftsName[j].slice(-1);
              allData[i].giftsName[j] = allData[i].giftsName[j].substr(0, allData[i].giftsName[j].length - 1);
              allData[i].giftsName[j] = allData[i].giftsName[j] + " - " + "Quantity: " + giftQnt;
            }
          }
        }
        this.orders = allData;
        console.log(this.orders);
      })
    })
  }

  ngOnDestroy() {
    this.mySub.unsubscribe();
  }
}
