import { Component, OnInit } from '@angular/core';
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import {FirebaseService} from "../../services";
import {Items} from "../../additem/item.model";
import {Observable} from 'rxjs/Observable';

@Component({
	selector: 'card',
	moduleId: module.id,
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

	public item: Items;
	
	  public cards$: Observable<any>;

	constructor(private fonticon: TNSFontIconService,
		private RouterExtensions: RouterExtensions,
		private firebaseService: FirebaseService) {}

	ngOnInit() {
		this.cards$ = <any>this.firebaseService.getMyCards();
	}
	editItem() {
		this.RouterExtensions.navigate(["/additem"], {clearHistory: false});
	}
}