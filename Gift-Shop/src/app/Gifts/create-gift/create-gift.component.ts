import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GiftService } from '../gift.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-gift',
  templateUrl: './create-gift.component.html',
  styleUrls: ['./create-gift.component.css']
})
export class CreateGiftComponent implements OnInit {
  form:FormGroup;
  constructor(private fb:FormBuilder,private giftService:GiftService,private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      giftName:['',Validators.required],
      description:['',Validators.required],
      imageUrl:['',Validators.required],
      price:['',Validators.required],
    })
  }

  createGift(){
     return this.giftService.createGift(this.form.value).subscribe((data) => {
      this.router.navigate(['/gift/home'])
     });
  }
  get f(){return this.form.controls}
  get invalid(){return this.form.invalid}
}
