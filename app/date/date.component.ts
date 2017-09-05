import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { DatePicker } from "ui/date-picker";
import { Page } from "ui/page";

@Component({
	selector: 'date',
	moduleId: module.id,
	templateUrl: './date.component.html',
	styleUrls: ['./date.component.css']
})

export class DateComponent implements OnInit {

	public currentdate: Date;
	
		constructor(private params: ModalDialogParams, private page: Page) {
			this.currentdate = new Date(params.context);
	
			this.page.on("unloaded", () => {
				// using the unloaded event to close the modal when there is user interaction
				// e.g. user taps outside the modal page
				this.params.closeCallback();
			});
		}
	
		ngOnInit() {
			let datePicker: DatePicker = <DatePicker>this.page.getViewById<DatePicker>("datePicker");
			datePicker.year = this.currentdate.getFullYear();
			datePicker.month = this.currentdate.getMonth() + 1;
			datePicker.day = this.currentdate.getDate();
			datePicker.minDate = new Date(1975, 0, 29);
			datePicker.maxDate = new Date(2045, 4, 12);
		}
	
		public submit() {
			let datePicker: DatePicker = <DatePicker>this.page.getViewById<DatePicker>("datePicker");
			console.log("DATEPICK", datePicker.date)
			this.params.closeCallback(datePicker.date);
		}
	}