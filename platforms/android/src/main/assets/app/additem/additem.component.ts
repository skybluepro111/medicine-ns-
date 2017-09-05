import { Component, OnInit, ViewContainerRef, NgZone } from '@angular/core';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { DateComponent } from "../date/date.component"
import { TimeComponent } from "../time/time.component"
import { CheckBox } from 'nativescript-checkbox';
import { Page } from 'ui/page';
import { RadioButton, RadioGroup } from 'nativescript-radiobutton'
import {Observable} from 'rxjs/Observable';
import {Items} from "./item.model";
import {FirebaseService} from "../services";
import {Router, ActivatedRoute} from '@angular/router';


class RadioOption {
	text: string;
	selected: boolean = false;
  
	constructor(text: string) {
	  this.text = text;
	}
}


@Component({
	selector: 'additem',
	moduleId: module.id,
	providers: [ModalDialogService],
	templateUrl: './additem.component.html',
	styleUrls: ['./additem.component.css']
})


export class AdditemComponent implements OnInit {

	id: string;
	startDate: Date;
	endDate: Date;
	startTime: Date;
	radioOptions?: Array<RadioOption>;
	mealOptions?: Array<RadioOption>;
	isDay:boolean;
	name: string;
    type: string;
	dosage: string;
	count: string;
	note:string;
	day: string;
	meal: string;
	public items: Items;
	private sub: any;
	// public test: string
	public item: Observable<any>;
	public message$: Observable<any>;
	public flag: boolean
	
	constructor( private modalService: ModalDialogService,
			private vcRef: ViewContainerRef,
			private routerExtensions: RouterExtensions,
			private page: Page,
			private firebaseService: FirebaseService,
			private route: ActivatedRoute,
			private ngZone: NgZone,
		) 
	{
		this.resetDates();
	}

	getStartDate() {
        this.createModelView().then(result => {
			console.log("RESULT", result)
            if (this.validate(result)) {
                this.startDate = result;
            }
        }).catch(error => this.handleError(error));
    }

    getEndDate() {
        this.createModelView().then(result => {
            if (this.validate(result)) {
                this.endDate = result;
            }
        }).catch(error => this.handleError(error));
	}
	
	private createTimeView(): Promise<any> {
		const date = new Date();
		console.log("date", date)
		const time = date.getHours() + date.getMinutes()
	    const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
			context: date.toDateString(),
            fullscreen: false,
        };

        return this.modalService.showModal(TimeComponent, options);
	}

	getTime() {
		this.createTimeView().then(result => {
			this.startTime = result
			console.log("timeRES", this.startTime)
		})
	}
	
	private createModelView(): Promise<any> {
		const today = new Date();
	    const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: today.toDateString(),
            fullscreen: false,
        };

        return this.modalService.showModal(DateComponent, options);
    }

	 public goBack() {
		// console.log("test", this.test) 
		this.routerExtensions.backToPreviousPage();
	}
	
	private resetDates() {
        this.startDate = new Date();
		this.endDate = new Date();
		this.startTime= new Date();
    }

    private validate(result: any) {
        return !!result;
    }

    private handleError(error: any) {
        this.resetDates();
        alert("Please try again!");
        console.dir(error);
    }

	ngOnInit() {
		this.radioOptions = [
			new RadioOption("Sun"),
			new RadioOption("Mon"),
			new RadioOption("Tue"),
			new RadioOption("Wed"),
			new RadioOption("Thu"),
			new RadioOption("Fri"),
			new RadioOption("Sat")
		  ];

		  this.mealOptions = [
			new RadioOption("Before Meal"),
			new RadioOption("After Meal"),
		  ];
		  console.log("MEAL", this.radioOptions)
		
		  this.isDay = false,
		  this.day='';
		  this.meal='';
		//   console.log("IDA", this.id)
		this.flag=false;
		this.sub = this.route.params.subscribe((params: any) => {
		
			this.id = params['id'];
			this.firebaseService.getMyCard(this.id).subscribe((item) => {
			  this.ngZone.run(() => {
			
				for (let prop in item) {
					this.flag = true;
				  if (prop === "id") {
					this.id = item[prop];
					console.log("addID", this.id)
				  }
				  if (prop === "name") {
					this.name = item[prop];
					console.log("addID", this.name)
				  }
				  if (prop === "startTime") {
					this.startTime = item[prop];
				  }
				  if (prop === "meal") {
					this.meal = item[prop];
				  }
				  if (prop === "count") {
					this.count = item[prop];
				  }
				  if (prop === "dosage") {
					this.dosage = item[prop];
				  }
				  if (prop === "startDate") {
					this.startDate = item[prop];
				  }
				  if (prop === "endDate") {
					this.endDate = item[prop];
				  }
				  if (prop === "selectedDay") {
					this.day = item[prop];
				  }
				  if (prop === "type") {
					this.type = item[prop];
				  }
				  if (prop === "isDay") {
					this.isDay = item[prop];
				  }
				  if (prop === "note") {
					this.note = item[prop];
				  }                                       
				}
			  });
			});
		  });  
		  console.log("FLAG", this.flag)
	 }

	

	checkDay() {
		this.isDay = true,
		console.log('checked prop value1 = ' + this.isDay); // will return true of false
	}

	changeCheckedRadio(radioOption: RadioOption): void {
		radioOption.selected = !radioOption.selected;
	
		if (!radioOption.selected) {
		  return;
		}
	
		// uncheck all other options
		this.radioOptions.forEach(option => {
		if (option.text !== radioOption.text) {
			option.selected = false;
		}
		else this.day=option.text
		});
	}

	changeCheckedMeal(mealOption: RadioOption): void {
		mealOption.selected = !mealOption.selected;
	
		if (!mealOption.selected) {
		  return;
		}
	
		// uncheck all other options
		this.mealOptions.forEach(option => {
		if (option.text !== mealOption.text) {
			option.selected = false;
			
		  }
		  else this.meal=option.text
		});
	}

	addItem() {
		console.log("IDEddddd", this.day, this.meal)
		this.items = new Items(
			this.id,
			this.name,
			this.type,
			this.dosage,
			this.count,
			this.note,
			this.startDate,
			this.endDate,
			this.startTime,
			this.day,
			this.isDay,
			this.meal)

		  this.firebaseService.add(this.items).then((message:any) => {
			  console.log("add")
			alert(message);
		  })
		  this.routerExtensions.navigate(["/medicinebox"], {clearHistory: false});
	}
		  
	editCard(id: string) {
		this.firebaseService.editCard(id,this.startTime, this.meal, this.name, this.note).then((result:any) => {
			alert(result)
		  }, (error: any) => {
			  alert(error);
		  });
		  this.routerExtensions.navigate(["/medicinebox"], {clearHistory: false});
	}
}