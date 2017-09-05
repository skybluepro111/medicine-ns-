// import { Card } from './../models/card.model';
import { Injectable, NgZone } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UtilsService } from './utils.service';
import 'rxjs/add/operator/share';
import {Items} from "../additem/item.model";

@Injectable()
export class FirebaseService {
  constructor(
    private ngZone: NgZone,
    private utils: UtilsService
  ) { }

  private profiles: any = [];
  items: BehaviorSubject<Array<Items>> = new BehaviorSubject([]);
  private _allItems: Array<Items> = [];

  add(items: any) {
    // console.log("fname", items.meal, items.day)   
    // console.log("date", items.startTime, items.startTime.getTime());
    return firebase.push(
        '/cards',
        { 
          id: items.id,
          name: items.name,
          type: items.type,
          dosage: items.dosage,
          count: items.count,
          note: items.note,
          startDate: items.startDate.getTime(),
          endDate: items.endDate.getTime(),
          startTime: items.startTime.getTime(),
          meal: items.meal,
          isDay: items.isDay,
          selectedDay: items.day

        }
      ).then(
        function (result:any) {
          console.log("RESULT key", result.key);
          return 'card added to your item';
        },
        function (errorMessage:any) {
          console.log("Ferror",errorMessage);
        }); 
  }
  getMyCards(): Observable<any> {
    return new Observable((observer: any) => {
      let onValueEvent = (snapshot: any) => {
        console.log(JSON.stringify(snapshot));
          this.ngZone.run(() => {
            let results = this.handleSnapshot(snapshot.value);
            console.log(JSON.stringify(results))
             observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, "/cards");
    }).share();              
  }

  getMyCard(id: string): Observable<any> {
    return new Observable((observer: any) => {
      observer.next(this._allItems.filter(s => s.id === id)[0]);
    }).share();
  }

  handleSnapshot(data: any) {
    this._allItems = [];
    if (data) {
      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
          this._allItems.push(result);
      }
      this.publishUpdates();
    }
    return this._allItems;
  }

  publishUpdates() {
    // here, we sort must emit a *new* value (immutability!)
    this._allItems.sort(function(a, b){
        if(a.startTime < b.startTime) return -1;
        if(a.startTime > b.startTime) return 1;
      return 0;
    })
    this.items.next([...this._allItems]);
  }

  editCard(id:string, startTime: Date, meal: string, name: string, note: string){
    console.log("time", startTime, new Date(startTime))
    this.publishUpdates();
    return firebase.update("/cards/"+id+"",{
        startTime: new Date(startTime).getTime(), 
        meal: meal,
        name: name,
        note: note
      })
      .then(
        function (result:any) {
          return 'You have successfully edited this card!';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });  
  }

}