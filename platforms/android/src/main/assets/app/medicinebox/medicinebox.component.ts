import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import {FirebaseService} from "../services";
import {Items} from "../additem/item.model";
import {Observable} from 'rxjs/Observable';

@Component({
	selector: 'medicinebox',
	moduleId: module.id,
	templateUrl: './medicinebox.component.html',
	styleUrls: ['./medicinebox.component.css']
})

export class MedicineboxComponent implements OnInit {

	public item: Items;
	
	  public cards$: Observable<any>;

	constructor( private page: Page,
		private RouterExtensions: RouterExtensions,
		private firebaseService: FirebaseService) {
		// page.actionBarHidden = true;
	 }

	ngOnInit() {
		this.cards$ = <any>this.firebaseService.getMyCards();
	 }

	onTap() {
		this.RouterExtensions.navigate(["/additem"], {clearHistory: false});
	}

	editItem(id: string) {
		console.log("ID", id)
		this.RouterExtensions.navigate(["/additem", id]);
	}
}