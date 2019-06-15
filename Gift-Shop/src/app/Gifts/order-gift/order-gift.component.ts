import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gift } from 'src/app/models/gift';
import { GiftService } from '../gift.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-gift',
  templateUrl: './order-gift.component.html',
  styleUrls: ['./order-gift.component.css']
})
export class OrderGiftComponent implements OnInit {
  form: FormGroup;
  @ViewChild('f') orderGiftForm: NgForm;
  mySub: Subscription;
  gift: Gift;

  constructor(private giftService: GiftService, private route: ActivatedRoute,
    private fb: FormBuilder, private router: Router) { }


  ngOnInit() {

    let id = this.route.snapshot.params['id'];
    this.giftService.getGiftDetails(id).subscribe((data) => {
      this.gift = data['gift'];
    })

    // this.form = this.fb.group({
    //   productName: [''],
    //   price: [''],
    //   giftQnt: [''],
    // })
  }

  orderGift() {
    const body = this.orderGiftForm.value;
    let user = localStorage.getItem('user');
    body['user'] = user;
    return this.giftService.orderGift(body).subscribe((data) => {
      this.router.navigate(['/gift/home'])
    })
  }

}
