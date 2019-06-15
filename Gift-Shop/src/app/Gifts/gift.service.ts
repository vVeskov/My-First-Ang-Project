import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gift } from '../models/gift';
import { UserGifts } from '../models/userGifts';
import { Orders } from '../models/order';

const createGiftUrl = "http://localhost:5000/feed/gift/create";
const getGiftUrl = "http://localhost:5000/feed/gifts";
const getGiftDetailsUrl = "http://localhost:5000/feed/gift/details/";
const deleteGiftUrl = "http://localhost:5000/feed/gift/delete/";
const editGiftUrl = "http://localhost:5000/feed/gift/edit/";
const addUserOrderUrl = "http://localhost:5000/feed/user/newOrder";
const getUserCartUrl = "http://localhost:5000/feed/user/orders";
const deleteUserGiftUrl = "http://localhost:5000/feed/user/deleteSingleGift";
const removeUserOrderUrl = "http://localhost:5000/feed/user/delete";
const addPendingOrdersUrl = "http://localhost:5000/feed/user/addPendingOrders";
const getUserOrdersUrl = "http://localhost:5000/feed/user/getPendingOrders";
const deleteSinglePendingOrderUrl = "http://localhost:5000/feed/user/deleteSingleOrder";
@Injectable({
  providedIn: 'root'
})
export class GiftService {

  constructor(private http: HttpClient) { }

  createGift(data) {
    return this.http.post(createGiftUrl, data)
  }

  getAllGifts(): Observable<Array<Gift>> {
    return this.http.get<Array<Gift>>(getGiftUrl);
  }

  getGiftDetails(id): Observable<Gift> {
    return this.http.get<Gift>(getGiftDetailsUrl + id);
  }

  deleteGift(id) {
    return this.http.delete(deleteGiftUrl + id)
  }
  
  editGift(data, id) {
    console.log(data);
    return this.http.put(editGiftUrl + id, data);
  }

  orderGift(data) {
    return this.http.post(addUserOrderUrl, data);
  }

  getUserCart(): Observable<Array<UserGifts>> {
    return this.http.get<Array<UserGifts>>(getUserCartUrl);
  }

  deleteUserGift(user, giftName) {
    let giftObj = {
      user: user,
      giftName: giftName,
    }
    return this.http.post(deleteUserGiftUrl, giftObj);
  }
  
  removeUserOrders(user) {
    let dataToSend = {
      user: user,
    }
    return this.http.post(removeUserOrderUrl,dataToSend);
  }
  addPendingOrders(data){
    return this.http.post(addPendingOrdersUrl,data);
  }

  getUserOrders(){
    return this.http.get<Array<Orders>>(getUserOrdersUrl)
  }
  deleteSinglePendingOrder(id){
    let dataToSend = {
      id:id,
    }
    return this.http.post(deleteSinglePendingOrderUrl,dataToSend);
  }
}
