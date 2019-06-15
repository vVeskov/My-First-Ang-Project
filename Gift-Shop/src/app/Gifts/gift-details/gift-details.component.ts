import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GiftService } from '../gift.service';
import { Gift } from 'src/app/models/gift';

@Component({
  selector: 'app-gift-details',
  templateUrl: './gift-details.component.html',
  styleUrls: ['./gift-details.component.css']
})
export class GiftDetailsComponent implements OnInit {
  gift: Gift;
  constructor(private route:ActivatedRoute,
    private giftService:GiftService) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      let id = data['id'];
      this.giftService.getGiftDetails(id).subscribe((data) => {
        this.gift = data['gift'];
      })
    })
  }

}
