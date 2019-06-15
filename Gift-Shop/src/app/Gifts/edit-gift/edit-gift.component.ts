import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { GiftService } from '../gift.service';
import { Router } from '@angular/router';
import { Gift } from 'src/app/models/gift';

@Component({
  selector: 'app-edit-gift',
  templateUrl: './edit-gift.component.html',
  styleUrls: ['./edit-gift.component.css']
})
export class EditGiftComponent implements OnInit {
  gift: Gift;
  form: FormGroup;
  @ViewChild('f') editGiftForm: NgForm;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private giftService: GiftService,
    private router: Router) { }

  ngOnInit() {
   let id =  this.route.snapshot.params['id'];
   this.giftService.getGiftDetails(id).subscribe((data) => {
    this.gift = data['gift'];  
      })

    // this.form = this.fb.group({
    //   giftName: ['', ],
    //   description: ['', ],
    //   imageUrl: ['', ],
    //   price: ['', ],
    // })

  }
  get f() { return this.form.controls }
  get invalid() { return this.form.invalid }

  editGift() {
    const body = this.editGiftForm.value;   
    this.giftService.editGift(body,this.gift['_id']).subscribe(() =>{
      this.router.navigate(['/gift/home']);
    })
    //    this.route.params.subscribe((data) => {
    //   
    //   this.giftService.editGift(this.form.value, id).subscribe((data) => {
    //     this.router.navigate(['/gift/home'])
    //   });
    // })
  }
}
